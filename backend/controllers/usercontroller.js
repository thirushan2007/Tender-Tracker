const db = require("../config/db");

exports.getUsers = (req, res) => {

    const sql = `
        SELECT
            u.id,
            u.name,
            u.email,
            u.emp_id,
            u.role,
            u.state,
            m.name AS reporting_to
        FROM users u
        LEFT JOIN users m
        ON u.reporting_to = m.id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};