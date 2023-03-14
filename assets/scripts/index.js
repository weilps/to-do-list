const addButton = document.querySelector('input[type = "submit"]');
const form = document.querySelector("form");
const taskTextArea = document.querySelector('input[type = "text"]');
let taskNumber = 0;
let list = document.body.querySelector(".list");
let storedList = window.localStorage.getItem("taskList");
if (storedList != null) list.innerHTML += storedList;

// Update storage
const updateStorage = () => {
  window.localStorage.setItem("taskList", list.innerHTML);
};

// Target the div "task"
const targetTask = (e) => {
  let itemToTick;
  // target the div "task" no matter where you click
  if (e.target.id) {
    itemToTick = e.target;
  } else if (
    e.target.classList.contains("content") ||
    e.target.classList.contains("tickbox") ||
    e.target.classList.contains("bin")
  ) {
    itemToTick = e.target.parentNode;
  } else if (e.target.tagName.toLowerCase() === "img") {
    itemToTick = e.target.parentNode.parentNode;
  }
  return itemToTick;
};

// Add Task
const addTask = (id, content) => {
  list.innerHTML += `<div class="item unticked" id="${id}">
          <div class="tickbox">
            <img src="./assets/img/unticked.png" alt="unticked" />
          </div>
          <div class="content">${content}</div>
          <div class="bin"></div>`;
  updateStorage();
};

// Tick Task
const tickTask = (task) => {
  if (task.classList.contains("ticked")) {
    task.classList.add("unticked");
    task.classList.remove("ticked");
    task.querySelector(".tickbox").innerHTML = `
          <img src="./assets/img/unticked.png" alt="unticked" />
          `;
  } else {
    task.classList.add("ticked");
    task.classList.remove("unticked");
    task.querySelector(".tickbox").innerHTML = `
          <img src="./assets/img/ticked.png" alt="ticked" />
          `;
  }

  updateStorage();
};

// Remove Task
const removeTask = (task) => {
  task.remove();
  taskNumber--;
  const tasks = Array.from(list.children);
  tasks.forEach((t) => {
    t.id = "task" + (tasks.indexOf(t) + 1).toString();
  });
  updateStorage();
};

// Submit Button to add a task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  taskNumber++;
  addTask("task" + taskNumber.toString(), whattodo.value);
  taskTextArea.value = "";
});

// Click on the task
list.addEventListener("click", (e) => {
  let item = targetTask(e);
  if (e.target.classList.contains("bin")) {
    removeTask(item);
  } else {
    item ? tickTask(item) : null;
  }
});

// Bin appearance
list.addEventListener("mouseover", (e) => {
  let item = targetTask(e);
  item ? item.querySelector(".bin").classList.add("fly") : null;
});

list.addEventListener("mouseout", (e) => {
  let item = targetTask(e);
  item ? item.querySelector(".bin").classList.remove("fly") : null;
});
