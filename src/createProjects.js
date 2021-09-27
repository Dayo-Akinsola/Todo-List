import id from './counter'

class TodoListItem {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id();
    }

    changePriority(){
        this.priority = !this.priority;
    }
}

class Project {
    constructor(projectName){
        this.projectName = projectName;
        this.todoListItemArray = [];
    }


    addTodoItem (title, description, dueDate, priority){
        const todoListItem = new TodoListItem(title, description, dueDate, priority);
        console.log(todoListItem);
        this.todoListItemArray.push(todoListItem);
    }

    /* 
        A todo item on the todo-list is removed from the array by passing the id of an item element
        removed from the DOM and matching it with the same item in the array.

    */
    removeTodoItem(id){
        if (this.todoListItemArray.length !== 0){
            for (let i = 0; i < this.todoListItemArray.length; i++){
                if (this.todoListItemArray[i].id === id){
                    this.todoListItemArray.splice(i, 1);
                }
            }
        }
    }
}

export { TodoListItem, Project }

