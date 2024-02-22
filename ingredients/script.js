const SPACER = "<<<SPACER>>>";

let ingredients = [];

let btn = document.getElementById("btn-add-ingredient");
btn.onclick = () => {
  let ingredientInput = document.getElementById("ingredient");
  let ingredient = ingredientInput.value;
  ingredientInput.value = "";

  // blank input or input already exists
  if (ingredient === "" || ingredients.includes(ingredient)) {
    return false;
  }

  ingredients.push(ingredient);

  let div = document.createElement("div");
  let deleteBtn = document.createElement("button");
  let text = document.createTextNode(ingredient);

  //   unicode for 'x' symbol
  deleteBtn.innerHTML = "&#10006";

  div.appendChild(deleteBtn);
  div.appendChild(text);
  document.getElementById("container-ingredients-list").appendChild(div);

  deleteBtn.onclick = () => {
    ingredients = ingredients.filter((elt) => elt !== ingredient);
    div.remove();
  };

  // to stop submission of the form
  return false;
};

let form = document.getElementById("form-recipe");
form.onsubmit = () => {
  // TODO - add validation

  document.getElementById("ingredients").value = ingredients.join(SPACER);
  // submit form
  return true;
};
