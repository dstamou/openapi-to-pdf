/**
 * Visual design system for the generated PDF. Colors are not decorative: method
 * and status colors map directly to REST semantics (GET/POST/PUT/DELETE,
 * 2xx/4xx/5xx) so the reader can scan the document by color the same way they'd
 * scan the API surface itself.
 */
export const document_css = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

:root {
  --paper-alt: #EAEDF1;
  --ink: #14171C;
  --ink-mute: #5B6472;
  --navy: #1E3A5F;
  --green: #1C7A5E;
  --amber: #B5761F;
  --red: #A8331F;
  --hairline: #D7DBE1;
}

* { box-sizing: border-box; }

html, body {
  background: #fff;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

body {
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  font-size: 9pt;
  line-height: 1.4;
  color: var(--ink);
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'IBM Plex Sans Condensed', 'IBM Plex Sans', sans-serif;
  font-weight: 700;
  color: var(--navy);
}

h1 {
  font-size: 1.75em;
  padding: 0 0 0.3em;
  margin: 0.8em 0 0.4em;
  border-bottom: 2px solid var(--navy);
}

h1:first-child { margin-top: 0; }

h2 {
  font-size: 1.25em;
  color: var(--ink);
  padding: 0.6em 0 0.15em;
  margin: 0;
  border-bottom: 1px solid var(--hairline);
}

h3 {
  font-size: 1em;
  color: var(--ink);
  padding: 0.55em 0 0.2em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5em;
}

h4, h5 {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 0.72em;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-mute);
  border-bottom: 1px solid var(--hairline);
  padding: 0.6em 0 0.25em;
  margin: 0 0 0.4em;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4em;
}

h6 {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.78em;
  color: var(--ink-mute);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

p { margin: 0.2em 0 0.7em; }

a {
  color: var(--navy);
  text-decoration: none;
  border-bottom: 1px solid rgba(30, 58, 95, 0.35);
}

/* Inline code in prose keeps a light chip; table code is stripped of it below. */
code {
  font-family: 'IBM Plex Mono', monospace;
  background: var(--paper-alt);
  border: 1px solid var(--hairline);
  border-radius: 3px;
  padding: 0.05em 0.4em;
  font-size: 0.92em;
  color: var(--navy);
}

pre {
  border: 1px solid var(--hairline);
  border-radius: 4px;
}

pre code {
  font-family: 'IBM Plex Mono', monospace;
  border: none;
  border-radius: 4px;
}

/* Tables: hairline ledger style, no heavy grid, no zebra */
table {
  border-collapse: collapse;
  width: 100%;
  margin: 0 0 1em;
  font-size: 0.95em;
}

table th {
  font-family: 'IBM Plex Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.78em;
  font-weight: 600;
  color: var(--ink-mute);
  background: var(--paper-alt);
  text-align: left;
  padding: 0.4em 0.7em;
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
}

table td {
  padding: 0.4em 0.7em;
  border-bottom: 1px solid var(--hairline);
  vertical-align: top;
  background: transparent;
}

table tr { background: transparent; }

table td code, table th code {
  background: none;
  border: none;
  padding: 0;
  font-weight: 600;
}

table ul { margin: 0; padding-left: 1.1em; }
table li { margin: 0.1em 0; }

/* Method + status badges: the document's color key */
.method-badge, .status-badge {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 0.72em;
  letter-spacing: 0.04em;
  color: #fff;
  padding: 0.22em 0.55em;
  border-radius: 3px;
  white-space: nowrap;
  background: var(--ink-mute);
}

.method-get { background: var(--navy); }
.method-post { background: var(--green); }
.method-put { background: var(--amber); }
.method-delete { background: var(--red); }

.status-success { background: var(--green); }
.status-warn { background: var(--amber); }
.status-error { background: var(--red); }
.status-neutral { background: var(--ink-mute); }

.operation-path {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  color: var(--ink);
}

.operation-id {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 400;
  font-size: 0.68em;
  color: var(--ink-mute);
}

/* Cover page */
.cover-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8em;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

.cover-title {
  font-family: 'IBM Plex Sans Condensed', sans-serif;
  font-weight: 700;
  color: var(--navy);
  font-size: 3.2em;
  line-height: 1.05;
  margin: 0.25em 0 0.2em;
  padding: 0;
  border: none;
}

.cover-subtitle {
  font-size: 1.05em;
  color: var(--ink-mute);
  margin: 0 0 2em;
}

.cover-rule {
  border: none;
  border-top: 2px solid var(--navy);
  margin: 1.4em 0;
}

.cover-legend {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  margin-top: 3em;
}

.cover-meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75em;
  color: var(--ink-mute);
  margin-top: 0.6em;
}

.page-break { page-break-after: always; }
`;
