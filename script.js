document.addEventListener("DOMContentLoaded", loadHabits);
//add habit
function addHabit() {
    let habitInput = document.getElementById("habitInput");
    let habitName = habitInput.value.trim();
    
    if (habitName === "") {
        alert("Please enter a habit name.");
        return;
    }

    let habitBody = document.getElementById("habitBody");
    let newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${habitName}</td>
        ${Array(7).fill('<td><input type="checkbox"></td>').join('')}
        <td><button class="remove-btn">Delete</button></td>
    `;

    habitBody.appendChild(newRow);
    habitInput.value = "";

    saveHabits();
}
//save habit
function saveHabits() {
    let habits = [];
    let rows = document.querySelectorAll("#habitBody tr");

    rows.forEach(row => {
        let habitName = row.cells[0].innerText;
        let checkboxes = row.querySelectorAll("input[type='checkbox']");
        let checkedValues = Array.from(checkboxes).map(checkbox => checkbox.checked);
        
        habits.push({ name: habitName, checked: checkedValues });
    });

    localStorage.setItem("habits", JSON.stringify(habits));
}
// load habit
function loadHabits() {
    let habitBody = document.getElementById("habitBody");
    let savedHabits = JSON.parse(localStorage.getItem("habits")) || [];

    savedHabits.forEach(habit => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${habit.name}</td>
            ${habit.checked.map((checked, i) => 
                `<td><input type="checkbox" ${checked ? "checked" : ""}></td>`).join('')}
            <td><button class="remove-btn">Delete</button></td>
        `;

        habitBody.appendChild(newRow);
    });

    addEventListeners();
}

function addEventListeners() {
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", saveHabits);
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            this.parentElement.parentElement.remove();
            saveHabits();
        });
    });
}

// Make sure checkboxes update local storage
document.addEventListener("change", event => {
    if (event.target.type === "checkbox") {
        saveHabits();
    }
});


// Load saved tasks and reminders when the page loads
document.addEventListener("DOMContentLoaded", loadSavedData);

//add a task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") return; // Prevent adding empty tasks
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    displayTasks();
}

//add a reminder
function addReminder() {
    let reminderInput = document.getElementById("reminderInput");
    let reminderText = reminderInput.value.trim();

    if (reminderText === "") return; // Prevent adding empty reminders

    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.push(reminderText);
    localStorage.setItem("reminders", JSON.stringify(reminders));

    reminderInput.value = "";
    displayReminders();
}

//display tasks
function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${task} <button class="delete-btn" onclick="deleteTask(${index})"> Delete </button>`;
        taskList.appendChild(li);
    });
}

//display reminders
function displayReminders() {
    let reminderList = document.getElementById("reminderList");
    reminderList.innerHTML = "";

    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.forEach((reminder, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${reminder} <button class="delete-btn" onclick="deleteReminder(${index})">Delete</button>`;
        reminderList.appendChild(li);
    });
}

//delete a task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

//delete reminder
function deleteReminder(index) {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.splice(index, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    displayReminders();
}

// Load saved data
function loadSavedData() {
    displayTasks();
    displayReminders();
}
