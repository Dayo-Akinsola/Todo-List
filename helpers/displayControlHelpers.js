import { displayEditTaskForm, showDetailsListener } from '../src/pageEffects.js';
import { addTaskMainPage, deleteTaskListener, changeTaskCompleteStatus } from '../src/taskDomChanges.js';
import { addNewProject } from '../src/projectDomChanges.js';
import { Task, Project, projectsObject, tasksObject } from '../src/createProjects.js';

const populateStorage = () => {
    localStorage.setItem('projectsObject', JSON.stringify(projectsObject));
    localStorage.setItem('tasksObject', JSON.stringify(tasksObject));
}

const setObjects = (projectsStorage, tasksStorage) => {
    projectsObject = projectsStorage;
    tasksObject = tasksStorage;
}

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

const loadTasks = (tasksStorage, taskInstance, project) => {
    addTaskMainPage(tasksStorage[taskInstance.id], project);

    const taskElement = document.querySelector(`[data-taskid="${taskInstance.id}"]`);
    const taskCheckbox = taskElement.querySelector('input[type="checkbox"]');
    const taskTitle = taskElement.querySelector('.todo-title');
    if (tasksStorage[taskInstance.id].complete){
        taskCheckbox.checked = true;
        taskElement.classList.add('checked');
        taskTitle.classList.add('checked');
    }
    else{
        taskCheckbox.checked = false;
        taskElement.classList.remove('checked');
        taskTitle.classList.remove('checked');       
    }
}

const loadProject = (projectsStorage, key) => {
    projectsStorage[key] = Object.assign(new Project(''), projectsStorage[key]);
    addNewProject(projectsStorage[key]);
}

// Hides project if it has no tasks to display when filtered
const hideProjects = (projectElements) => {
    if (projectElements){
        projectElements.forEach(project => {
            if (!project.querySelector('.todo-list-item')) project.style.display = 'none';
        })
    }   
}

const resetDisplay = () => {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => item.classList.remove('active'));
    document.querySelector('.projects-list').textContent = '';
}

const restoreListeners = () => {
    displayEditTaskForm();
    deleteTaskListener();
    showDetailsListener();
    changeTaskCompleteStatus();
}

export {
    dateNow,
    loadTasks,
    restoreTaskMethods,
    hideProjects,
    restoreListeners,
    resetDisplay,
    loadProject,
    populateStorage,
    setObjects,
}




