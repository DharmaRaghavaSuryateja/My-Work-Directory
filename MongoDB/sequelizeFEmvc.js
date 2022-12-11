class ToDoItem {
  constructor(list) {
    this.list = list;
    this.isCompleted = "false";
  }
}
class AppModel {
  constructor() {
    this.todoItems = [];
  }

  async addItem(todoItem) {
    const data = { list: todoItem.list, isCompleted: "false" };
    try {
      var result = await fetch("http://localhost:8000/addlist", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
    let datae = result.json();
    console.log(datae);
    this.render();
  }

  async deleteItem(id) {
    try {
      await fetch(`http://localhost:8000/delete/${id}`, {
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    }

    this.render();
  }

  async updatestatus(ide) {
    try {
      await fetch(`http://localhost:8000/update/${ide._id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(ide),
      });
    } catch (error) {
      console.log(error);
    }

    this.render();
  }
  ButtonBorder() {
    if (this.filter === "all") {
      document.getElementById("all").style.border = "1px solid #cccccc";
      document.getElementById("active").style.border = "none";
      document.getElementById("completed").style.border = "none";
    } else if (this.filter === "active") {
      document.getElementById("all").style.border = "none";
      document.getElementById("active").style.border = "1px solid #cccccc";
      document.getElementById("completed").style.border = "none";
    } else if (this.filter === "completed") {
      document.getElementById("all").style.border = "none";
      document.getElementById("active").style.border = "none";
      document.getElementById("completed").style.border = "1px solid #cccccc";
    }
  }

  async render() {
    this.ButtonBorder();
    let x;


    this.todoItems = [];
    document.getElementById("todo-list").innerHTML = "";
    try {
      var response = await fetch(`http://localhost:8000/hey/${app.filter}`);
    } catch (error) {
      console.log(error);
    }
    let data = await response.json();
    console.log(data.count);
    x = data.count;
    console.log(x);
    for (var i = 0; i < data.arrae.length; i++) {
      this.todoItems.push(data.arrae[i]);
    }
    console.log(this.todoItems);
    for (let i = 0; i < this.todoItems.length; i++) {
      let li = document.createElement("li");
      li.className = "todostyle";
      let div = document.createElement("div");
      div.className = "check-box";
      let todoLabel = document.createElement("label");
      todoLabel.innerHTML = this.todoItems[i].list;
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "x";
      deleteButton.className = "x-button";
      li.appendChild(div);
      li.appendChild(todoLabel);
      li.appendChild(deleteButton);
      document.getElementById("todo-list").appendChild(li);

      deleteButton.onclick = () => {
        this.deleteItem(this.todoItems[i]._id);
      };
      if (this.todoItems[i].isCompleted === "true") {
        todoLabel.style.textDecoration = "line-through";
        div.style.backgroundColor = "black";
      } else {
        todoLabel.style.textDecoration = "none";
        div.style.backgroundColor = "none";
      }

      div.onclick = () => {
        this.updatestatus(this.todoItems[i]);
      };
    }
    document.getElementById("todo-list").append(filters);

    counting.innerHTML = `${x} Items left`;
    return x;
  }
}

const app = new AppModel();

let pp = app.render();

let filters = document.createElement("ul");
filters.className = "filters";
let counting = document.createElement("div");
counting.className = "counting";
pp.then((item) => {
  counting.innerHTML = `${item} Items left`;
});
let alll = document.createElement("a");
alll.id = "all";
alll.innerHTML = "All";
let activee = document.createElement("a");
activee.id = "active";
activee.innerHTML = "Active";
let completedd = document.createElement("a");
completedd.id = "completed";
completedd.innerHTML = "Completed";
let clearcompletedd = document.createElement("a");
clearcompletedd.id = "clear-completed";
clearcompletedd.innerHTML = "Clear";
filters.append(counting);
filters.append(alll);
filters.append(activee);
filters.append(completedd);
filters.append(clearcompletedd);

// document.getElementsByClassName("footer")[0].append("filters");
// document.getElementsByClassName("container")[0].append(footer);

document.getElementById("new-todo").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let value = document.getElementById("new-todo").value;
    if (value === "") return;
    let item = new ToDoItem(value);
    app.addItem(item);

    document.getElementById("new-todo").value = "";
  }
});

alll.addEventListener("click", () => {
  app.filter = "all";
  app.render();
});

activee.addEventListener("click", () => {
  app.filter = "active";
  app.render();
});

completedd.addEventListener("click", () => {
  app.filter = "completed";
  app.render();
});

clearcompletedd.addEventListener("click", () => {
  fetch("http://localhost:8000/deleteall", {
    method: "POST",
  });
  app.render();
});
