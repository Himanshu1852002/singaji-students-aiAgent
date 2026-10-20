import React, { useState, useEffect } from 'react';
import { LEVELS } from '../data/curriculum';
import { generateTestPaperSet, GeneratedPaperSet, PaperConfig } from '../utils/paperGenerator';
import { exportPaperToPDF, exportAllSetsToPDF, PDFExportMode } from '../utils/pdfExport';
import {
  FileDown,
  Printer,
  Copy,
  Check,
  Sparkles,
  Layers,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  FileText,
  ChevronDown,
  BookOpen
} from 'lucide-react';

export const PaperGeneratorTab: React.FC = () => {
  const [levelId, setLevelId] = useState<'1A' | '1B' | '1C'>('1A');
  const [topic, setTopic] = useState<string>('Loops and Arrays');
  const [selectedSets, setSelectedSets] = useState<('A' | 'B' | 'C' | 'D')[]>(['A', 'B']);
  const [timeMinutes, setTimeMinutes] = useState<number>(30);
  const [mcqCount, setMcqCount] = useState<number>(8);
  const [mcqMarks, setMcqMarks] = useState<number>(1);
  const [shortCount, setShortCount] = useState<number>(2);
  const [shortMarks, setShortMarks] = useState<number>(2);
  const [codingCount, setCodingCount] = useState<number>(1);
  const [codingMarks, setCodingMarks] = useState<number>(5);

  const [generatedPapers, setGeneratedPapers] = useState<GeneratedPaperSet[]>([]);
  const [activeSetIndex, setActiveSetIndex] = useState<number>(0);
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(true);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);
  const [printMode, setPrintMode] = useState<'paper' | 'key' | 'both'>('paper');

  // Quick preset topic suggestions based on level
  const topicPresets: Record<'1A' | '1B' | '1C', string[]> = {
    '1A': [
      'Loops and Arrays',
      'Java Syntax & Operators',
      'OOP Fundamentals (Classes & Objects)',
      'Aptitude: Percentage, Series & Coding-Decoding',
      'Full Syllabus: Java Basics + Aptitude & Reasoning'
    ],
    '1B': [
      'Collections Framework & JDBC',
      'MySQL Joins and Subqueries',
      'Basic DSA: Sorting & Searching',
      'Exception Handling & Multi-threading',
      'Full Syllabus: Adv Java + MySQL + DSA'
    ],
    '1C': [
      'Python Functions & Comprehensions',
      'Stack & Queue Applications',
      'Singly & Doubly Linked Lists',
      'Recursion & Binary Tree Traversals',
      'Full Syllabus: Python + Medium DSA'
    ]
  };

  const handleLevelChange = (newLevel: '1A' | '1B' | '1C') => {
    setLevelId(newLevel);
    setTopic(topicPresets[newLevel][0]);
  };

  const handleGenerate = () => {
    const config: PaperConfig = {
      levelId,
      topic,
      setLetters: selectedSets.length > 0 ? selectedSets : ['A'],
      timeMinutes,
      totalMarks: mcqCount * mcqMarks + shortCount * shortMarks + codingCount * codingMarks,
      mcqCount,
      mcqMarksEach: mcqMarks,
      shortCount,
      shortMarksEach: shortMarks,
      codingCount,
      codingMarksEach: codingMarks
    };

    const papers = generateTestPaperSet(config);
    setGeneratedPapers(papers);
    setActiveSetIndex(0);
  };

  useEffect(() => {
    handleGenerate();
  }, [levelId]);

  const activePaper = generatedPapers[activeSetIndex] || generatedPapers[0];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  // PDF Export Handlers
  const handleDownloadPDF = (mode: PDFExportMode) => {
    if (!activePaper) return;
    setIsExportingPDF(true);
    try {
      exportPaperToPDF(activePaper, mode);
      const label = mode === 'paper' ? 'Student Paper PDF' : mode === 'key' ? 'Teacher Answer Key PDF' : 'Complete Paper & Key PDF';
      setPdfSuccessMessage(`Downloaded: Set ${activePaper.setLetter} ${label}!`);
      setTimeout(() => setPdfSuccessMessage(null), 3000);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleDownloadAllSetsPDF = () => {
    if (generatedPapers.length === 0) return;
    setIsExportingPDF(true);
    try {
      exportAllSetsToPDF(generatedPapers, 'paper');
      setPdfSuccessMessage(`Downloaded All ${generatedPapers.length} Sets as Booklet PDF!`);
      setTimeout(() => setPdfSuccessMessage(null), 3000);
    } catch (err) {
      console.error('All sets PDF export failed:', err);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handlePrint = (mode: 'paper' | 'key' | 'both') => {
    setPrintMode(mode);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const toggleSetSelection = (setChar: 'A' | 'B' | 'C' | 'D') => {
    if (selectedSets.includes(setChar)) {
      if (selectedSets.length > 1) {
        setSelectedSets(selectedSets.filter((s) => s !== setChar));
      }
    } else {
      setSelectedSets([...selectedSets, setChar].sort());
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm">
                <FileText className="w-4 h-4" />
              </span>
              Test Paper Generator & PDF Publisher (SSISM BCA)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Create standardized multi-set question papers with direct PDF download, print-ready layout, and separate Teacher Answer Keys.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Strict BCA Syllabus Compliance Enforced</span>
          </div>
        </div>

        {/* Level Selector */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['1A', '1B', '1C'] as const).map((lvl) => {
            const def = LEVELS[lvl];
            const isSelected = levelId === lvl;
            return (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-1 ring-amber-400'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {def.code}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">{def.targetClass}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">{def.subjects}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{def.description}</p>
              </button>
            );
          })}
        </div>

        {/* Topic & Preset selection */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Test Topic / Unit Name:
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Loops, Arrays & Logic"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            {/* Quick chips */}
            <div className="pt-1">
              <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">Quick Topic Presets ({levelId}):</span>
              <div className="flex flex-wrap gap-1.5">
                {topicPresets[levelId].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                      topic === t
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sets and Distribution */}
          <div className="lg:col-span-6 space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                Select Sets to Generate:
              </label>
              <span className="text-[11px] text-slate-500">Different questions per set</span>
            </div>
            <div className="flex gap-2">
              {(['A', 'B', 'C', 'D'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSetSelection(s)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    selectedSets.includes(s)
                      ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Set {s}
                </button>
              ))}
            </div>

            {/* Time & Question counts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div>
                <span className="block text-slate-500 mb-1">Time (Min):</span>
                <input
                  type="number"
                  min="10"
                  max="180"
                  value={timeMinutes}
                  onChange={(e) => setTimeMinutes(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white text-center font-bold"
                />
              </div>
              <div>
                <span className="block text-slate-500 mb-1">MCQs (1m):</span>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={mcqCount}
                  onChange={(e) => setMcqCount(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white text-center font-bold"
                />
              </div>
              <div>
                <span className="block text-slate-500 mb-1">Short (2m):</span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={shortCount}
                  onChange={(e) => setShortCount(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white text-center font-bold"
                />
              </div>
              <div>
                <span className="block text-slate-500 mb-1">Coding (5m):</span>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={codingCount}
                  onChange={(e) => setCodingCount(Number(e.target.value))}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white text-center font-bold"
                />
              </div>
            </div>

            {/* Total Marks & Action */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200">
              <span className="text-xs text-slate-600 font-medium">
                Max Marks: <strong>{mcqCount * mcqMarks + shortCount * shortMarks + codingCount * codingMarks}</strong>
              </span>
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg shadow flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Generate Paper Sets
              </button>
            </div>
          </div>
        </div>

        {/* Assumptions banner as required by prompt */}
        {activePaper && (
          <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-950">
            <span className="font-mono font-medium">
              💡 <strong>{activePaper.assumptionText}</strong>
            </span>
            <span className="text-[11px] text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
              Rule: Stated before paper
            </span>
          </div>
        )}
      </div>

      {/* Output / Preview Section */}
      {generatedPapers.length > 0 && activePaper && (
        <div className="space-y-4">
          {/* Top Actions & PDF Download Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 no-print">
            {/* Sets tabs */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Sets:</span>
              <div className="flex gap-1.5">
                {generatedPapers.map((paper, idx) => (
                  <button
                    key={paper.setLetter}
                    onClick={() => setActiveSetIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeSetIndex === idx
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Set {paper.setLetter}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct PDF Download Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* PRIMARY: Download Student Paper PDF */}
              <button
                onClick={() => handleDownloadPDF('paper')}
                disabled={isExportingPDF}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                title="Download Clean Student Test Paper as PDF"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Paper (PDF)</span>
              </button>

              {/* Download Teacher Answer Key PDF */}
              <button
                onClick={() => handleDownloadPDF('key')}
                disabled={isExportingPDF}
                className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                title="Download Teacher Answer Key as PDF"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Answer Key (PDF)</span>
              </button>

              {/* If multiple sets, allow Download All Sets Booklet */}
              {generatedPapers.length > 1 && (
                <button
                  onClick={handleDownloadAllSetsPDF}
                  disabled={isExportingPDF}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  title="Download All Sets in one combined booklet PDF"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>All Sets Booklet (PDF)</span>
                </button>
              )}

              {/* View / Hide Answer key */}
              <button
                onClick={() => setShowAnswerKey(!showAnswerKey)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                {showAnswerKey ? <EyeOff className="w-3.5 h-3.5 text-slate-500" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
                {showAnswerKey ? 'Hide Key' : 'Show Key'}
              </button>

              {/* Copy Paper text */}
              <button
                onClick={() => handleCopy(activePaper.formattedStudentText, 'paper')}
                className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedType === 'paper' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedType === 'paper' ? 'Copied!' : 'Copy'}
              </button>

              {/* Print dialog button */}
              <button
                onClick={() => handlePrint('paper')}
                className="px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-lg flex items-center gap-1 cursor-pointer"
                title="Print or Save as PDF via Browser"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* PDF Download success notification */}
          {pdfSuccessMessage && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between no-print animate-fade-in">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                {pdfSuccessMessage}
              </span>
              <span className="text-[11px] text-emerald-700">Ready to print or share with students</span>
            </div>
          )}

          {/* Printable Sheet View (WYSIWYG College Question Paper) */}
          <div className="bg-white rounded-xl shadow-md border border-slate-300 p-8 sm:p-12 font-serif text-slate-900 max-w-4xl mx-auto print:max-w-none print:shadow-none print:p-0 print:border-none">
            {/* Student Paper View */}
            <div className={printMode === 'key' ? 'hidden print:hidden' : 'block'}>
              {/* Institution Header */}
              <div className="text-center border-b-2 border-slate-900 pb-3 mb-4">
                <h1 className="text-xl sm:text-2xl font-black tracking-wider uppercase">
                  SANT SINGAJI INSTITUTE OF SCIENCE AND MANAGEMENT
                </h1>
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-700 mt-0.5">
                  DEPARTMENT OF COMPUTER APPLICATIONS • BCA PROGRAM
                </p>
                <div className="text-xs sm:text-sm font-bold mt-2 text-slate-800">
                  Level: {activePaper.level.name}
                </div>
                <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-bold mt-2 pt-2 border-t border-slate-400">
                  <span>Test: {activePaper.topic || 'Subject Assessment'}</span>
                  <span>Set: {activePaper.setLetter}</span>
                  <span>Time: {activePaper.timeMinutes} Minutes</span>
                  <span>Max Marks: {activePaper.totalMarks}</span>
                </div>
              </div>

              {/* Student Identification Row */}
              <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-semibold py-2 mb-4 border-b border-dashed border-slate-400 gap-2">
                <div>Name: <span className="inline-block border-b border-slate-900 w-48 sm:w-64"></span></div>
                <div>Class: <span className="font-bold">{activePaper.level.targetClass}</span></div>
                <div>Date: <span className="inline-block border-b border-slate-900 w-24"></span></div>
              </div>

              {/* Instructions */}
              <div className="mb-6 bg-slate-50 print:bg-transparent p-3 rounded border border-slate-200 print:border-none text-xs">
                <span className="font-bold underline block mb-1">Instructions:</span>
                <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
                  {activePaper.instructions.map((ins, idx) => (
                    <li key={idx}>{ins}</li>
                  ))}
                </ol>
              </div>

              {/* Section A: MCQ */}
              {activePaper.mcqQuestions.length > 0 && (
                <div className="mb-8 avoid-break">
                  <div className="bg-slate-100 print:bg-transparent px-2 py-1 font-bold text-xs sm:text-sm uppercase tracking-wide border-y border-slate-400 mb-4 flex justify-between">
                    <span>Section A: Multiple Choice Questions (MCQ)</span>
                    <span>({activePaper.mcqQuestions.length} x {mcqMarks} = {activePaper.mcqQuestions.length * mcqMarks} Marks)</span>
                  </div>

                  <div className="space-y-4">
                    {activePaper.mcqQuestions.map((q, idx) => (
                      <div key={q.id} className="avoid-break text-xs sm:text-sm">
                        <div className="flex gap-2">
                          <span className="font-bold">Q{idx + 1}.</span>
                          <div className="flex-1 whitespace-pre-wrap font-sans leading-relaxed">
                            {q.question}
                          </div>
                        </div>

                        {q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 ml-6 text-xs font-sans">
                            {q.options.map((opt, optIdx) => {
                              const letters = ['(A)', '(B)', '(C)', '(D)'];
                              return (
                                <div key={optIdx} className="flex items-start gap-1.5">
                                  <span className="font-bold text-slate-700">{letters[optIdx]}</span>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section B: Short Answer */}
              {activePaper.shortQuestions.length > 0 && (
                <div className="mb-8 avoid-break">
                  <div className="bg-slate-100 print:bg-transparent px-2 py-1 font-bold text-xs sm:text-sm uppercase tracking-wide border-y border-slate-400 mb-4 flex justify-between">
                    <span>Section B: Short Answer Questions</span>
                    <span>({activePaper.shortQuestions.length} x {shortMarks} = {activePaper.shortQuestions.length * shortMarks} Marks)</span>
                  </div>

                  <div className="space-y-4">
                    {activePaper.shortQuestions.map((q, idx) => (
                      <div key={q.id} className="avoid-break text-xs sm:text-sm">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2 flex-1">
                            <span className="font-bold">Q{idx + 1}.</span>
                            <span className="font-sans leading-relaxed">
                              [{q.topic}] {q.question}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-600 ml-2">[{shortMarks} M]</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section C: Coding / Programs */}
              {activePaper.codingQuestions.length > 0 && (
                <div className="mb-8 avoid-break">
                  <div className="bg-slate-100 print:bg-transparent px-2 py-1 font-bold text-xs sm:text-sm uppercase tracking-wide border-y border-slate-400 mb-4 flex justify-between">
                    <span>Section C: Coding & Algorithmic Programs</span>
                    <span>({activePaper.codingQuestions.length} x {codingMarks} = {activePaper.codingQuestions.length * codingMarks} Marks)</span>
                  </div>

                  <div className="space-y-4">
                    {activePaper.codingQuestions.map((q, idx) => (
                      <div key={q.id} className="avoid-break text-xs sm:text-sm">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2 flex-1">
                            <span className="font-bold">Q{idx + 1}.</span>
                            <span className="font-sans leading-relaxed">
                              <strong className="text-slate-800">[{q.subject} - {q.topic}]:</strong> {q.question}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-600 ml-2">[{codingMarks} M]</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required closing phrase from agent specification */}
              <div className="text-center pt-6 border-t border-slate-200 text-xs italic text-slate-500 no-print">
                "Aur sets / changes / difficulty badalni ho to bata dijiye."
              </div>
            </div>

            {/* TEACHER ANSWER KEY (Cleanly separated) */}
            {showAnswerKey && (
              <div className={`mt-10 pt-8 border-t-4 border-slate-900 ${
                printMode === 'paper' ? 'print:hidden' : 'page-break'
              }`}>
                <div className="bg-amber-100 print:bg-transparent p-4 rounded-lg border border-amber-300 print:border-none mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-amber-950 uppercase tracking-wide flex items-center gap-2">
                        <KeyRound className="w-5 h-5 text-amber-700" />
                        Answer Key (sirf teacher ke liye)
                      </h3>
                      <p className="text-xs text-amber-900 font-sans mt-0.5">
                        Sant Singaji Institute of Science and Management • Level: {activePaper.level.name} • Set: {activePaper.setLetter}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDownloadPDF('key')}
                      className="no-print px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      Download Key PDF
                    </button>
                  </div>
                </div>

                {/* Section A Key */}
                {activePaper.mcqQuestions.length > 0 && (
                  <div className="mb-6 avoid-break font-sans text-xs sm:text-sm">
                    <h4 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-3">
                      Section A: MCQs Correct Options & Solutions
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activePaper.mcqQuestions.map((q, idx) => (
                        <div key={q.id} className="p-2.5 rounded bg-slate-50 print:bg-transparent border border-slate-200 print:border-none">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">Q{idx + 1}:</span>
                            <span className="px-2 py-0.5 bg-emerald-600 text-white font-bold rounded text-xs">
                              Option [{q.correctAnswer}]
                            </span>
                            <span className="text-slate-600 text-xs font-serif">Topic: {q.topic}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 pl-6">
                            <strong>Explanation:</strong> {q.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section B Key */}
                {activePaper.shortQuestions.length > 0 && (
                  <div className="mb-6 avoid-break font-sans text-xs sm:text-sm">
                    <h4 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-3">
                      Section B: Short Answer Solutions & Marking Guide
                    </h4>
                    <div className="space-y-3">
                      {activePaper.shortQuestions.map((q, idx) => (
                        <div key={q.id} className="p-3 rounded bg-slate-50 print:bg-transparent border border-slate-200 print:border-none text-xs">
                          <div className="font-bold text-slate-900 mb-1">Q{idx + 1}. [{q.topic}]</div>
                          <div className="text-slate-800 whitespace-pre-wrap pl-2 border-l-2 border-amber-500 mb-1">
                            {q.correctAnswer}
                          </div>
                          <div className="text-slate-500 italic pl-2">
                            Marking: {q.explanation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section C Key */}
                {activePaper.codingQuestions.length > 0 && (
                  <div className="mb-6 avoid-break font-sans text-xs sm:text-sm">
                    <h4 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-3">
                      Section C: Model Coding Solutions & Syntax Reference
                    </h4>
                    <div className="space-y-4">
                      {activePaper.codingQuestions.map((q, idx) => (
                        <div key={q.id} className="p-3 rounded bg-slate-50 print:bg-transparent border border-slate-200 print:border-none text-xs">
                          <div className="font-bold text-slate-900 mb-2">
                            Q{idx + 1}. [{q.subject} - {q.topic}]
                          </div>
                          <pre className="bg-slate-900 text-amber-200 p-3 rounded font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                            {q.correctAnswer}
                          </pre>
                          <div className="text-slate-600 text-xs mt-1 italic">
                            Logic: {q.explanation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
