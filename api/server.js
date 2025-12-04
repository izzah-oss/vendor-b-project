// api/server.js - Serverless Function Vercel (Endpoint API Vendor B)

// Import modul database yang sudah dibuat (api/db.js)
const db = require('./db'); 

// Fungsi utama yang diekspor untuk Vercel
module.exports = async (req, res) => {
    // 1. Validasi Metode Request: Memastikan hanya menerima request GET
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end('Method Not Allowed');
    }
    
    // 2. Query SQL: Mengambil data dari tabel 'products'
    // Perhatikan penggunaan kutip ganda pada nama kolom CamelCase di SQL
    const queryText = `
        SELECT 
            sku, 
            "productName", 
            price, 
            "isAvailable" 
        FROM products; 
    `;

    try {
        // Panggil fungsi query dari db.js untuk mengambil data dari Neon
        const products = await db.query(queryText);
        
        // 3. Kirim Respons: Mengatur header dan mengirim data
        res.setHeader('Content-Type', 'application/json');
        
        // Mengirim data dalam format JSON yang sudah sesuai standar Vendor B
        return res.status(200).json(products);

    } catch (error) {
        console.error('API execution failed:', error.message);
        
        // Mengirim respons error 500 jika terjadi masalah database/koneksi
        return res.status(500).json({ 
            error: 'Failed to retrieve Vendor-B data.',
            details: 'Database connection or query failed. Check your DATABASE_URL in Vercel.',
            tech_details: error.message
        });
    }
};