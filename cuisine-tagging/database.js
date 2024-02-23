// *FOR TESTING PURPOSES*
// this would be done on serverside using django

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

export const db = database;
