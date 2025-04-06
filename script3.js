// Mock Data (Replace with actual data fetching from database)
let tasks = [
    { id: 1, title: "Task 1", description: "Description 1", dueDate: "2024-03-15", assignee: "user1", priority: "high", status: "current" },
    { id: 2, title: "Task 2", description: "Description 2", dueDate: "2024-03-20", assignee: "user2", priority: "medium", status: "deferred" },
    { id: 3, title: "Task 3", description: "Description 3", dueDate: "2024-03-25", assignee: "user1", priority: "low", status: "completed" }
];

let taskHistory = []; // Array to store task history

let currentTaskSection = "current"; // Default task section

// Function to show tasks in a given section
function showTasks(section) {
    currentTaskSection = section;
    renderTaskGrid(section);
}

// Function to render task tiles
function renderTaskGrid(section) {
    const taskGrid = document.getElementById("taskGrid");
    taskGrid.innerHTML = ""; // Clear existing tiles

    const filteredTasks = tasks.filter(task => task.status === section);

    filteredTasks.forEach(task => {
        const taskTile = document.createElement("div");
        taskTile.classList.add("task-tile");
        taskTile.innerHTML = `
            <h3>${task.title}</h3>
            <p>Due Date: ${task.dueDate}</p>
            <p>Assignee: ${task.assignee}</p>
            <p>Priority: ${task.priority}</p>
            <div class="context-menu">
                <ul>
                    <li onclick="editTask(${task.id})">Edit</li>
                    <li onclick="deleteTask(${task.id})">Delete</li>
                    ${getContextMenuStatusOptions(task)}
                </ul>
            </div>
        `;
        taskTile.addEventListener('click', () => showTaskContent(task.id)); // Show the task content when the tile is clicked
        taskGrid.appendChild(taskTile);
    });

    updateTaskCounts(); // Update task counts after rendering
}

function getContextMenuStatusOptions(task) {
    let options = "";

    if (task.status === "current") {
        options += `<li onclick="changeTaskStatus(${task.id}, 'deferred')">Defer</li>
                    <li onclick="changeTaskStatus(${task.id}, 'completed')">Complete</li>`;
    } else if (task.status === "deferred") {
        options += `<li onclick="changeTaskStatus(${task.id}, 'completed')">Complete</li>
                    <li onclick="changeTaskStatus(${task.id}, 'current')">Return to Work</li>`;
    } else if (task.status === "completed") {
        options += `<li onclick="changeTaskStatus(${task.id}, 'current')">Return to Work</li>`;
    }

    return options;
}
// Function to change task status
function changeTaskStatus(taskId, newStatus) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        const task = tasks[taskIndex];
        const oldStatus = task.status;
        task.status = newStatus;
        taskHistory.push({ date: new Date(), user: "currentUser", task: task.title, event: `Status changed from ${oldStatus} to ${newStatus}` });
        renderTaskGrid(currentTaskSection);
    }
}

// Function to show the task editor for editing
function editTask(taskId) {
    // Implementation to populate the task editor with task data
    document.getElementById("taskEditor").style.display = "block";
}

// Function to delete a task
function deleteTask(taskId) {
    // Implementation to delete the task
    console.log("Deleting task with ID:", taskId);
}

// Function to show task history
function showHistory() {
    // Implementation to display the task history
    document.getElementById("taskHistory").style.display = "block";
}

// Function to update the task counts in the navigation
function updateTaskCounts() {
    const currentTaskCount = tasks.filter(task => task.status === "current").length;
    const deferredTaskCount = tasks.filter(task => task.status === "deferred").length;

    document.getElementById("currentTaskCount").innerText = currentTaskCount;
    document.getElementById("deferredTaskCount").innerText = deferredTaskCount;
}

//Show Tasks full content:
function showTaskContent(taskId) {
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    document.getElementById('taskContentTitle').innerText = task.title;
    document.getElementById('taskContentDescription').innerText = task.description;
    // Add additional code here to show Image and/or  the formatted Text
    document.getElementById('taskContentDisplay').style.display = 'block';
  }
}

// Hide Task
function hideTaskContent() {
  document.getElementById('taskContentDisplay').style.display = 'none';
}

// Initialize
updateTaskCounts();
showTasks(currentTaskSection);
