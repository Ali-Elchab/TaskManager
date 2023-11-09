let titleInput = document.getElementById("title-input");
let descriptionInput = document.getElementById("description-input");
let inputDate = document.getElementById("date");
let tasksList = document.getElementById("all-tasks");
let addButton = document.getElementById("add-to-do");
let completed = [];
addButton.addEventListener("click", addTask);

function addTask() {
  if (titleInput.value == "") {
    alert("You should input a title to create a task!");
  } else {
    tasksList.innerHTML += ` <div class="task" draggable="true">
        <h3 contenteditable="true" class="task-title" id="task-title">${titleInput.value} </h3>
        <p id="task-description" class="description-input" contenteditable="true">${descriptionInput.value}</p>
        <p class="display-date" contenteditable="true">Deadline: ${inputDate.value}</p>
        <button class="delete-button"> <i class="fa fa-trash" aria-hidden="true"></i>  </button>
        <button class="push-pin">📌</button>
        
    </div>`;

    descriptionInput.value = "";
    titleInput.value = "";
    inputDate.value = "";

    let deleteButtons = document.querySelectorAll(".delete-button");
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", function () {
        deleteButtons[i].parentElement.remove();
      });
    }

    let taskContainer = document.querySelectorAll(".task");
    for (let i = 0; i < taskContainer.length; i++) {
      taskContainer[i].addEventListener("dblclick", function () {
        if (taskContainer[i].style.order == "2") {
          taskContainer[i].style.cssText = "1";
        } else {
          taskContainer[i].style.cssText =
            "order:2; opacity:0.4; text-decoration:line-through;background-color:green";
          completed.push(taskContainer[i]);
          console.log(completed);
        }
      });
    }

    // Drag And Drop Functionality Starts
    taskContainer.forEach((item) => {
      item.addEventListener("dragstart", () => {
        item.classList.add("dragging");
      });
      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
      });
    });
    const initSortableList = (e) => {
      e.preventDefault();
      const draggingItem = tasksList.querySelector(".dragging");
      const siblings = [...tasksList.querySelectorAll(".task:not(.dragging")];
      let nextSibling = siblings.find((sibling) => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
      });
      tasksList.insertBefore(draggingItem, nextSibling);
    };
    tasksList.addEventListener("dragover", initSortableList);
    tasksList.addEventListener("dragend", (e) => e.preventDefault());
    // Drag And Drop Functionality Ends

    // Push Pin Functionality starts
    let pushPin = document.querySelectorAll(".push-pin");
    for (let i = 0; i < pushPin.length; i++) {
      pushPin[i].addEventListener("click", function () {
        if (taskContainer[i].style.order == "0") {
          taskContainer[i].style.order = "1";
          console.log("pushPin[i].style.order");
        } else {
          taskContainer[i].style.cssText = "order:0;";
          console.log(pushPin[i].style.order);
        }
      });
    }
    // Push Pin Functionality starts
  }
}
//=================================================================
