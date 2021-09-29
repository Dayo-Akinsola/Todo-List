import {taskId, projectId} from './counter'

class Task {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = taskId();
        this.complete = false;
    }

    changePriority(){
        this.priority = !this.priority;
    }

    setCompleteStatus(){
        this.complete = !this.complete;
    }
}

class Project {
    constructor(projectName){
        this.projectName = projectName;
        this.taskArray = [];
        this.id = projectId();
        // Makes the key of an Project's instance the same as its id
        projectsObject[this.id] = this;
    }


    addTask (title, description, dueDate, priority){
        const task = new Task(title, description, dueDate, priority);
        this.taskArray.push(task);
    }


    /* 
        A todo item on the todo-list is removed from the array by passing the id of an item element
        removed from the DOM and matching it with the same item in the array.

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

const projectsObject = {};

export { Task, Project, projectsObject }

