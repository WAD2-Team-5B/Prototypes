// *FOR TESTING PURPOSES*
// this would be done on serverside using django
// we would then create a python dictionary and send it to the JS with JSON

let database;
await fetch("./test-data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then((json) => {
    database = json;
  })
  .catch((error) => {
    console.log(error);
  });

export class DatabaseSimulator {
  // this would be done using django
  static search(query) {
    let results = [];

    for (let user in database["users"]) {
      if (database["users"][user]["name"].startsWith(query)) {
        results.push([
          database["users"][user]["name"],
          database["users"][user]["profile"],
        ]);
      }
    }

    return results;
  }
}
