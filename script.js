document.addEventListener("DOMContentLoaded", function () {
    loadReminders();
    applyTheme();
    setupThemeButtons();
    setupEventListeners();
    animateText();
});

// 🚀 Load reminders from localStorage
function loadReminders() {
    const reminderList = document.getElementById("reminderList");
    const noReminders = document.getElementById("noReminders");

    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    if (reminders.length > 0) {
        noReminders.style.display = "none";
        reminders.forEach(displayReminder);
    }
}

// 🎯 Add a new reminder (Subscription, Birthday, or Event)
document.getElementById("reminderForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    let type = document.getElementById("reminderType").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price")?.value || "N/A";
    let frequency = document.getElementById("frequency")?.value || "One-time";
    let date = document.getElementById("date").value;

    if (!name || !date) {
        alert("❌ Please fill out all required fields!");
        return;
    }

    let reminder = { type, name, price, frequency, date };
    saveReminder(reminder);
    displayReminder(reminder);
    showConfirmationMessage();
});

// 💾 Save reminder to localStorage
function saveReminder(reminder) {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.push(reminder);
    localStorage.setItem("reminders", JSON.stringify(reminders));
}

// 📌 Display a reminder in the list
function displayReminder(reminder) {
    let list = document.getElementById("reminderList");
    let li = document.createElement("li");
    let dueDate = new Date(reminder.date);
    let daysLeft = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));

    li.classList.add("reminder-item");
    li.innerHTML = `
        <strong>${reminder.name}</strong> - ${reminder.type}  
        ${reminder.price !== "N/A" ? `💰 ₹${reminder.price} (${reminder.frequency})` : ""}  
        📅 Date: ${reminder.date} (${daysLeft} days left)  
        <button class="delete-btn" onclick="deleteReminder('${reminder.name}')">❌</button>
    `;

    list.appendChild(li);

    if (daysLeft <= 3) {
        setTimeout(() => alert(`🚨 Reminder: ${reminder.name} is due soon!`), 1000);
    }
}

// ❌ Delete a reminder
function deleteReminder(name) {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders = reminders.filter(reminder => reminder.name !== name);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    location.reload();
}

// ✅ Show confirmation message
function showConfirmationMessage() {
    let message = document.getElementById("confirmationMessage");
    message.style.display = "block";
    message.innerText = "✅ Reminder saved! We will remind you on the required date.";
    setTimeout(() => { message.style.display = "none"; }, 3000);
}

// 🌗 Apply saved theme on page load
function applyTheme() {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }
}

// 🎨 Set up theme switching buttons
function setupThemeButtons() {
    document.getElementById("lightTheme")?.addEventListener("click", function () {
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
    });

    document.getElementById("darkTheme")?.addEventListener("click", function () {
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
    });
}

// 🔥 Set up event listeners (Navigation Fix)
function setupEventListeners() {
    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = this.getAttribute("href");
        });
    });
}

// 🎬 Animate text on load
function animateText() {
    document.querySelectorAll(".animated-text").forEach(text => {
        text.style.animation = "fadeInUp 1.5s ease-in-out";
    });
}
