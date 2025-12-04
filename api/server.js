// api/server.js - VERSI FINAL BERSIH
const db = require('./db'); 

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end('Method Not Allowed');
    }
    
    // Pastikan Anda menggunakan nama kolom dan tabel yang benar
    const queryText = `
SELECT 
sku, 
name AS "productName", 
price, 
availability AS "isAvailable" 
FROM productsss;
`;

    try {
        const { rows } = await db.query(queryText);
        
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(rows);

    } catch (error) {
        console.error('API execution failed:', error.message);
        return res.status(500).json({ 
            error: 'Failed to retrieve Vendor-B data.',
            details: 'Database connection or query failed. Periksa Log Vercel atau query SQL Anda.',
            tech_details: error.message 
        });
    }
};