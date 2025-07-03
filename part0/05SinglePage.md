```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User navigates to https://studies.cs.helsinki.fi/exampleapp/spa

    browser->>server: GET /exampleapp/spa
    activate server
    server-->>browser: HTML shell (single-page app)
    deactivate server

    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: CSS stylesheet
    deactivate server

    browser->>server: GET /exampleapp/spa.js
    activate server
    server-->>browser: JavaScript bundle
    deactivate server

    Note over browser: spa.js runs in the browser and requests note data

    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: Notes as JSON
    deactivate server

    Note over browser: JavaScript renders the notes list in the DOM
