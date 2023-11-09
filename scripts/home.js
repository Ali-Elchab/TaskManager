let titleInput = document.getElementById("title-input");
let descriptionInput = document.getElementById("description-input");
let inputDate = document.getElementById("date");
let tasksList = document.getElementById("all-tasks");
let addButton = document.getElementById("add-to-do");

addButton.addEventListener("click", addTask);

function addTask() {
  if (titleInput.value == "") {
    alert("You should input a title to create a task!");
  } else {
    tasksList.innerHTML += ` <div class="task">
        <h3 contenteditable="true" class="task-title" id="task-title">${titleInput.value} </h3>
        <p id="task-description" class="description-input" contenteditable="true">${descriptionInput.value}</p>
        <div class="display-task-deadline">
            <p class="display-date" contenteditable="true">Deadline: ${inputDate.value}</p>
        </div>
        <button class="delete-button">
        <i class="fa fa-trash" aria-hidden="true"></i>    
        </button>
        <input class="checkbox" type="checkbox" id="task-check">
        
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

    let checkbox = document.querySelectorAll(".checkbox");
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].addEventListener("change", function () {
        if (this.checked) {
          checkbox[i].parentElement.style.order = "2";
        } else {
          checkbox[i].parentElement.style.order = "0";
        }
      });
    }
  }
}
