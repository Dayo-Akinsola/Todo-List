import { Task, projectsObject } from './createProjects.js';
import { createTaskMainDetails, createTaskButtons, createDetailsContainer } from '../helpers/taskDomHelpers.js';
import { increaseSidebarHeight, showDetailsListener } from './pageEffects.js';

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

// Matches projectid from main page and sidebar so the task is added to the right project on the sidebar
const addTaskSidebar = (task, project) => {
    const sidebarProjects = document.querySelectorAll('.sidebar-project');
    
    sidebarProjects.forEach(sidebarProject => {
        if (sidebarProject.dataset.projectid === project.dataset.projectid){
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
                const task = new Task(formTitle.value, formNotes.value, formDate.value, priority.id)
                projectInstance.addTask(task);
                addTaskMainPage(task, project);
                addTaskSidebar(task, project);
        
                // reset form form after submitting
                formTitle.value = ''; formNotes.value = ''; formDate.value = '';
                addTaskScreen.style.display = 'none';
                project.classList.remove('active');

                increaseSidebarHeight();
            }
        })
        showDetailsListener();
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
 


export { newTasklistener };