/**
 * Visual design system for the generated PDF. Colors are not decorative: method
 * and status colors map directly to REST semantics (GET/POST/PUT/DELETE,
 * 2xx/4xx/5xx) so the reader can scan the document by color the same way they'd
 * scan the API surface itself.
 */
export const document_css = `
@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Public+Sans:wght@400;500;600;700&family=Spline+Sans+Mono:wght@400;500;600;700&display=swap');

/* ============================================================
   DIRECTION A — EDITORIAL / WARM
   Drop-in replacement for \`document_css\`.
   Warm paper, Spectral display serif, Public Sans body,
   Spline Sans Mono for code/paths. Semantic method + status
   coding preserved (GET blue · POST green · PUT amber ·
   PATCH violet · DELETE red).
   ============================================================ */

:root {
  --paper: #FCFAF5;
  --paper-alt: #F3EEE4;
  --ink: #24201B;
  --ink-mute: #726A5E;
  --ink-soft: #9A9184;
  --hairline: #E2DBCD;
  --hairline-strong: #CFC6B4;
  --accent: #A8442A;      /* warm rust — structural accent, not a semantic code */

  /* Semantic key — distinct hues, matched warmth */
  --c-get:    #1F6F86;    /* blue      */
  --c-post:   #2F7D53;    /* green     */
  --c-put:    #B07813;    /* amber     */
  --c-patch:  #7A519E;    /* violet    */
  --c-delete: #B23A28;    /* red       */
  --c-neutral:#726A5E;    /* gray      */

  --c-get-bg:    #E7EFF2;
  --c-post-bg:   #E7F1EA;
  --c-put-bg:    #F5EDDA;
  --c-patch-bg:  #EFE9F3;
  --c-delete-bg: #F5E5E1;
  --c-neutral-bg:#EEEAE2;
}

* { box-sizing: border-box; }

html, body {
  background: var(--paper);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

body {
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 9pt;
  line-height: 1.5;
  color: var(--ink);
  font-feature-settings: 'kern' 1, 'liga' 1;
  text-rendering: optimizeLegibility;
}

/* ---------- Headings ---------- */
h1, h2, h3, h4, h5, h6 { color: var(--ink); }

h1 {
  font-family: 'Spectral', Georgia, serif;
  font-weight: 600;
  font-size: 2em;
  letter-spacing: -0.01em;
  line-height: 1.1;
  color: var(--accent);
  margin: 1.1em 0 0.5em;
  padding: 0 0 0.28em;
  border-bottom: 1.5px solid var(--hairline-strong);
}
h1:first-child { margin-top: 0; }

h2 {
  font-family: 'Spectral', Georgia, serif;
  font-weight: 600;
  font-size: 1.4em;
  letter-spacing: -0.005em;
  color: var(--ink);
  margin: 1.5em 0 0.3em;
  padding: 0 0 0.15em;
}

/* Endpoint heading: method badge + path + operationId inline */
h3 {
  font-size: 1.05em;
  font-weight: 600;
  color: var(--ink);
  margin: 1.4em 0 0.3em;
  padding: 0.5em 0.7em;
  background: var(--paper-alt);
  border: 1px solid var(--hairline);
  border-left: 3px solid var(--accent);
  border-radius: 5px;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.55em;
}

/* Subsection labels: Request Body / Responses / Parameters */
h4, h5 {
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  font-size: 0.74em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 1.4em 0 0.5em;
  padding: 0 0 0.3em;
  border-bottom: 1px solid var(--hairline);
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.45em;
}
h5 { color: var(--ink-mute); }

h6 {
  font-family: 'Spline Sans Mono', monospace;
  font-size: 0.78em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ink-mute);
  margin: 1em 0 0.3em;
}

p { margin: 0.3em 0 0.8em; }
strong { font-weight: 600; color: var(--ink); }

a {
  color: var(--c-get);
  text-decoration: none;
  border-bottom: 1px solid rgba(31, 111, 134, 0.35);
}

hr {
  border: none;
  border-top: 1px solid var(--hairline);
  margin: 1.6em 0;
}

/* ---------- Inline & block code ---------- */
code {
  font-family: 'Spline Sans Mono', monospace;
  background: var(--paper-alt);
  border: 1px solid var(--hairline);
  border-radius: 4px;
  padding: 0.08em 0.4em;
  font-size: 0.88em;
  color: var(--accent);
}

pre {
  border: 1px solid var(--hairline-strong);
  border-radius: 6px;
  overflow: hidden;
  margin: 0.4em 0 1.2em;
}
/* Leave background/colors to the github-dark highlight theme */
pre code {
  font-family: 'Spline Sans Mono', monospace;
  font-size: 0.86em;
  background: none;
  border: none;
  border-radius: 0;
  padding: 0;
  color: inherit;
}

/* ---------- Tables: dense ledger ---------- */
table {
  border-collapse: collapse;
  width: 100%;
  margin: 0.2em 0 1.2em;
  font-size: 0.92em;
}
table th {
  font-family: 'Spline Sans Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: 0.76em;
  font-weight: 600;
  color: var(--ink-mute);
  background: var(--paper-alt);
  text-align: left;
  padding: 0.45em 0.75em;
  border-bottom: 1.5px solid var(--hairline-strong);
}
table td {
  padding: 0.45em 0.75em;
  border-bottom: 1px solid var(--hairline);
  vertical-align: top;
}
table tr:nth-child(even) td { background: rgba(243, 238, 228, 0.45); }
table td code, table th code {
  background: none;
  border: none;
  padding: 0;
  font-weight: 500;
  color: var(--ink);
}
table ul { margin: 0; padding-left: 1.1em; }
table li { margin: 0.1em 0; }

/* ---------- Method + status badges: the color key ---------- */
.method-badge, .status-badge {
  display: inline-block;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 700;
  font-size: 0.7em;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.28em 0.6em 0.24em;
  border-radius: 4px;
  white-space: nowrap;
  vertical-align: middle;
  line-height: 1;
}
.method-badge { color: #fff; }

.method-get    { background: var(--c-get); }
.method-post   { background: var(--c-post); }
.method-put    { background: var(--c-put); }
.method-patch  { background: var(--c-patch); }
.method-delete { background: var(--c-delete); }

/* Status badges: tinted fill + colored text (softer than solid) */
.status-badge         { background: var(--c-neutral-bg); color: var(--c-neutral); border: 1px solid rgba(0,0,0,0.06); }
.status-success       { background: var(--c-post-bg);   color: var(--c-post); }
.status-warn          { background: var(--c-put-bg);    color: var(--c-put); }
.status-error         { background: var(--c-delete-bg); color: var(--c-delete); }
.status-neutral       { background: var(--c-neutral-bg);color: var(--c-neutral); }

.operation-path {
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  font-size: 0.95em;
  color: var(--ink);
}
.operation-id {
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 400;
  font-size: 0.72em;
  color: var(--ink-soft);
  margin-left: auto;
}

/* ---------- Cover page ---------- */
.cover-eyebrow {
  font-family: 'Spline Sans Mono', monospace;
  font-size: 0.8em;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
}
.cover-title {
  font-family: 'Spectral', Georgia, serif;
  font-weight: 600;
  color: var(--ink);
  font-size: 3.6em;
  line-height: 1.02;
  letter-spacing: -0.015em;
  margin: 0.3em 0 0.25em;
  padding: 0;
  border: none;
}
.cover-subtitle {
  font-family: 'Spectral', Georgia, serif;
  font-style: italic;
  font-size: 1.35em;
  color: var(--ink-mute);
  margin: 0 0 1.6em;
  max-width: 32em;
}
.cover-rule {
  border: none;
  border-top: 1.5px solid var(--hairline-strong);
  margin: 1.6em 0;
}
.cover-legend {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  margin-top: 2.5em;
}
.cover-meta {
  font-family: 'Spline Sans Mono', monospace;
  font-size: 0.78em;
  color: var(--ink-soft);
  margin-top: 1em;
}

.page-break { page-break-after: always; }
`;
