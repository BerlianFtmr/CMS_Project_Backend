import express from 'express';
import {createClient} from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL atau key tidak ditemukan!!.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

//create
router .post('/add', async (req, res) => {
    const {judul, penulis, tahun_terbit} = req.body;
    const {data, error} = await supabase.from('buku').insert([{ judul, penulis, tahun_terbit }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

//read
router.get('/', async (req, res) => {
    const {data, error} = await supabase.from('buku').select('*').order("dibuat_tanggal",{ ascending: false});
    if (error) return res.status(400).json({error: error.message});
    res.json(data);
});

//update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {judul, penulis, tahun_terbit} = req.body;
    const {data, error} = await supabase.from("buku").update({judul, Penulis, tahun_terbit}).eq('id', id);
    if (error) return res.status(400).json({error: error.message});
    res.json(data);
});

//delete
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const {error} = await supabase.from('buku').delete().eq("id", id);
    if (error) return res.status(400).json({error: error.message});
    req.json({message: "produk berhasil dihapus!!"});
});

export default router;