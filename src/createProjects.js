import { idGenerator  } from "./generateUniqueIds.js";
import { format } from 'date-fns';

class Task {
    constructor(title, notes, dueDate, priority){
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = idGenerator();
        tasksObject[this.id] = this;
        this.complete = false;
    }

    deleteTaskInstance(){
        tasksObject[this.id] = null;
        delete tasksObject[this.id];
    }

    formatDate(){
        const splitDate = this.dueDate.split('-');
        this.dueDate = format(new Date(splitDate[0], splitDate[1] - 1, splitDate[2]), 'dd/MM/yyyy');
    }

    separateDate(){
        const splitDate = this.dueDate.split('/');
        return splitDate;
    }
    
}

class Project {
    constructor(projectName){
        this.projectName = projectName;
        this.taskArray = [];
        this.id = idGenerator();
        // Makes the key of an Project's instance the same as its id
        projectsObject[this.id] = this;
    }


    addNewTask (title, notes, dueDate, priority){
        const task = new Task(title, notes, dueDate, priority);
        this.taskArray.push(task);
    }


    addTask (task){
        this.taskArray.push(task);
    }

    /* 
        A todo item on the todo-list is removed from the array by passing the id of an item element
        removed from the DOM and matching it with the same item in the array.
        @id represents Task instance id.
    */
    removeTask(id){
        if (this.taskArray.length !== 0){
            for (let i = 0; i < this.taskArray.length; i++){
                if (this.taskArray[i].id === id){
                    this.taskArray.splice(i, 1);
                }
            }
        }
    }

}

let projectsObject = {};
let tasksObject = {};

export { Task, Project, projectsObject, tasksObject }

