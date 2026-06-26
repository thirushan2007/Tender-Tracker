const express = require("express");
const router = express.Router();
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// Auto-alter tender_tracker table to ensure tender_type and db_name columns exist.
db.query("SHOW COLUMNS FROM tender_tracker LIKE 'tender_type'", (err, results) => {
    if (err) {
        console.error("Error checking tender_type column:", err);
        return;
    }
    if (results.length === 0) {
        db.query("ALTER TABLE tender_tracker ADD COLUMN tender_type VARCHAR(50) DEFAULT NULL", (err) => {
            if (err) console.error("Error adding tender_type column:", err);
            else console.log("Added tender_type column to tender_tracker");
        });
    }
});

db.query("SHOW COLUMNS FROM tender_tracker LIKE 'db_name'", (err, results) => {
    if (err) {
        console.error("Error checking db_name column:", err);
        return;
    }
    if (results.length === 0) {
        db.query("ALTER TABLE tender_tracker ADD COLUMN db_name VARCHAR(255) DEFAULT NULL", (err) => {
            if (err) console.error("Error adding db_name column:", err);
            else console.log("Added db_name column to tender_tracker");
        });
    }
});

db.query("SHOW KEYS FROM tender_tracker WHERE Key_name = 'PRIMARY'", (err, results) => {
    if (err) return console.error(err);
    if (results.length === 0) {
        db.query("ALTER TABLE tender_tracker ADD PRIMARY KEY (id)", (err2) => {
            if (err2) console.error("Error setting primary key on id:", err2);
            else {
                db.query("ALTER TABLE tender_tracker MODIFY id INT AUTO_INCREMENT", (err3) => {
                    if (err3) console.error("Error setting auto_increment on id:", err3);
                });
            }
        });
    } else {
        db.query("SHOW COLUMNS FROM tender_tracker LIKE 'id'", (err2, results2) => {
            if (results2 && results2[0] && !results2[0].Extra.includes("auto_increment")) {
                db.query("ALTER TABLE tender_tracker MODIFY id INT AUTO_INCREMENT", (err3) => {
                    if (err3) console.error("Error setting auto_increment on id:", err3);
                });
            }
        });
    }
});

// Helper Functions
function getFyYear(startDateStr, endDateStr) {
  if (!startDateStr) return "";
  const startMatch = startDateStr.match(/\d{4}/);
  if (!startMatch) return "";
  const startYearStr = startMatch[0];
  const startYear = parseInt(startYearStr, 10);
  
  let endYearStr = "";
  if (endDateStr) {
    const endMatch = endDateStr.match(/\d{4}/);
    if (endMatch) endYearStr = endMatch[0];
  }
  
  if (!endYearStr || endYearStr === startYearStr) {
    const nextYearShort = String(startYear + 1).slice(-2);
    return `${startYear}-${nextYearShort}`;
  } else {
    return `${startYear}-${endYearStr.slice(-2)}`;
  }
}

function getSuggestedProductCode(suggestedProducts) {
  if (!suggestedProducts) return "-";
  let data;
  try {
    data = typeof suggestedProducts === "string" ? JSON.parse(suggestedProducts) : suggestedProducts;
  } catch (e) {
    return "-";
  }
  if (Array.isArray(data) && data.length > 0) {
    return data[0].suggested_product_code || "-";
  } else if (data && !Array.isArray(data)) {
    return data.suggested_product_code || "-";
  }
  return "-";
}

function parseFinancialEvaluation(finEval) {
  let res = {
    l1_company: "", l1_price: "",
    l2_company: "", l2_price: "",
    l3_company: "", l3_price: ""
  };
  if (!finEval) return res;
  
  let data;
  try {
    data = typeof finEval === "string" ? JSON.parse(finEval) : finEval;
  } catch (e) {
    return res;
  }
  
  const getVal = (obj, keys) => {
    if (!obj) return "";
    for (const k of keys) {
      if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
    }
    return "";
  };

  const sellerKeys = ["seller_name", "Seller Name", "L1 Seller Name"];
  const priceKeys = ["total_price", "Total Price", "Total L1 Price"];

  if (Array.isArray(data)) {
    const l1Obj = data.find(o => String(o.Rank).toUpperCase() === "L1" || String(o.rank).toUpperCase() === "L1");
    const l2Obj = data.find(o => String(o.Rank).toUpperCase() === "L2" || String(o.rank).toUpperCase() === "L2");
    const l3Obj = data.find(o => String(o.Rank).toUpperCase() === "L3" || String(o.rank).toUpperCase() === "L3");
    
    if (l1Obj) {
      res.l1_company = getVal(l1Obj, sellerKeys);
      res.l1_price = getVal(l1Obj, priceKeys);
    } else {
      const fallbackL1 = data.find(o => getVal(o, sellerKeys) !== "");
      if (fallbackL1) {
        res.l1_company = getVal(fallbackL1, sellerKeys);
        res.l1_price = getVal(fallbackL1, priceKeys);
      }
    }
    
    if (l2Obj) {
      res.l2_company = getVal(l2Obj, sellerKeys);
      res.l2_price = getVal(l2Obj, priceKeys);
    }
    
    if (l3Obj) {
      res.l3_company = getVal(l3Obj, sellerKeys);
      res.l3_price = getVal(l3Obj, priceKeys);
    }
  } else if (data && typeof data === "object") {
      res.l1_company = getVal(data, sellerKeys);
      res.l1_price = getVal(data, priceKeys);
      res.l2_company = getVal(data, ["l2_company", "L2 Seller Name", "Seller Name"]);
      res.l2_price = getVal(data, ["l2_price", "Total L2 Price", "Total Price"]);
      res.l3_company = getVal(data, ["l3_company", "L3 Seller Name"]);
      res.l3_price = getVal(data, ["l3_price", "Total L3 Price"]);
  }
  return res;
}

function getDocDetails(jsonPath, fallbackDept, fallbackEmd) {
  let department = fallbackDept || "-";
  let emdAmount = fallbackEmd || "-";

  if (jsonPath) {
    let resolvedPath = jsonPath;
    if (!fs.existsSync(resolvedPath)) {
      resolvedPath = jsonPath.replace(/C:\\Users\\[^\\]+/, "C:\\Users\\Thirushan");
    }
    
    if (fs.existsSync(resolvedPath)) {
      try {
        const raw = fs.readFileSync(resolvedPath, "utf8");
        const json = JSON.parse(raw);
        if (json.department) {
          department = json.department;
        } else if (json.buyer_details && json.buyer_details.department) {
          department = json.buyer_details.department;
        }
        
        if (json.amount !== undefined) {
          emdAmount = json.amount;
        } else if (json.emd_amount !== undefined) {
          emdAmount = json.emd_amount;
        } else if (json.emd_detail && json.emd_detail.emd_amount !== undefined) {
          emdAmount = json.emd_detail.emd_amount;
        }
      } catch (e) {
        console.error("Error parsing JSON file:", e);
      }
    }
  }
  return { department, emdAmount };
}

// 1. Gem Tenders
router.get("/tenders", (req, res) => {
    db.query("SELECT * FROM gem_tenders", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// 2. Tender Documents
router.get("/tender-docs", (req, res) => {
    db.query("SELECT * FROM gem_tender_docs", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// 3. Processing Results
router.get("/processing-results", (req, res) => {
    db.query("SELECT * FROM tender_processing_results", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// 4. Tender Tracker
router.get("/tracker", (req, res) => {
    db.query("SELECT * FROM tender_tracker", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// 5. Integrated Integrated Tracker Data
router.get("/tracker/integrated", (req, res) => {
    // 1. Fetch from tender_processing_results
    db.query("SELECT bid_no, suggested_products, relevancy_check FROM tender_processing_results", (err, processingResults) => {
        if (err) return res.status(500).json(err);
        
        // 2. Fetch from gem_tenders
        db.query("SELECT bid_number AS tenderNo, start_date, end_date, state, district, department AS gt_department, emd_amount AS gt_emd_amount FROM gem_tenders", (err, tenders) => {
            if (err) return res.status(500).json(err);
            
            // 3. Fetch from tender_tracker
            db.query("SELECT id AS trackerId, bid_number, tender_type, db_name, financial_evaluvation, final_remarks, zm, ho_person, zone, strategy_feedback, buyer_department FROM tender_tracker", (err, trackerResults) => {
                if (err) return res.status(500).json(err);
                
                // Create Maps for O(1) lookups
                const processingMap = new Map();
                for (const row of processingResults) {
                    processingMap.set(row.bid_no, row);
                }
                
                const trackerMap = new Map();
                for (const row of trackerResults) {
                    trackerMap.set(row.bid_number, row);
                }
                
                // Merge data
                const integrated = tenders.map(t => {
                    const tpr = processingMap.get(t.tenderNo) || {};
                    const tt = trackerMap.get(t.tenderNo) || {};
                    
                    const fyYear = getFyYear(t.start_date, t.end_date);
                    
                    let isRelevant = false;
                    if (tpr.relevancy_check) {
                        try {
                            const rel = typeof tpr.relevancy_check === "string" ? JSON.parse(tpr.relevancy_check) : tpr.relevancy_check;
                            if (rel && rel.relevancy && rel.relevancy.toLowerCase() === "yes") {
                                isRelevant = true;
                            }
                        } catch (e) {}
                    }
                    const sapMaterialCode = isRelevant ? getSuggestedProductCode(tpr.suggested_products) : "-";
                    
                    const finEval = parseFinancialEvaluation(tt.financial_evaluvation);
                    
                    return {
                        tenderNo: t.tenderNo,
                        fyYear: fyYear,
                        state: t.state || "-",
                        location: t.district || "-",
                        customerName: tt.buyer_department || t.gt_department || "-",
                        dueDate: t.end_date ? t.end_date.split(" ")[0] : "-",
                        tenderType: tt.tender_type || "", 
                        dbName: tt.db_name || "",
                        sapMaterialCode: sapMaterialCode,
                        emdAmt: t.gt_emd_amount || "-",
                        l1CompanyName: finEval.l1_company || "-",
                        l1QuotedPrice: finEval.l1_price || "-",
                        l2CompanyName: finEval.l2_company || "-",
                        l2QuotedPrice: finEval.l2_price || "-",
                        l3CompanyName: finEval.l3_company || "-",
                        l3QuotedPrice: finEval.l3_price || "-",
                        finalRemarks: tt.final_remarks || "",
                        zm: tt.zm || "",
                        hoPerson: tt.ho_person || "",
                        zone: tt.zone || "", 
                        feedbackStrategy: tt.strategy_feedback || "",
                        trackerId: tt.trackerId || null
                    };
                });
                
                // Sort the integrated array
                // Equivalent to: ORDER BY tt.id IS NULL, tt.id DESC
                integrated.sort((a, b) => {
                    const aHasTracker = a.trackerId ? 1 : 0;
                    const bHasTracker = b.trackerId ? 1 : 0;
                    
                    if (aHasTracker !== bHasTracker) {
                        return bHasTracker - aHasTracker; // Rows with tracker entries come first
                    }
                    if (aHasTracker && bHasTracker) {
                        return b.trackerId - a.trackerId; // DESC by trackerId
                    }
                    return 0; // Maintain original order for others
                });
                
                res.json(integrated);
            });
        });
    });
});

// 6. Save/Upsert Tracker Record
router.put("/tracker/save", (req, res) => {
    const { 
        tenderNo, 
        tenderType, 
        dbName, 
        finalRemarks, 
        zm, 
        hoPerson, 
        zone, 
        feedbackStrategy 
    } = req.body;

    if (!tenderNo) {
        return res.status(400).json({ error: "tenderNo (bid_number) is required" });
    }

    // Check if record exists
    const checkSql = "SELECT id FROM tender_tracker WHERE bid_number = ?";
    db.query(checkSql, [tenderNo], (err, results) => {
        if (err) return res.status(500).json(err);
        
        if (results.length > 0) {
            // Update
            const updateSql = `
                UPDATE tender_tracker 
                SET 
                    tender_type = ?, 
                    db_name = ?, 
                    final_remarks = ?, 
                    zm = ?, 
                    ho_person = ?, 
                    zone = ?, 
                    strategy_feedback = ?
                WHERE bid_number = ?
            `;
            db.query(
                updateSql, 
                [tenderType, dbName, finalRemarks, zm, hoPerson, zone, feedbackStrategy, tenderNo], 
                (err2) => {
                    if (err2) return res.status(500).json(err2);
                    res.json({ message: "Tender tracker updated successfully" });
                }
            );
        } else {
            // Insert
            const insertSql = `
                INSERT INTO tender_tracker 
                (bid_number, tender_type, db_name, final_remarks, zm, ho_person, zone, strategy_feedback) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(
                insertSql, 
                [tenderNo, tenderType, dbName, finalRemarks, zm, hoPerson, zone, feedbackStrategy], 
                (err2) => {
                    if (err2) return res.status(500).json(err2);
                    res.json({ message: "Tender tracker inserted successfully" });
                }
            );
        }
    });
});

router.put("/tracker/:id", (req, res) => {
    const { final_remarks, zm, ho_person, zone, strategy_feedback } = req.body;
    const { id } = req.params;

    const sql = `
    UPDATE tender_tracker
    SET 
      final_remarks = ?,
      zm = ?,
      ho_person = ?,
      zone = ?,
      strategy_feedback = ?
    WHERE id = ?
  `;

    db.query(
        sql,
        [final_remarks, zm, ho_person, zone, strategy_feedback, id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Tender tracker updated successfully" });
        }
    );
});

module.exports = router;