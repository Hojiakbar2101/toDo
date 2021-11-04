let add = document.querySelector(".add");
let edit = document.querySelector(".edit");
let warning = document.querySelector(".warning");
let input = document.querySelector(".input");
let color = document.querySelector(".color");
let family = document.querySelector(".family");
let wrapBoxes = document.querySelector(".wrapBoxes");
let arr = [];

let fontFamily = [
  { family: "Poppins" },
  { family: "Besley" },
  { family: "Fira Mono" },
  { family: "Inria Sans" },
  { family: "Kanit" },
  { family: "Montserrat" },
  { family: "Roboto" },
  { family: "Roboto Mono" },
  { family: "Space Grotesk" },
  { family: "Space Mono" },
  { family: "Ubuntu" },
];

let colors = [
  { id: 0, name: "White", color: "#fff" },
  { id: 1, name: "Yellow", color: "#ffff00" },
  { id: 2, name: "Blue", color: "#0000ff" },
  { id: 3, name: "Green", color: "#008000" },
  { id: 4, name: "Coral", color: "#ff7f50" },
  { id: 5, name: "Red", color: "#ff0000" },
  { id: 6, name: "Indigo", color: "#4b0082" },
];

fontFamily.forEach((item) => {
  let option = document.createElement("option");
  option.value = item.family;
  option.style.fontFamily = item.family;
  option.innerHTML = item.family;
  family.appendChild(option);
});

colors.forEach((item) => {
  let option = document.createElement("option");
  option.value = item.color;
  option.style.color = item.color;
  option.innerHTML = item.name;
  color.appendChild(option);
});

input.addEventListener("keyup", () => {
  warning.style.display = "none";
});

add.addEventListener("click", () => {
  let text = document.querySelector(".input").value;
  if (text != "") {
    let color = document.querySelector(".color").value;
    let family = document.querySelector(".family").value;
    let obj = { id: arr.length, text, color, family };
    arr.push(obj);
    draw();
    document.querySelector(".input").value = "";
  } else {
    warning.style.display = "block";
    return;
  }
});

function draw() {
  deleteBoxs();
  arr.forEach((item, i) => {
    let box = document.createElement("div");
    let text = document.createElement("h2");
    let editAndDelete = document.createElement("div");
    let editer = document.createElement("button");
    let deleteer = document.createElement("button");
    box.classList.add("box");
    editAndDelete.classList.add("editAndDelete");
    editer.classList.add("editer");
    deleteer.classList.add("deleteer");
    editer.classList.add("ok");
    deleteer.classList.add("ok");
    deleteer.setAttribute("onclick", `deleteBox(${i})`);
    editer.setAttribute("onclick", `editBox(${i})`);
    editer.innerHTML = `<i class="fas fa-pen"></i>`;
    deleteer.innerHTML = `<i class="fas fa-trash"></i>`;
    text.innerText = item.text;
    text.style.fontFamily = item.family;
    text.style.color = item.color;
    editAndDelete.appendChild(editer);
    editAndDelete.appendChild(deleteer);
    box.appendChild(text);
    box.appendChild(editAndDelete);
    wrapBoxes.appendChild(box);
  });
}

function deleteBoxs() {
  if (wrapBoxes.children.length > 0) {
    let box = document.querySelectorAll(".box");
    box.forEach((item) => {
      item.remove();
    });
  }
}

function deleteBox(i) {
  let box = document.querySelectorAll(".box")[i];
  box.classList.add('remove');
  // box.style.marginLeft = "-100px"
  setTimeout(() => {
    arr.splice(i, 1);
    draw();
    edit.style.display = "none";
    add.style.display = "block";
    document.querySelector(".input").value = "";
  }, 310);
}

let editBtn = document.querySelectorAll(".editer");
editBtn.forEach((item, i) => {
  item.addEventListener("click", () => {
    console.log(i);
  });
});

function editBox(i) {
  add.style.display = "none";
  edit.style.display = "block";
  document.querySelector(".input").value = arr[i].text;
  edit.setAttribute("id", i);
}

edit.addEventListener("click", () => {
  let i = document.querySelector(".edit").id;
  if (document.querySelector(".input").value != "") {
    arr[i].text = document.querySelector(".input").value;
    arr[i].family = document.querySelector(".family").value;
    arr[i].color = document.querySelector(".color").value;
    draw();
    add.style.display = "block";
    edit.style.display = "none";
    // console.log(i);
    document.querySelector(".input").value = "";
  } else {
    warning.style.display = "block";
    return;
  }
});
