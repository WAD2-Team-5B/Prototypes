// *TESTING PURPOSE ONLY*
// we would be getting this from django backend querying db
import { db } from "./database.js";

const SPACER = "<<<SPACER>>>";
let selectedCuisines = [];

function createCuisineTag(cuisine) {
  let div = document.createElement("div");
  let deleteBtn = document.createElement("button");
  let text = document.createTextNode(cuisine);

  div.id = cuisine;
  //   unicode for 'x' symbol
  deleteBtn.innerHTML = "&#10006";

  div.appendChild(deleteBtn);
  div.appendChild(text);
  document.getElementById("container-cuisine-selected").appendChild(div);

  deleteBtn.onclick = () => {
    document
      .getElementById("btn-cuisine-" + cuisine)
      .classList.remove("btn-cuisine-active");
    selectedCuisines = selectedCuisines.filter((elt) => elt !== cuisine);
    div.remove();
  };
}

function removeCuisineTag(cuisine) {
  let tag = document.getElementById(cuisine);
  tag.remove();
}

function generateCuisineBtns() {
  let cuisines = db.cuisines;
  for (let i = 0; i < cuisines.length; i++) {
    let cuisine = cuisines[i];

    let btn = document.createElement("button");
    btn.innerHTML = cuisine;
    btn.id = "btn-cuisine-" + cuisine;
    btn.classList.add("btn-cuisine");

    btn.onclick = () => {
      if (selectedCuisines.includes(cuisine)) {
        // user is deselecting cuisine
        removeCuisineTag(cuisine);
        btn.classList.remove("btn-cuisine-active");
        selectedCuisines = selectedCuisines.filter((c) => c !== cuisine);
        return false;
      }

      createCuisineTag(cuisine);
      btn.classList.add("btn-cuisine-active");
      selectedCuisines.push(cuisine);

      return false;
    };

    document.getElementById("container-cuisine-list").appendChild(btn);
  }
}

function init() {
  generateCuisineBtns();

  let form = document.getElementById("form-recipe");
  form.onsubmit = () => {
    document.getElementById("cuisines").value = selectedCuisines.join(SPACER);
    return true;
  };
}

init();
