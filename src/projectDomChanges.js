import { Project, projectsObject } from './createProjects.js'
import { displayNewTaskForm, increaseSidebarHeight } from './pageEffects.js';
import { populateStorage, displayProjectTasksListener } from './displayControl.js';

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
    const deleteProjectSymbol = document.createElement('span');
    deleteProjectSymbol.classList.add('delete-project-btn'); deleteProjectSymbol.innerHTML = '&#10006;';
    const symbolContainer = document.createElement('div');
    symbolContainer.classList.add('symbol-container');
    symbolContainer.appendChild(addTaskSymbol); symbolContainer.appendChild(deleteProjectSymbol);


    const taskList = document.createElement('div');
    taskList.classList.add('todo-list-items');

    projectHeading.appendChild(downArrow); projectHeading.appendChild(projectName);
    projectHeadingContainer.appendChild(projectHeading);
    projectHeadingContainer.appendChild(symbolContainer);

    projectElement.appendChild(projectHeadingContainer);
    projectElement.appendChild(taskList);  
    projectsList.appendChild(projectElement); 

    // Function included to attach click event to new project to display task form.
    displayNewTaskForm();

    deleteProjectListener();
}

const addNewProjectToSidebar = (project) => {
    const projectsList = document.querySelector('.sidebar-projects-list');

    const sidebarProject = document.createElement('li');
    sidebarProject.classList.add('sidebar-project');
    sidebarProject.setAttribute('data-projectId', project.id);

    const sidebarProjectName = document.createElement('span');
    sidebarProjectName.classList.add('sidebar-project-name');
    sidebarProjectName.textContent = project.projectName;

    const taskTally = document.createElement('span');
    taskTally.classList.add('task-tally');
    taskTally.textContent = ' ' + 0;


    sidebarProject.appendChild(sidebarProjectName);
    sidebarProject.appendChild(taskTally);
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
        increaseSidebarHeight();
        populateStorage();
        displayProjectTasksListener();
    })

    cancel.addEventListener('click', () => {
        projectName.value = '';
        addProjectDisplay.style.display = 'none';
    })
}

const deleteProject = (event) => {
    const projectsList = document.querySelectorAll('.project-details');

    projectsList.forEach(project => {
        if (project.querySelector('.delete-project-btn') === event.target){
            const projectInstance = projectsObject[project.dataset.projectid];
            for (let i = 0; i < projectInstance.taskArray.length; i++){
                console.log(projectInstance.taskArray[i]);
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

        }
    })
    populateStorage();
}

const deleteProjectListener = () => {
    const deleteProjectSymbols = document.querySelectorAll('.delete-project-btn');

    deleteProjectSymbols.forEach(symbol => {
        symbol.removeEventListener('click', deleteProject);
        symbol.addEventListener('click', deleteProject);
    })
}

if (!localStorage.getItem('projectsObject')){
    const algorithms = new Project('Algorithms');
    addNewProject(algorithms);
    addNewProjectToSidebar(algorithms);

    const exercise = new Project('Exercise');
    addNewProject(exercise);
    addNewProjectToSidebar(exercise);

}

export { addNewProjectListener, deleteProjectListener, addNewProject, addNewProjectToSidebar }