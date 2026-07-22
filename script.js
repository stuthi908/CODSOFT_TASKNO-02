document.addEventListener("DOMContentLoaded", () => {
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentFilter = "all";
    let editTaskId = null;

    // DOM Elements
    const taskForm = document.getElementById("task-form");
    const taskTitleInput = document.getElementById("task-title");
    const taskCategoryInput = document.getElementById("task-category");
    const taskPriorityInput = document.getElementById("task-priority");
    const taskDateInput = document.getElementById("task-date");
    const taskList = document.getElementById("task-list");
    const searchInput = document.getElementById("search-input");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const pendingCount = document.getElementById("pending-count");
    const completedCount = document.getElementById("completed-count");
    const themeToggle = document.getElementById("theme-toggle");

    // Modal Elements
    const editModal = document.getElementById("edit-modal");
    const editTitleInput = document.getElementById("edit-title");
    const saveEditBtn = document.getElementById("save-edit-btn");
    const cancelEditBtn = document.getElementById("cancel-edit-btn");

    
    if (localStorage.getItem("theme") === "dark") {
        document.body.setAttribute("data-theme", "dark");
    }

    
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.getAttribute("data-theme") === "dark";
        if (isDark) {
            document.body.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
    });

    
    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = taskTitleInput.value.trim();
        if (!title) return;

        const newTask = {
            id: Date.now(),
            title: title,
            category: taskCategoryInput.value,
            priority: taskPriorityInput.value,
            dueDate: taskDateInput.value,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();

        
        taskTitleInput.value = "";
        taskDateInput.value = "";
    });

    
    window.toggleTask = (id) => {
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveTasks();
    };

    
    window.deleteTask = (id) => {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
    };

    
    window.openEditModal = (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            editTaskId = id;
            editTitleInput.value = task.title;
            editModal.style.display = "flex";
        }
    };

    
    saveEditBtn.addEventListener("click", () => {
        const newTitle = editTitleInput.value.trim();
        if (newTitle && editTaskId) {
            tasks = tasks.map(t => t.id === editTaskId ? { ...t, title: newTitle } : t);
            editTaskId = null;
            editModal.style.display = "none";
            saveTasks();
        }
    });

    cancelEditBtn.addEventListener("click", () => {
        editModal.style.display = "none";
    });

    
    searchInput.addEventListener("input", renderTasks);

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    
    function renderTasks() {
        taskList.innerHTML = "";
        
        const searchQuery = searchInput.value.toLowerCase();

        
        let filteredTasks = tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchQuery);
            if (currentFilter === "pending") return !task.completed && matchesSearch;
            if (currentFilter === "completed") return task.completed && matchesSearch;
            return matchesSearch;
        });

        
        const pending = tasks.filter(t => !t.completed).length;
        const completed = tasks.filter(t => t.completed).length;
        pendingCount.textContent = pending;
        completedCount.textContent = completed;

        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 1rem;">No tasks found.</p>`;
            return;
        }

        filteredTasks.forEach(task => {
            const li = document.createElement("li");
            li.className = `task-item ${task.completed ? "completed" : ""}`;

            li.innerHTML = `
                <div class="task-details">
                    <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})">
                    <div class="task-info">
                        <span class="task-text">${task.title}</span>
                        <div class="task-meta">
                            <span>📂 ${task.category}</span>
                            ${task.dueDate ? `<span>📅 ${task.dueDate}</span>` : ""}
                            <span class="badge ${task.priority}">${task.priority}</span>
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="action-btn" onclick="openEditModal(${task.id})"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn delete" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            taskList.appendChild(li);
        });
    }

    
    renderTasks();
});