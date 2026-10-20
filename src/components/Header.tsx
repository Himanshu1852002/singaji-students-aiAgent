import React from 'react';
import { GraduationCap, FileText, Bot, BookOpen, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'paper' | 'chat' | 'syllabus';
  setActiveTab: (tab: 'paper' | 'chat' | 'syllabus') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-lg no-print">
      {/* Top institution bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center shadow-md shadow-orange-950/40 ring-2 ring-amber-400/30">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-amber-300 font-serif">
              SANT SINGAJI INSTITUTE OF SCIENCE AND MANAGEMENT
            </h1>
            <p className="text-xs text-slate-300 flex items-center gap-2">
              <span>Department of Information Technology & BCA</span>
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Himanshu Vishwakarma Sir Portal
              </span>
            </p>
          </div>
        </div>

        {/* Right Info Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto text-xs bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-slate-300">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>BCA Exam Portal: <strong className="text-white">Level 1A / 1B / 1C</strong></span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto space-x-1 sm:space-x-3 py-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('paper')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'paper'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Test Paper Generator & PDF Download</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Agent Chat Cockpit</span>
          </button>

          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'syllabus'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Levels & Syllabus Rules</span>
          </button>
        </div>
      </div>
    </header>
  );
};
