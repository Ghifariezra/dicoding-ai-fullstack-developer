# Learn Basic JavaScript Programming

A collection of hands-on assessments, coding challenges, and real-world practical implementations completed for the **Belajar Dasar Pemrograman JavaScript** course by Dicoding.

---

## Modules Overview

| Directory | Topic | Description | Key Concepts |
| :--- | :--- | :--- | :--- |
| `01-writing-comments` | Syntax & Comments | Practice writing single-line and multi-line comments in JavaScript. | `//`, `/* */` |
| `02-code-style` | Code Quality | Refactoring code to comply with strict style guidelines and formatting standards. | Semicolons, 2-space indentation, `const`, object formatting |
| `03-writing-test` | Unit Testing | Writing automated unit tests for input validation and arithmetic operations. | `node:test`, `node:assert`, assertion testing |
| `optional-04-oop` | Object-Oriented Programming | Building an Inventory Management System using ES6 classes. | `class`, constructor, encapsulation, ES6 modules |
| `optional-05-recursive` | Recursion Algorithms | Calculating factorials and generating Fibonacci sequences recursively. | Recursive call, base cases, array manipulation |
| `optional-06-full-coverage-testing` | Test Coverage | Writing thorough unit tests to cover all execution branches and edge cases. | Edge-case testing, negative values, type checks |
| `optional-07-real-world-scenario` | Application Scenario | Building a Restaurant Order Management System to handle customer orders. | `reduce`, `filter`, `find`, unique ID generation, state updates |

---

## Repository Structure

```bash
Belajar Dasar Pemrograman JavaScript/
├── 01-writing-comments/
│   └── index.js
├── 02-code-style/
│   └── index.js
├── 03-writing-test/
│   ├── index.js
│   └── index.test.js
├── optional-04-oop/
│   ├── Inventory.js
│   ├── Item.js
│   └── main.js
├── optional-05-recursive/
│   ├── factorial.js
│   ├── fibonacci.js
│   └── main.js
├── optional-06-full-coverage-testing/
│   ├── index.js
│   └── index.test.js
└── optional-07-real-world-scenario/
    ├── orders.js
    └── main.js
```

---

## Prerequisites & Setup

### Requirements
* **Node.js**: `v18.0.0` or higher (required for native `node:test` runner).

### Running Scripts
Navigate into any module directory to run or test the code:

**Run a module main file:**
```bash
cd optional-07-real-world-scenario
npm start
```

### Run unit tests:

```bash
cd optional-06-full-coverage-testing
npm test
```

## Tech Stack

* **Language:** JavaScript (ES6+)
* **Runtime:** Node.js
* **Testing Library:** Native Node.js Test Runner (`node:test`, `node:assert`)
* **Module System:** ES Modules (`import` / `export`)