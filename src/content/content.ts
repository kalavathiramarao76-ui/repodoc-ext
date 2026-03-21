function createDocsButton(): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = '// Generate Docs';
  btn.id = 'repodoc-docs-btn';
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '999999',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #059669, #10b981)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    boxShadow: '0 4px 20px rgba(5, 150, 105, 0.4)',
    transition: 'all 0.3s ease',
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-2px) scale(1.05)';
    btn.style.boxShadow = '0 6px 25px rgba(5, 150, 105, 0.6)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0) scale(1)';
    btn.style.boxShadow = '0 4px 20px rgba(5, 150, 105, 0.4)';
  });

  btn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openSidePanel' });
  });

  return btn;
}

function isCodeFilePage(): boolean {
  const path = window.location.pathname;
  const codeExtensions = ['.js', '.ts', '.tsx', '.jsx', '.py', '.go', '.rs', '.java', '.rb', '.php', '.c', '.cpp', '.h'];
  return path.includes('/blob/') && codeExtensions.some(ext => path.endsWith(ext));
}

function init() {
  if (document.getElementById('repodoc-docs-btn')) return;
  if (window.location.hostname === 'github.com' && isCodeFilePage()) {
    const btn = createDocsButton();
    document.body.appendChild(btn);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-check on navigation (GitHub uses SPA-style navigation)
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    const existing = document.getElementById('repodoc-docs-btn');
    if (existing) existing.remove();
    init();
  }
}).observe(document.body, { childList: true, subtree: true });
