import os
from typing import List, Optional, Dict
# pyrefly: ignore [missing-import]
from     fastapi import FastAPI, HTTPException
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from pydantic import BaseModel
# pyrefly: ignore [missing-import]
import chromadb
# pyrefly: ignore [missing-import]
from chromadb.utils import embedding_functions
# pyrefly: ignore [missing-import]
from openai import OpenAI
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Portfolio RAG Chatbot API")

# Configure CORS so the Next.js frontend can access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production to your specific Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------
# Models
# -----------------
class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    sources: List[str]

# -----------------
# Database Setup
# -----------------
# Use a persistent local client for ChromaDB
db_path = os.path.join(os.path.dirname(__file__), "chroma_db")
chroma_client = chromadb.PersistentClient(path=db_path)

# Choose embedding function. If OpenAI API key is present, use OpenAI embedding.
# Otherwise, fall back to Chroma's default local embedding function.
openai_api_key = os.getenv("OPENAI_API_KEY")
if openai_api_key:
    embedding_fn = embedding_functions.OpenAIEmbeddingFunction(
        api_key=openai_api_key,
        model_name="text-embedding-ada-002"
    )
else:
    # Uses Chroma's default local ONNX model
    embedding_fn = embedding_functions.DefaultEmbeddingFunction()

# Create or get collection
collection = chroma_client.get_or_create_collection(
    name="portfolio_context",
    embedding_function=embedding_fn
)

# Predefined portfolio facts to seed ChromaDB if empty
PORTFOLIO_FACTS = [
    {
        "id": "intro",
        "text": "Nurul Hidayatul Hasanah adalah mahasiswa S1 Sistem Informasi di UPN Veteran Jawa Timur dengan ketertarikan kuat pada Business Intelligence, Data Analytics, dan Software Development. Ia memiliki IPK 3.88 dari skala 4.00, menunjukkan komitmen akademis yang sangat baik.",
        "source": "About Me"
    },
    {
        "id": "mindset_roles",
        "text": "Nurul memiliki cara berpikir analitis dan kreatif, memadukan logika dengan design thinking. Target perannya adalah di bidang Data & Business Intelligence (BI), namun ia juga fleksibel untuk peran pengembangan perangkat lunak (software dev) karena memiliki pemahaman lintas disiplin yang unik.",
        "source": "About Me - Strengths"
    },
    {
        "id": "education",
        "text": "Nurul berkuliah di UPN Veteran Jawa Timur mengambil jurusan S1 Sistem Informasi (2022 - Sekarang). Mata kuliah relevan yang diambil meliputi Business Intelligence, Data Analytics, Web Development, dan UI/UX Design.",
        "source": "Education & Coursework"
    },
    {
        "id": "skills_db_bi",
        "text": "Keahlian database dan Business Intelligence (BI) Nurul meliputi: PostgreSQL, MySQL untuk database; Metabase, Power BI, dan Tableau untuk visualisasi dashboard dan Business Intelligence.",
        "source": "Skills - Database & BI"
    },
    {
        "id": "skills_data_eng_dev",
        "text": "Di bidang Data Engineering dan Pemrograman, Nurul memiliki keahlian dalam SQL, ETL, Data Warehouse, OLAP. Bahasa pemrograman yang dikuasai adalah Python, Java, PHP, dan Dart. Framework yang digunakan meliputi Laravel, Next.js, Flutter, dan FastAPI.",
        "source": "Skills - Engineering & Frameworks"
    },
    {
        "id": "skills_tools",
        "text": "Tools dan perangkat lunak lain yang dikuasai oleh Nurul untuk pengembangan dan desain meliputi Pentaho Data Integration (PDI), Docker, Git, Figma, dan FigJam.",
        "source": "Skills - Tools"
    },
    {
        "id": "project_bi_lecturer",
        "text": "Proyek Unggulan: 'BI System for Lecturer Community Service' (Sistem BI Pengabdian Masyarakat Dosen). Ini adalah platform Business Intelligence end-to-end yang mengintegrasikan, memproses, menganalisis, dan memvisualisasikan data kinerja pengabdian masyarakat dosen. Menggunakan desain Kimball Nine-Step Data Warehouse, skema Fact Constellation, pipeline ETL otomatis dengan Pentaho Data Integration, kubus OLAP, dan visualisasi dashboard interaktif di Metabase. Teknologi: PostgreSQL, Pentaho Data Integration, Metabase, Laravel, Next.js, Docker.",
        "source": "Project - BI System"
    },
    {
        "id": "project_furniture",
        "text": "Proyek: 'US Furniture Sales Dashboard'. Merupakan dashboard analisis bisnis untuk mengidentifikasi kinerja penjualan, tren, dan wawasan (insights) dari data ritel furnitur AS menggunakan Power BI, Python, dan Spreadsheet.",
        "source": "Project - Furniture Sales"
    },
    {
        "id": "project_nutrition",
        "text": "Proyek UI/UX: 'Easy Nutrition Mobile App UI/UX'. Sebuah aplikasi mobile kesadaran kesehatan yang dirancang menggunakan metodologi Design Thinking (Empathize, Define, Ideate, Prototype, Test) untuk membantu pengguna melacak dan meningkatkan asupan nutrisi mereka menggunakan Figma dan FigJam.",
        "source": "Project - Easy Nutrition UI/UX"
    },
    {
        "id": "contact_info",
        "text": "Pengunjung dapat menghubungi Nurul Hidayatul Hasanah melalui form kontak di website portofolionya atau mengirimkan pesan langsung untuk kolaborasi proyek, peluang kerja (magang/full-time), atau diskusi seputar data analytics.",
        "source": "Contact"
    }
]

# Populate collection if empty
if collection.count() == 0:
    print("Initializing ChromaDB with portfolio facts...")
    collection.add(
        documents=[fact["text"] for fact in PORTFOLIO_FACTS],
        metadatas=[{"source": fact["source"]} for fact in PORTFOLIO_FACTS],
        ids=[fact["id"] for fact in PORTFOLIO_FACTS]
    )
    print(f"ChromaDB initialized with {collection.count()} facts.")
else:
    print(f"ChromaDB already contains {collection.count()} items.")

# -----------------
# API Endpoints
# -----------------
@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Portfolio Chatbot API is running.",
        "openai_configured": openai_api_key is not None,
        "database_records": collection.count()
    }

@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    user_query = request.message
    
    # 1. Search ChromaDB for relevant context
    results = collection.query(
        query_texts=[user_query],
        n_results=3
    )
    
    # Format the retrieved documents as context
    retrieved_docs = results.get("documents", [[]])[0]
    retrieved_metadatas = results.get("metadatas", [[]])[0]
    
    context = "\n".join([
        f"- [Sumber: {meta.get('source', 'Umum')}] {doc}"
        for doc, meta in zip(retrieved_docs, retrieved_metadatas)
    ])
    
    sources = list(set([meta.get('source', 'Umum') for meta in retrieved_metadatas]))
    
    # 2. Call OpenAI API if configured, otherwise provide standard fallback
    if not openai_api_key:
        # Fallback response for testing locally without an OpenAI key
        fallback_reply = (
            f"Halo! Server Chatbot RAG aktif. Namun, kunci API OpenAI (`OPENAI_API_KEY`) belum dikonfigurasi di server backend.\n\n"
            f"Berikut adalah informasi relevan yang saya temukan dari database lokal saya:\n"
            f"{context}\n\n"
            f"Silakan tambahkan `OPENAI_API_KEY` di file `.env` di backend untuk mengaktifkan respons LLM yang lebih natural."
        )
        return ChatResponse(reply=fallback_reply, sources=sources)
        
    try:
        client = OpenAI(api_key=openai_api_key)
        
        # Build prompt with retrieved context
        system_prompt = (
            "Anda adalah asisten AI personal untuk portofolio Nurul Hidayatul Hasanah.\n"
            "Tugas Anda adalah menjawab pertanyaan pengunjung website tentang profil, keahlian, pendidikan, dan proyek Nurul.\n"
            "Gunakan informasi konteks berikut untuk menjawab pertanyaan. Jika informasi tidak ada di konteks, jawablah secara sopan bahwa Anda tidak mengetahuinya tetapi pengunjung bisa menghubungi Nurul langsung melalui form kontak.\n"
            "Jawablah dengan gaya bahasa yang profesional, ramah, dan membantu dalam bahasa Indonesia.\n\n"
            "Konteks Data Portofolio:\n"
            f"{context}"
        )
        
        # Prepare messages including chat history if available
        messages = [{"role": "system", "content": system_prompt}]
        
        # Append history (limit to last 6 messages to keep context concise)
        if request.history:
            for msg in request.history[-6:]:
                messages.append({"role": msg.role, "content": msg.content})
                
        # Append latest user message
        messages.append({"role": "user", "content": user_query})
        
        # Execute chat completion
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        reply = completion.choices[0].message.content
        return ChatResponse(reply=reply, sources=sources)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan saat memanggil OpenAI API: {str(e)}")

if __name__ == "__main__":
    # pyrefly: ignore [missing-import]
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
