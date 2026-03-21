import React, { useState } from 'react';
import { streamAI } from '../utils/api';
import {
  CODE_DOCUMENTER_PROMPT,
  README_GEN_PROMPT,
  API_DOCS_PROMPT,
  ARCHITECTURE_PROMPT,
  CHANGELOG_PROMPT,
} from '../utils/prompts';

type Tab = 'document' | 'readme' | 'api' | 'arch' | 'changelog';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'document', label: 'Docs', icon: '/**' },
  { id: 'readme', label: 'README', icon: '#' },
  { id: 'api', label: 'API', icon: '{}' },
  { id: 'arch', label: 'Arch', icon: '[]' },
  { id: 'changelog', label: 'Log', icon: '+' },
];

const promptMap: Record<Tab, string> = {
  document: CODE_DOCUMENTER_PROMPT,
  readme: README_GEN_PROMPT,
  api: API_DOCS_PROMPT,
  arch: ARCHITECTURE_PROMPT,
  changelog: CHANGELOG_PROMPT,
};

const placeholderMap: Record<Tab, string> = {
  document: 'Paste code to generate comprehensive documentation...',
  readme: 'Paste project code or describe your project for README generation...',
  api: 'Paste API routes/handlers for API documentation...',
  arch: 'Paste codebase structure or key files for architecture docs...',
  changelog: 'Paste code diff or describe changes for changelog entry...',
};

const SidePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('document');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ tab: Tab; query: string; result: string }[]>([]);

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const res = await streamAI(promptMap[activeTab], input.trim(), (text) => setResult(text));
      setHistory((prev) => [{ tab: activeTab, query: input.trim().slice(0, 60) + '...', result: res }, ...prev.slice(0, 9)]);
    } catch (e: any) {
      setResult('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="h-screen bg-surface flex flex-col font-mono">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/60 to-green-950/60 border-b border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center text-lg font-bold text-white">
            R
          </div>
          <div>
            <h1 className="text-base font-bold text-white">RepoDoc AI</h1>
            <p className="text-[10px] text-slate-400 font-mono">// Advanced Code Documentation</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setResult(''); }}
            className={`flex-1 py-2.5 text-xs font-medium transition-all font-mono ${
              activeTab === tab.id
                ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-950/20'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <span className="text-[10px] mr-1 opacity-60">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-b border-slate-800">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholderMap[activeTab]}
          className="w-full bg-surface-light border border-slate-700 rounded-lg p-3 text-sm text-emerald-300 placeholder-slate-600 resize-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 font-mono"
          rows={5}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); } }}
        />
        <button
          onClick={generate}
          disabled={loading || !input.trim()}
          className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition-all text-sm font-mono"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              generating...
            </span>
          ) : (
            { document: '// Generate Docs', readme: '# Generate README', api: '{} Generate API Docs', arch: '[] Map Architecture', changelog: '+ Generate Changelog' }[activeTab]
          )}
        </button>
      </div>

      {/* Result */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && !result && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="shimmer h-4 rounded" style={{ width: `${90 - i * 12}%` }} />
            ))}
          </div>
        )}
        {result && (
          <div className="bg-surface-light rounded-lg border border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700 bg-surface-lighter/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400 font-mono">
                  {activeTab === 'document' ? 'docs.ts' : activeTab === 'readme' ? 'README.md' : activeTab === 'api' ? 'api-docs.md' : activeTab === 'arch' ? 'architecture.md' : 'CHANGELOG.md'}
                </span>
              </div>
              <button onClick={copyResult} className="text-[10px] text-slate-400 hover:text-emerald-400 transition-colors font-mono">
                [copy]
              </button>
            </div>
            <div className="p-4">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">{result}</pre>
            </div>
          </div>
        )}

        {history.length > 0 && !loading && (
          <div className="mt-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 font-mono">// recent</h3>
            {history.map((item, i) => (
              <button
                key={i}
                onClick={() => { setActiveTab(item.tab); setResult(item.result); }}
                className="w-full text-left mb-2 bg-surface-light/50 hover:bg-surface-light rounded-lg p-2.5 border border-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-900/30 text-emerald-400 px-1.5 py-0.5 rounded font-mono">{item.tab}</span>
                  <span className="text-xs text-slate-400 truncate font-mono">{item.query}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
