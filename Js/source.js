class ToDoItem {
  constructor(label) {
    this.label = label;
    this.iscompleted = false;
  }

  toggle() {
    this.iscompleted = !this.iscompleted;
  }
}

class AppModel {
  constructor(todo = []) {
    this.todoItems = todo;
    this.filter = "All";
  }

  addItem(todoItem) {
    this.todoItems.push(todoItem);
  }

  deleteItem(index) {
    this.todoItems.splice(index, 1);
    this.render();
  }

  count() {
    let array = this.todoItems.filter((item) => !item.iscompleted);
    return array.length;
  }

  divTogglerStrike(div, todoLabel) {
    todoLabel.style.textDecoration = "line-through";
    div.style.backgroundColor = "black";
  }

  divTogglerRemoveStrike(div, todoLabel) {
    todoLabel.style.textDecoration = "none";
  }

  selectedFilterStyles() {
    if (this.filter === "All") {
      document.getElementById("all").style.border = "1px solid #cccccc";
      document.getElementById("active").style.border = "none";
      document.getElementById("completed").style.border = "none";
    } else if (this.filter === "Active") {
      document.getElementById("all").style.border = "none";
      document.getElementById("active").style.border = "1px solid #cccccc";
      document.getElementById("completed").style.border = "none";
    } else if (this.filter === "Completed") {
      document.getElementById("all").style.border = "none";
      document.getElementById("active").style.border = "none";
      document.getElementById("completed").style.border = "1px solid #cccccc";
    }
  }

  render() {
    this.selectedFilterStyles();
    document.getElementById("todo-list").innerHTML = "";
    for (let i in this.todoItems) {
      let li = document.createElement("li");
      li.className = "todostyle";
      let div = document.createElement("div");
      div.className = "check-box";
      let todoLabel = document.createElement("label");
      todoLabel.innerHTML = this.todoItems[i].label;
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "x";
      deleteButton.className = "x-button";

      deleteButton.onclick = () => {
        this.deleteItem(i);
      };

      if (this.todoItems[i].iscompleted) {
        this.divTogglerStrike(div, todoLabel);
      }

      div.addEventListener("click", (e) => {
        if (!this.todoItems[i].iscompleted) {
          this.divTogglerStrike(div, todoLabel);
        } else {
          this.divTogglerRemoveStrike(div, todoLabel);
        }
        this.todoItems[i].toggle();
        this.render();
      });

      li.appendChild(div);
      li.appendChild(todoLabel);
      li.appendChild(deleteButton);
      // document.getElementById("todo-list").appendChild(li);
      if (app.filter === "All") {
        document.getElementById("todo-list").appendChild(li);
      } else if (app.filter === "Active" && !this.todoItems[i].iscompleted) {
        document.getElementById("todo-list").appendChild(li);
      } else if (app.filter === "Completed" && this.todoItems[i].iscompleted) {
        document.getElementById("todo-list").appendChild(li);
      }
      document.getElementById("counter").innerHTML = this.count();
    }
    if (app.todoItems.length > "0") {
      document.getElementsByClassName("footer")[0].style.display = "flex";
    } else {
      document.getElementsByClassName("footer")[0].style.display = "none";
    }
  }
}

const app = new AppModel();

document.getElementById("new-todo").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let value = document.getElementById("new-todo").value;
    if (value === "") return;
    let item = new ToDoItem(value);
    app.addItem(item);
    app.render();
    document.getElementById("new-todo").value = "";
  }
});

document.getElementById("all").addEventListener("click", () => {
  app.filter = "All";
  app.render();
});

document.getElementById("active").addEventListener("click", () => {
  app.filter = "Active";
  app.render();
});

document.getElementById("completed").addEventListener("click", () => {
  app.filter = "Completed";
  app.render();
});

document.getElementById("clear-completed").addEventListener("click", () => {
  app.todoItems = app.todoItems.filter((item) => item.iscompleted === false);
  app.render();
});
