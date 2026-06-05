@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Outfit", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --color-telus-purple: #4B286D;
  --color-telus-purple-hover: #3e205c;
  --color-telus-green: #2B8000;
  --color-telus-green-hover: #206000;
}

body {
  background-color: #f8fafc;
  color: #0f172a;
  font-family: var(--font-sans);
}
