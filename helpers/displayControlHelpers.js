import { displayEditTaskForm, showDetailsListener } from '../src/pageEffects.js';
import { addTaskMainPage, deleteTaskListener } from '../src/taskDomChanges.js';
import { addNewProject, addNewProjectToSidebar } from '../src/projectDomChanges.js';
import { Task, Project } from '../src/createProjects.js';


const dateNow = () => {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return today;
}

/*
    Object.assign is used twice to restore the methods of tasks stored 
    independentaly in the tasks object and within the array of tasks attached
    to each project.
*/

const restoreTaskMethods = (task, tasksStorage, projectsStorage, key) => {
    const taskIndex = projectsStorage[key].taskArray.indexOf(task);
    tasksStorage[task.id] = Object.assign(new Task(''), tasksStorage[task.id]);

    projectsStorage[key].taskArray[taskIndex] = Object.assign(new Task(''), 
                                                projectsStorage[key].taskArray[taskIndex]);
}
const loadTasks = (tasksStorage, task, project) => {
    addTaskMainPage(tasksStorage[task.id], project);
}

const loadProject = (projectsStorage, key) => {
    projectsStorage[key] = Object.assign(new Project(''), projectsStorage[key]);
    addNewProject(projectsStorage[key]);
    addNewProjectToSidebar(projectsStorage[key]);
}

// Hides project if it has no tasks to display when filtered
const hideProjects = (projects) => {
    projects.forEach(project => {
        if (!project.querySelector('.todo-list-item')) project.style.display = 'none';
    })
}

const resetDisplay = () => {
    document.querySelector('.projects-list').textContent = '';
    document.querySelector('.sidebar-projects-list').textContent = '';
}

const restoreListeners = () => {
    displayEditTaskForm();
    deleteTaskListener();
    showDetailsListener();
}

export {
    dateNow,
    loadTasks,
    restoreTaskMethods,
    hideProjects,
    restoreListeners,
    resetDisplay,
    loadProject,
}




