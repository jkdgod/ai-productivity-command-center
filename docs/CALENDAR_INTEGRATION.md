# Calendar Integration Design

Calendar integration is intentionally opt-in and confirmation-first. OAuth credentials are not included in this repository.

## Required interaction

1. User selects tasks to propose as time blocks.
2. App displays event title, calendar, start time, end time, timezone, notes, and invitees.
3. User explicitly confirms the exact events.
4. App creates only the confirmed events.
5. App displays a success/failure result and retains no calendar token outside approved secure storage.

## Safety rules

- Never create events silently.
- Never invite participants without explicit review.
- Use least-privilege OAuth scopes.
- Separate personal and organizational calendars.
- Provide disconnect, export, and delete controls.
- Do not submit confidential task content to an external AI provider just to schedule it.

## Local interface contract

```json
{
  "calendar_id": "user-selected",
  "events": [{
    "title": "Finish project proposal",
    "start": "2026-09-16T09:00:00-05:00",
    "end": "2026-09-16T10:00:00-05:00",
    "timezone": "America/Chicago"
  }],
  "requires_user_confirmation": true
}
```
