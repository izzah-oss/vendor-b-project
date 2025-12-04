// api/server.js - KODE FINAL
const db = require('./db'); 

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end('Method Not Allowed');
    }
    
    // PERBAIKAN KRUSIAL: Menggunakan AS alias
    const queryText = `
        SELECT 
            sku, 
            -- Mengubah kolom database 'name' menjadi JSON output "productName"
            name AS "productName", 
            price, 
            -- Mengubah kolom database 'is_available' (atau 'availability') menjadi JSON output "isAvailable"
            is_available AS "isAvailable" 
        FROM products; 
    `;

    try {
        const products = await db.query(queryText);
        
        res.setHeader('Content-Type', 'application/json');
        // Pastikan Vercel menginterpretasikan true/false sebagai Boolean (bukan string)
        return res.status(200).json(products);

    } catch (error) {
        console.error('API execution failed:', error.message);
        return res.status(500).json({ 
            error: 'Failed to retrieve Vendor-B data.',
            details: 'Database connection or query failed. Periksa Log Vercel atau query SQL Anda.',
            tech_details: error.message 
        });
    }
};