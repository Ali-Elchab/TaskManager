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
    const taskId = Date.now().toString();

    tasksList.innerHTML += ` <div class="task">
        <h3 contenteditable="true" class="task-title" id="task-title">${titleInput.value} </h3>
        <p id="task-description" class="description-input" contenteditable="true">${descriptionInput.value}</p>
        <div class="display-task-deadline">
            <p class="display-date" contenteditable="true">Deadline: ${inputDate.value}</p>
        </div>
        <button class="delete-button">
        <i class="fa fa-trash" aria-hidden="true"></i>    
        </button>
        
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
          taskContainer[i].style.cssText = "";
        } else {
          taskContainer[i].style.cssText =
            "order:2; opacity:0.4; text-decoration:line-through;background-color:green";
          completed.push(taskContainer[i]);
          console.log(completed);
        }
      });
    }
  }
}
