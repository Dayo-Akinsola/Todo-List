import { Project, Task, projectsObject, tasksObject } from './createProjects.js';
import { addNewProject, addNewProjectToSidebar } from './projectDomChanges.js';
import { addTaskMainPage, addTaskSidebar } from './taskDomChanges.js';

const populateStorage = () => {
    localStorage.setItem('projectsObject', JSON.stringify(projectsObject));
    localStorage.setItem('tasksObject', JSON.stringify(tasksObject));
}

const loadStorage = () => {
    if (!localStorage.getItem('projectsObject')){
        populateStorage();
    }
    else{
        const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
        for (const key in projectsStorage){
            const projectObjectCopy = new Project(''); // Used to retrive Project methods
            projectsStorage[key] = Object.assign(projectObjectCopy, projectsStorage[key]);
            addNewProject(projectsStorage[key]);
            addNewProjectToSidebar(projectsStorage[key]);

            const projects = document.querySelectorAll('.project-details');
            const lastProject = projects[projects.length - 1];
            if (projectsStorage[key].taskArray.length !== 0){
                projectsStorage[key].taskArray.forEach(task => {
                    const taskObjectcopy = new Task('');
                    const taskIndex = projectsStorage[key].taskArray.indexOf(task);
                    projectsStorage[key].taskArray[taskIndex] = Object.assign(taskObjectcopy, projectsStorage[key].taskArray[taskIndex]);
                    addTaskMainPage(task, lastProject);
                    addTaskSidebar(task, lastProject);
                })
            }
        }
        projectsObject = projectsStorage;
    }
}



export { populateStorage, loadStorage };