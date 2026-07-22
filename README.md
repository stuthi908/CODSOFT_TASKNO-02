#  Task Master - To-Do List Application

A modern, responsive task management application built with **Vanilla JavaScript (ES6+), HTML5, and CSS3**. Designed to help users organize their daily activities efficiently with persistent client-side storage and an intuitive, interactive UI.


---

#Features

* **Full CRUD Operations:** Create, Read, Update (edit text & toggle completion status), and Delete tasks.
* **Data Persistence:** Utilizes browser `localStorage` to save tasks automatically so data remains after page refreshes.
* **Search & Filtering:** Instantly search tasks by keyword and filter by status (*All*, *Pending*, *Completed*).
* **Real-Time Metrics:** Live task counters tracking pending and completed task totals.
* **Dark Mode Support:** Theme toggle that remembers user preference across sessions.
* **Task Metadata:** Support for task categories (*Personal*, *Work*, *Study*), due dates, and color-coded priority levels (*High*, *Medium*, *Low*).
* **Responsive Layout:** Fully optimized for mobile, tablet, and desktop viewports.

---

# Tech Stack

* **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox)
* **Logic & State:** JavaScript (ES6+, DOM Manipulation, LocalStorage API)
* **Icons & Fonts:** FontAwesome Icons, System Font Stack
* **Deployment:** GitHub Pages / Netlify / Vercel

---

# Project Structure

```text
├── index.html        # App layout, modal windows, and input forms
├── style.css         # Custom styling, dark mode CSS variables, responsive design
├── script.js        # Dynamic DOM manipulation, state management & LocalStorage logic
└── README.md         # Project documentation
