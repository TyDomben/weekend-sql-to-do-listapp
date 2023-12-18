console.log("JS is sourced!");
// todo  function list!
//// GETtodo
// addtodo
// clearform
// savetodo
// "todo"completed
// deletetodo
// append todo to table
// !
/**
 * DOM ELEMENTS
 */
let todoTBody = document.getElementById("viewtodos");
function gettodos() {
  // console.log( 'in gettodos' );
  // axios call to server to get todos

  axios({
    method: "GET",
    url: "/todos",
  })
    .then((response) => {
      // console.log(response.data);
      // send in the array of objects
      appendstodosToTable(response.data);
      // appendstodosToTable(todoArray);
    })
    .catch((error) => {
      console.log("whoops, there be an error in here!");
      console.error(error);
    });
} // ! end gettodos

//! addtodo
function addtodo(event) {
  event.preventDefault();

  let todo = {};
  //!have to match these values
  todo.text = document.getElementById("nameIn").value;
  (todo.isComplete = document.getElementById("Yes").checked),
    //!have to match these values
    console.log("todo:", todo);
  savetodo(todo);
}
// clearform

function clearForm() {
  document.getElementById("nameIn").value = "";
  document.getElementById("Yes").checked = false; // Assuming "Yes" is a checkbox
}

//

function savetodo(todoAdded) {
  console.log("We are checking what the inputs are", todoAdded);

  axios({
    method: "POST",
    url: "/todos",
    data: todoAdded,
  })
    .then(function (response) {
      console.log("savetodo()", response.data);
      gettodos();
      clearForm();
    })
    .catch(function (error) {
      console.log("Error in POST", error);
      alert("Unable to add todo at this time. Please try again later.");
    });
}
//
function todoisComplete(event) {
  console.log("incoming event.target", event.target);
  console.log(
    "Getting dataset from component",
    event.target.closest("tr").dataset.id
  );

  // Retrieving data that has been stored on an element
  let todoId = event.target.closest("tr").dataset.id;

  axios
    .put(`/todos/${todoId}`)
    .then((response) => {
      gettodos();
    })
    .catch((error) => {
      console.log("Error", error);
      alert("Something went wrong");
    });
}
//delete event

function deletetodo(event) {
  const id = event.target.closest("tr").dataset.id;
  console.log("id of row to delete:", id);

  axios({
    method: "DELETE",
    url: `/todos/${id}`,
  })
    .then((response) => {
      console.log("response:", response.data);
      // refresh the table
      gettodos();
    })
    .catch((error) => {
      console.log("whoops, there be an error in here!");
      console.error(error);
    });
}
//
//

function appendstodosToTable(arrayOftodos) {
  todoTBody.innerHTML = "";
  for (let todo of arrayOftodos) {
    todoTBody.innerHTML += `<tr data-id="${todo.id}">
        <td>${todo.text}</td>
        <td>${todo.isComplete ? "Complete" : "Incomplete"}</td>
        <td><button onclick="deletetodo(event)">Delete</button></td>
        <td><button onclick="todoisComplete(event)">Complete</button></td>
      </tr>`;
  }
}
gettodos();
// savetodo();
