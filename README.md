# Clinect — ClinicalTrials.gov Clinical Trial Search & Smart Matching (Team Project)

Clinect is an end-to-end data engineering + web application that **extracts clinical trial records from ClinicalTrials.gov**, **cleans/standardizes fields**, and serves **searchable results** through a Flask API and a Next.js UI.  
It also includes a **Smart Match chat** experience powered by a graph-based matching layer + LLM.

## Demo
🎥 Demo video: https://github.com/jadegautier/clinect/blob/main/assets/Clinect%20demo.mp4

## Why this project
Clinical trial data is large, messy, and difficult to navigate. Clinect converts raw API records into structured, analytics-ready documents and enables:
- fast search & filtering
- location-aware recommendations
- graph-based matching between conditions, trials, and eligibility signals
- an assistant-driven “Smart Match” chat flow

## Key Features
- **ETL Pipeline**: Extract → Clean/standardize → Transform → Load
- **Multi-database storage**:
  - **PostgreSQL**: user-facing metadata + structured records
  - **MongoDB**: caching / fast document retrieval
  - **Neo4j**: graph relationships for matching
- **Flask API**: search, recommendations, chat endpoints
- **Next.js UI**: search, results, smart match chat

## Architecture (high level)
ClinicalTrials.gov API  
→ ETL (Python)  
→ PostgreSQL + MongoDB + Neo4j  
→ Flask API (search / recommendations / chat)  
→ Next.js Frontend

## Tech Stack
**Backend**: Python, Flask  
**Databases**: PostgreSQL, MongoDB, Neo4j  
**Frontend**: Next.js, TypeScript  
**Infra**: Docker (for local DBs), REST APIs  
**LLM**: Google Gemini (Smart Match chat)

## Repository Structure
- `/frontend` — Next.js UI (search, filters, results, smart match chat)
- `/backend` — Flask API + ETL + database integration

## Running Locally (Quick Start)

### Prerequisites
- Node.js (18+ recommended)
- Python (3.10+ / 3.11 recommended)
- Docker (recommended for databases)

### 1) Start databases
> If you use Docker, start the DB containers (Postgres / MongoDB / Neo4j).  
(See `docker-compose.yml` if included, or your DB setup instructions.)

### 2) Backend
```bash```
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Environment
cp .env.example .env  # if provided
# Set GEMINI_API_KEY if you use chat locally

# Run API
flask --app app run --port 5001

3) Run ETL (populate DBs)

Run the ETL entrypoint used in this repo (see /backend for the script/command).

4) Frontend
cd frontend
npm install

# Environment
cp .env.example .env.local  # if provided
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5001

npm run dev


Open: http://localhost:3000

Environment Variables

Backend (example):

GEMINI_API_KEY — required for Smart Match chat (Gemini)

DEMO_MODE — when true, runs without external auth integrations (useful for demos)

(optional) Firebase service account variables if enabled

Frontend (example):

NEXT_PUBLIC_API_BASE_URL — base URL for Flask API (e.g., http://localhost:5001)

Demo Mode Notes

When DEMO_MODE=true, some features may be intentionally disabled (ex: persistent auth / saving trials) to keep the local demo lightweight and reproducible.

Troubleshooting

zsh: command not found: python → use python3 and ensure your venv is activated

Port issues → confirm backend is running on the port your frontend expects (NEXT_PUBLIC_API_BASE_URL)

CORS/cookies → run frontend on localhost:3000 and backend on localhost:5001
