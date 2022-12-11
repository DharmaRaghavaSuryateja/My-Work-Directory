var state = 0;
var globalfilter = undefined;
class display {
  //value is for search and x is for filters...x is an object
  async render(value, x, sort) {
    console.log(sort);
    console.log(x);
    let valuee = value;
    //a,b are for fetching data from category table and since i am taking states they execute only once
    let a = await fetch("http://localhost:3333/random", {
      method: "post",
    });
    var b = await a.json();
    if (state == 0) {
      for (let i = 0; i < b.data.length; i++) {
        let option = document.createElement("input");
        option.className = "filter";
        option.name = "category";
        let span = document.createElement("span");
        let div = document.createElement("div");
        div.id = "dive";
        span.id = "span";
        option.type = "checkbox";
        option.value = b.data[i].category;
        option.innerHTML = b.data[i].category;
        span.innerHTML = b.data[i].category;
        div.appendChild(option);
        div.appendChild(span);
        document.getElementById("category").appendChild(div);
        state = 1;
      }
    }
    //response and data are for course data
    let response = await fetch("http://localhost:3333/teacher_courses", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
    });
    var data = await response.json();
    //sort

    if (typeof sort !== "undefined") {
      data.data.sort(function (a, b) {
        if (sort == "runningTime") {
          return a.runningTime - b.runningTime;
        } else if (sort == "rating") {
          return a.rating - b.rating;
        }
      });
      if (sort == "title") {
        data.data.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
      }
    }
    console.log(data.data);

    //if x is undefined it remove child of all data
    // if (typeof x == "undefined") {
    //   let div = document.getElementById("structure");
    //   while (div.firstChild) {
    //     div.removeChild(div.firstChild);
    //   }
    // }

    //if search value is there then the below loop executes
    if (typeof value !== "undefined") {
      let div = document.getElementsByName("cardClass");
      for (let i = 0; i < b.data.length; i++) {
        while (div[i].firstChild) {
          div[i].removeChild(div[i].firstChild);
        }
      }
      let layout = document.getElementById("layout");
      while (layout.firstChild) {
        layout.removeChild(layout.firstChild);
      }

      console.log(data);
      data.data = data.data.filter((item) => {
        return item.title.includes(valuee) === true;
      });
      console.log(data.data);
    }
    //if filters are there then x is a object and below loop executes

    if (typeof x !== "undefined") {
      let div = document.getElementsByName("cardClass");
      if (div.length != 0) {
        for (let i = 0; i < b.data.length; i++) {
          while (div[i].firstChild) {
            div[i].removeChild(div[i].firstChild);
          }
        }
        let layout = document.getElementById("layout");
        while (layout.firstChild) {
          layout.removeChild(layout.firstChild);
        }
      }

      if (x.rating) {
        data.data = data.data.filter((item) => {
          return item.rating > x.rating;
        });
      }

      if (typeof x.category !== "undefined") {
        data.data = data.data.filter((item) => {
          return x.category.includes(item.category);
        });
      }
      if (x.runningTime) {
        data.data = data.data.filter((item) => {
          return item.runningTime > x.runningTime;
        });
      }
    }

    document.getElementById("headingName").innerHTML = "Hi " + data.user.name;

    //printing of actual data
    for (let j = 0; j < b.data.length; j++) {
      let structure = document.createElement("div");
      structure.className = "flex flex-wrap -m-4";
      structure.setAttribute("name", "cardClass");
      let heading = document.createElement("div");
      let subHeading = document.createElement("div");
      let stat = 0;
      for (let i = 0; i < data.data.length; i++) {
        let card = document.createElement("form");
        card.method = "post";
        card.action = "http://localhost:3333/newCourseMiddle";
        card.className = "lg:w-1/4 md:w-1/2 p-4 w-full";
        let a = document.createElement("a");
        a.className = "block relative h-48 rounded overflow-hidden";
        let img = document.createElement("img");
        img.className = "object-cover object-center w-full h-full block";
        // let blobString = data.images[i]
        // console.log(blobString)
        // let bytes = new Uint8Array(blobString.data);
        // let binary = '';

        // for (let i = 0; i < bytes.byteLength; i++) {
        //   binary += String.fromCharCode(bytes[i]);
        // }

        // var base64String = window.btoa(binary);
        // console.log(base64String)

        // // Make a Blob from the bytes
        // let blob = new Blob([bytes], { type: 'image/bmp' });
        var base64 = btoa(
          new Uint8Array(data.images[i]).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        // img.src = `data:image/png;base64,${base64}`;
        // img.src = URL.createObjectURL(blob);
        img.src =
          "https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

        let cardbody = document.createElement("div");
        cardbody.className = "mt-4";
        let category = document.createElement("h3");
        category.className =
          "text-gray-500 text-xs tracking-widest title-font mb-1";
        category.innerHTML = data.data[i].category;
        let title = document.createElement("h2");
        title.className = "text-gray-900 title-font text-lg font-medium";
        title.innerHTML = data.data[i].title;
        let runningTime = document.createElement("p");
        runningTime.className = "mt-1";
        runningTime.innerHTML = data.data[i].runningTime + " hours";
        let rating = document.createElement("p");
        rating.className = "mt-1";
        // rating.innerHTML = data.data[i].rating + " star";
        for (let k = 0; k < data.data[i].rating; k++) {
          let icon = document.createElement("span");
          icon.innerHTML = '<i class="fa-regular fa-star"></i>';
          rating.appendChild(icon);
        }
        if (data.data[i].rating == 0) {
          rating.innerHTML = "No ratings";
        }
        cardbody.appendChild(category);
        cardbody.appendChild(title);
        cardbody.appendChild(runningTime);
        cardbody.appendChild(rating);
        let id = document.createElement("input");
        id.setAttribute("type", "hidden");
        id.setAttribute("name", "id");
        id.setAttribute("value", data.data[i].id);
        a.appendChild(img);
        card.appendChild(a);
        card.appendChild(cardbody);
        card.appendChild(id);
        if (b.data[j].category == data.data[i].category) {
          if (stat == 0) {
            subHeading.className = "subCardHeading";
            subHeading.innerHTML = b.data[j].category;
            stat = 1;
          }
          structure.appendChild(card);
          card.onclick = () => {
            card.submit();
          };
        }
      }
      heading.appendChild(subHeading);
      heading.appendChild(structure);
      document.getElementById("layout").appendChild(heading);
    }

    document.getElementById("navbarbtn").onclick = () => {
      let variable = 0;
      var ele = document.getElementsByClassName("filter");
      var x = {};
      let listOfCats = [];
      for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
          if (ele[i].name === "category") {
            listOfCats.push(ele[i].value);
            x[ele[i].name] = listOfCats;
          } else {
            x[ele[i].name] = ele[i].value;
          }
          variable = 1;
        }
      }
      globalfilter = x;
      if (variable !== 0) {
        let value = document.getElementById("site-search").value;
        console.log(value);

        app.render(value, x, document.getElementById("sorting").value);
      }
      if (variable == 0) {
        let value = document.getElementById("site-search").value;
        app.render(value, undefined, document.getElementById("sorting").value);
      }
    };
  }
}

let app = new display();
app.render();
document.getElementById("site-search").onchange = () => {
  if (true) {
    let value = document.getElementById("site-search").value;
    console.log(globalfilter);
    app.render(value, globalfilter, document.getElementById("sorting").value);
  }
};
function toggle() {
  document.getElementById("navbar").classList.toggle("active");
  document.getElementById("main").classList.toggle("active");
  document.getElementById("headerbelow").classList.toggle("active");
}
document.getElementById("clear").onclick = () => {
  globalfilter = undefined;
  let i = 0;
  while (document.getElementsByClassName("filter")[i]) {
    document.getElementsByClassName("filter")[i].checked = false;
    i++;
  }
  // document.getElementById("site-search").value = "";

  app.render(
    document.getElementById("site-search").value,
    undefined,
    undefined
  );
};
//sorting
document.getElementById("apply").onclick = () => {
  let value = document.getElementById("site-search").value;
  console.log(document.getElementById("sorting").value);
  app.render(value, globalfilter, document.getElementById("sorting").value);
};
