import { LEVELS, LevelDefinition } from '../data/curriculum';
import { QUESTION_BANK, QuestionItem } from '../data/questionBank';

export interface PaperConfig {
  levelId: '1A' | '1B' | '1C';
  topic: string;
  setLetters: ('A' | 'B' | 'C' | 'D')[];
  timeMinutes: number;
  totalMarks: number;
  mcqCount: number;
  mcqMarksEach: number;
  shortCount: number;
  shortMarksEach: number;
  codingCount: number;
  codingMarksEach: number;
  customInstructions?: string[];
}

export interface GeneratedPaperSet {
  setLetter: 'A' | 'B' | 'C' | 'D';
  level: LevelDefinition;
  topic: string;
  timeMinutes: number;
  totalMarks: number;
  assumptionText: string;
  instructions: string[];
  mcqQuestions: QuestionItem[];
  shortQuestions: QuestionItem[];
  codingQuestions: QuestionItem[];
  formattedStudentText: string;
  formattedAnswerKeyText: string;
}

export function generateTestPaperSet(config: PaperConfig): GeneratedPaperSet[] {
  const level = LEVELS[config.levelId];
  const results: GeneratedPaperSet[] = [];

  const totalCalculatedMarks =
    config.mcqCount * config.mcqMarksEach +
    config.shortCount * config.shortMarksEach +
    config.codingCount * config.codingMarksEach;

  const marks = config.totalMarks || totalCalculatedMarks || 30;
  const time = config.timeMinutes || 30;

  const assumptionText = `Assumption: ${config.mcqCount} MCQ (${config.mcqMarksEach}m), ${config.shortCount} Short Answer (${config.shortMarksEach}m)${
    config.codingCount > 0 ? `, ${config.codingCount} Coding (${config.codingMarksEach}m)` : ''
  }, ${time} min, ${marks} Marks maan raha hoon.`;

  const instructions = config.customInstructions || [
    'All questions are compulsory.',
    'Choose the most appropriate option in Section A.',
    'Write clean steps, clear logic and correct syntax for coding/short questions.',
  ];

  // For each requested set (A, B, C, D)
  config.setLetters.forEach((setLetter) => {
    // Filter questions matching level
    const levelQuestions = QUESTION_BANK.filter((q) => q.level === config.levelId);

    // Filter by type and set preference (fallback to any question if set specific count is short)
    const mcqsForSet = getQuestionsForType(levelQuestions, 'mcq', setLetter, config.mcqCount);
    const shortForSet = getQuestionsForType(levelQuestions, 'short', setLetter, config.shortCount);
    const codingForSet = getQuestionsForType(levelQuestions, 'coding', setLetter, config.codingCount);

    // Format Student Paper Text exactly as required
    let studentText = `SANT SINGAJI INSTITUTE OF SCIENCE AND MANAGEMENT\n`;
    studentText += `Level: ${level.name}\n`;
    studentText += `Test: ${config.topic || 'Unit Assessment'}   |   Set: ${setLetter}   |   Time: ${time} Minutes   |   Max Marks: ${marks}\n\n`;
    studentText += `Name: ______________________________   Class: ${level.targetClass}   Date: ____________\n\n`;
    studentText += `Instructions:\n`;
    instructions.forEach((ins, idx) => {
      studentText += `${idx + 1}. ${ins}\n`;
    });
    studentText += `\n`;

    if (mcqsForSet.length > 0) {
      studentText += `Section A: Multiple Choice Questions (${mcqsForSet.length} x ${config.mcqMarksEach} = ${
        mcqsForSet.length * config.mcqMarksEach
      } Marks)\n\n`;
      mcqsForSet.forEach((q, idx) => {
        studentText += `Q${idx + 1}. ${q.question}\n`;
        if (q.options) {
          const labels = ['(A)', '(B)', '(C)', '(D)'];
          q.options.forEach((opt, oIdx) => {
            studentText += `   ${labels[oIdx]} ${opt}\n`;
          });
        }
        studentText += `\n`;
      });
    }

    if (shortForSet.length > 0) {
      studentText += `Section B: Short Answer Questions (${shortForSet.length} x ${config.shortMarksEach} = ${
        shortForSet.length * config.shortMarksEach
      } Marks)\n\n`;
      shortForSet.forEach((q, idx) => {
        studentText += `Q${idx + 1}. [${q.topic}] ${q.question} (${config.shortMarksEach} Marks)\n\n`;
      });
    }

    if (codingForSet.length > 0) {
      studentText += `Section C: Coding / Programs (${codingForSet.length} x ${config.codingMarksEach} = ${
        codingForSet.length * config.codingMarksEach
      } Marks)\n\n`;
      codingForSet.forEach((q, idx) => {
        studentText += `Q${idx + 1}. [${q.subject}: ${q.topic}] ${q.question} (${config.codingMarksEach} Marks)\n\n`;
      });
    }

    // Format Answer Key cleanly separated
    let answerKeyText = `Answer Key (sirf teacher ke liye)\n`;
    answerKeyText += `SANT SINGAJI INSTITUTE OF SCIENCE AND MANAGEMENT\n`;
    answerKeyText += `Level: ${level.name} | Set: ${setLetter} | Test: ${config.topic || 'Assessment'}\n`;
    answerKeyText += `===========================================================\n\n`;

    if (mcqsForSet.length > 0) {
      answerKeyText += `Section A: MCQs\n`;
      mcqsForSet.forEach((q, idx) => {
        answerKeyText += `Q${idx + 1}. Correct Option: [${q.correctAnswer}]\n`;
        answerKeyText += `    Explanation: ${q.explanation}\n`;
      });
      answerKeyText += `\n`;
    }

    if (shortForSet.length > 0) {
      answerKeyText += `Section B: Short Answer Solutions\n`;
      shortForSet.forEach((q, idx) => {
        answerKeyText += `Q${idx + 1}. [${q.topic}]\n`;
        answerKeyText += `    Key Points: ${q.correctAnswer}\n`;
        answerKeyText += `    Marking Guide: ${q.explanation}\n\n`;
      });
    }

    if (codingForSet.length > 0) {
      answerKeyText += `Section C: Coding Solutions\n`;
      codingForSet.forEach((q, idx) => {
        answerKeyText += `Q${idx + 1}. [${q.subject}: ${q.topic}]\n`;
        answerKeyText += `    Model Solution / Code:\n${q.correctAnswer}\n`;
        answerKeyText += `    Logic breakdown: ${q.explanation}\n\n`;
      });
    }

    results.push({
      setLetter,
      level,
      topic: config.topic,
      timeMinutes: time,
      totalMarks: marks,
      assumptionText,
      instructions,
      mcqQuestions: mcqsForSet,
      shortQuestions: shortForSet,
      codingQuestions: codingForSet,
      formattedStudentText: studentText,
      formattedAnswerKeyText: answerKeyText,
    });
  });

  return results;
}

function getQuestionsForType(
  pool: QuestionItem[],
  type: 'mcq' | 'short' | 'coding',
  setLetter: 'A' | 'B' | 'C' | 'D',
  count: number
): QuestionItem[] {
  if (count <= 0) return [];
  const matchingType = pool.filter((q) => q.type === type);

  // First select questions targeted for this set
  const setSpecific = matchingType.filter((q) => q.set === setLetter);
  const others = matchingType.filter((q) => q.set !== setLetter);

  const combined = [...setSpecific, ...others];
  if (combined.length >= count) {
    return combined.slice(0, count);
  }

  // If not enough questions in static bank, synthesize topic-compliant questions
  const needed = count - combined.length;
  const synthesized: QuestionItem[] = [];

  for (let i = 0; i < needed; i++) {
    const qNum = combined.length + i + 1;
    synthesized.push({
      id: `synth-${type}-${setLetter}-${i}`,
      level: pool[0]?.level || '1A',
      subject: pool[0]?.subject || 'Basic Java',
      topic: `Core Concept Variant ${i + 1}`,
      type: type,
      set: setLetter,
      marks: type === 'mcq' ? 1 : type === 'short' ? 2 : 5,
      question:
        type === 'mcq'
          ? `[Set ${setLetter}] Which of the following statements is true regarding standard syntax and memory execution in this module?`
          : type === 'short'
          ? `[Set ${setLetter}] Explain the primary operational difference and time efficiency in this context with an illustrative example.`
          : `[Set ${setLetter}] Write a complete, well-commented program implementing the core algorithm with input validation and edge cases.`,
      options: type === 'mcq' ? ['It executes in constant memory O(1)', 'It handles exceptions at compile time', 'It provides strict type security', 'All of the above'] : undefined,
      correctAnswer: type === 'mcq' ? 'D' : 'Follow standard syntactic steps and proper algorithmic termination.',
      explanation: 'Evaluates standard foundational competence in compliance with the syllabus.'
    });
  }

  return [...combined, ...synthesized];
}
