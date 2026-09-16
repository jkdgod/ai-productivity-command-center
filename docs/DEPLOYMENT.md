# Deployment Guide

## Free public web demo: GitHub Pages

The repository includes `.github/workflows/pages.yml`. To enable the free public demo:

1. Open the repository's **Settings**.
2. Open **Pages**.
3. Under Build and deployment, choose **GitHub Actions** as the source.
4. Push to `main` or run the `Deploy Web Demo` workflow manually.
5. GitHub will show the resulting public Pages URL in the workflow and Pages settings.

The Pages build is a browser-only local workspace. It does not provide accounts, cloud sync, or browser-side AI keys.

## Local API

Use `services/local-api` only on a device you control. It exposes a local planning endpoint and is configured to bind to `127.0.0.1` by default. Do not expose it publicly without authentication, rate limiting, HTTPS, logging controls, a privacy review, and secure secret storage.

## Desktop and mobile

Desktop installers and app-store releases require platform-specific signing, test devices, and developer accounts. The repository includes source and build scaffolding, but it cannot publish binaries or store releases without those account-owned requirements.

## Launch checklist

- Confirm CI, CodeQL, and dependency review pass.
- Enable GitHub Pages if using the free demo path.
- Test the web app with a fresh browser profile.
- Verify exports and local backups.
- Review the privacy, security, and acceptable-use documentation.
- Do not put provider keys in browser bundles, repository secrets visible to forks, commits, or public issue reports.
