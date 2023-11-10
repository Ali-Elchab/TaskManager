let titleInput = document.getElementById("title-input");
let descriptionInput = document.getElementById("description-input");
let inputDate = document.getElementById("date");
let taskContainer = document.getElementById("all-tasks");
let addButton = document.getElementById("add-to-do");
let searchInput = document.getElementById("search");
let searchButton = document.getElementById("search-button");
let completed = [];
let taskList = [];
addButton.addEventListener("click", addTask);

function addTask() {
  if (titleInput.value == "") {
    alert("You should input a title to create a task!");
  } else {
    taskContainer.innerHTML += ` <div class="task" draggable="true">
        <h3 contenteditable="true" class="task-title" id="task-title">${titleInput.value} </h3>
        <p id="task-description" class="description-input" contenteditable="true">${descriptionInput.value}</p>
        <p class="display-date" contenteditable="true">Deadline: ${inputDate.value}</p>
        <button class="delete-button"> <i class="fa fa-trash" aria-hidden="true"></i>  </button>
        <button class="push-pin">📌</button>
        
    </div>`;

    descriptionInput.value = "";
    titleInput.value = "";
    inputDate.value = "";

    // Delete task functionaloty
    let deleteButtons = document.querySelectorAll(".delete-button");
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", function () {
        deleteButtons[i].parentElement.remove();
      });
    }
    // Delete task functionaloty ends

    // Complete task on double click Functionality Starts
    taskList = document.querySelectorAll(".task");
    for (let i = 0; i < taskList.length; i++) {
      taskList[i].addEventListener("dblclick", function () {
        if (taskList[i].style.order == "2") {
          taskList[i].style.cssText = "1";
        } else {
          taskList[i].style.cssText =
            "order:2; opacity:0.4; text-decoration:line-through;background-color:green";
          completed.push(taskList[i]);
        }
      });
    }
    // Complete task on double click  Functionality ends

    // Drag And Drop Functionality Starts
    taskList.forEach((item) => {
      item.addEventListener("dragstart", () => {
        item.classList.add("dragging");
      });
      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
      });
    });
    const initSortableList = (e) => {
      e.preventDefault();
      const draggingItem = taskContainer.querySelector(".dragging");
      const siblings = [
        ...taskContainer.querySelectorAll(".task:not(.dragging"),
      ];
      let nextSibling = siblings.find((sibling) => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
      });
      taskContainer.insertBefore(draggingItem, nextSibling);
    };
    taskContainer.addEventListener("dragover", initSortableList);
    taskContainer.addEventListener("dragend", (e) => e.preventDefault());
    // Drag And Drop Functionality Ends

    // Push Pin Functionality starts
    let pushPin = document.querySelectorAll(".push-pin");
    for (let i = 0; i < pushPin.length; i++) {
      pushPin[i].addEventListener("click", function () {
        if (taskList[i].style.order == "0") {
          taskList[i].style.order = "1";
          console.log("pushPin[i].style.order");
        } else {
          taskList[i].style.cssText = "order:0;";
          console.log(pushPin[i].style.order);
        }
      });
    }
    // Push Pin Functionality ends
  }
}

searchButton.addEventListener("click", function () {
  taskList = document.querySelectorAll(".task");
  let searchInputValue = searchInput.value.trim().toLowerCase(); // Convert to lowercase
  for (let i = 0; i < taskList.length; i++) {
    let taskTitle = taskList[i]
      .getElementsByClassName("task-title")[0]
      .textContent.trim()
      .toLowerCase(); // Convert to lowercase

    if (taskTitle === searchInputValue || searchInputValue == "") {
      taskList[i].style.cssText = "display:initial;";
    } else {
      taskList[i].style.cssText = "display:none;";
    }
  }
});

//=================================================================
