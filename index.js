let tasksContainerEl = document.getElementById("tasksContainer");

//3.creating a todolist and  multiple ToDo Items
let todoList=[
    {
        text:'Learn HTML',
        uniqueId:0
    },

    {
        text:'Learn CSS',
        uniqueId:1
    },

    {
        text:'Learn BootStrap',
        uniqueId:2
    },

    {
        text:'Learn JavaScript',
        uniqueId:3
    },

    {
        text:'Learn SQL',
        uniqueId:4
    },
    {
        text:'Learn NodeJs',
        uniqueId:5
    }

]

//6.The below Styles will get applyed when the fuction executes
function onTodoStatusChange(checkboxId,labelId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId)
    labelElement.classList.toggle('checked');
    /*if(checkboxElement.checked===true){
        labelElement.classList.add('checked');
    }
    else{
        labelElement.classList.remove('checked');
    }*/
}


//8.
function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    tasksContainerEl.removeChild(todoElement)
}

//2. Adding the created Todo  element to the function
function createAndAppendTodo(todo){
    let checkboxId = 'checkbox'+todo.uniqueId;
    let labelId = "label"+todo.uniqueId;
    let todoId = 'todos'+todo.uniqueId;

    //1.Creating a todo element
    let todoEl = document.createElement('li');
    todoEl.classList.add('task-item', 'd-flex', 'flex-row');
    todoEl.id = todoId;
    tasksContainerEl.appendChild(todoEl);

    //creating a checkbox;
    let checkboxEl = document.createElement('input');
    checkboxEl.type='checkbox';
    checkboxEl.classList.add('checkbox-input');
    checkboxEl.id = checkboxId;
    //checkboxEl.id=todo.uniqueId;
    todoEl.appendChild(checkboxEl);

    //5.whenever the checkbox And the label  is clicked/unclicked the following function will executes
    checkboxEl.onclick = function(){
        onTodoStatusChange(checkboxId,labelId);
    }

    //Creating a label Container
    let labelContainer = document.createElement('div');
    labelContainer.classList.add("item-container", "d-flex", "flex-row");
    todoEl.appendChild(labelContainer);

    //creating a label element
    let labelEl = document.createElement('label');
    labelEl.classList.add("checkbox-label");
    //labelEl.setAttribute('for',todo.uniqueId);
    labelEl.setAttribute('for', checkboxId);
    labelEl.id = labelId;
    labelEl.textContent = todo.text;
    labelContainer.appendChild(labelEl);

    //Creating a delete Icon container
    let delIconContainer = document.createElement('div');
    delIconContainer.classList.add('delIcon-container');
    labelContainer.appendChild(delIconContainer);


    //creating a delete icon
    let delIcon = document.createElement('i');
    delIcon.classList.add("fa-regular", "fa-trash-can", "delIcon");
    delIconContainer.appendChild(delIcon);
    //7.Delete's the entire list whenever the function executes
    delIcon.onclick=function(){
        onDeleteTodo(todoId);
    }
}

//4.Creating todoItems Using for...of Loop
for(let todo of todoList){
    createAndAppendTodo(todo)
}


