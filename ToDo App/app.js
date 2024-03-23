
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC7ghsDHo4Tt7XoCDDXt0dHVXx2afqDy9o",
  authDomain: "todo-app-for-fmp-c1f06.firebaseapp.com",
  databaseURL: "https://todo-app-for-fmp-c1f06-default-rtdb.firebaseio.com",
  projectId: "todo-app-for-fmp-c1f06",
  storageBucket: "todo-app-for-fmp-c1f06.appspot.com",
  messagingSenderId: "335476020641",
  appId: "1:335476020641:web:43fab1207116f38070e7e0",
  measurementId: "G-DKEWWNVR78"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

function addTodoItem(todoText) {
  const todosRef = ref(db, 'todos');
  push(todosRef, {
    text: todoText
  })
  .then(() => {
    console.log('Todo item added successfully');
  })
  .catch((error) => {
    console.error('Error adding todo item: ', error);
  });
}


function deleteTodoItem(key) {
  const todoRef = ref(db, 'todos/' + key);
  remove(todoRef)
  .then(() => {
    console.log('Todo item deleted successfully');
  })
  .catch((error) => {
    console.error('Error deleting todo item: ', error);
  });
}

document.querySelector('.add-button').addEventListener('click', () => {
  const todoText = document.getElementById('todoText').value.trim();
  if (todoText !== '') {
    addTodoItem(todoText);
    document.getElementById('todoText').value = '';
    document.getElementById('Alert').textContent = '';
  } else {
    document.getElementById('Alert').textContent = 'Please enter a ToDo item';
  }
});


document.querySelector('.delete-button').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.todo-checkbox:checked');
  checkboxes.forEach((checkbox) => {
    const key = checkbox.getAttribute('data-key');
    deleteTodoItem(key);
  });
});

document.querySelector('.delete-all-button').addEventListener('click', () => {
  const listItemsRef = ref(db, 'todos');
  remove(listItemsRef)
  .then(() => {
    console.log('All todo items deleted successfully');
  })
  .catch((error) => {
    console.error('Error deleting all todo items: ', error);
  });
});

const listItemsRef = ref(db, 'todos');
onValue(listItemsRef, (snapshot) => {
  const data = snapshot.val();
  const listItems = document.getElementById('list-items');
  listItems.innerHTML = '';
  for (let key in data) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" class="todo-checkbox" data-key="${key}">
      <span>${data[key].text}</span>
    `;
    listItems.appendChild(listItem);
  }
});
