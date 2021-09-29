import { DynamicEntryPlugin } from 'webpack';
import { Project, Task, projectsObject } from './createProjects.js'
import { priorityButtonCheck } from './pageEffects.js';

/*
    The function finds the project that the user wants to add
    a task to and adds it to that project.
*/
const addNewTask = (task) => {
    const projects = document.querySelectorAll('.project-details');
    projects.forEach(project => {
        if (Array.from(project.classList).includes('active')){
            const taskList = document.querySelector('todo-list-items');
            const taskListItem = document.createElement('div');
            taskListItem.classList.add('todo-list-item');
            taskListItem.setAttribute('data-taskId', task.id);

            const summaryContainer = document.createElement('div');
            summaryContainer.classList.add('summary-container');

            const radioTitleContainer = document.createElement('div');
            radioTitleContainer.classList.add('radio-title-container');
            const taskRadio = document.createElement('input');
            taskRadio.classList.add('todo-check'); taskRadio.type = 'radio';
            const taskTitle = document.createElement('span');
            taskTitle.classList.add('todo-title'); taskTitle.textContent = task.title;
            radioTitleContainer.appendChild(taskRadio); radioTitleContainer.appendChild(taskTitle);

            summaryContainer.appendChild(radioTitleContainer);

            const taskDate = document.createElement('span');
            taskDate.classList.add('todo-date'); taskDate.textContent = task.dueDate;
            summaryContainer.appendChild(taskDate);

            const editTaskButtons = document.createElement('div');
            editTaskButtons.classList.add('edit-task-buttons');

            const detailsButton = document.createElement('button');
            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');
            const buttonArray = [ detailsButton, editButton, deleteButton];
            buttonArray.forEach(button => button.type = 'button');
            detailsButton.classList.add('todo-details'); detailsButton.textContent = 'Details';
            editButton.classList.add('todo-edit'); editButton.textContent = 'Edit';
            deleteButton.classList.add('todo-delete'); deleteButton.textContent = 'Delete';

            buttonArray.forEach(button => editTaskButtons.appendChild(button));
            summaryContainer.appendChild(editTaskButtons);
            taskList.appendChild(summaryContainer);

            const detailsContainer = document.createElement('div');
            const todoNotes = document.createElement('p');
            detailsContainer.classList.add('details-container'); todoNotes.classList.add('todo-notes');
            detailsContainer.appendChild(todoNotes);
            taskList.appendChild(detailsContainer);

            return project;
        }
    })
}

// Matches projectid from main page and sidebar so the task is added to the right project on the sidebar
const addNewTaskToSidebar = (task, project) => {
    const sidebarProjects = document.querySelectorAll('.sidebar-project');
    
    sidebarProjects.forEach(sidebarProject => {
        if (sidebarProject.dataset.projectid = project.dataset.projectid){
            const projectTasks = sidebarProject.querySelector('.btn-toggle.show');
            
            const taskTitle = document.createElement('li');
            const sidebarTask = document.createElement('span');
            taskTitle.classList.add('sidebar-task-title'); 
            sidebarTask.classList.add('sidebar-task'); sidebarTask.textContent = task.title;
            taskTitle.appendChild(sidebarTask);

            projectTasks.appendChild(taskTitle);

        }
    })
}

const newTasklistener = (project) => {
    const form = document.querySelector('#add-task-form');
    const formTitle = document.querySelector('#task-form-name');
    const formNotes = document.querySelector('#notes-form');
    const formDate = document.querySelector('task-form-date');
    const addTaskButton = document.querySelector('#submit-task-button');
    const cancelButton = document.querySelector('#cancel-task-button');
    const priorityButtons = document.querySelectorAll('.priority-button');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTask 
    })
}