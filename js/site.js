$(function(){
    prepareLocalStorage();
    listTask(getLocalStorage());

    //trigger tootips on hover
    $('[data-toggle="tooltip"]').tooltip({trigger : 'hover'})

    $("#taskCount").text(`Current Tasks (${getTaskCount()})`);
});

function prepareLocalStorage(){
    if(getLocalStorage() == null)
        setLocalStorage(new Array());
}

function createTask(formData){
    let dateDue = formData[2].value == "" ?
        new Date() :
        new Date(`${formData[2].value} 00:00`);

    let task = {
        id: generateId(),
        created: new Date(),
        completed: false,
        title: formData[1].value,
        dueDate: dateDue
    }

        let tasks = getLocalStorage();
        tasks.push(task);

    setLocalStorage(tasks);
    listTask(tasks);
}


function saveTask(task){
    let taskData = getLocalStorage();
    taskData.tasks.push(task);
    setLocalStorage(taskData);
}

function listTask(taskList){
    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");
    
    
    resultsBody.innerHTML = "";
    for (let row = 0; row < taskList.length; row++) {
        const taskRow = document.importNode(template.content, true);

        if(taskList[row].completed)
            taskRow.getElementById("taskRow").setAttribute("class", "complete");

        taskRow.getElementById("idNumber").textContent = taskList[row].idNumber;
        taskRow.getElementById("title").textContent = taskList[row].title;
        taskRow.getElementById("created").textContent = renderDate(taskList[row].created);
        taskRow.getElementById("dueDate").textContent = renderDate(taskList[row].dueDate);
        taskRow.getElementById("tdBtn").setAttribute("data-id", taskList[row].id); 

        resultsBody.appendChild(taskRow);
    }
}

function deleteTask(element){
    clearToolTip();

    let index = getIndex(element);
    let tasks = getLocalStorage();
    tasks.splice(index, 1);
    setLocalStorage(tasks);
    listTask(getLocalStorage());
}

function completeTask(element){
    clearToolTip();
    
    let taskId = getTaskId(element);
    let tasks = getLocalStorage();
    let task = tasks.find(t=> t.id == taskId);
    task.completed = true;
    setLocalStorage(tasks);
    listTask(getLocalStorage());
}

function getIndex(element){
    let taskId = getTaskId(element);
    let tasks = getLocalStorage();
    return tasks.findIndex(t => t.id == taskId);
}

function generateId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxx'.replace(/[xy]/g, function (c){
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
    });
}

function getTaskCount(taskData){
    return taskData.length;
}

function renderDate(dateString){
    let date = new Date(dateString);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options)
}

function getTaskId(element){
    let taskId = $(element).parent().attr("data-id");
    return taskId;
}

function getTask(element){
    let taskId = getTaskId(element);
    return tasks.find(t => t.id == taskId);
}
function getLocalStorage(){
    return JSON.parse(localStorage.getItem("taskData"));
}

function setLocalStorage(taskData){
    localStorage.setItem("taskData", JSON.stringify(taskData));
}

function clearToolTip(){
    $("div.tooltip").hide();
}

function triggerCustomAlert(title, message){

}

function popEditModal(element){

}

function clearTasks(){
    setLocalStorage(new Array());
    listTask();
}