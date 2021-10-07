import { Task, projectsObject, tasksObject } from './createProjects.js';
import { createTaskMainDetails, createTaskButtons, createDetailsContainer } from '../helpers/taskDomHelpers.js';
import { increaseSidebarHeight, showDetailsListener, displayEditTaskForm } from './pageEffects.js';
import { populateStorage } from './displayControl.js';


/*
    The function finds the project that the user wants to add
    a task to and adds it to that project.
*/
const addTaskMainPage = (task, project) => {
    const taskList = project.querySelector('.todo-list-items');

    const taskListItem = document.createElement('div');
    taskListItem.classList.add('todo-list-item');
    taskListItem.setAttribute('data-taskId', task.id);

    const summaryContainer = document.createElement('div');
    summaryContainer.classList.add('summary-container');
    taskListItem.appendChild(summaryContainer);

    const mainDetailsContainer = createTaskMainDetails(task);
    summaryContainer.appendChild(mainDetailsContainer);

    const editTaskButtons = document.createElement('div');
    editTaskButtons.classList.add('edit-task-buttons');
    const buttonArray = createTaskButtons();
    buttonArray.forEach(button => editTaskButtons.appendChild(button)); 
    summaryContainer.appendChild(editTaskButtons);

    const detailsContainer = createDetailsContainer(task);
    taskListItem.appendChild(detailsContainer);


    taskList.appendChild(taskListItem);

}

// Matches project id in the sidebar with the project id stored in the projectsObject to update tally
const updateTaskTally = (projectInstance) => {
    const sidebarProjects = document.querySelectorAll('.sidebar-project');
    
    sidebarProjects.forEach(sidebarProject => {
        if (sidebarProject.dataset.projectid === projectInstance.id){
            const taskTally = sidebarProject.querySelector('.task-tally');
            taskTally.textContent = projectInstance.taskArray.length;               
        }
    })
}

const newTasklistener = () => {
    const form = document.querySelector('#add-task-form');
    const formTitle = document.querySelector('#task-form-name');
    const formNotes = document.querySelector('#notes-form');
    const formDate = document.querySelector('#task-form-date');
    const cancelButton = document.querySelector('#cancel-task-button');
    const addTaskScreen = document.querySelector('.add-task-screen');


    form.addEventListener('submit', (event) => {
        const projects = document.querySelectorAll('.project-details');
        projects.forEach(project => {
            if (Array.from(project.classList).includes('active')){
                event.preventDefault();
                const projectInstance = projectsObject[project.dataset.projectid];
                const priority = document.querySelector('.priority-button.clicked');
                const task = new Task(formTitle.value, formNotes.value, formDate.value, priority.id);
                task.formatDate();
                projectInstance.addTask(task);
                addTaskMainPage(task, project);
                updateTaskTally(projectInstance);
        
                // reset form form after submitting
                formTitle.value = ''; formNotes.value = ''; formDate.value = '';
                addTaskScreen.style.display = 'none';
                project.classList.remove('active');

                increaseSidebarHeight();
            }
        })
        showDetailsListener();
        displayEditTaskForm();
        deleteTaskListener();
        populateStorage();
    })

    cancelButton.addEventListener('click', () => {
        const projects = document.querySelectorAll('.project-details');
        projects.forEach(project => {
            if (Array.from(project.classList).includes('active')){
                formTitle.value = ''; formNotes.value = ''; formDate.value = '';
                addTaskScreen.style.display = 'none';
                project.classList.remove('active');
            }
        })
    })
}

// Function to handle the editing of a task
const editTaskListener = () => {
    const form = document.querySelector('#add-task-form');
    const formTitle = document.querySelector('#task-form-name');
    const formNotes = document.querySelector('#notes-form');
    const formDate = document.querySelector('#task-form-date');
    const cancelButton = document.querySelector('#cancel-task-button');
    const editTaskScreen = document.querySelector('.add-task-screen');


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskItems = document.querySelectorAll('.todo-list-item');
        const clickedPriorityBtn = document.querySelector('.priority-button.clicked');

        taskItems.forEach(task => {
            if (Array.from(task.classList).includes('active')){
                // Changing the task details in the dom
                const taskName = task.querySelector('.todo-title');
                const taskNotes = task.querySelector('#todo-notes');
                const taskPriority = task.querySelector('#todo-priority');
                const taskDate = task.querySelector('#todo-date');

                // Reflecting the change in the instance of the Task class
                const taskInstance = tasksObject[task.dataset.taskid];
                taskInstance.title = formTitle.value;
                taskInstance.notes = formNotes.value;
                taskInstance.dueDate = formDate.value;
                taskInstance.formatDate();
                taskInstance.priority = clickedPriorityBtn.id;

                taskName.textContent = taskInstance.title;
                taskNotes.textContent = taskInstance.notes;
                taskPriority.textContent = `Priority: ${taskInstance.priority}`;
                taskDate.textContent = `Due: ${taskInstance.dueDate}`;

                // Stores the new task details in taskObject so they can be replaced in local storage
                const projectNode = task.parentNode.parentNode;
                const projectObject = projectsObject[projectNode.dataset.projectid];
                projectObject.taskArray.forEach(taskObject => {
                    if (taskObject.id === task.dataset.taskid){
                        taskObject.title = taskInstance.title;
                        taskObject.notes = taskInstance.notes;
                        taskObject.dueDate = taskInstance.dueDate;
                        taskObject.priority = taskInstance.priority;
                    }
                })

                // Reset form inputs and remove form
                formTitle.value = ''; formNotes.value = ''; formDate.value = '';
                task.classList.remove('active');
                editTaskScreen.classList.remove('edit-mode');
                editTaskScreen.style.display = 'none';
            }
        })
        populateStorage();
    })

    cancelButton.addEventListener('click', () => {
        const taskItems = document.querySelectorAll('.todo-list-item');
        taskItems.forEach(task => {
            if (Array.from(task.classList).includes('active')){
                formTitle.value = ''; formNotes.value = ''; formDate.value = '';
                task.classList.remove('active');
                editTaskScreen.classList.remove('edit-mode');
                editTaskScreen.style.display = 'none';

            }
        })
    })
}

const deleteTask = (event) => {
    const taskItems = document.querySelectorAll('.todo-list-item');

    taskItems.forEach(task => {
        /*
            The delted to task is removed from the DOM and all 
            references to its class instance is also removed.
        */
        if (task.querySelector('.delete-button') === event.target){
            tasksObject[task.dataset.taskid] = null;
            
            delete tasksObject[task.dataset.taskid];
            for (const project in projectsObject){
                projectsObject[project].taskArray.forEach(projectTask => {
                    if (projectTask.id === task.dataset.taskid){
                        projectsObject[project].removeTask(projectTask.id);
                        task.remove();
                        updateTaskTally(projectsObject[project]);
                    }
                })
            }
        }
    })
    populateStorage();
}

const deleteTaskListener = () => {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.removeEventListener('click', deleteTask);
        button.addEventListener('click', deleteTask);
    })
}
 


export { 
    newTasklistener, 
    editTaskListener, 
    deleteTaskListener, 
    addTaskMainPage, 
    updateTaskTally 
};