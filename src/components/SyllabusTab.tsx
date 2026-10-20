import React from 'react';
import { LEVELS } from '../data/curriculum';
import { BookOpen, CheckCircle, XCircle, FileDown, ShieldCheck, GraduationCap, Printer } from 'lucide-react';

export const SyllabusTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-500" />
              BCA Curriculum Matrix & PDF Examination Guidelines (SSISM Sandalpur)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Department of IT & Computer Applications • Curated for Prof. Himanshu Vishwakarma
            </p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-semibold border border-slate-200 self-start sm:self-auto">
            Academic Session 2026-27
          </span>
        </div>

        {/* Level Cards */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Level 1A */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-bold text-xs">
                  Level 1A
                </span>
                <span className="text-xs font-semibold text-blue-900">BCA 1st Year</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Basic Java + Aptitude & Reasoning</h3>
              <p className="text-xs text-slate-600 mb-4">{LEVELS['1A'].description}</p>

              {/* Allowed Topics */}
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Allowed Java Topics:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                    <li>Variables, Data Types, Type Casting</li>
                    <li>Loops (for, while, do-while, nested)</li>
                    <li>1D & 2D Arrays traversal</li>
                    <li>OOP Basics: Classes, Objects, Methods</li>
                    <li>Constructors & Method Overloading</li>
                  </ul>
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Allowed Aptitude Topics:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                    <li>Percentage, Ratio & Proportion</li>
                    <li>Time and Work, Series completion</li>
                    <li>Coding-Decoding & Blood Relations</li>
                    <li>Syllogisms & Direction Sense</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Prohibited Warning */}
            <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900">
              <span className="font-bold flex items-center gap-1 mb-1 text-red-800">
                <XCircle className="w-3.5 h-3.5 text-red-600" />
                Strictly Prohibited in 1A:
              </span>
              <p>NO Collections, NO JDBC, NO DSA (Stacks/Trees/Sorting algorithms), NO MySQL.</p>
            </div>
          </div>

          {/* Level 1B */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/30 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-600 text-slate-950 font-bold text-xs">
                  Level 1B
                </span>
                <span className="text-xs font-semibold text-amber-900">BCA 2nd Year</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Advanced Java + MySQL + Basic DSA + Aptitude</h3>
              <p className="text-xs text-slate-600 mb-4">{LEVELS['1B'].description}</p>

              {/* Allowed Topics */}
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Advanced Java & MySQL:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                    <li>Collections (ArrayList, HashMap, HashSet)</li>
                    <li>JDBC CRUD operations & Exceptions</li>
                    <li>MySQL Joins (INNER, LEFT, RIGHT)</li>
                    <li>Subqueries, GROUP BY, HAVING</li>
                  </ul>
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Basic DSA & Aptitude:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                    <li>Array operations & String matching</li>
                    <li>Linear & Binary Search algorithms</li>
                    <li>Bubble, Selection, Insertion Sort</li>
                    <li>Profit & Loss, Speed-Distance-Time</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Prohibited Warning */}
            <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900">
              <span className="font-bold flex items-center gap-1 mb-1 text-red-800">
                <XCircle className="w-3.5 h-3.5 text-red-600" />
                Strictly Prohibited in 1B:
              </span>
              <p>NO Python, NO Stacks/Queues/Linked Lists implementations, NO Binary Trees.</p>
            </div>
          </div>

          {/* Level 1C */}
          <div className="rounded-xl border border-purple-200 bg-purple-50/30 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-600 text-white font-bold text-xs">
                  Level 1C
                </span>
                <span className="text-xs font-semibold text-purple-900">BCA 3rd Year</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Python + Medium DSA</h3>
              <p className="text-xs text-slate-600 mb-4">{LEVELS['1C'].description}</p>

              {/* Allowed Topics */}
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Python Core & OOP:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                    <li>List/Dict Comprehensions, *args/**kwargs</li>
                    <li>OOP in Python (self, classes, inheritance)</li>
                    <li>File handling with context manager</li>
                    <li>Exception handling (try-except-finally)</li>
                  </ul>
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Medium DSA:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                    <li>Stack (Parentheses matching, Postfix)</li>
                    <li>Queue (Circular Queue, Deque)</li>
                    <li>Singly & Doubly Linked List reversal</li>
                    <li>Recursion (Tower of Hanoi, Fibonacci)</li>
                    <li>Binary Tree Inorder/Preorder/Postorder</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Prohibited Warning */}
            <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900">
              <span className="font-bold flex items-center gap-1 mb-1 text-red-800">
                <XCircle className="w-3.5 h-3.5 text-red-600" />
                Strictly Prohibited in 1C:
              </span>
              <p>NO Java questions, NO MySQL queries, NO general Aptitude questions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Agent Rules Summary & PDF Instructions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Test Paper Guidelines & PDF Export Standards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm">Paper Formatting Rules</span>
            <p>1. <strong>Assumptions First:</strong> Stated in one line before paper (e.g. <em>"Assumption: 20 MCQ, 30 min maan raha hoon."</em>).</p>
            <p>2. <strong>Exact College Header:</strong> Always start with "SANT SINGAJI INSTITUTE OF SCIENCE AND MANAGEMENT", Level, Test, Set, Time, Max Marks, Name, Class, Date.</p>
            <p>3. <strong>Distinct Sets:</strong> When multiple sets are requested, questions in Set A, B, C must be different while maintaining identical difficulty.</p>
            <p>4. <strong>Teacher Answer Key:</strong> Always provided under <em>"Answer Key (sirf teacher ke liye)"</em>, cleanly segregated from student test print.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block text-sm flex items-center gap-1.5">
              <FileDown className="w-4 h-4 text-amber-600" />
              PDF Generation & Printing
            </span>
            <p>1. <strong>Direct Student Paper PDF:</strong> 1-click download producing a clean A4 examination paper without the answer key for distribution to students.</p>
            <p>2. <strong>Teacher Answer Key PDF:</strong> Separate faculty-only PDF containing complete options, solutions, and marking guidelines.</p>
            <p>3. <strong>All Sets Booklet PDF:</strong> Combines multiple sets (Set A, Set B, Set C) into a single unified multi-page PDF.</p>
            <p>4. <strong>High-Resolution Vector Format:</strong> Standardized fonts and margins for physical printing in SSISM exam halls.</p>
          </div>
        </div>

        <div className="mt-4 text-center text-xs italic text-slate-500">
          "Aur sets / changes / difficulty badalni ho to bata dijiye."
        </div>
      </div>
    </div>
  );
};
