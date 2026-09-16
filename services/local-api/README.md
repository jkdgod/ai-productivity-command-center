# Local API Template

This optional FastAPI service provides a local-only API boundary for the web, desktop, or mobile app. It runs on the user's computer and has no database, account system, telemetry, cloud deployment, or external AI routing enabled by default.

## Run locally

```bash
cd services/local-api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8787
```

Open `http://127.0.0.1:8787/docs` for interactive local API documentation.

## External providers

Provider routing is deliberately disabled in this template. If contributors add it, they must keep secrets server-side, require explicit consent for every data submission, validate responses, enforce limits, and document exactly what information leaves the device.
