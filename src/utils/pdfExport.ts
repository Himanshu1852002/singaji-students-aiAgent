import { jsPDF } from 'jspdf';
import { GeneratedPaperSet } from './paperGenerator';

export type PDFExportMode = 'paper' | 'key' | 'both';

export function exportPaperToPDF(paper: GeneratedPaperSet, mode: PDFExportMode = 'paper'): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 8) {
      addFooter();
      doc.addPage();
      y = margin;
      drawMiniHeader();
    }
  };

  const addFooter = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      'SANT SINGAJI INSTITUTE OF SCIENCE AND MANAGEMENT • DEPARTMENT OF BCA',
      margin,
      pageHeight - 8
    );
    const pageNum = doc.getNumberOfPages();
    doc.text(`Page ${pageNum}`, pageWidth - margin - 12, pageHeight - 8);
    doc.setTextColor(0, 0, 0);
  };

  const drawMiniHeader = () => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(
      `SSISM • BCA ${paper.level.code} • ${paper.topic || 'Test'} (Set ${paper.setLetter})`,
      margin,
      y
    );
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y + 2, pageWidth - margin, y + 2);
    y += 7;
  };

  // ================= 1. STUDENT PAPER SECTION =================
  if (mode === 'paper' || mode === 'both') {
    // Institution Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('SANT SINGAJI INSTITUTE OF SCIENCE AND MANAGEMENT', pageWidth / 2, y, { align: 'center' });
    y += 5.5;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('DEPARTMENT OF COMPUTER APPLICATIONS • BCA PROGRAM', pageWidth / 2, y, { align: 'center' });
    y += 4;

    doc.setLineWidth(0.6);
    doc.setDrawColor(30, 41, 59);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4.5;

    // Level & Test Metadata Row
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(`Level: ${paper.level.name}`, margin, y);
    y += 5;

    doc.setFontSize(9);
    const metaLine = `Test: ${paper.topic || 'Assessment'}    |    Set: ${paper.setLetter}    |    Time: ${paper.timeMinutes} Minutes    |    Max Marks: ${paper.totalMarks}`;
    doc.text(metaLine, margin, y);
    y += 4;

    doc.setLineWidth(0.2);
    doc.setDrawColor(180, 180, 180);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    // Student Identification Line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Name: _________________________________________', margin, y);
    doc.text(`Class: ${paper.level.targetClass}`, margin + 85, y);
    doc.text('Date: ____________', pageWidth - margin - 28, y);
    y += 5.5;

    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    // Instructions Box
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, y, contentWidth, 14, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Instructions:', margin + 3, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text('1. All questions are compulsory. Read questions carefully before attempting.', margin + 3, y + 8);
    doc.text('2. Write clean steps, proper syntax and clear algorithmic logic where required.', margin + 3, y + 12);
    y += 18;

    // Section A: MCQs
    if (paper.mcqQuestions.length > 0) {
      checkPageBreak(12);
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y, contentWidth, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(
        `Section A: Multiple Choice Questions (${paper.mcqQuestions.length} Questions)`,
        margin + 2.5,
        y + 4.2
      );
      y += 8.5;

      paper.mcqQuestions.forEach((q, idx) => {
        const qLines = doc.splitTextToSize(`Q${idx + 1}. ${q.question}`, contentWidth);
        const qHeight = qLines.length * 4.2 + (q.options ? 10 : 0);
        checkPageBreak(qHeight + 4);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.text(qLines, margin, y);
        y += qLines.length * 4.2;

        if (q.options) {
          const colW = contentWidth / 2;
          const labels = ['(A)', '(B)', '(C)', '(D)'];
          q.options.forEach((opt, optIdx) => {
            const col = optIdx % 2;
            const row = Math.floor(optIdx / 2);
            const xPos = margin + col * colW + 4;
            const yPos = y + row * 4.2;
            doc.setFont('helvetica', 'bold');
            doc.text(`${labels[optIdx]} `, xPos, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(`${opt}`, xPos + 7, yPos);
          });
          y += 9.5;
        } else {
          y += 2.5;
        }
      });
      y += 3;
    }

    // Section B: Short Answer
    if (paper.shortQuestions.length > 0) {
      checkPageBreak(12);
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y, contentWidth, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(
        `Section B: Short Answer Questions (${paper.shortQuestions.length} Questions)`,
        margin + 2.5,
        y + 4.2
      );
      y += 8.5;

      paper.shortQuestions.forEach((q, idx) => {
        const text = `Q${idx + 1}. [${q.topic}] ${q.question}`;
        const lines = doc.splitTextToSize(text, contentWidth - 14);
        checkPageBreak(lines.length * 4.2 + 4);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.text(lines, margin, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`[${q.marks}M]`, pageWidth - margin - 8, y);
        y += lines.length * 4.2 + 3.5;
      });
      y += 2;
    }

    // Section C: Coding
    if (paper.codingQuestions.length > 0) {
      checkPageBreak(14);
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y, contentWidth, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(
        `Section C: Coding / Programs (${paper.codingQuestions.length} Questions)`,
        margin + 2.5,
        y + 4.2
      );
      y += 8.5;

      paper.codingQuestions.forEach((q, idx) => {
        const text = `Q${idx + 1}. [${q.subject}: ${q.topic}] ${q.question}`;
        const lines = doc.splitTextToSize(text, contentWidth - 14);
        checkPageBreak(lines.length * 4.2 + 5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.text(lines, margin, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`[${q.marks}M]`, pageWidth - margin - 8, y);
        y += lines.length * 4.2 + 4;
      });
    }

    // End of Paper rule line
    checkPageBreak(8);
    y += 2;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('*** End of Examination Paper ***', pageWidth / 2, y, { align: 'center' });
    doc.setTextColor(0, 0, 0);
  }

  // ================= 2. TEACHER ANSWER KEY SECTION =================
  if (mode === 'key' || mode === 'both') {
    if (mode === 'both') {
      addFooter();
      doc.addPage();
      y = margin;
    }

    // Teacher Header
    doc.setFillColor(254, 243, 199);
    doc.rect(margin, y, contentWidth, 14, 'F');
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.4);
    doc.rect(margin, y, contentWidth, 14, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(120, 53, 15);
    doc.text('Answer Key (sirf teacher ke liye)', margin + 4, y + 5.5);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `SSISM • Level: ${paper.level.name} • Set: ${paper.setLetter} • Topic: ${paper.topic}`,
      margin + 4,
      y + 10.5
    );
    doc.setTextColor(0, 0, 0);
    y += 19;

    // Answer Key Section A
    if (paper.mcqQuestions.length > 0) {
      checkPageBreak(12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('Section A: MCQ Solutions', margin, y);
      y += 5;

      paper.mcqQuestions.forEach((q, idx) => {
        checkPageBreak(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text(`Q${idx + 1}: Correct Option [${q.correctAnswer}]`, margin + 2, y);
        y += 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        const expLines = doc.splitTextToSize(`Explanation: ${q.explanation}`, contentWidth - 4);
        doc.text(expLines, margin + 4, y);
        y += expLines.length * 3.8 + 2.5;
      });
      y += 2;
    }

    // Answer Key Section B
    if (paper.shortQuestions.length > 0) {
      checkPageBreak(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('Section B: Short Answer Solutions & Marking Guidelines', margin, y);
      y += 5;

      paper.shortQuestions.forEach((q, idx) => {
        const ansLines = doc.splitTextToSize(q.correctAnswer, contentWidth - 8);
        checkPageBreak(ansLines.length * 3.8 + 10);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text(`Q${idx + 1}. [${q.topic}]`, margin + 2, y);
        y += 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text(ansLines, margin + 4, y);
        y += ansLines.length * 3.8 + 2;

        doc.setFont('helvetica', 'italic');
        doc.text(`Marking: ${q.explanation}`, margin + 4, y);
        y += 5;
      });
      y += 2;
    }

    // Answer Key Section C
    if (paper.codingQuestions.length > 0) {
      checkPageBreak(16);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('Section C: Coding Solutions & Syntax Reference', margin, y);
      y += 5;

      paper.codingQuestions.forEach((q, idx) => {
        const codeLines = doc.splitTextToSize(q.correctAnswer, contentWidth - 10);
        checkPageBreak(codeLines.length * 3.6 + 14);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text(`Q${idx + 1}. [${q.subject}: ${q.topic}]`, margin + 2, y);
        y += 4;

        doc.setFillColor(241, 245, 249);
        doc.rect(margin + 2, y - 1, contentWidth - 4, codeLines.length * 3.6 + 4, 'F');
        doc.setFont('courier', 'normal');
        doc.setFontSize(7.5);
        doc.text(codeLines, margin + 4, y + 2.5);
        y += codeLines.length * 3.6 + 7;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.text(`Logic: ${q.explanation}`, margin + 4, y);
        y += 6;
      });
    }
  }

  // Add final footer
  addFooter();

  // Clean filename
  const cleanTopic = (paper.topic || 'Assessment').replace(/[^a-zA-Z0-9]/g, '_');
  const typeSuffix = mode === 'paper' ? 'StudentPaper' : mode === 'key' ? 'TeacherKey' : 'CompletePackage';
  const fileName = `SSISM_${paper.level.code}_Set${paper.setLetter}_${cleanTopic}_${typeSuffix}.pdf`;

  doc.save(fileName);
}

// Export All Sets combined into one clean examination booklet PDF
export function exportAllSetsToPDF(papers: GeneratedPaperSet[], mode: PDFExportMode = 'paper'): void {
  if (papers.length === 0) return;
  if (papers.length === 1) {
    exportPaperToPDF(papers[0], mode);
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  papers.forEach((paper, pIdx) => {
    if (pIdx > 0) {
      doc.addPage();
    }

    let y = margin;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('SANT SINGAJI INSTITUTE OF SCIENCE AND MANAGEMENT', pageWidth / 2, y, { align: 'center' });
    y += 5;

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text('DEPARTMENT OF COMPUTER APPLICATIONS • BCA PROGRAM', pageWidth / 2, y, { align: 'center' });
    y += 4;

    doc.setLineWidth(0.6);
    doc.setDrawColor(30, 41, 59);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(`Level: ${paper.level.name}`, margin, y);
    y += 4.5;

    doc.setFontSize(9);
    doc.text(
      `Test: ${paper.topic || 'Assessment'}    |    Set: ${paper.setLetter}    |    Time: ${paper.timeMinutes} Min    |    Max Marks: ${paper.totalMarks}`,
      margin,
      y
    );
    y += 4;

    doc.setLineWidth(0.2);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Name: _________________________________________', margin, y);
    doc.text(`Class: ${paper.level.targetClass}`, margin + 85, y);
    doc.text('Date: ____________', pageWidth - margin - 28, y);
    y += 5;

    // MCQs
    if (paper.mcqQuestions.length > 0) {
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y, contentWidth, 5.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(`Section A: MCQs (Set ${paper.setLetter})`, margin + 2.5, y + 4);
      y += 8;

      paper.mcqQuestions.forEach((q, idx) => {
        const qLines = doc.splitTextToSize(`Q${idx + 1}. ${q.question}`, contentWidth);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text(qLines, margin, y);
        y += qLines.length * 3.8;

        if (q.options) {
          const colW = contentWidth / 2;
          const labels = ['(A)', '(B)', '(C)', '(D)'];
          q.options.forEach((opt, optIdx) => {
            const col = optIdx % 2;
            const row = Math.floor(optIdx / 2);
            const xPos = margin + col * colW + 4;
            const yPos = y + row * 3.8;
            doc.setFont('helvetica', 'bold');
            doc.text(`${labels[optIdx]} `, xPos, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(`${opt}`, xPos + 7, yPos);
          });
          y += 8.5;
        } else {
          y += 2;
        }
      });
    }

    // Short Questions
    if (paper.shortQuestions.length > 0) {
      y += 2;
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y, contentWidth, 5.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(`Section B: Short Answer Questions (Set ${paper.setLetter})`, margin + 2.5, y + 4);
      y += 8;

      paper.shortQuestions.forEach((q, idx) => {
        const text = `Q${idx + 1}. [${q.topic}] ${q.question}`;
        const lines = doc.splitTextToSize(text, contentWidth - 14);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text(lines, margin, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`[${q.marks}M]`, pageWidth - margin - 8, y);
        y += lines.length * 3.8 + 3;
      });
    }

    // Coding
    if (paper.codingQuestions.length > 0) {
      y += 2;
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y, contentWidth, 5.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text(`Section C: Coding / Programs (Set ${paper.setLetter})`, margin + 2.5, y + 4);
      y += 8;

      paper.codingQuestions.forEach((q, idx) => {
        const text = `Q${idx + 1}. [${q.subject}: ${q.topic}] ${q.question}`;
        const lines = doc.splitTextToSize(text, contentWidth - 14);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text(lines, margin, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`[${q.marks}M]`, pageWidth - margin - 8, y);
        y += lines.length * 3.8 + 3.5;
      });
    }

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `SSISM BCA Examination Booklet • Set ${paper.setLetter}`,
      margin,
      pageHeight - 8
    );
    doc.text(`Sheet ${pIdx + 1} of ${papers.length}`, pageWidth - margin - 15, pageHeight - 8);
    doc.setTextColor(0, 0, 0);
  });

  const levelCode = papers[0]?.level.code || 'BCA';
  const cleanTopic = (papers[0]?.topic || 'Test').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`SSISM_${levelCode}_All_Sets_${cleanTopic}_Booklet.pdf`);
}
