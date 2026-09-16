# Security and Privacy

## Never commit

- API keys, passwords, access tokens, or certificates
- Employer, customer, government, controlled, or proprietary information
- Personal, health, financial, calendar, contact, or raw meeting data

## Safe workflow

1. Copy `.env.example` to `.env`.
2. Keep credentials local; `.gitignore` excludes `.env`.
3. Use synthetic examples for demos and testing.
4. Choose `--provider local` to make no network calls.
5. Verify important AI output before acting on it.

If a secret is exposed, revoke or rotate it immediately, remove it from current files and relevant Git history, and review associated account activity.
