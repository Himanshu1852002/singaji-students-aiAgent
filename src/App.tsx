import React, { useState } from 'react';
import { Header } from './components/Header';
import { PaperGeneratorTab } from './components/PaperGeneratorTab';
import { AgentChatTab } from './components/AgentChatTab';
import { SyllabusTab } from './components/SyllabusTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<'paper' | 'chat' | 'syllabus'>('paper');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'paper' && <PaperGeneratorTab />}
        {activeTab === 'chat' && <AgentChatTab />}
        {activeTab === 'syllabus' && <SyllabusTab />}
      </main>

      {/* Footer (Hidden when printing paper) */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Sant Singaji Institute of Science and Management (SSISM) Sandalpur • IT Department
          </span>
          <span className="font-semibold text-slate-700">
            Dedicated Agent for Prof. Himanshu Vishwakarma
          </span>
        </div>
      </footer>
    </div>
  );
}
