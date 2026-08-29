# Portfolio Chatbot Backend (RAG FastAPI)

Repository backend untuk fitur AI Chatbot (Retrieval-Augmented Generation) pada website portofolio Nurul Hidayatul Hasanah. Menggunakan **FastAPI** untuk REST API, **ChromaDB** sebagai vector database, dan **OpenAI GPT-4o-mini** sebagai Large Language Model (LLM).

---

## Fitur Utama
1. **Endpoint REST API**: `/api/chat` (POST) untuk mengirim pertanyaan dan riwayat percakapan.
2. **Database Vektor (ChromaDB)**: Menyimpan potongan teks profil, keahlian, dan studi kasus proyek Nurul.
3. **Inisialisasi Otomatis**: Jika database kosong, backend otomatis melakukan embedding informasi dasar portofolio ke ChromaDB.
4. **Dukungan CORS**: Dikonfigurasi agar bisa diakses secara aman oleh frontend Next.js yang di-deploy di Vercel.

---

## Cara Menjalankan Lokal

### 1. Prasyarat
Pastikan Anda sudah menginstal Python 3.9 atau lebih baru pada komputer Anda.

### 2. Buat Virtual Environment
Buka terminal/command prompt di direktori `chatbot-backend` dan jalankan:
```bash
# Membuat virtual environment
python -m venv venv

# Mengaktifkan virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 3. Instal Dependensi
```bash
pip install -r requirements.txt
```

### 4. Konfigurasi Environment Variables (`.env`)
Buat file bernama `.env` di dalam direktori `chatbot-backend/` dan masukkan kunci API OpenAI Anda:
```env
OPENAI_API_KEY=your_openai_api_key_here
```
> **Catatan**: Jika `OPENAI_API_KEY` dikosongkan, chatbot tetap bisa berjalan tetapi akan memberikan respon fallback yang menampilkan data relevan dari ChromaDB tanpa sintesis teks LLM.

### 5. Jalankan Aplikasi
```bash
uvicorn main:app --reload
```
Aplikasi akan aktif di: `http://localhost:8000`
- Dokumentasi interaktif Swagger API bisa diakses di: `http://localhost:8000/docs`
- Endpoint chat aktif di: `http://localhost:8000/api/chat`

---

## Deployment Ke Cloud (Production)

Anda dapat men-deploy backend ini secara gratis/murah ke platform seperti **Render**, **Railway**, atau **Vercel** (menggunakan python runtime).

### Langkah Deployment ke Render (Sangat Direkomendasikan)
1. Hubungkan repository GitHub Anda ke [Render.com](https://render.com).
2. Buat **Web Service** baru.
3. Gunakan konfigurasi berikut:
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Di bagian **Environment Variables**, tambahkan:
   - `OPENAI_API_KEY` = `<kunci_api_openai_anda>`
5. Klik **Deploy**. Setelah aktif, Render akan memberikan URL seperti `https://portfolio-chatbot-backend.onrender.com`.

---

## Cara Menghubungkan Backend ke Frontend (Next.js)

1. Setelah backend Anda aktif di internet (misal: `https://your-backend.onrender.com`), salin URL tersebut.
2. Di folder root proyek frontend Next.js Anda, buat file `.env.local` (jika belum ada) dan tambahkan baris berikut:
   ```env
   NEXT_PUBLIC_CHATBOT_API_URL=https://your-backend.onrender.com/api/chat
   ```
3. Jika Anda menjalankan frontend secara lokal, Anda bisa mengosongkan nilai ini atau mengisinya dengan default:
   ```env
   NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:8000/api/chat
   ```
4. Di dashboard Vercel untuk deployment frontend Anda, masuk ke **Settings > Environment Variables**, lalu tambahkan `NEXT_PUBLIC_CHATBOT_API_URL` dengan URL backend cloud Anda agar chatbot bekerja secara langsung di website produksi.
