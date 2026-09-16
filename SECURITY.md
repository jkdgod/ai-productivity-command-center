# Security Policy

## Supported versions

The `main` branch receives security fixes while the project is pre-1.0.

## Reporting a vulnerability

Do not open a public issue with vulnerability details, secrets, tokens, or proof-of-concept exploit code. Contact the repository owner privately through the contact method listed on the GitHub profile, including a concise description, affected component, reproduction steps, and impact.

## Secure defaults

- Local planning works without an external network call.
- Browser and mobile clients do not contain provider API keys.
- Provider use requires user-owned credentials and explicit consent.
- Calendar and other external actions must show a preview and require user approval.
- Never commit `.env` files, access tokens, passwords, private certificates, personal data, confidential data, controlled information, or private calendars.

## Disclosure process

The maintainer should acknowledge credible reports, assess impact, prepare a fix, and publish an advisory or release note after remediation where appropriate.
