// api/server.js - Serverless Function Vercel (Endpoint API Vendor B)

// FIX KRUSIAL: Mengimpor modul yang diekspor dari db.js
const db = require('./db'); 

// Fungsi utama yang diekspor untuk Vercel
module.exports = async (req, res) => {
    // Validasi hanya menerima GET
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end('Method Not Allowed');
    }
    
    // Query untuk mengambil data sesuai standar Vendor B
    const queryText = `
        SELECT 
            sku, 
            "productName", 
            price, 
            "isAvailable" 
        FROM productsss; 
    `;

    try {
        // PEMANGGILAN YANG BENAR: menggunakan db.query
        const products = await db.query(queryText);
        
        // Kirim respons dalam format JSON (Status 200 OK)
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(products);

    } catch (error) {
        console.error('API execution failed:', error.message);
        
        // Mengembalikan error 500 jika koneksi gagal (kemungkinan masalah DATABASE_URL)
        return res.status(500).json({ 
            error: 'Failed to retrieve Vendor-B data.',
            details: 'Database connection or query failed. Check your DATABASE_URL in Vercel.',
            tech_details: error.message 
        });
    }
};