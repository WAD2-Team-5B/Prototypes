let btnsDifficulty = document.getElementsByClassName("btn-difficulty");

function resetStyle() {
  for (let i = 0; i < btnsDifficulty.length; i++) {
    btnsDifficulty[i].classList.remove("btn-difficulty-active");
  }
}

function setDifficulty(btn) {
  resetStyle();

  document.getElementById("difficulty").value = btn.value;

  btn.classList.add("btn-difficulty-active");
}

function init() {
  // setting button event listeners
  for (let i = 0; i < btnsDifficulty.length; i++) {
    btnsDifficulty[i].onclick = function () {
      setDifficulty(btnsDifficulty[i]);

      return false;
      // dont submit form
    };
  }

  // form validation
  let form = document.getElementById("form-recipe");
  form.onsubmit = () => {
    let difficulty = document.getElementById("difficulty").value;
    if (difficulty === "") {
      // prob change this to a more aesthetic alert
      alert("Please select a difficulty");
      return false;
    }

    return true;
  };
}

init();
