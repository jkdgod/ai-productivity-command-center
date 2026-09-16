# Release Checklist

## Before a release

- Run Python tests: `pytest`.
- Build the web app: `cd apps/web && npm install && npm run build`.
- Run secret scanning and review changed files for credentials.
- Review dependency updates and security alerts.
- Test task creation, editing, completion, import, export, and backup restore.
- Test local AI planning and confirm that external-provider UI still requires consent.
- Confirm documentation and changelog entries are accurate.

## Desktop and mobile

- Test on each supported operating system or physical device.
- Verify local storage and backup behavior.
- Confirm no provider keys exist in build artifacts.
- Complete platform signing and store checks only from owner-controlled accounts.

## Release

Use the `Release Checklist` workflow with a semantic version such as `v1.0.0` only after the checks pass.
