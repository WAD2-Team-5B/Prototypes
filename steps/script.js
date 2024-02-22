const SPACER = "<<<SPACER>>>";

let numSteps = 0;

// to ensure steps aren't jumbelled up after a deletion
function resetIDs() {
  let stepList = document.getElementById("list-steps");
  let steps = stepList.getElementsByTagName("textarea");

  for (let i = 0; i < steps.length; i++) {
    steps[i].id = "step-" + (i + 1);
    steps[i].placeholder = "Step " + (i + 1);
  }

  numSteps = steps.length;
}

// to dynamically resize textarea
function resizeTextArea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight - 6 + "px";
}

function createTextArea() {
  numSteps++;

  let stepList = document.getElementById("list-steps");
  let nextItem = document.createElement("li");
  let nextStep = document.createElement("textarea");

  // unicode arrow symbol
  nextItem.style.listStyleImage = "&#8614;";

  nextStep.id = "step-" + numSteps;
  nextStep.className = "step";
  nextStep.placeholder = "step " + numSteps;
  nextStep.rows = 1;

  nextItem.appendChild(nextStep);
  stepList.appendChild(nextItem);

  nextStep.oninput = () => {
    let step = nextStep.id.split("-")[1];

    resizeTextArea(nextStep);

    // step was deleted
    if (nextStep.value === "") {
      nextItem.remove();
      resetIDs();
      return false;
    }

    // next step already exists
    if (numSteps > step) {
      return false;
    }

    createTextArea();
  };
}

let form = document.getElementById("form-recipe");
form.onsubmit = () => {
  // TODO - add validation

  let stepsList = [];
  let stepList = document.getElementById("list-steps");
  let steps = stepList.getElementsByTagName("textarea");

  // the last step is always empty
  for (let i = 0; i < steps.length - 1; i++) {
    stepsList.push(steps[i].value);
  }

  document.getElementById("steps").value = stepsList.join(SPACER);

  // submit form
  return true;
};

createTextArea();
