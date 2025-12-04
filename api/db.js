// api/db.js - Modul Koneksi PostgreSQL untuk Neon

const { Client } = require('pg');

// Fungsi utama untuk menjalankan query
async function query(text, params) {
    // Mengambil Connection String dari Environment Variable (Vercel/Neon)
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set.');
    }

    const client = new Client({
        connectionString: connectionString,
        // Konfigurasi SSL wajib untuk Neon
        ssl: {
            rejectUnauthorized: false 
        }
    });

    try {
        await client.connect();
        const res = await client.query(text, params);
        return res.rows;
    } catch (err) {
        console.error('Database Error:', err);
        throw err;
    } finally {
        // Pastikan koneksi ditutup
        await client.end();
    }
}

// FIX KRUSIAL: Mengekspor fungsi 'query' sebagai properti dari objek
module.exports = {
    query, // <-- Baris ini memungkinkan pemanggilan 'db.query' di server.js
};