// *FOR TESTING PURPOSES*
// this would be some query to the database
import { DatabaseSimulator } from "./database.js";

function resetUserList() {
  let list = document.getElementById("user-list");

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function createUserResult(user) {
  let result = document.createElement("a");

  result.className = "user";
  result.innerHTML = user.name;
  result.href = user.profile;

  document.getElementById("user-list").appendChild(result);
}

let search = document.getElementById("search");
search.oninput = () => {
  let query = search.value;

  // empty search query
  if (query === "") {
    resetUserList();
    return;
  }

  let results = DatabaseSimulator.search(query);

  if (results.length > 0) {
    resetUserList();

    results.forEach((dbUser) => {
      let user = { name: dbUser[0], profile: dbUser[1] };
      createUserResult(user);
    });
  }
  // no results found
  else {
    resetUserList();

    let text = document.createElement("p");
    text.className = "no-results";
    text.innerHTML = "no results";

    document.getElementById("user-list").appendChild(text);
  }
};
