let addButton = document.getElementById('add');
let inputTask = document.getElementById('new-task');
let unfinishedTasks = document.getElementById('unfinished-tasks');
let finishedTasks = document.getElementById('finished-tasks');


function createNewElement(task, finished) {
    let listItem = document.createElement('li');
    let checkbox = document.createElement('button');

    if(finished){
        checkbox.className = "icons checkbox";
        checkbox.innerHTML = "<i class='icons'>check_box</i>";
    }else {
        checkbox.className = "icons checkbox";
        checkbox.innerHTML = "<i class='icons'>check_box_outline_blank</i>";
    }


    let label = document.createElement('label');
    label.innerText = task;
    let input = document.createElement('input');
    input.type = "text";
    let editButton = document.createElement('button');
    editButton.className = "icons edit";
    editButton.innerHTML = "<i class='icons'>edit</i>";
    let deleteButton = document.createElement('button');
    deleteButton.className = "icons delete";
    deleteButton.innerHTML = "<i class='icons'>delete</i>";

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);

    return listItem;
}

function addTask() {
    if (inputTask.value) {
        let listItem = createNewElement(inputTask.value, false);
        unfinishedTasks.appendChild(listItem);
        bindTaskEvents(listItem, finishTask)
        inputTask.value = "";
    }
    save();
}
addButton.onclick = addTask;

function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    save();
}

function editTask() {
    console.log(2);
    let editButton = this;
    let listItem = this.parentNode;
    let label = listItem.querySelector('label');
    let input = listItem.querySelector('input[type=text]');

    let containsClass = listItem.classList.contains('editMode');

    if (containsClass) {
        label.innerText = input.value;
        editButton.className = "icons edit";
        editButton.innerHTML = "<i class='icons'>edit</i>";
        save();
    } else {
        input.value = label.innerText;
        editButton.className = "icons save";
        editButton.innerHTML = "<i class='icons'>save</i>";

    }
    listItem.classList.toggle('editMode');
}

function finishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "icons checkbox";
    checkbox.innerHTML = "<i class='icons'>check_box</i>";
    finishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
    save();
}

function unfinishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "icons checkbox";
    checkbox.innerHTML = "<i class='icons'>check_box_outline_blank</i>";

    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask)
    save();
}

function bindTaskEvents(listItem, checkboxEvent) {
    let checkbox = listItem.querySelector('button.checkbox');
    let editButton = listItem.querySelector('button.edit');
    let deleteButton = listItem.querySelector('button.delete');

    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;

}
function save() {

    var unfinishedTasksArr = [];
    for (let i = 0; i < unfinishedTasks.children.length; i++) {
        unfinishedTasksArr.push(unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText);
    }

    var finishedTasksArr = [];
    for (let i = 0; i < finishedTasks.children.length; i++) {
        finishedTasksArr.push(finishedTasks.children[i].getElementsByTagName('label')[0].innerText);
    }

    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify({
        unfinishedTasks: unfinishedTasksArr,
        finishedTasks: finishedTasksArr
    }));

}

function load(){
    return JSON.parse(localStorage.getItem('todo'));
}

var data=load();

for(let i=0; i<data.unfinishedTasks.length;i++){
    let listItem=createNewElement(data.unfinishedTasks[i], false);
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
}

for(let i=0; i<data.finishedTasks.length; i++){
    let listItem=createNewElement(data.finishedTasks[i], true);
    finishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
}

