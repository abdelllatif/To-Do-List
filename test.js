let currentTaskItem = null;
const priorityColors = {
    P1: "bg-red-400",
    P2: "bg-orange-400",
    P3: "bg-green-400",
};

function toggleMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu && mobileMenu.classList.contains("translate-x-full")) {
        mobileMenu.classList.remove("translate-x-full");
    } else if (mobileMenu) {
        mobileMenu.classList.add("translate-x-full");
    }
}
function togglePopup() {
  const popup = document.getElementById("popup");
  if (popup.classList.contains("hidden")) {
      popup.classList.remove("hidden");
      popup.classList.add("animate-fadeIn");
  } else {
      popup.classList.remove("animate-fadeIn");
      popup.classList.add("animate-fadeOut");
      popup.addEventListener('animationend', () => {
          popup.classList.add("hidden");
          popup.classList.remove("animate-fadeOut");
      }, { once: true });
  }

}
function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const prioritySelect = document.getElementById("prioritySelect").value;
    const dueDateInput = document.getElementById("dueDateInput").value;
    const statusSelect = document.getElementById("statusSelect").value;
    const descriptionInput = document.getElementById("description").value;

    if (taskInput === "" || prioritySelect === "" || dueDateInput === "" || descriptionInput === "") {
        alert("Enter a task and select its priority and date!");
        return false;
    }

    const today = new Date().toISOString().split("T")[0];
    if (dueDateInput < today) {
        alert("Due date cannot be in the past!");
        return false;
    }

    if (currentTaskItem !== null) {
        currentTaskItem.querySelector(".task-name").innerText = taskInput;
        currentTaskItem.querySelector(".task-priority").innerText = `Priority: ${prioritySelect}`;
        currentTaskItem.querySelector(".task-due-date").innerText = `Due Date: ${dueDateInput}`;
        currentTaskItem.querySelector(".task-description").innerText = descriptionInput;
        currentTaskItem.className = `p-2 rounded-md shadow-md flex justify-between items-center ${priorityColors[prioritySelect]}`;
        moveTaskToList(currentTaskItem, statusSelect);
        currentTaskItem = null;
    } else {
        const taskItem = document.createElement("li");
        taskItem.className = `p-2 rounded-md shadow-md flex justify-between items-center ${priorityColors[prioritySelect]}`;
        taskItem.innerHTML = `
            <div class="flex-1" onclick="toggleDescription(this)">
              <span class="task-name">${taskInput}</span>
               <div class="task-details hidden">
               <span class="task-description">${descriptionInput}</span><br>
                <span class="task-priority">Priority: ${prioritySelect}</span><br>
                 <span class="task-due-date">Due Date: ${dueDateInput}</span>
                </div>
            </div>
            <div class="space-x-2">
                <i class="bx bx-edit-alt cursor-pointer" onclick="editTask(this)" title="Edit Task"></i>
                <i class="bx bx-trash cursor-pointer text-red-600" onclick="removeTask(this)" title="Delete Task"></i>
            </div>
        `;
        moveTaskToList(taskItem, statusSelect);
    }

    document.getElementById("taskInput").value = "";
    document.getElementById("prioritySelect").value = "";
    document.getElementById("dueDateInput").value = "";
    document.getElementById("statusSelect").value = "todo";
    document.getElementById("description").value = "";
    togglePopup();
}

function toggleDescription(taskDiv) {
    const details = taskDiv.querySelector(".task-details");
    if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
    } else {
        details.classList.add("hidden");
    }
}

function editTask(icon) {
    currentTaskItem = icon.closest("li");
    const taskName = currentTaskItem.querySelector(".task-name").innerText;
    const taskPriority = currentTaskItem.querySelector(".task-priority").innerText.split(": ")[1];
    const taskDueDate = currentTaskItem.querySelector(".task-due-date").innerText.split(": ")[1];
    const taskDescription = currentTaskItem.querySelector(".task-description").innerText;
    const taskStatus = currentTaskItem.parentElement.id.replace("List", "");

    document.getElementById("taskInput").value = taskName;
    document.getElementById("prioritySelect").value = taskPriority;
    document.getElementById("dueDateInput").value = taskDueDate;
    document.getElementById("statusSelect").value = taskStatus;
    document.getElementById("description").value = taskDescription;

    togglePopup();
}

function removeTask(icon) {
    const taskItem = icon.closest("li");
    taskItem.remove();
    updateCounters();
}

function moveTaskToList(taskItem, status) {
    const lists = {
        todo: "todoList",
        inProgress: "inProgressList",
        completed: "completedList",
    };
    const targetList = document.getElementById(lists[status]);
    if (targetList !== null) {
        targetList.appendChild(taskItem);
    }
    updateCounters();
}

function updateCounters() {
    document.getElementById("todoCount").innerText = `(${document.getElementById("todoList").children.length})`;
    document.getElementById("inProgressCount").innerText = `(${document.getElementById("inProgressList").children.length})`;
    document.getElementById("completedCount").innerText = `(${document.getElementById("completedList").children.length})`;
}
