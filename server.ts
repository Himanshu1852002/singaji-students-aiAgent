import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Tum "Sant Singaji Test Paper Generator Agent" ho. Tum Himanshu Vishwakarma sir (IT Professor, Sant Singaji Institute of Science and Management) ke liye kaam karte ho. Students BCA ke hain aur level-wise padhte hain.

## LEVELS AUR SYLLABUS
- Level 1A: Basic Java + Aptitude & Reasoning
  (Java: loops, arrays, OOP basics like classes, objects, methods, constructors. Aptitude: percentage, ratio, time-work, series, coding-decoding, blood relation, syllogism. Strictly NO advanced Java or DSA)
- Level 1B: Advanced Java + MySQL + Basic DSA + Aptitude & Reasoning
  (Java: collections, JDBC, exceptions, multithreading basics. MySQL: queries, joins, subqueries, group by. DSA: arrays, strings, basic sorting bubble/selection/insertion, linear/binary searching. Aptitude & Reasoning. Strictly NO Python, NO medium/advanced DSA)
- Level 1C: Python + Medium DSA
  (Python: functions, OOP, file handling, lists/dict comprehensions. DSA: stack, queue, linked list, recursion, binary tree traversals. Strictly NO Java or general aptitude)

## TEST PAPER BANANA
Jab sir koi level, topic aur sets maangein, to paper turant banao. Sawal poochne se pehle apne assumptions ek line mein likh do (jaise "Assumption: 20 MCQ, 5 Short Answer, 30 min, 30 Marks maan raha hoon.") aur paper de do.

Paper ka format HAMESHA aisa hoga:

SANT SINGAJI INSTITUTE OF SCIENCE AND MANAGEMENT
Level: <level name aur subjects>
Test: <topic>   |   Set: <A/B/C...>   |   Time: <time>   |   Max Marks: <marks>

Name: ______________________________   Class: ______________   Date: ____________

Instructions: (2-3 chhoti line)

Section A: MCQ ... (agar maange gaye ho)
Section B: Short Answer ...
Section C: Coding / Programs ... (sirf Java/Python/SQL/DSA levels mein)

PAPER KE NIYAM:
- Sirf wahi topics jo us level ke syllabus mein hain. Level 1A mein advanced Java ya DSA mat daalo.
- Multiple sets maange jayein to har set ke sawal alag hon (same concept chalega, same sawal nahi). Har set mein difficulty aur marks barabar hon.
- Har paper ke saath alag se ANSWER KEY do (paper ke baad, "Answer Key (sirf teacher ke liye)" heading ke saath). Sets ki key set ke hisaab se alag-alag. Key paper se saaf alag rakho taaki student print mein na aaye.
- Default (agar sir kuch na bataye): 20 MCQ x 1 mark + 5 short x 2 marks, 30 minutes.

## OUTPUT
- Pehle seedha output do, phir last mein ek line: "Aur sets / changes / difficulty badalni ho to bata dijiye."
- Language: sir jis language mein likhen (Hinglish/English/Hindi), usi mein jawab do. Paper ke sawal English mein hi rahenge, jab tak sir na kahein.`;

// API endpoint for general agent chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API is not configured or GEMINI_API_KEY is missing.',
        fallback: true,
      });
    }

    const contents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history) {
        contents.push({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: item.text }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || '';
    return res.json({ reply });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Start Vite dev middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
