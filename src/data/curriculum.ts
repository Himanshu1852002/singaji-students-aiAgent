export interface LevelDefinition {
  id: '1A' | '1B' | '1C';
  code: string;
  name: string;
  subjects: string;
  targetClass: string;
  description: string;
  allowedSubjects: string[];
  javaTopics?: string[];
  pythonTopics?: string[];
  mysqlTopics?: string[];
  dsaTopics?: string[];
  aptitudeTopics?: string[];
  prohibitedTopics: string[];
}

export const LEVELS: Record<'1A' | '1B' | '1C', LevelDefinition> = {
  '1A': {
    id: '1A',
    code: 'Level 1A',
    name: 'Level 1A: Basic Java + Aptitude & Reasoning',
    subjects: 'Basic Java + Aptitude & Reasoning',
    targetClass: 'BCA Level 1A',
    description: 'Foundation programming with Java fundamentals combined with mental aptitude & reasoning abilities.',
    allowedSubjects: ['Basic Java', 'Aptitude & Reasoning'],
    javaTopics: [
      'Java Syntax, JVM & JDK Architecture',
      'Data Types, Variables & Type Casting',
      'Operators & Expressions',
      'Control Flow: if-else, nested if, switch-case',
      'Loops: for loop, while loop, do-while loop, nested loops',
      'Arrays: 1D Array declaration, traversal & 2D Arrays',
      'Strings: String methods, String immutability basics',
      'OOP Basics: Classes, Objects & Member Variables',
      'Methods, Parameter Passing & Return Types',
      'Constructors & Method Overloading'
    ],
    aptitudeTopics: [
      'Percentage & Profit Basics',
      'Ratio & Proportion',
      'Time & Work Fundamentals',
      'Number Series & Missing Term',
      'Letter & Symbol Series',
      'Coding & Decoding (Letter shifting, Substitution)',
      'Blood Relations (Family tree relations)',
      'Syllogisms (Statements & Conclusions)',
      'Direction Sense Test'
    ],
    prohibitedTopics: [
      'Collections Framework (ArrayList, HashMap, etc.)',
      'JDBC & Database Connectivity',
      'Data Structures (Stacks, Queues, Linked Lists, Trees)',
      'Sorting Algorithms (Bubble, Selection, etc.)',
      'MySQL / SQL Queries',
      'Python'
    ]
  },
  '1B': {
    id: '1B',
    code: 'Level 1B',
    name: 'Level 1B: Advanced Java + MySQL + Basic DSA + Aptitude & Reasoning',
    subjects: 'Advanced Java + MySQL + Basic DSA + Aptitude & Reasoning',
    targetClass: 'BCA Level 1B',
    description: 'Enterprise Java, relational database management with MySQL, introductory data structures, and advanced aptitude.',
    allowedSubjects: ['Advanced Java', 'MySQL', 'Basic DSA', 'Aptitude & Reasoning'],
    javaTopics: [
      'Collections Framework: ArrayList, LinkedList, HashSet, HashMap, Iterator',
      'Exception Handling: try-catch-finally, throw, throws, custom exceptions',
      'JDBC Architecture: DriverManager, Connection, Statement, PreparedStatement, ResultSet',
      'Multi-threading Basics: Thread class, Runnable interface, thread lifecycle',
      'File I/O Streams in Java'
    ],
    mysqlTopics: [
      'DDL & DML Commands (CREATE, ALTER, INSERT, UPDATE, DELETE)',
      'Integrity Constraints: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK',
      'SQL Joins: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN',
      'Subqueries & Nested Queries',
      'Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)',
      'GROUP BY, HAVING and ORDER BY clauses',
      'Pattern Matching with LIKE & Wildcards'
    ],
    dsaTopics: [
      'Array Operations: Insertion, Deletion, Rotation',
      'String Manipulation & Palindrome Checking',
      'Linear Search & Binary Search Algorithm',
      'Bubble Sort, Selection Sort, Insertion Sort',
      'Basic Time & Space Complexity (Big-O Notation)'
    ],
    aptitudeTopics: [
      'Profit & Loss Advanced',
      'Speed, Distance & Time (Trains, Boats & Streams)',
      'Permutations & Combinations Basics',
      'Data Interpretation: Tables & Bar Charts',
      'Logical Venn Diagrams & Seating Arrangements'
    ],
    prohibitedTopics: [
      'Python',
      'Medium DSA (Stacks, Queues, Linked Lists implementation, Binary Trees)',
      'Advanced Graph Algorithms'
    ]
  },
  '1C': {
    id: '1C',
    code: 'Level 1C',
    name: 'Level 1C: Python + Medium DSA',
    subjects: 'Python + Medium DSA',
    targetClass: 'BCA Level 1C',
    description: 'Modern scripting and object-oriented programming in Python with intermediate data structures and algorithmic thinking.',
    allowedSubjects: ['Python', 'Medium DSA'],
    pythonTopics: [
      'Python Syntax, Indentation & Dynamic Typing',
      'Built-in Data Structures: Lists, Tuples, Dictionaries, Sets',
      'List, Dictionary & Set Comprehensions',
      'Functions, Default arguments, *args and **kwargs',
      'Lambda, map(), filter() & Generator Expressions',
      'OOP in Python: Classes, __init__, self, Methods, Inheritance & Polymorphism',
      'File Handling: open(), with statement, read(), write()',
      'Exception Handling: try, except, else, finally, raise'
    ],
    dsaTopics: [
      'Stack: Array & List implementation, LIFO principle',
      'Stack Applications: Parentheses Matching, Infix to Postfix conversion',
      'Queue: Linear Queue, Circular Queue, Deque (FIFO principle)',
      'Singly Linked List: Node creation, Insertion at head/tail, Deletion, Traversal',
      'Reversal of Singly Linked List',
      'Doubly Linked List fundamentals',
      'Recursion: Base condition, Factorial, Fibonacci, Tower of Hanoi',
      'Binary Tree: Structure, Inorder, Preorder, Postorder Traversals',
      'Two-Pointer Technique & Sliding Window basics'
    ],
    prohibitedTopics: [
      'Java (Basic or Advanced)',
      'MySQL / SQL (unless specifically integrated)',
      'Aptitude & Reasoning questions'
    ]
  }
};
