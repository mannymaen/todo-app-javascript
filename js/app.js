let isAddTaskBtnDisabled = true;
let body = document.getElementsByTagName('BODY')[0];
let taskInput = document.getElementById('input-task');
let addTaskBtn = document.getElementById('add-task-btn');
let tasksList = document.getElementsByClassName('list-group')[0];
let progressbar = document.getElementsByClassName('progress-bar')[0];
let iconInfo = document.getElementsByClassName('fa-info-circle')[0];
let modal = document.getElementById('instructionModal');
let closeModalBtn = document.getElementsByClassName('close')[0];
closeModalBtn.addEventListener('click', () => {
    body.classList.remove('modal-open');
    modal.classList.remove('show', 'd-block');
    modal.classList.add('d-none');
});
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

    let trashIcon = document.createElement('i')
    trashIcon.classList.add('far', 'fa-trash-alt');

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('name', task.id);
    deleteBtn.appendChild(trashIcon);

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

let updateProgressbar = () => {
    let completedTasks = tasks.filter(elTask => elTask.completed);
    let percentage = (completedTasks.length * 100) / tasks.length
    progressbar.style.width = isNaN(percentage) ? '0%' : `${percentage}%`;
}

let updateTasksView = () => {
    tasks.forEach(createTaskListItem);
    setEventListenerToTasks();
    updateProgressbar();
}

let setEventListenerToTasks = () => {
    let taskCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTasks);
    });

    let taskButtons = document.querySelectorAll('ul > li > div.input-group > div.input-group-append > button');
    taskButtons.forEach(taskbBtn => {
        taskbBtn.addEventListener('click', (event) => {
            updateTasks(event, 'delete');
        });
    });

    let taskItemsInput = document.querySelectorAll('ul > li > div.input-group > input');
    taskItemsInput.forEach(taskItem =>??{
        taskItem.addEventListener('dblclick', (event) => {
            event.target.toggleAttribute('readonly');
        });
        taskItem.addEventListener('blur', updateTasks);
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
    updateTasksView();
}

addTaskBtn.addEventListener('click', () => {
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

iconInfo.addEventListener('click', () => {
    console.log('abrir modal');
    body.classList.add('modal-open');
    modal.classList.add('d-block');
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
})


init();