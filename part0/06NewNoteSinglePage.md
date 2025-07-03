```mermaid
sequenceDiagram
    participant browser
    participant server

    %% ----- Client-side actions -----
    Note over browser: User types a note and clicks “Save”
    Note over browser: JavaScript intercepts form submit (preventDefault)
    Note over browser: New note object is added to in-memory list
    Note over browser: DOM immediately updates with the new note

    %% ----- Network round-trip -----
    browser->>server: POST /exampleapp/new_note_spa (JSON payload)
    activate server
    server-->>browser: 201 Created
    deactivate server

    %% ----- End of flow -----
    Note over browser: Browser remains on the same page – no redirect, no reload, no extra requests
