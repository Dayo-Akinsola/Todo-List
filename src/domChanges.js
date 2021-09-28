import { Project } from './createProjects.js'

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

const addNewProjectListener = () => {
    const projectName = document.querySelector('#project-form-name');
    const form = document.querySelector('#add-project-form');
    const cancel = document.querySelector('#cancel-button');
    const addProjectDisplay = document.querySelector('.add-project-screen');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newProject = new Project(projectName.value);
        addNewProject(newProject);
        
    })

    cancel.addEventListener('click', () => {
        projectName.value = '';
        addProjectDisplay.style.display = 'none';
    })
}

export { addNewProjectListener }