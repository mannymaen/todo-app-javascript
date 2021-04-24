let taskInput = document.getElementById('input-task');
let addTaskBtn = document.getElementById('add-task-btn');
let tasksList = document.getElementsByClassName('list-group')[0];

let tasks = [
]

let createTaskListItem = (task) => {

    let li = document.createElement('li');
    li.classList.add('list-group-item', 'pl-0');

    let div = document.createElement('div');
    div.classList.add('form-group', 'form-check', 'mb-0');

    let input = document.createElement('input');
    input.classList.add('form-check-input');
    input.setAttribute('type', 'checkbox');

    let label = document.createElement('label');
    label.classList.add('form-check-label');
    label.innerText = task;

    div.appendChild(input);
    div.appendChild(label);
    li.appendChild(div);
    tasksList.appendChild(li);
}

let clearChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

addTaskBtn.addEventListener('click', (event) => {
    tasks.push({
        name: taskInput.value
    });
    clearChildren(tasksList);
    updateTasksView();
    taskInput.value = '';
});

let updateTasksView = () => {
    tasks.forEach(task => {
        createTaskListItem(task.name);
    });
}

let init = () => {
    updateTasksView(tasks);
}

init();