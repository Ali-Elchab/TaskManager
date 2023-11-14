let titleInput = document.getElementById("title-input");
let descriptionInput = document.getElementById("description-input");
let inputDate = document.getElementById("date");
let taskContainer = document.getElementById("all-tasks");
let addButton = document.getElementById("add-to-do");
let searchInput = document.getElementById("search");
let searchButton = document.getElementById("search-button");
let filterButton = document.getElementById("filter-button");
let options = document.getElementsByClassName("options")[0];
let completed = [];
let taskList = [];
let filter = [];

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
        <button class="push-pin"><img src="./Assets/push-pin.png" alt="">
        </button>
        
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
          let pushButton = taskList[i].querySelector(".push-pin");
          pushButton.innerHTML = '<img src="./Assets/push-pin.png">';
        } else {
          taskList[i].style.cssText = "order:0;";
          console.log(pushPin[i].style.order);
          let pushButton = taskList[i].querySelector(".push-pin");
          pushButton.innerHTML = '<img src="./Assets/push-pin (1).png">';
        }
      });
    }
    // Push Pin Functionality ends
  }
}

// Search functionality
searchButton.addEventListener("click", function () {
  let searchInputValue = searchInput.value.trim().toLowerCase(); // Convert to lowercase
  tasksShown = document.querySelectorAll(".task");
  if (filter.length != 0) {
    tasksShown = filter;
  }
  console.log(filter);

  for (let i = 0; i < tasksShown.length; i++) {
    let taskTitle = tasksShown[i]
      .getElementsByClassName("task-title")[0]
      .textContent.trim()
      .toLowerCase(); // Convert to lowercase

    if (taskTitle === searchInputValue || searchInputValue == "") {
      if (completed.includes(tasksShown[i])) {
        tasksShown[i].style.cssText =
          "order: 2; opacity: 0.4; text-decoration: line-through; background-color: green;";
      } else {
        tasksShown[i].style.cssText = "display:intial"; // Reset display property for included tasks
      }
    } else {
      tasksShown[i].style.cssText = "display:none;";
    }
  }
});
// Search functionality ends

// Filter Functionality
let counter = 1;
filterButton.addEventListener("click", function () {
  if (counter % 2 != 0) {
    // Create "completed" button
    let completedButton = createFilterButton("Completed", "completed-button");
    completedButton.addEventListener("click", function () {
      filterTasks("completed");
    });

    // Create "Active" button
    let activeButton = createFilterButton("Active", "active-button");
    activeButton.addEventListener("click", function () {
      filterTasks("active");
    });

    // Create "ShowAll" button
    let showAllButton = createFilterButton("Show All", "show-all-button");
    showAllButton.addEventListener("click", function () {
      filterTasks("all");
    });

    // Append buttons beside the filter icon
    options.appendChild(completedButton);
    options.appendChild(activeButton);
    options.appendChild(showAllButton);
  } else {
    clearFilterButtons();
  }
  counter++;
});

function createFilterButton(label, className) {
  let button = document.createElement("button");
  button.textContent = label;
  button.classList.add("filter-button", className);
  return button;
}

function filterTasks(status) {
  let active = document.querySelectorAll(".task");
  let activeArray = Array.from(active);

  let filteredTasks = activeArray.filter(function (task) {
    if (status === "completed") {
      return completed.includes(task);
    } else if (status === "active") {
      return !completed.includes(task);
    } else {
      return task;
    }
  });
  filter = filteredTasks;
  for (let i = 0; i < active.length; i++) {
    if (!filteredTasks.includes(active[i])) {
      active[i].style.cssText = "display:none;";
    } else {
      // Preserve styling for completed tasks
      if (completed.includes(active[i])) {
        active[i].style.cssText =
          "order: 2; opacity: 0.4; text-decoration: line-through; background-color: green;";
      } else {
        active[i].style.cssText = ""; // Reset display property for included tasks
      }
    }
  }
}

function clearFilterButtons() {
  let existingButtons = document.querySelectorAll(".filter-button");
  existingButtons.forEach((button) => button.remove());
}
// Filter Functionality ends

//=================================================================
