let isAddTaskBtnDisabled = true;
let taskInput = document.getElementById('input-task');
let addTaskBtn = document.getElementById('add-task-btn');
let tasksList = document.getElementsByClassName('list-group')[0];
let tasks = [];

let getRandomId = () => {
    return Math.floor(Math.random() * 999999);
}

let toggleDisableAddTaskBtn = () => {
    addTaskBtn.toggleAttribute('disabled', isAddTaskBtnDisabled);
}

let createTaskListItem = (task) => {

    let li = document.createElement('li');
    li.classList.add('list-group-item', 'px-0');

    let divInputGroup = document.createElement('div');
    divInputGroup.classList.add('input-group');

    let divInputGroupPrepend = document.createElement('div');
    divInputGroupPrepend.classList.add('input-group-prepend');

    let divInputGroupAppend = document.createElement('div');
    divInputGroupAppend.classList.add('input-group-append');

    let divInputGroupText = document.createElement('div');
    divInputGroupText.classList.add('input-group-text');

    let inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.setAttribute('name', task.id);
    inputCheckbox.checked = task.completed;

    let inputTaskText = document.createElement('input');
    inputTaskText.classList.add('form-control');
    inputTaskText.setAttribute('type', 'text');
    inputTaskText.toggleAttribute('readonly');
    inputTaskText.name = task.id;
    inputTaskText.value = task.name;

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('name', task.id);
    deleteBtn.innerText = 'X'

    divInputGroupText.appendChild(inputCheckbox);
    divInputGroupPrepend.appendChild(divInputGroupText);
    divInputGroupAppend.appendChild(deleteBtn);

    li.appendChild(divInputGroup);
    divInputGroup.append(divInputGroupPrepend);
    divInputGroup.append(inputTaskText);
    if (task.completed) {
        divInputGroup.append(divInputGroupAppend);
    }
    tasksList.appendChild(li);
}

let clearChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let updateTasksView = () => {
    tasks.forEach(task => {
        createTaskListItem(task);
    });

    setEventListenerToTasks();
}

let setEventListenerToTasks = () => {
    let taskCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            updateTasks(event);
        });
    });

    let taskButtons = document.querySelectorAll('ul > li > div.input-group > div.input-group-append > button');
    taskButtons.forEach(taskbBtn => {
        taskbBtn.addEventListener('click', (event) => {
            updateTasks(event, 'delete');
        });
    });

    let taskItemsInput = document.querySelectorAll('ul > li > div.input-group > input');
    taskItemsInput.forEach(taskItem => {
        taskItem.addEventListener('dblclick', (event) => {
            event.target.toggleAttribute('readonly');
        });
        taskItem.addEventListener('blur', (event) => {
            updateTasks(event);
        });
    });
}

let updateTasks = (taskEvent, action = '') => {
    let taskIndexFound = tasks.findIndex(elTask => elTask.id === taskEvent.target.name)
    let taskFound = tasks.find(elTask => elTask.id === taskEvent.target.name);
    if (action === 'delete') {
        tasks.splice(taskIndexFound, 1);
    } else {
        if (taskEvent.target.type === 'checkbox') {
            taskFound.completed = taskEvent.target.checked;
        }

        if (taskEvent.target.type === 'text') {
            taskFound.name = taskEvent.target.value;
        }

        tasks.splice(
            taskIndexFound, 
            1, 
            taskFound
        );
    }
    clearChildren(tasksList);
    updateTasksView();
}


let init = () => {
    updateTasksView(tasks);
}

addTaskBtn.addEventListener('click', (event) => {
    tasks.push({
        id: 'task'+ getRandomId(),
        name: taskInput.value,
        completed: false
    });
    clearChildren(tasksList);
    taskInput.value = '';
    isAddTaskBtnDisabled = true;
    updateTasksView();
    toggleDisableAddTaskBtn();
});

taskInput.addEventListener('input', (event) => {
    isAddTaskBtnDisabled = event.target.value.length === 0;
    toggleDisableAddTaskBtn();
});


init();