import { Project, projectsObject } from './createProjects.js'
import { displayNewTaskForm, increaseSidebarHeight } from './pageEffects.js';
import { displayProjectTasksListener, displayProjectTasksOnly, loadStorage } from './displayControl.js';
import { populateStorage } from '../helpers/displayControlHelpers.js';

// Function to display a created project on the main part of the page.
const addNewProject = (projectInstance) => {
    const projectsList = document.querySelector('.projects-list');
    const projectElement = document.createElement('li');
    projectElement.classList.add('project-details');
    projectElement.setAttribute('data-projectId', projectInstance.id);

    const projectHeadingContainer = document.createElement('div');
    projectHeadingContainer.classList.add('project-heading-container');

    const projectHeading = document.createElement('div'); 
    projectHeading.classList.add('project-heading');

    const projectName = document.createElement('h3');
    projectName.classList.add('project-name'); projectName.textContent = projectInstance.projectName;

    const addTaskSymbol = document.createElement('span');
    addTaskSymbol.classList.add('add-task-symbol'); addTaskSymbol.innerHTML = '&#43;';
    const deleteProjectSymbol = document.createElement('span');
    deleteProjectSymbol.classList.add('delete-project-btn'); deleteProjectSymbol.innerHTML = '&#10006;';
    const symbolContainer = document.createElement('div');
    symbolContainer.classList.add('symbol-container');
    symbolContainer.appendChild(addTaskSymbol); symbolContainer.appendChild(deleteProjectSymbol);

    const taskList = document.createElement('div');
    taskList.classList.add('todo-list-items');

    projectHeading.appendChild(projectName);
    projectHeadingContainer.appendChild(projectHeading);
    projectHeadingContainer.appendChild(symbolContainer);
    

    projectElement.appendChild(projectHeadingContainer);
    projectElement.appendChild(taskList);  
    projectsList.appendChild(projectElement); 


    // Function included to attach click event to new project to display task form.
    displayNewTaskForm();

    deleteProjectListener();

}

const addNewProjectToSidebar = (projectInstance) => {
    const projectsList = document.querySelector('.sidebar-projects-list');

    const sidebarProject = document.createElement('li');
    sidebarProject.classList.add('sidebar-item', 'sidebar-project');
    sidebarProject.setAttribute('data-projectId', projectInstance.id);

    const sidebarProjectName = document.createElement('span');
    sidebarProjectName.classList.add('sidebar-project-name');
    sidebarProjectName.textContent = projectInstance.projectName;

    const taskTally = document.createElement('span');
    taskTally.classList.add('task-tally');
    taskTally.textContent = ' ' + 0;


    sidebarProject.appendChild(sidebarProjectName);
    sidebarProject.appendChild(taskTally);
    projectsList.appendChild(sidebarProject);

    return sidebarProject;
}

const addNewProjectListener = () => {
    const projectName = document.querySelector('#project-form-name');
    const form = document.querySelector('#add-project-form');
    const cancel = document.querySelector('#cancel-button');
    const addProjectDisplay = document.querySelector('.add-project-screen');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newProject = new Project(projectName.value);
        addNewProject(newProject);
        const sidebarProject = addNewProjectToSidebar(newProject);
        addProjectDisplay.style.display = 'none';
        projectName.value = '';
        increaseSidebarHeight();
        populateStorage();
        displayProjectTasksListener();
        displayProjectTasksOnly(sidebarProject);
    })

    cancel.addEventListener('click', () => {
        projectName.value = '';
        addProjectDisplay.style.display = 'none';
    })
}

const deleteProject = (deleteSymbol, confirmScreen) => {
    const projectElements = document.querySelectorAll('.project-details');

    projectElements.forEach(project => {
        if (project.querySelector('.delete-project-btn') === deleteSymbol){
            const projectInstance = projectsObject[project.dataset.projectid];
            for (let i = 0; i < projectInstance.taskArray.length; i++){
                projectInstance.taskArray[i].deleteTaskInstance();
                projectInstance.removeTask(projectInstance.taskArray[i].id);
                i--;
            }

            // Remove project class instance and from the main display and sidebar display in DOM
            const sidebarProject =  document.querySelector(`[data-projectid="${projectInstance.id}"]`);
            project.remove();

            sidebarProject.remove();

            projectsObject[project.dataset.projectid] = null;
            delete projectsObject[project.dataset.projectid];

            confirmScreen.style.display = 'none';
            populateStorage();
            loadStorage();
        }
    })
   
}

const confirmProjectDelete = (deleteSymbol) => {
    const confirmScreen = document.querySelector('.del-confirm-screen');
    const message = document.querySelector('.del-text');
    const confirmButton = document.querySelector('.del-option');
    const cancelButton = document.querySelector('.cancel-option');

    confirmScreen.style.display = 'block';
    const projectName = deleteSymbol.closest('.project-heading-container').querySelector('.project-name');
    message.textContent = `Delete ${projectName.textContent} ?`;

    confirmButton.addEventListener('click', () => deleteProject(deleteSymbol, confirmScreen));
    cancelButton.addEventListener('click', () => confirmScreen.style.display = 'none');
}   

const deleteProjectListener = () => {
    const tasksContainer = document.querySelector('.todos-container');

    tasksContainer.addEventListener('click', (event) => {
        if (event.target.className === 'delete-project-btn'){
            confirmProjectDelete(event.target);
        }
    }, false)
}

export { addNewProjectListener, deleteProjectListener, addNewProject, addNewProjectToSidebar }