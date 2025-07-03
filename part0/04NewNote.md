```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User submits the form to add a new note

    browser->>server: POST /exampleapp/new_note
    activate server
    server-->>browser: 302 Found — Redirect to /exampleapp/notes
    deactivate server

    Note over browser: Browser follows the redirect and reloads the page

    browser->>server: GET /exampleapp/notes
    activate server
    server-->>browser: HTML content
    deactivate server

    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: CSS styles
    deactivate server

    browser->>server: GET /exampleapp/main.js
    activate server
    server-->>browser: JavaScript logic
    deactivate server

    Note over browser: JavaScript runs and requests the latest notes

    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: Note data in JSON (includes the new note)
    deactivate server

    Note over browser: Browser processes the data and updates the note list