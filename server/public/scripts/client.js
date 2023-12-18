console.log("JS is sourced!");
//
let todoTBody = document.getElementById("viewtodos");
function gettodos() {
  document.getElementById("todoForm").addEventListener("submit", addtodo);
  // GET request to retrieve and display todos
  axios({
    method: "GET",
    url: "/todos",
  })
    .then((response) => {
      appendstodosToTable(response.data);
    })
    .catch((error) => {
      console.log("whoops, there be an error in here!");
      console.error(error);
    });
} 
// Function to handle adding a new todo
function addtodo(event) {
    event.preventDefault();
    const todoText = document.getElementById("nameIn").value;
    const newTodo = { text: todoText, isComplete: false };
  
    axios.post("/todos", newTodo)
      .then(() => {
        gettodos();
        document.getElementById("nameIn").value = '';
      })
      .catch(error => console.error('Error in POST /todos', error));
  }
// clearform
function clearForm() {
  document.getElementById("nameIn").value = "";
  document.getElementById("Yes").checked = false; 
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
// Function to mark a todo as complete
function todoisComplete(event) {
    const id = event.target.closest("tr").dataset.id;
    axios.put(`/todos/complete/${id}`)
      .then(() => gettodos())
      .catch(error => console.error('Error in PUT /todos/complete', error));
  }
  // Retrieving data that has been stored on an element
//   let todoId = event.target.closest("tr").dataset.id;
//   axios
//     .put(`/todos/${todoId}`)
//     .then((response) => {
//       gettodos();
//     })
//     .catch((error) => {
//       console.log("Error", error);
//       alert("Something went wrong");
//     });
// }
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
// Function to append todos to the table
function appendstodosToTable(todos) {
    todoTBody.innerHTML = '';
    todos.forEach(todo => {
      const todoRow = `
        <tr data-id="${todo.id}" data-testid="toDoItem" class="${todo.isComplete ? 'completed' : ''}">
          <td>${todo.text}</td>
          <td>${todo.isComplete ? 'Complete' : 'Incomplete'}</td>
          <td>
            <button onclick="todoisComplete(event)" data-testid="completeButton">Complete</button>
            <button onclick="deletetodo(event)" data-testid="deleteButton">Delete</button>
          </td>
        </tr>`;
      todoTBody.innerHTML += todoRow;
    });
  }
  
gettodos();
