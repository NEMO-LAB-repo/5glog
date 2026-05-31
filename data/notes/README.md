# Notes

Team notes are source-controlled JSON. Edit these files in a branch and open a GitHub pull request.

## Message Notes

Use `message_notes.json`.

Keys are logcode record ids from `data/generated/logcode_index.json`, for example:

```json
{
  "messages": {
    "0xb821-nr5g-rrc-ota-packet": {
      "notes": [
        {
          "id": "b821-meas-config-note",
          "text": "RRCReconfiguration measConfig controls measurement objects, report configs, and measId mapping.",
          "createdAt": "2026-05-31T00:00:00.000Z"
        }
      ]
    }
  }
}
```

## Field Notes

Use `field_notes.json`.

Keys are field ids from `data/generated/field_index.json`, for example:

```json
{
  "fields": {
    "reportconfigid": {
      "notes": [
        {
          "id": "reportconfigid-meaning",
          "text": "reportConfigId links a measId to an event trigger rule such as eventA3.",
          "createdAt": "2026-05-31T00:00:00.000Z"
        }
      ]
    }
  }
}
```

`author` is optional and currently not shown in the UI.
