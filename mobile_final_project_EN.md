# Mobile Application Development – Final Project Guidelines & Evaluation Criteria

## 1. Overview

In this course, **instead of a written final exam**, students are expected to develop a mobile application on a **self-chosen topic** and present it in class.

Each student should develop a mobile app that:

- Aims to solve a real problem or address a concrete need,
- Is in a runnable state,
- Has its code under version control (Git),
- Includes a basic but meaningful user interface (UI).

---

## 2. Deliverables

Each student must submit:

1. **Git repository link**
   - Either public or private with access granted to the instructor.
   - The README must include:
     - Project name and a short description
     - Tech stack used
     - Setup & run instructions
     - A list of key features

2. **Working application**
   - APK / TestFlight link / Expo link or the ability to run a live demo.
   - A navigable flow with at least a few screens.

3. **Presentation**
   - A 7–10 minute project presentation (slides recommended but not strictly mandatory).
   - Suggested content:
     - Problem definition / motivation
     - Target user group
     - Tech stack and architecture
     - Key screens and user flow
     - Technical challenges and how they were solved
     - Future improvement ideas

---

## 3. Basic Technical Requirements

- **Minimum requirements:**
  - At least **3 meaningful UI screens** (e.g., list, detail, settings, login, etc.).
  - Basic **navigation** (screen-to-screen transitions).
  - At least one **user input** (form, button, selection, etc.).
  - Some form of **state management**, even if simple (e.g., updating a list, saving a form, etc.).

- **Data management (DB / Storage):**
  - Preferably a **database** or some persistent storage (Room, CoreData, SQLite, Hive, Firestore, local JSON, Shared Preferences, etc.).
  - Database usage adds **extra value** if it is meaningful, but artificial or unnecessary DB usage should be avoided.

---

## 4. Evaluation Criteria

The following headings will be used to evaluate the final project. The weight of each criterion will be decided separately by the course instructor.

| Criterion                             | Description                                                                                     |
|--------------------------------------|-------------------------------------------------------------------------------------------------|
| **Tech Stack & Architecture**        | Appropriateness of chosen technologies, architectural awareness (e.g., MVVM, modularization)   |
| **Git Usage**                        | Number and distribution of commits, meaningful commit messages, (if any) branch usage          |
| **Number & Quality of UI Screens**   | Variety of screens, consistent design, readability, basic UX principles                        |
| **Functionality & Stability**        | Whether main features work, ability to complete the primary user flow without errors           |
| **Data Management / DB Usage**       | Use of a database or persistent storage, data modeling, meaningful data flow                   |
| **Originality & Problem Definition** | Originality of the idea, extent to which it solves a real problem, clarity of the target group |
| **Documentation & Presentation**     | README quality, setup instructions, structure and timing of the presentation                   |

---

## 5. Detailed Description of Criteria

### 5.1. Tech Stack & Architecture

- Are the chosen technologies and tools reasonable for the problem?
  - For example, for a simple list app, a clean but not overly complex architecture is preferred.
- Is there a sensible package/module organization?
- Is code duplication reduced by using components/widgets/fragments, etc.?
- Is the state management approach reasonable? (setState / Provider / Bloc / ViewModel, etc. – the choice should be conscious.)

### 5.2. Git Usage

- Instead of **one big commit** at the end of the project:
  - A **timeline of commits** that reflects the development process is expected.
- Commit messages:
  - Should explain what changed, not just say “fix”, “test”, “final”, etc.
- (If present) The use of branches and merges is considered as a positive sign of good practice.

### 5.3. Number & Quality of UI Screens

- At least 3 meaningful screens:
  - E.g., Login / List / Detail, Dashboard / Profile / Settings, etc.
- Consistent theme:
  - Colors, fonts, and icon usage should be coherent.
- Usability:
  - Button sizes, padding, readable text, and avoidance of overlapping or extremely small elements.
- Basic responsiveness:
  - Adequate layout behavior on different screen sizes (especially portrait mode).

### 5.4. Functionality & Stability

- Can the main user flow be **completed successfully**?
  - For example: “user signs up, logs in, sees the list, taps an item, sees the details”.
- Are there any critical crashes?
- In relevant edge cases (empty list, invalid input, no internet, etc., depending on the project):
  - The application should at least show a meaningful message to the user.

### 5.5. Data Management / DB Usage

- Is an appropriate data solution chosen?
  - Local DB, file system, Shared Preferences, web API + cache, etc.
- Data model:
  - Are tables / collections / model classes reasonable?
  - Is the design free of unnecessary complexity?
- Data persistence:
  - Are critical data preserved when the app is closed and reopened? (if relevant for the project)

### 5.6. Originality & Problem Definition

- Is the app simply a “to-do app clone”, or:
  - Does it target a specific user group or need?
- Is the target user group clearly defined?
  - Should be briefly described in the presentation and/or README.
- Even if the idea is simple, does it have **its own character**?
  - E.g., tailored to a specific hobby community, campus, neighborhood, or group.

### 5.7. Documentation & Presentation

- README:
  - Is it clear what the project does, how to set it up and run it, and which technologies are used?
- Presentation:
  - Respecting the 7–10 minute time frame,
  - Clearly showing the main screens (live demo or video/gif),
  - Briefly mentioning the contributions of each team member,
  - Discussing ideas for future work.

---

## 6. Optional / Bonus Aspects

The following items are **not mandatory**, but if present they add extra value and may positively affect the evaluation:

- **Tests:**
  - Basic unit tests or widget tests.
- **Use of platform features:**
  - Camera, location, notifications, sensors, offline mode, etc.
- **Clean code & best practices:**
  - Avoiding magic numbers, meaningful function and variable names, sensible use of comments.
- **Internationalization (i18n):**
  - Multi-language support (e.g., TR/EN).
- **Accessibility:**
  - Attention to accessibility principles such as screen reader support, contrast, button sizes, etc.

---

## 7. Academic Integrity & Originality Statement

Within the scope of this project, each student is assumed to **accept and declare** the following:

- The project is **not a ready-made project belonging to another person or institution**; it has been developed entirely by the student.
- The project has **not** been outsourced to a third party (paid or unpaid), an agency, or a freelance developer.
- A substantial portion of the code and content does **not**:
  - Come from another student’s project, or
  - Consist of directly copied repositories from the internet (fork/clone + minor edits).  
  If tutorials or example projects are used, relevant **sources must be cited in the README**.

  * The student is expected to **understand and be able to explain** their own code.
- During and/or after the presentation, each student:
  - Should be able to answer questions about their own code and architecture.

**IMPORTANT:**

> “The code cannot be forked other repos or someone's project. Your idea may not be original, but your codes have to be original.”


---

## 8. Summary

The aim of this final project is not only to submit a working application but also to:

- Experience the mobile app development process,
- Apply Git and basic project management practices,
- Think in a user-centric way (UI/UX),
- Make architectural and data management decisions, even at a basic level.

You are encouraged to use this document as a **checklist** throughout the project.
