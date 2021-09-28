import { Project } from './createProjects.js'

// Function to display a created project on the main part of the page.
const addNewProject = (project) => {
    const projectsList = document.querySelector('.projects-list');
    const projectElement = document.createElement('li');
    projectElement.classList.add('project-details');
    projectElement.setAttribute('data-projectId', project.id);

    const projectHeadingContainer = document.createElement('div');
    projectHeadingContainer.classList.add('project-heading-container');
    const projectHeading = document.createElement('div'); 
    projectHeading.classList.add('project-heading');
    const downArrow = document.createElement('span');
    downArrow.classList.add('down-arrow'); downArrow.innerHTML = '&#8615;';
    const projectName = document.createElement('h3');
    projectName.classList.add('project-name'); projectName.textContent = project.projectName;
    const addTaskSymbol = document.createElement('span');
    addTaskSymbol.classList.add('add-task-symbol'); addTaskSymbol.innerHTML = '&#43;';

    projectHeading.appendChild(downArrow); projectHeading.appendChild(projectName);
    projectHeadingContainer.appendChild(projectHeading);
    projectHeadingContainer.appendChild(addTaskSymbol);

    projectElement.appendChild(projectHeadingContainer);  
    projectsList.appendChild(projectElement); 
}

const addNewProjectToSidebar = (project) => {
    const projectsList = document.querySelector('.sidebar-projects-list');
    const sidebarProject = document.createElement('li');
    sidebarProject.classList.add('sidebar-project');
    sidebarProject.setAttribute('data-projectId', project.id);

    const sidebarProjectName = document.createElement('span');
    sidebarProjectName.classList.add('sidebar-project-name');
    sidebarProjectName.textContent = project.projectName;

    sidebarProject.appendChild(sidebarProjectName);
    projectsList.appendChild(sidebarProject);
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
        addNewProjectToSidebar(newProject);
        addProjectDisplay.style.display = 'none';
        projectName.value = '';
    })

    cancel.addEventListener('click', () => {
        projectName.value = '';
        addProjectDisplay.style.display = 'none';
    })
}

const algorithms = new Project('Algorithms');
addNewProject(algorithms);
addNewProjectToSidebar(algorithms);

const exercise = new Project('Exercise');
addNewProject(exercise);
addNewProjectToSidebar(exercise);


export { addNewProjectListener }