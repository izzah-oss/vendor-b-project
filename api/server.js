// api/server.js
const db = require('./db'); 

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end('Method Not Allowed');
    }
    
    // Pastikan Anda menggunakan nama kolom dan tabel yang BENAR di sini:
    const queryText = `
        SELECT 
            sku, 
            product_name AS "productName", 
            price, 
            is_available AS "isAvailable" 
        FROM productsss; 
        -- Gunakan "productsss" jika itu nama tabel Anda yang sebenarnya.
        -- Gunakan nama kolom asli Anda (misal: product_name, is_available)
    `;

    try {
        const { rows } = await db.query(queryText);
        
        // Mengirimkan response dalam format JSON
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