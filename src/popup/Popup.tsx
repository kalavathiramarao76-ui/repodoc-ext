import React, { useState } from 'react';
import { callAI } from '../utils/api';
import { QUICK_DOC_PROMPT } from '../utils/prompts';

const Popup: React.FC = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const res = await callAI(QUICK_DOC_PROMPT, code.trim());
      setResult(res);
    } catch (e: any) {
      setResult('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
  };

  const openSidePanel = () => {
    chrome.runtime.sendMessage({ action: 'openSidePanel' });
  };

  return (
    <div className="w-[400px] min-h-[500px] bg-surface p-4 flex flex-col font-mono">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center text-xl font-bold text-white">
          R
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">RepoDoc AI</h1>
          <p className="text-xs text-slate-400 font-mono">Code Documentation Engine</p>
        </div>
        <button
          onClick={openSidePanel}
          className="ml-auto text-xs bg-surface-light hover:bg-surface-lighter text-emerald-400 px-3 py-1.5 rounded-lg transition-colors font-mono"
        >
          Full Panel
        </button>
      </div>

      {/* Input */}
      <div className="mb-3">
        <label className="text-xs text-slate-400 mb-1 block font-mono">Paste Function / Code</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={"function calculateTotal(items, tax) {\n  const subtotal = items.reduce((sum, i) => sum + i.price, 0);\n  return subtotal * (1 + tax);\n}"}
          className="w-full bg-surface-light border border-slate-700 rounded-lg p-3 text-sm text-emerald-300 placeholder-slate-600 resize-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
          rows={4}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); } }}
        />
      </div>

      <button
        onClick={generate}
        disabled={loading || !code.trim()}
        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-all pulse-green text-sm font-mono"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Generating JSDoc...
          </span>
        ) : '// Generate Docs'}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-3 flex-1 bg-surface-light rounded-lg border border-slate-700 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700 bg-surface-lighter/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400 font-mono">output.jsdoc</span>
            </div>
            <button onClick={copyResult} className="text-[10px] text-slate-400 hover:text-emerald-400 transition-colors font-mono">
              copy
            </button>
          </div>
          <div className="p-3 overflow-y-auto max-h-[220px]">
            <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">{result}</pre>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {['README Gen', 'API Docs', 'Architecture'].map((label) => (
          <button
            key={label}
            onClick={openSidePanel}
            className="text-[10px] bg-surface-light hover:bg-surface-lighter text-slate-400 hover:text-emerald-400 py-2 rounded-lg transition-colors border border-slate-700/50 font-mono"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800 text-center">
        <span className="text-[10px] text-slate-600 font-mono">// Powered by RepoDoc AI Engine</span>
      </div>
    </div>
  );
};

export default Popup;
