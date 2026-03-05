# 🎬 Moviez

A full-stack movie discovery platform combining **semantic search**, **AI-powered recommendations**, and **modern streaming UI**. Search for movies by natural language descriptions, discover similar titles using embeddings, and browse curated content with TMDB metadata.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Python](https://img.shields.io/badge/Python-3.9+-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-009688?logo=fastapi)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)

## 📸 Screenshot

<p align="center">
  <img src="./frontend/assets/moviz-preview.png" width="80%" alt="Moviez Preview" />
</p>

## ✨ Features

### 🔍 Smart Discovery
- **Semantic Search**: Find movies by natural language descriptions
  - "Show me adventure movies with magical worlds"
  - "Find movies about friendship and personal growth"
- **Similarity Search**: Get recommendations based on any movie
- **Semantic Clusters**: Movies grouped by thematic semantic IDs

### 🎥 Content Browsing
- **Featured Content**: Hero banner with trailers
- **Genre Navigation**: Browse by genre with live pagination
- **Trending & Top-Rated**: Charts and rankings from TMDB
- **Responsive Design**: Glass-morphism UI on all devices

### 🤖 ML-Powered Recommendations
- **Pre-computed Embeddings**: 87K+ movies with all-mpnet-base-v2 embeddings
- **Cosine Similarity**: Fast k-nearest neighbor recommendations
- **Semantic ID Clustering**: Thematic movie grouping
- **Interactive Visualizations**: t-SNE embedding space exploration

### 🔐 User Features
- **Authentication**: Login & signup with account management
- **Guest Mode**: Browse without authentication
- **User Library**: Save favorites and watchlist

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router, Server Components, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Data Fetching**: Server-side with SWR for real-time updates

### Backend
- **Runtime**: Python 3.9+
- **Framework**: FastAPI
- **TMDB Integration**: REST API proxy with caching
- **Authentication**: JWT tokens

### ML/Recommender
- **Embeddings**: all-mpnet-base-v2 (768-dim vectors)
- **Dataset**: 87.5K movies with pre-computed embeddings
- **Similarity**: Cosine distance with NumPy/scikit-learn
- **Analysis**: pandas, scikit-learn, matplotlib

## 📁 Project Structure

```
moviez/
├── frontend/                     # Next.js application
│   ├── src/
│   │   ├── app/                 # App Router (pages, layouts, API)
│   │   ├── components/          # React components
│   │   ├── lib/
│   │   │   ├── api/            # TMDB client
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   └── types/          # TypeScript definitions
│   │   └── features/           # Feature-based organization
│   ├── public/                 # Static assets
│   └── package.json
│
├── backend/                      # FastAPI server
│   ├── main.py                 # App entry point
│   ├── tmdb_proxy.py          # TMDB API wrapper
│   ├── routes/                # API route handlers
│   │   ├── auth.py           # Authentication
│   │   ├── movies.py         # Movie endpoints
│   │   ├── data.py           # Data endpoints
│   │   └── ...
│   └── requirements.txt
│
├── recommender/                  # ML recommendation system
│   ├── notebook/               # Jupyter analysis notebooks
│   │   ├── data_exploration.ipynb
│   │   ├── sentiment_analysis.ipynb
│   │   └── vector_search.ipynb
│   ├── data/
│   │   ├── raw/               # Original datasets
│   │   └── processed/         # Cleaned data
│   ├── models/                # Pre-trained models
│   ├── scripts/               # Training & processing scripts
│   └── requirements.txt
│
└── docker-compose.yml          # Multi-container setup
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (frontend)
- Python 3.9+ (backend & recommender)
- TMDB API key ([get it free](https://www.themoviedb.org/settings/api))

### Option 1: Docker Compose (Recommended)
```bash
# Clone and setup
git clone https://github.com/lilswapnil/moviez.git
cd moviez

# Configure environment (single .env at project root - used by frontend and backend)
cp .env.example .env
# Edit .env and add your TMDB_API_KEY

# Start all services
docker compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- API Docs: http://localhost:8001/docs

### Option 2: Local Development

Both frontend and backend read from the **root `.env`** file. Create it once at project root:

```bash
cp .env.example .env
# Edit .env and add TMDB_API_KEY, BACKEND_URL, etc.
```

#### Backend (start first)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# Server runs on http://localhost:8000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000 (reads BACKEND_URL from root .env)
```

#### Recommender (Analysis)
```bash
cd recommender
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

jupyter notebook notebook/
```

## 🔌 API Endpoints

### Frontend Public Routes
- `/` - Home with featured content
- `/browse` - Browsable content library
- `/search` - Search movies
- `/browse/[genre]` - Genre-specific browsing
- `/details/[id]` - Movie details page
- `/login` - Authentication page

### Backend REST API

```python
# Requires TMDB_API_KEY in Authorization header

GET  /api/v1/health           # Health check
GET  /api/v1/data/?category=trending&page=1  # Chart data
GET  /api/v1/search?query=avatar              # Search movies
GET  /api/v1/movies/{id}                      # Movie details
GET  /api/v1/genres                           # All genres
GET  /api/v1/charts                           # Chart listings

POST /api/v1/auth/login       # Login user
POST /api/v1/auth/signup      # Register user
```

### Recommender (Python SDK)

```python
from recommender.vectors import SemanticSearch
from sklearn.metrics.pairwise import cosine_similarity

# Load embeddings
embeddings = np.array(df['all_mpnet_base_v2_embedding'].tolist())

# Find similar movies
def find_similar(title, n=5):
    idx = df[df['title'] == title].index[0]
    sims = cosine_similarity([embeddings[idx]], embeddings)[0]
    return df.iloc[np.argsort(sims)[::-1][1:n+1]]

# Semantic search by natural language
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-mpnet-base-v2')
query_vec = model.encode("friend adventure magic")
similarities = cosine_similarity([query_vec], embeddings)[0]
```

## 🎓 ML Capabilities

### Semantic Search
- Encode natural language queries to embeddings
- Find movies matching descriptions, moods, themes
- Zero-shot classification without training data

### Similarity Recommendations
- Fast k-NN using cosine similarity
- Efficient vector operations with NumPy
- Scales to 87K+ movies

### Embedding Analysis
- t-SNE visualization of embedding space
- Genre clustering analysis
- Thematic grouping via semantic IDs

### Usage Example
See [`recommender/notebook/TMD/data_exploration.ipynb`](recommender/notebook/TMD/data_exploration.ipynb) for:
- Loading 87.5K pre-computed embeddings
- Semantic search implementation
- Visualization of thematic clusters
- Similarity-based recommendations

## 🔐 Environment Variables

All variables go in **one file**: `.env` at the project root. Both frontend and backend read from it.

```bash
# Copy .env.example to .env at project root
cp .env.example .env

# Required
TMDB_API_KEY=your_tmdb_api_key
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Optional
# TMDB_BEARER_TOKEN=
# DATABASE_URL=postgresql://user:pass@localhost/moviez
# JWT_SECRET=your_jwt_secret
```

## 📊 Performance Metrics

### Frontend
- ⚡ Server-side rendering for fast LCP
- 🔄 ISR for static content caching
- 📦 Code splitting & lazy loading
- 🖼️ Next.js Image optimization

### Backend
- 🚀 FastAPI async/await for concurrency
- 💾 TMDB response caching
- 📈 Pagination for large datasets
- 🔐 JWT authentication

### Recommender
- ⚡ NumPy vectorized operations
- 🎯 Pre-computed embeddings (no training)
- 🔍 O(n) similarity search
- 📉 Memory-efficient sparse matrices

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile: iOS Safari, Chrome Android

## 🚀 Deployment

### Vercel (frontend only)

1. **Deploy to Vercel** (Root Directory = `frontend`).
2. **Set `TMDB_API_KEY`** in Vercel (Project Settings → Environment Variables). [Get a free key](https://www.themoviedb.org/settings/api).
3. Next.js API routes call TMDB directly – no separate backend needed.

### Optional: external backend (Railway / Render / Fly.io)

If you prefer the Python backend:

1. Deploy the backend and add `TMDB_API_KEY` there.
2. In Vercel, set `BACKEND_URL` and `NEXT_PUBLIC_BACKEND_URL` to your backend URL.
3. Rewrites will proxy `/api/v1/*` to the backend instead of the Next.js routes.

### Self-hosted
```bash
# All services via Docker Compose
docker compose up --build -d
```

### Cloud Providers
- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: Railway, Heroku, AWS EC2
- **ML**: Can run on backend or separate service (GPU if needed)

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Submit PR

### Development Tips
- Frontend uses TypeScript strict mode
- Backend follows FastAPI best practices
- Notebooks require Jupyter environment
- All ML work uses scikit-learn conventions

## 📚 Documentation

- **Frontend**: See [frontend/README.md](frontend/README.md)
- **Backend**: See [backend/README.md](backend/README.md)
- **ML Analysis**: See [recommender/notebook/](recommender/notebook/)
- **API Docs**: http://localhost:8000/docs (when backend running)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) - Movie data & metadata
- [Hugging Face](https://huggingface.co/) - MovieLens-32M dataset
- [SentenceTransformers](https://www.sbert.net/) - all-mpnet-base-v2 embeddings
- [Next.js](https://nextjs.org/) - Frontend framework
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
- [scikit-learn](https://scikit-learn.org/) - ML utilities

## 📞 Support & Links

- 🐛 [Report Issues](../../issues)
- 💬 [Discussions](../../discussions)
- 🎬 [View Live](https://moviez.vercel.app)
- 📧 Contact: [lilswapnil](https://github.com/lilswapnil)

---

<div align="center">
  Made with ❤️ | Discover movies intelligently with semantic search & embeddings
</div>
