let tasksContainerEl = document.getElementById("tasksContainer");


//11.Storing the TODO List in LOCAL STORAGE WHEN THE BUTTON IS CLICKED
let saveBtnEl = document.getElementById("saveBtn");
saveBtnEl.onclick= function(){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

//12. Getting the Todo List from the From the LOCAL STORAGE
function getTodoListFromLocalStorage(){
    let stringifiedTodoList = localStorage.getItem('todoList');
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if(parsedTodoList===null){
        return[];
    }else{
        return parsedTodoList;
    }
}
let todoList = getTodoListFromLocalStorage();

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


//8.Delete's the Task
function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    tasksContainerEl.removeChild(todoElement)
    //removes the added list from local storage
    todoList.pop()
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

//10.Adds New todo list to the label when the button clicks

function onAddTodo(){
    let userInputElement = document.getElementById('todoInput');
    let userInputValue = userInputElement.value;
    if(userInputValue===''){
        alert('Enter a Valid Text');
        return;
    }
    let todosCount = todoList.length;
    todosCount = todosCount+1
    let newTodo = {
        text:userInputValue,
        uniqueId: todosCount
    };
    //Add the new todo to the Local Storage
    todoList.push(newTodo)
    createAndAppendTodo(newTodo);
    userInputElement.value="";
}

//4.Creating todoItems Using for...of Loop
for(let todo of todoList){
    createAndAppendTodo(todo)
}




//9.Calls  the next function (10) to add the todo list
let addTaskBtn  = document.getElementById("addTask");
addTaskBtn.onclick= function(){
    onAddTodo();
}