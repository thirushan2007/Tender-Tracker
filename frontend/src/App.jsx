import { useMemo, useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./App.css";

const columns = [
  { key: "sno", label: "Sno" },
  { key: "tenderNo", label: "Tender No" },
  { key: "fyYear", label: "FY Year" },
  { key: "state", label: "State" },
  { key: "location", label: "Location" },
  { key: "customerName", label: "Customer Name" },
  { key: "dueDate", label: "Due Date" },
  { key: "tenderType", label: "DB / HO / DP / NP" },
  { key: "dbName", label: "DB Name" },
  { key: "sapMaterialCode", label: "SAP Material Code" },
  { key: "emdAmt", label: "EMD Amt" },
  { key: "l1CompanyName", label: "Seller Name 1" },
  { key: "l1QuotedPrice", label: "Price 1" },
  { key: "l2CompanyName", label: "Seller Name 2" },
  { key: "l2QuotedPrice", label: "Price 2" },
  { key: "l3CompanyName", label: "Seller Name 3" },
  { key: "l3QuotedPrice", label: "Price 3" },
  { key: "finalRemarks", label: "Final Remarks" },
  { key: "zm", label: "ZM" },
  { key: "hoPerson", label: "HO Person" },
  { key: "zone", label: "Zone" },
  { key: "feedbackStrategy", label: "Feedback Response" },
];

const filterFields = [
  { id: "fyYear", label: "FY Year", key: "fyYear" },
  { id: "state", label: "State", key: "state" },
  { id: "zone", label: "Zone", key: "zone" },
  { id: "tenderType", label: "Type", key: "tenderType" },
];

function App() {
  const [tenderData, setTenderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    fyYear: "",
    state: "",
    zone: "",
    tenderType: "",
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tracker/integrated")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((item, idx) => ({
          ...item,
          sno: idx + 1,
        }));
        setTenderData(mapped);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching integrated data:", err);
        setIsLoading(false);
      });
  }, []);

  const uniqueValues = (key) => [
    ...new Set(tenderData.map((item) => item[key]).filter(Boolean)),
  ];

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleFieldChange = (tenderNo, key, value) => {
    setTenderData((prev) =>
      prev.map((item) => {
        if (item.tenderNo === tenderNo) {
          const updated = { ...item, [key]: value };
          if (key === "tenderType" && value !== "DB") {
            updated.dbName = "";
          }
          return updated;
        }
        return item;
      })
    );
  };

  const persistChange = (row, key, val) => {
    setSaveStatus("Saving...");
    const dbNameValue = key === "tenderType" && val !== "DB" ? "" : row.dbName;
    
    const body = {
      tenderNo: row.tenderNo,
      tenderType: key === "tenderType" ? val : row.tenderType,
      dbName: key === "dbName" ? val : dbNameValue,
      finalRemarks: key === "finalRemarks" ? val : row.finalRemarks,
      zm: key === "zm" ? val : row.zm,
      hoPerson: key === "hoPerson" ? val : row.hoPerson,
      zone: key === "zone" ? val : row.zone,
      feedbackStrategy: key === "feedbackStrategy" ? val : row.feedbackStrategy,
    };

    fetch("http://localhost:5000/api/tracker/save", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Save failed");
        return res.json();
      })
      .then(() => {
        setSaveStatus("Saved");
        setTimeout(() => setSaveStatus(""), 2000);
      })
      .catch((err) => {
        console.error("Error saving change:", err);
        setSaveStatus("Error Saving");
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const filteredData = useMemo(() => {
    return tenderData.filter((item) => {
      const searchText = Object.values(item).join(" ").toLowerCase();

      return (
        searchText.includes(search.toLowerCase()) &&
        (!filters.fyYear || item.fyYear === filters.fyYear) &&
        (!filters.state || item.state === filters.state) &&
        (!filters.zone || item.zone === filters.zone) &&
        (!filters.tenderType || item.tenderType === filters.tenderType)
      );
    });
  }, [tenderData, search, filters]);

  const ITEMS_PER_PAGE = 100;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const resetFilters = () => {
    setSearch("");
    setFilters({
      fyYear: "",
      state: "",
      zone: "",
      tenderType: "",
    });
  };

  const getPdfValue = (row, key) => {
    if (key === "dbName") {
      return row.tenderType === "DB"
        ? row.dbName || "Not Entered"
        : "Not Required";
    }
    return String(row[key] ?? "");
  };

  const exportPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a2",
    });

    doc.setFontSize(18);
    doc.text("Tender Tracker Table", 14, 15);

    doc.setFontSize(10);
    doc.text(`Total Records: ${filteredData.length}`, 14, 23);

    autoTable(doc, {
      startY: 30,
      head: [columns.map((column) => column.label)],
      body: filteredData.map((row) =>
        columns.map((column) => getPdfValue(row, column.key))
      ),
      styles: {
        fontSize: 7,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [239, 246, 255],
      },
    });

    doc.save("tender-tracker.pdf");
  };

  const renderCell = (column, row) => {
    if (column.key === "tenderType") {
      return (
        <select
          className="table-select"
          value={row.tenderType || ""}
          onChange={(e) => {
            handleFieldChange(row.tenderNo, "tenderType", e.target.value);
            persistChange(row, "tenderType", e.target.value);
          }}
        >
          <option value="" disabled>Select Type</option>
          <option value="DB">DB</option>
          <option value="HO">HO</option>
          <option value="DP">DP</option>
          <option value="NP">NP</option>
        </select>
      );
    }

    if (column.key === "dbName") {
      return row.tenderType === "DB" ? (
        <input
          className="table-input"
          type="text"
          placeholder="Enter DB name"
          value={row.dbName || ""}
          onChange={(e) => handleFieldChange(row.tenderNo, "dbName", e.target.value)}
          onBlur={(e) => persistChange(row, "dbName", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="muted-text">Not Required</span>
      );
    }

    if (
      column.key === "finalRemarks" ||
      column.key === "zm" ||
      column.key === "hoPerson" ||
      column.key === "feedbackStrategy"
    ) {
      return (
        <input
          className="table-input"
          type="text"
          placeholder={`Enter ${column.label}`}
          value={row[column.key] || ""}
          onChange={(e) => handleFieldChange(row.tenderNo, column.key, e.target.value)}
          onBlur={(e) => persistChange(row, column.key, e.target.value)}
          onKeyDown={handleKeyDown}
        />
      );
    }

    if (column.key === "zone") {
      return (
        <select
          className="table-select"
          value={row.zone || ""}
          onChange={(e) => {
            handleFieldChange(row.tenderNo, "zone", e.target.value);
            persistChange(row, "zone", e.target.value);
          }}
        >
          <option value="" disabled>Select Zone</option>
          <option value="NR">NR</option>
          <option value="ER">ER</option>
          <option value="WR">WR</option>
          <option value="SR">SR</option>
        </select>
      );
    }

    return row[column.key] || "-";
  };

  const dbCount = tenderData.filter((item) => item.tenderType === "DB").length;
  const hoCount = tenderData.filter((item) => item.tenderType === "HO").length;

  return (
    <main className="app">
      <header className="page-header">
        <div>
          <p className="eyebrow">Tender Management</p>
          <h1>Tender Tracker</h1>
          <p className="subtitle">
            Track tenders, pricing, zones, remarks and strategy feedback.
          </p>
        </div>

        <button className="export-btn" onClick={exportPDF}>
          Export PDF
        </button>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total Tenders</span>
          <strong>{tenderData.length}</strong>
        </div>

        <div className="stat-card">
          <span>Filtered</span>
          <strong>{filteredData.length}</strong>
        </div>

        <div className="stat-card">
          <span>DB Tenders</span>
          <strong>{dbCount}</strong>
        </div>

        <div className="stat-card">
          <span>HO Tenders</span>
          <strong>{hoCount}</strong>
        </div>
      </section>

      <section className="filter-card">
        <div className="search-box">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search tender no, state, customer, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-grid">
          {filterFields.map((field) => (
            <div className="filter-item" key={field.id}>
              <label>{field.label}</label>
              <select
                value={filters[field.id]}
                onChange={(e) => updateFilter(field.id, e.target.value)}
              >
                <option value="">All</option>
                {uniqueValues(field.key).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button className="reset-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </section>

      <section className="table-card">
        <div className="table-header">
          <h2>Tender Records {saveStatus && <span className="save-status">({saveStatus})</span>}</h2>
          <span>{filteredData.length} records</span>
        </div>

        <div className="table-wrapper">
          {isLoading ? (
            <div className="loading-state">Loading tender records from database...</div>
          ) : (
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row) => (
                    <tr key={row.sno}>
                      {columns.map((column) => (
                        <td key={column.key} data-label={column.label}>
                          {renderCell(column, row)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="empty-state" colSpan={columns.length}>
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {!isLoading && filteredData.length > 0 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;