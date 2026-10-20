export interface QuestionItem {
  id: string;
  level: '1A' | '1B' | '1C';
  subject: 'Basic Java' | 'Advanced Java' | 'MySQL' | 'Basic DSA' | 'Python' | 'Medium DSA' | 'Aptitude & Reasoning';
  topic: string;
  type: 'mcq' | 'short' | 'coding';
  set: 'A' | 'B' | 'C' | 'D';
  marks: number;
  question: string;
  options?: string[]; // For MCQ
  correctAnswer: string;
  explanation: string;
}

export const QUESTION_BANK: QuestionItem[] = [
  // ================= LEVEL 1A: Basic Java + Aptitude & Reasoning =================
  // --- Set A: MCQs ---
  {
    id: '1a-mcq-a1',
    level: '1A',
    subject: 'Basic Java',
    topic: 'Loops',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'What will be the output of the following Java snippet?\nint i = 0;\nwhile (i < 5) {\n    if (i == 3) break;\n    i++;\n}\nSystem.out.println(i);',
    options: ['2', '3', '4', '5'],
    correctAnswer: 'B',
    explanation: 'When i reaches 3, the if condition triggers break and loop terminates. Value printed is 3.'
  },
  {
    id: '1a-mcq-a2',
    level: '1A',
    subject: 'Basic Java',
    topic: 'Arrays',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'In Java, what is the default value of elements in an integer array of size 5?',
    options: ['null', '0', 'Garbage value', '-1'],
    correctAnswer: 'B',
    explanation: 'Java automatically initializes numeric primitive arrays (int[]) with 0.'
  },
  {
    id: '1a-mcq-a3',
    level: '1A',
    subject: 'Basic Java',
    topic: 'OOP Basics',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'Which keyword in Java is used to allocate memory dynamically for a new object?',
    options: ['malloc', 'create', 'new', 'instance'],
    correctAnswer: 'C',
    explanation: 'The new operator allocates memory for an object at runtime and returns its reference.'
  },
  {
    id: '1a-mcq-a4',
    level: '1A',
    subject: 'Basic Java',
    topic: 'Control Flow',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'Which of the following data types is NOT supported directly in a switch statement in Java 7+?',
    options: ['int', 'String', 'char', 'float'],
    correctAnswer: 'D',
    explanation: 'Floating point data types (float, double) cannot be used in Java switch statements.'
  },
  {
    id: '1a-mcq-a5',
    level: '1A',
    subject: 'Aptitude & Reasoning',
    topic: 'Percentage',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'A student scores 75 marks out of 120 in an IT aptitude test. What is his percentage?',
    options: ['60%', '62.5%', '65%', '67.5%'],
    correctAnswer: 'B',
    explanation: '(75 / 120) * 100 = 62.5%.'
  },
  {
    id: '1a-mcq-a6',
    level: '1A',
    subject: 'Aptitude & Reasoning',
    topic: 'Series',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'Find the next number in the series: 4, 9, 16, 25, 36, ?',
    options: ['45', '49', '52', '64'],
    correctAnswer: 'B',
    explanation: 'These are squares of consecutive integers: 2^2, 3^2, 4^2, 5^2, 6^2, so next is 7^2 = 49.'
  },
  {
    id: '1a-mcq-a7',
    level: '1A',
    subject: 'Aptitude & Reasoning',
    topic: 'Coding-Decoding',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'If JAVA is coded as LCXC, how is CODE coded in the same pattern?',
    options: ['EQFG', 'ERFG', 'EQFF', 'DQEE'],
    correctAnswer: 'A',
    explanation: 'Each letter is shifted forward by +2 positions in the alphabet: C->E, O->Q, D->F, E->G.'
  },
  {
    id: '1a-mcq-a8',
    level: '1A',
    subject: 'Aptitude & Reasoning',
    topic: 'Time and Work',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'A can complete a coding assignment in 6 days and B in 12 days. In how many days can both complete it together?',
    options: ['3 days', '4 days', '5 days', '4.5 days'],
    correctAnswer: 'B',
    explanation: '1-day combined work = (1/6 + 1/12) = 3/12 = 1/4. Hence, together they take 4 days.'
  },

  // --- Set B: MCQs ---
  {
    id: '1a-mcq-b1',
    level: '1A',
    subject: 'Basic Java',
    topic: 'Loops',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'How many times will this do-while loop execute?\nint count = 10;\ndo {\n    count++;\n} while (count < 5);',
    options: ['0', '1', '5', 'Infinite'],
    correctAnswer: 'B',
    explanation: 'A do-while loop is an exit-controlled loop; it always executes at least once before checking condition.'
  },
  {
    id: '1a-mcq-b2',
    level: '1A',
    subject: 'Basic Java',
    topic: 'Arrays',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'What is the index of the last element in a Java array named "marks" containing 10 elements?',
    options: ['10', '9', 'marks.length', 'Undefined'],
    correctAnswer: 'B',
    explanation: 'Array indices in Java are 0-based, ranging from 0 to marks.length - 1 (which is 9).'
  },
  {
    id: '1a-mcq-b3',
    level: '1A',
    subject: 'Basic Java',
    topic: 'OOP Basics',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'Which constructor is invoked when no explicit constructor is defined inside a Java class?',
    options: ['Parameterized constructor', 'Default constructor', 'Copy constructor', 'Static constructor'],
    correctAnswer: 'B',
    explanation: 'Java compiler automatically provides a no-argument default constructor if none is declared.'
  },
  {
    id: '1a-mcq-b4',
    level: '1A',
    subject: 'Basic Java',
    topic: 'Control Flow',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'What is the result of evaluating: (5 > 3 && 8 < 4) in Java?',
    options: ['true', 'false', 'Compilation Error', 'Null'],
    correctAnswer: 'B',
    explanation: 'Logical AND (&&) requires both operands to be true. Since 8 < 4 is false, the expression is false.'
  },
  {
    id: '1a-mcq-b5',
    level: '1A',
    subject: 'Aptitude & Reasoning',
    topic: 'Percentage',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'If the price of a computer keyboard increases from Rs. 400 to Rs. 500, what is the percentage increase?',
    options: ['20%', '25%', '30%', '15%'],
    correctAnswer: 'B',
    explanation: 'Increase = 100; Percentage = (100 / 400) * 100 = 25%.'
  },
  {
    id: '1a-mcq-b6',
    level: '1A',
    subject: 'Aptitude & Reasoning',
    topic: 'Series',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'Find the missing number in the sequence: 3, 7, 15, 31, ?',
    options: ['48', '63', '62', '55'],
    correctAnswer: 'B',
    explanation: 'Pattern: (prev * 2) + 1. 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63.'
  },
  {
    id: '1a-mcq-b7',
    level: '1A',
    subject: 'Aptitude & Reasoning',
    topic: 'Coding-Decoding',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'If BCA is coded as 2-3-1 based on alphabet numbers, what is the code for JAVA?',
    options: ['10-1-22-1', '9-1-21-1', '10-2-22-2', '11-1-23-1'],
    correctAnswer: 'A',
    explanation: 'Direct positional values: J=10, A=1, V=22, A=1.'
  },
  {
    id: '1a-mcq-b8',
    level: '1A',
    subject: 'Aptitude & Reasoning',
    topic: 'Blood Relations',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'Pointing to a photograph, Rohit said, "She is the daughter of my grandfather\'s only son." Who is she to Rohit?',
    options: ['Mother', 'Sister', 'Aunt', 'Cousin'],
    correctAnswer: 'B',
    explanation: 'Grandfather\'s only son is Rohit\'s father. The daughter of Rohit\'s father is Rohit\'s sister.'
  },

  // --- Level 1A Short Answer Questions ---
  {
    id: '1a-short-a1',
    level: '1A',
    subject: 'Basic Java',
    topic: 'Loops',
    type: 'short',
    set: 'A',
    marks: 2,
    question: 'Differentiate between while loop and do-while loop in Java with one clear point of distinction.',
    correctAnswer: 'Key difference: while is an entry-controlled loop (condition checked before entering loop body; executes 0 or more times); do-while is an exit-controlled loop (condition checked after body; executes at least once).',
    explanation: 'Full 2 marks for mentioning entry vs exit control and minimum execution count (0 vs 1).'
  },
  {
    id: '1a-short-a2',
    level: '1A',
    subject: 'Basic Java',
    topic: 'OOP Basics',
    type: 'short',
    set: 'A',
    marks: 2,
    question: 'What is method overloading in Java? Give a 2-line code example.',
    correctAnswer: 'Method Overloading means defining multiple methods with the same name in the same class but with different parameter lists (types, number, or order).\nExample: void add(int a, int b) and void add(double a, double b).',
    explanation: '1 mark for definition, 1 mark for correct signature example.'
  },
  {
    id: '1a-short-b1',
    level: '1A',
    subject: 'Basic Java',
    topic: 'Arrays',
    type: 'short',
    set: 'B',
    marks: 2,
    question: 'Explain what happens when an invalid array index (e.g. index 5 in array of length 5) is accessed in Java.',
    correctAnswer: 'Java throws an ArrayIndexOutOfBoundsException at runtime because array indices are 0 to length-1, preventing memory overflow bugs.',
    explanation: '2 marks for naming ArrayIndexOutOfBoundsException and explaining runtime boundary check.'
  },
  {
    id: '1a-short-b2',
    level: '1A',
    subject: 'Aptitude & Reasoning',
    topic: 'Ratio & Proportion',
    type: 'short',
    set: 'B',
    marks: 2,
    question: 'The ratio of boys to girls in BCA Class 1A is 4:3. If there are 28 boys, find the total number of students.',
    correctAnswer: 'Boys = 4x = 28 => x = 7. Girls = 3x = 21. Total students = 28 + 21 = 49 students.',
    explanation: '1 mark for finding common multiplier x=7, 1 mark for final count 49.'
  },

  // --- Level 1A Coding Questions ---
  {
    id: '1a-code-a1',
    level: '1A',
    subject: 'Basic Java',
    topic: 'Loops and Logic',
    type: 'coding',
    set: 'A',
    marks: 5,
    question: 'Write a Java program to accept an integer N and print whether it is a Prime number or not using a for loop.',
    correctAnswer: `public class PrimeCheck {
    public static void main(String[] args) {
        int n = 29; // Sample input
        boolean isPrime = (n > 1);
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                isPrime = false;
                break;
            }
        }
        System.out.println(n + (isPrime ? " is Prime" : " is not Prime"));
    }
}`,
    explanation: 'Check n > 1, loop till sqrt(n), break on divisor, print result.'
  },
  {
    id: '1a-code-b1',
    level: '1A',
    subject: 'Basic Java',
    topic: 'Arrays',
    type: 'coding',
    set: 'B',
    marks: 5,
    question: 'Write a Java program to find the largest and smallest element in a 1D integer array.',
    correctAnswer: `public class ArrayMinMax {
    public static void main(String[] args) {
        int[] arr = {15, 42, 7, 89, 23};
        int max = arr[0], min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
            if (arr[i] < min) min = arr[i];
        }
        System.out.println("Largest: " + max + ", Smallest: " + min);
    }
}`,
    explanation: 'Initialize min and max with arr[0], traverse once, update accordingly.'
  },

  // ================= LEVEL 1B: Advanced Java + MySQL + Basic DSA + Aptitude =================
  // --- Set A: MCQs ---
  {
    id: '1b-mcq-a1',
    level: '1B',
    subject: 'Advanced Java',
    topic: 'Collections',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'Which collection class in Java maintains elements in key-value pairs and does NOT allow duplicate keys?',
    options: ['ArrayList', 'HashMap', 'HashSet', 'Vector'],
    correctAnswer: 'B',
    explanation: 'HashMap stores elements as key-value pairs; keys are unique, values can be duplicates.'
  },
  {
    id: '1b-mcq-a2',
    level: '1B',
    subject: 'Advanced Java',
    topic: 'JDBC',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'Which interface in JDBC is precompiled and helps prevent SQL Injection attacks?',
    options: ['Statement', 'PreparedStatement', 'CallableStatement', 'Connection'],
    correctAnswer: 'B',
    explanation: 'PreparedStatement compiles the SQL query once on the DB engine and parameterizes user inputs.'
  },
  {
    id: '1b-mcq-a3',
    level: '1B',
    subject: 'MySQL',
    topic: 'Joins',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'Which SQL JOIN returns all rows from the left table, and matching records from the right table?',
    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
    correctAnswer: 'B',
    explanation: 'LEFT JOIN returns all rows from the left table even if there is no match in the right table.'
  },
  {
    id: '1b-mcq-a4',
    level: '1B',
    subject: 'MySQL',
    topic: 'Aggregate & Grouping',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'Which SQL clause is used to filter groups created by the GROUP BY clause?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
    correctAnswer: 'B',
    explanation: 'HAVING filters aggregated groups; WHERE filters individual rows before aggregation.'
  },
  {
    id: '1b-mcq-a5',
    level: '1B',
    subject: 'Basic DSA',
    topic: 'Searching',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'What is the precondition for executing Binary Search on an array?',
    options: ['Array must be dynamically sized', 'Array elements must be sorted', 'Array must not have duplicates', 'Array must contain only positive integers'],
    correctAnswer: 'B',
    explanation: 'Binary Search relies on monotonic order; the array must be sorted in ascending or descending order.'
  },
  {
    id: '1b-mcq-a6',
    level: '1B',
    subject: 'Basic DSA',
    topic: 'Sorting',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'What is the worst-case time complexity of Bubble Sort on an array of N elements?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(1)'],
    correctAnswer: 'C',
    explanation: 'In the worst case (reverse sorted array), Bubble Sort performs N*(N-1)/2 comparisons, which is O(N^2).'
  },
  {
    id: '1b-mcq-a7',
    level: '1B',
    subject: 'Aptitude & Reasoning',
    topic: 'Profit & Loss',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'An item bought for Rs. 800 is sold for Rs. 1000. What is the profit percentage?',
    options: ['20%', '25%', '30%', '22.5%'],
    correctAnswer: 'B',
    explanation: 'Profit = 200. Profit % = (200 / 800) * 100 = 25%.'
  },
  {
    id: '1b-mcq-a8',
    level: '1B',
    subject: 'Aptitude & Reasoning',
    topic: 'Speed & Distance',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'A train 120m long passes a pole in 6 seconds. What is its speed in km/h?',
    options: ['60 km/h', '72 km/h', '80 km/h', '90 km/h'],
    correctAnswer: 'B',
    explanation: 'Speed = 120/6 = 20 m/s. In km/h = 20 * (18/5) = 72 km/h.'
  },

  // --- Level 1B Set B: MCQs ---
  {
    id: '1b-mcq-b1',
    level: '1B',
    subject: 'Advanced Java',
    topic: 'Exceptions',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'Which block in Java exception handling ALWAYS executes whether an exception occurs or not?',
    options: ['catch', 'finally', 'try', 'throw'],
    correctAnswer: 'B',
    explanation: 'The finally block executes unconditionally for clean-up operations like closing streams/connections.'
  },
  {
    id: '1b-mcq-b2',
    level: '1B',
    subject: 'Advanced Java',
    topic: 'Collections',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'Which interface does ArrayList implement to allow fast O(1) index-based access?',
    options: ['RandomAccess', 'Serializable', 'Cloneable', 'Queue'],
    correctAnswer: 'A',
    explanation: 'ArrayList implements RandomAccess marker interface providing O(1) element lookup by index.'
  },
  {
    id: '1b-mcq-b3',
    level: '1B',
    subject: 'MySQL',
    topic: 'Constraints',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'Which MySQL constraint ensures that all values in a column are distinct and NOT NULL by default?',
    options: ['UNIQUE', 'PRIMARY KEY', 'CHECK', 'FOREIGN KEY'],
    correctAnswer: 'B',
    explanation: 'PRIMARY KEY uniquely identifies each row and does not accept NULL values.'
  },
  {
    id: '1b-mcq-b4',
    level: '1B',
    subject: 'MySQL',
    topic: 'Subqueries',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'Which operator is used when a subquery returns multiple values to compare against the outer query?',
    options: ['=', 'IN', 'LIKE', 'BETWEEN'],
    correctAnswer: 'B',
    explanation: 'The IN (or ANY / ALL) operator allows comparison against a set of values returned by a subquery.'
  },
  {
    id: '1b-mcq-b5',
    level: '1B',
    subject: 'Basic DSA',
    topic: 'Sorting',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'In which sorting algorithm is the smallest element selected in each pass and swapped to its correct position?',
    options: ['Selection Sort', 'Insertion Sort', 'Bubble Sort', 'Merge Sort'],
    correctAnswer: 'A',
    explanation: 'Selection Sort repeatedly finds the minimum element from the unsorted segment and puts it at the beginning.'
  },
  {
    id: '1b-mcq-b6',
    level: '1B',
    subject: 'Basic DSA',
    topic: 'Searching',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'What is the average time complexity of Linear Search in an unsorted array of size N?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctAnswer: 'C',
    explanation: 'Linear Search visits elements one by one from 0 to N-1, giving O(N) average complexity.'
  },
  {
    id: '1b-mcq-b7',
    level: '1B',
    subject: 'Aptitude & Reasoning',
    topic: 'Profit & Loss',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'A shopkeeper sells a book for Rs. 450 incurring a 10% loss. What was the cost price (CP) of the book?',
    options: ['Rs. 480', 'Rs. 500', 'Rs. 520', 'Rs. 550'],
    correctAnswer: 'B',
    explanation: 'SP = 90% of CP = 450 => CP = 450 / 0.9 = Rs. 500.'
  },
  {
    id: '1b-mcq-b8',
    level: '1B',
    subject: 'Aptitude & Reasoning',
    topic: 'Logical Reasoning',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'Statements: (1) All programmers are thinkers. (2) Some thinkers are teachers. Conclusion: Some programmers are teachers.',
    options: ['Definitely true', 'Definitely false', 'Cannot be firmly concluded', 'Both (1) & (2) are false'],
    correctAnswer: 'C',
    explanation: 'The syllogism has no definite intersection established between programmers and teachers.'
  },

  // --- Level 1B Short & Coding ---
  {
    id: '1b-short-a1',
    level: '1B',
    subject: 'Advanced Java',
    topic: 'JDBC Steps',
    type: 'short',
    set: 'A',
    marks: 2,
    question: 'List the 5 fundamental steps required to connect to a MySQL database using JDBC in Java.',
    correctAnswer: '1. Load Driver class (Class.forName)\n2. Establish Connection (DriverManager.getConnection)\n3. Create Statement / PreparedStatement\n4. Execute Query (executeQuery / executeUpdate)\n5. Process ResultSet & close connection.',
    explanation: 'Full 2 marks for all 5 chronological steps.'
  },
  {
    id: '1b-code-a1',
    level: '1B',
    subject: 'MySQL',
    topic: 'Joins and Grouping',
    type: 'coding',
    set: 'A',
    marks: 5,
    question: 'Write a MySQL query to find the department name and total number of students in each department from tables: `Students(id, name, dept_id)` and `Departments(dept_id, dept_name)`, showing only departments with more than 10 students.',
    correctAnswer: `SELECT d.dept_name, COUNT(s.id) AS total_students
FROM Departments d
INNER JOIN Students s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
HAVING COUNT(s.id) > 10;`,
    explanation: 'Use INNER JOIN on dept_id, GROUP BY dept_name, HAVING for filtering count > 10.'
  },

  // ================= LEVEL 1C: Python + Medium DSA =================
  // --- Set A: MCQs ---
  {
    id: '1c-mcq-a1',
    level: '1C',
    subject: 'Python',
    topic: 'List Comprehension',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'What is the output of: [x**2 for x in range(5) if x % 2 != 0] in Python?',
    options: ['[0, 4, 16]', '[1, 9]', '[1, 4, 9]', '[0, 1, 4, 9, 16]'],
    correctAnswer: 'B',
    explanation: 'Odd numbers in range(5) are 1 and 3. Their squares are 1 and 9.'
  },
  {
    id: '1c-mcq-a2',
    level: '1C',
    subject: 'Python',
    topic: 'OOP in Python',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'What is the first parameter of an instance method in a Python class that refers to the instance itself?',
    options: ['this', 'cls', 'self', 'super'],
    correctAnswer: 'C',
    explanation: 'By convention in Python, "self" is passed as the first parameter pointing to the calling object instance.'
  },
  {
    id: '1c-mcq-a3',
    level: '1C',
    subject: 'Medium DSA',
    topic: 'Stack',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'Which data structure follows the Last-In-First-Out (LIFO) principle and is used to evaluate postfix arithmetic expressions?',
    options: ['Queue', 'Stack', 'Linked List', 'Binary Tree'],
    correctAnswer: 'B',
    explanation: 'Stack works on LIFO and is the standard structure for parentheses matching and postfix evaluation.'
  },
  {
    id: '1c-mcq-a4',
    level: '1C',
    subject: 'Medium DSA',
    topic: 'Linked List',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'What is the time complexity to insert a new node at the HEAD (beginning) of a Singly Linked List?',
    options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
    correctAnswer: 'A',
    explanation: 'Inserting at the head simply requires pointing the new node to the current head and updating head: O(1).'
  },
  {
    id: '1c-mcq-a5',
    level: '1C',
    subject: 'Medium DSA',
    topic: 'Recursion',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'What happens if a recursive function does not define or reach a base condition?',
    options: ['Returns 0', 'RecursionError: maximum recursion depth exceeded', 'Memory leaks silently', 'Program pauses indefinitely'],
    correctAnswer: 'B',
    explanation: 'Without a base condition, recursion consumes stack frames until Python raises RecursionError.'
  },
  {
    id: '1c-mcq-a6',
    level: '1C',
    subject: 'Medium DSA',
    topic: 'Binary Tree',
    type: 'mcq',
    set: 'A',
    marks: 1,
    question: 'Which tree traversal order visits nodes in: Left Subtree -> Root -> Right Subtree?',
    options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
    correctAnswer: 'B',
    explanation: 'Inorder traversal visits Left, Root, Right. In a Binary Search Tree, it outputs keys in sorted order.'
  },

  // --- Set B: MCQs ---
  {
    id: '1c-mcq-b1',
    level: '1C',
    subject: 'Python',
    topic: 'File Handling',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'Why is the "with open(...)" statement preferred when working with files in Python?',
    options: ['It makes file reading faster', 'It automatically closes the file even if exceptions occur', 'It encrypts file data', 'It requires no file path'],
    correctAnswer: 'B',
    explanation: 'The with context manager ensures __exit__ executes, closing the file descriptor safely.'
  },
  {
    id: '1c-mcq-b2',
    level: '1C',
    subject: 'Python',
    topic: 'Functions & args',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'In Python function definitions, what type of object does *args pack variable arguments into?',
    options: ['List', 'Tuple', 'Dictionary', 'Set'],
    correctAnswer: 'B',
    explanation: '*args collects positional arguments into an immutable tuple.'
  },
  {
    id: '1c-mcq-b3',
    level: '1C',
    subject: 'Medium DSA',
    topic: 'Queue',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'In a Circular Queue of size N implemented using an array, how is the rear pointer updated after an enqueue?',
    options: ['rear = rear + 1', 'rear = (rear + 1) % N', 'rear = (rear - 1) % N', 'rear = N - rear'],
    correctAnswer: 'B',
    explanation: 'Modulo arithmetic wraps the pointer around to index 0 when it reaches the end of the buffer.'
  },
  {
    id: '1c-mcq-b4',
    level: '1C',
    subject: 'Medium DSA',
    topic: 'Linked List',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'In a Singly Linked List, what does the "next" pointer of the last node (tail) point to?',
    options: ['Head node', 'None (NULL)', 'Itself', 'First node with value 0'],
    correctAnswer: 'B',
    explanation: 'The tail node in a non-circular linked list always has its next reference set to None/NULL.'
  },
  {
    id: '1c-mcq-b5',
    level: '1C',
    subject: 'Medium DSA',
    topic: 'Recursion',
    type: 'mcq',
    set: 'B',
    marks: 1,
    question: 'What is the recurrence relation for Tower of Hanoi with N disks?',
    options: ['T(N) = T(N-1) + 1', 'T(N) = 2*T(N-1) + 1', 'T(N) = 2*T(N/2) + N', 'T(N) = T(N-2) + 2'],
    correctAnswer: 'B',
    explanation: 'Tower of Hanoi moves N-1 disks twice and 1 largest disk once: 2*T(N-1) + 1 = 2^N - 1 moves.'
  },

  // --- Level 1C Short & Coding ---
  {
    id: '1c-short-a1',
    level: '1C',
    subject: 'Medium DSA',
    topic: 'Stack application',
    type: 'short',
    set: 'A',
    marks: 2,
    question: 'Explain briefly how a Stack is used to check for balanced parentheses like "{[()]}".',
    correctAnswer: 'Push opening brackets onto stack. When a closing bracket is met, pop top of stack and check if it matches the closing bracket. If stack is empty at end and all matched, parentheses are balanced.',
    explanation: '1 mark for push on open / pop on close; 1 mark for empty stack check at end.'
  },
  {
    id: '1c-code-a1',
    level: '1C',
    subject: 'Medium DSA',
    topic: 'Linked List Reversal',
    type: 'coding',
    set: 'A',
    marks: 5,
    question: 'Write a Python function to reverse a Singly Linked List in-place and return the new head.',
    correctAnswer: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
    explanation: 'Iterative 3-pointer technique (prev, curr, nxt) with O(N) time and O(1) auxiliary space.'
  },
  {
    id: '1c-code-b1',
    level: '1C',
    subject: 'Medium DSA',
    topic: 'Recursion',
    type: 'coding',
    set: 'B',
    marks: 5,
    question: 'Write a recursive Python function to calculate the N-th Fibonacci number with base cases for N=0 and N=1.',
    correctAnswer: `def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

# Sample test: fibonacci(6) returns 8`,
    explanation: 'Clear base cases for n=0 and n=1, recursive sum branch.'
  }
];
