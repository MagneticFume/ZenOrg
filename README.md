<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>ZenOrg — README</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0d0f11;
    --surface: #161a1e;
    --border: #252b32;
    --text: #e2e8ef;
    --muted: #6b7885;
    --accent: #4f9cf9;
    --accent2: #a78bfa;
    --green: #4ade80;
    --orange: #fb923c;
    --red: #f87171;
    --mono: 'JetBrains Mono', monospace;
    --sans: 'Syne', sans-serif;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--mono);
    font-size: 14px;
    line-height: 1.7;
    min-height: 100vh;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  .wrap {
    max-width: 820px;
    margin: 0 auto;
    padding: 48px 24px 80px;
    position: relative;
    z-index: 1;
  }

  .header {
    border-bottom: 1px solid var(--border);
    padding-bottom: 32px;
    margin-bottom: 40px;
  }

  .breadcrumb {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 20px;
    letter-spacing: 0.04em;
  }

  .breadcrumb a { color: var(--accent); text-decoration: none; }
  .breadcrumb a:hover { text-decoration: underline; }
  .breadcrumb span { margin: 0 6px; }

  .project-name {
    font-family: var(--sans);
    font-size: 42px;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 12px;
    background: linear-gradient(135deg, var(--text) 40%, var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tagline {
    color: var(--muted);
    font-size: 13px;
    margin-bottom: 20px;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--muted);
    font-family: var(--mono);
    letter-spacing: 0.03em;
  }

  .badge .dot { width: 6px; height: 6px; border-radius: 50%; }
  .badge.platform .dot { background: var(--accent); }
  .badge.lang .dot { background: var(--orange); }
  .badge.license .dot { background: var(--green); }
  .badge.deps .dot { background: var(--accent2); }
  .badge.vibe .dot { background: var(--red); }

  section { margin-bottom: 40px; }

  .section-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  p { color: #9aa5b4; margin-bottom: 12px; }

  .notice {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 3px solid var(--orange);
    border-radius: 6px;
    padding: 14px 18px;
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 10px;
    line-height: 1.8;
  }

  .notice strong { color: var(--orange); font-weight: 500; }

  .notice.info {
    border-left-color: var(--accent);
  }

  .notice.info strong { color: var(--accent); }

  .feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .feature-card { background: var(--surface); padding: 20px; }
  .feature-card:hover { background: #1c2028; }

  .feature-card .icon { font-size: 18px; margin-bottom: 10px; display: block; }

  .feature-card h3 {
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--text);
    letter-spacing: 0.01em;
  }

  .feature-card ul { list-style: none; color: var(--muted); font-size: 12px; }

  .feature-card ul li {
    padding: 2px 0;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }

  .feature-card ul li::before {
    content: '›';
    color: var(--accent);
    flex-shrink: 0;
    margin-top: 1px;
  }

  .stack-row {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .stack-item { background: var(--surface); padding: 14px 18px; font-size: 13px; }

  .stack-item.label {
    color: var(--muted);
    font-size: 12px;
    border-right: 1px solid var(--border);
  }

  .stack-item.value { color: var(--text); }

  .stack-item .tag {
    display: inline-block;
    background: rgba(79, 156, 249, 0.1);
    color: var(--accent);
    border: 1px solid rgba(79, 156, 249, 0.25);
    border-radius: 3px;
    padding: 1px 7px;
    font-size: 11px;
    margin: 2px 3px 2px 0;
  }

  .tree {
    background: #0a0c0e;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px 24px;
    font-size: 12.5px;
    color: #9aa5b4;
    line-height: 2;
  }

  .tree .dir { color: var(--accent); }
  .tree .file { color: #9aa5b4; }
  .tree .comment { color: #4b5563; }

  .constraints {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .constraint-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 10px 14px;
    font-size: 12px;
    color: var(--muted);
  }

  .constraint-item .check { color: var(--green); font-size: 14px; flex-shrink: 0; }

  .status-grid { display: flex; gap: 10px; flex-wrap: wrap; }

  .status-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 12px;
    border: 1px solid;
  }

  .status-pill.applied   { background: rgba(79,156,249,0.08); border-color: rgba(79,156,249,0.3); color: var(--accent); }
  .status-pill.interview { background: rgba(251,146,60,0.08); border-color: rgba(251,146,60,0.3); color: var(--orange); }
  .status-pill.rejected  { background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.3); color: var(--red); }
  .status-pill.offer     { background: rgba(74,222,128,0.08); border-color: rgba(74,222,128,0.3); color: var(--green); }

  .footer {
    border-top: 1px solid var(--border);
    padding-top: 28px;
    margin-top: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--muted);
    font-size: 12px;
  }

  .footer a { color: var(--accent); text-decoration: none; }

  @media (max-width: 600px) {
    .feature-grid { grid-template-columns: 1fr; }
    .constraints  { grid-template-columns: 1fr; }
    .stack-row { grid-template-columns: 1fr; }
    .stack-item.label { border-right: none; border-bottom: 1px solid var(--border); }
    .project-name { font-size: 30px; }
  }
</style>
</head>
<body>
<div class="wrap">

  <header class="header">
    <div class="breadcrumb">
      <a href="#">MagneticFume</a>
      <span>/</span>
      <a href="#">ZenOrg</a>
    </div>

    <div class="project-name">ZenOrg</div>
    <p class="tagline">Minimal notes &amp; internship tracker — React Native + Expo</p>

    <div class="badges">
      <div class="badge platform"><span class="dot"></span>Android</div>
      <div class="badge lang"><span class="dot"></span>JavaScript</div>
      <div class="badge deps"><span class="dot"></span>Expo Managed</div>
      <div class="badge license"><span class="dot"></span>MIT</div>
      <div class="badge vibe"><span class="dot"></span>Vibe Coded</div>
    </div>
  </header>

  <section>
    <div class="section-label">about</div>
    <p>
      ZenOrg is a lightweight dual-purpose productivity app. One tab for notes, one tab for tracking internship applications — nothing more, nothing less. Built with a deliberately small dependency footprint on React Native + Expo.
    </p>

    <div class="notice">
      <strong>⚡ Vibe coded project.</strong> This app was built through iterative AI-assisted development. A bug-free experience is not guaranteed. Use at your own discretion.
    </div>

    <div class="notice info">
      <strong>🚧 Feature updates paused.</strong> New features will be added after completing React JS fundamentals. The current build is stable enough for everyday use.
    </div>
  </section>

  <section>
    <div class="section-label">install</div>
    <p style="color: var(--muted); font-size: 13px;">
      A pre-built APK is available in the <a href="#" style="color: var(--accent); text-decoration: none;">Releases</a> tab. Download and sideload directly onto your Android device — no build setup required.
    </p>
  </section>

  <section>
    <div class="section-label">features</div>
    <div class="feature-grid">

      <div class="feature-card">
        <span class="icon">📝</span>
        <h3>Notes</h3>
        <ul>
          <li>Create, edit, delete notes</li>
          <li>Title + content preview on home screen</li>
          <li>Long press to delete</li>
          <li>Persisted with AsyncStorage</li>
        </ul>
      </div>

      <div class="feature-card">
        <span class="icon">💼</span>
        <h3>Internship Tracker</h3>
        <ul>
          <li>Company, role, portal, date fields</li>
          <li>Status tracking: Applied → Offer</li>
          <li>Inline notes per application</li>
          <li>Tap to edit, long press to delete</li>
        </ul>
      </div>

      <div class="feature-card">
        <span class="icon">🎨</span>
        <h3>Design</h3>
        <ul>
          <li>Bottom tab navigation</li>
          <li>Status-based color coding</li>
          <li>Calm whites/greys palette</li>
          <li>Tabs hidden during editing</li>
        </ul>
      </div>

      <div class="feature-card">
        <span class="icon">⚙️</span>
        <h3>Animations</h3>
        <ul>
          <li>React Native Animated API only</li>
          <li>Card delete animations</li>
          <li>Smooth screen transitions</li>
          <li>No external animation libs</li>
        </ul>
      </div>

    </div>
  </section>

  <section>
    <div class="section-label">tech stack</div>
    <div class="stack-row">
      <div class="stack-item label">Framework</div>
      <div class="stack-item value">
        <span class="tag">React Native</span>
        <span class="tag">Expo (Managed)</span>
      </div>

      <div class="stack-item label">Language</div>
      <div class="stack-item value">
        <span class="tag">JavaScript</span>
        <span class="tag">TypeScript types (index.ts)</span>
      </div>

      <div class="stack-item label">Persistence</div>
      <div class="stack-item value">
        <span class="tag">@react-native-async-storage/async-storage</span>
      </div>

      <div class="stack-item label">Navigation</div>
      <div class="stack-item value">
        <span class="tag">Bottom Tab Navigator</span>
      </div>
    </div>
  </section>

  <section>
    <div class="section-label">project structure</div>
    <div class="tree">
<span class="dir">ZenOrg/</span>
├── <span class="dir">src/</span>
│   ├── <span class="dir">components/</span>
│   │   ├── <span class="file">FAB.tsx</span>              <span class="comment">floating action button</span>
│   │   ├── <span class="file">NoteCard.tsx</span>         <span class="comment">note card + delete</span>
│   │   └── <span class="file">InternshipCard.tsx</span>   <span class="comment">internship card</span>
│   ├── <span class="dir">screens/</span>
│   │   ├── <span class="file">HomeScreen.tsx</span>        <span class="comment">notes list</span>
│   │   ├── <span class="file">EditorScreen.tsx</span>      <span class="comment">note editor</span>
│   │   ├── <span class="file">InternshipsScreen.tsx</span> <span class="comment">applications list</span>
│   │   └── <span class="file">InternshipEditor.tsx</span>  <span class="comment">application form</span>
│   ├── <span class="dir">storage/</span>
│   │   └── <span class="file">storage.ts</span>            <span class="comment">AsyncStorage operations</span>
│   ├── <span class="dir">styles/</span>
│   │   └── <span class="file">theme.ts</span>              <span class="comment">color palette + constants</span>
│   └── <span class="dir">types/</span>
│       └── <span class="file">index.ts</span>              <span class="comment">type definitions</span>
├── <span class="file">App.js</span>                        <span class="comment">root + tab navigation</span>
└── <span class="file">package.json</span></div>
  </section>

  <section>
    <div class="section-label">status colors</div>
    <div class="status-grid">
      <div class="status-pill applied">   ● Applied</div>
      <div class="status-pill interview"> ● Interview</div>
      <div class="status-pill rejected">  ● Rejected</div>
      <div class="status-pill offer">     ● Offer</div>
    </div>
  </section>

  <section>
    <div class="section-label">dependency constraints</div>
    <div class="constraints">
      <div class="constraint-item"><span class="check">✓</span> No react-native-reanimated</div>
      <div class="constraint-item"><span class="check">✓</span> No react-native-gesture-handler</div>
      <div class="constraint-item"><span class="check">✓</span> No rich text editors</div>
      <div class="constraint-item"><span class="check">✓</span> Core Expo-managed deps only</div>
      <div class="constraint-item"><span class="check">✓</span> Minimal dependency footprint</div>
      <div class="constraint-item"><span class="check">✓</span> Native Animated API only</div>
    </div>
  </section>

  <footer class="footer">
    <span>MIT License · <a href="#">MagneticFume</a></span>
    <span style="color: var(--border)">ZenOrg · React Native + Expo</span>
  </footer>

</div>
</body>
</html>