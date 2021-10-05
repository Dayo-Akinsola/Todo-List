import { Project, Task, projectsObject, tasksObject } from './createProjects.js';
import { addNewProject, addNewProjectToSidebar } from './projectDomChanges.js';
import { addTaskMainPage, addTaskSidebar, deleteTaskListener } from './taskDomChanges.js';
import { displayEditTaskForm, showDetailsListener, increaseSidebarHeight } from './pageEffects.js';


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
        const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));
        for (const key in projectsStorage){
            projectsStorage[key] = Object.assign(new Project(''), projectsStorage[key]);
            addNewProject(projectsStorage[key]);
            addNewProjectToSidebar(projectsStorage[key]);

            const projects = document.querySelectorAll('.project-details');
            const lastProject = projects[projects.length - 1];
            if (projectsStorage[key].taskArray.length !== 0){
                projectsStorage[key].taskArray.forEach(task => {

                    tasksStorage[task.id] = Object.assign(new Task(''), tasksStorage[task.id]);
                    const taskIndex = projectsStorage[key].taskArray.indexOf(task);
                    projectsStorage[key].taskArray[taskIndex] = Object.assign(new Task(''), projectsStorage[key].taskArray[taskIndex]);
                    addTaskMainPage(tasksStorage[task.id], lastProject);
                    addTaskSidebar(tasksStorage[task.id], lastProject);
                })
            }
        }
        projectsObject = projectsStorage;
        tasksObject = tasksStorage;
        increaseSidebarHeight();
    }
}

const dateNow = () => {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    return today;
}

const loadProjects = () => {
    const pageHeading = document.querySelector('#todos-heading');
    const projectsList = document.querySelector('.projects-list');
    const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));

    for (const key in projectsStorage){
        projectsStorage[key] = Object.assign(new Project(''), projectsStorage[key]);
        addNewProject(projectsStorage[key]);

        const projects = document.querySelectorAll('.project-details');
        const lastProject = projects[projects.length - 1];
    }
}

const taskFilter = () => {
    const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
    const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));

    loadProjects(projectsStorage);
    loadTasks(tasksStorage, task);
}

// Function to only display tasks which are due on the current day
const todayTaskFiltr = () => {
    const todaySidebarLink = document.querySelector('#today-item');
    const pageHeading = document.querySelector('#todos-heading');
    const projectsList = document.querySelector('.projects-list');
    const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
    const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));

    todaySidebarLink.addEventListener('click', () => {
        if (pageHeading.textContent !== 'Today'){
            pageHeading.textContent = 'Today';
            projectsList.textContent = '';
            for (const key in projectsStorage){
                projectsStorage[key] = Object.assign(new Project(''), projectsStorage[key]);
                addNewProject(projectsStorage[key]);
        
                const projects = document.querySelectorAll('.project-details');
                const lastProject = projects[projects.length - 1];
                projectsStorage[key].taskArray.forEach(task => {
                    if (tasksStorage[task.id].dueDate === dateNow()){
                        tasksStorage[task.id] = Object.assign(new Task(''), tasksStorage[task.id]);
                        const taskIndex = projectsStorage[key].taskArray.indexOf(task);
                        projectsStorage[key].taskArray[taskIndex] = Object.assign(new Task(''), 
                                                                    projectsStorage[key].taskArray[taskIndex]);
                        addTaskMainPage(tasksStorage[task.id], lastProject);
                        addTaskSidebar(tasksStorage[task.id], lastProject);
                    }
                })

                projects.forEach(project => {
                    // Hides project if it has no tasks to display
                    if (!project.querySelector('.todo-list-item')) project.style.display = 'none';
                })
            }
        }
        projectsObject = projectsStorage;
        tasksObject = tasksStorage;
        displayEditTaskForm();
        deleteTaskListener();
        showDetailsListener();
    })
}

const loadTasks = (tasksStorage, task, projectsStorage, key, lastProject) => {
    tasksStorage[task.id] = Object.assign(new Task(''), tasksStorage[task.id]);
    const taskIndex = projectsStorage[key].taskArray.indexOf(task);
    projectsStorage[key].taskArray[taskIndex] = Object.assign(new Task(''), 
                                                projectsStorage[key].taskArray[taskIndex]);
    addTaskMainPage(tasksStorage[task.id], lastProject);
    addTaskSidebar(tasksStorage[task.id], lastProject);   
}

const hideProjects = (projects) => {
    projects.forEach(project => {
        // Hides project if it has no tasks to display
        if (!project.querySelector('.todo-list-item')) project.style.display = 'none';
    })
}

const todayTaskFilter = () => {
    const todaySidebarLink = document.querySelector('#today-item');
    const pageHeading = document.querySelector('#todos-heading');
    const projectsList = document.querySelector('.projects-list');
    
    todaySidebarLink.addEventListener('click', () => {
        const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
        const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));
        if (pageHeading.textContent !== 'Today'){
            pageHeading.textContent = 'Today';
            projectsList.textContent = '';
        
            for (const key in projectsStorage){
                projectsStorage[key] = Object.assign(new Project(''), projectsStorage[key]);
                addNewProject(projectsStorage[key]);
                
                const projects = document.querySelectorAll('.project-details');
                const lastProject = projects[projects.length - 1];
                projectsStorage[key].taskArray.forEach(task => {
                    if (tasksStorage[task.id].dueDate === dateNow()){
                        loadTasks(tasksStorage, task, projectsStorage, key, lastProject);
                    }
                })
                hideProjects(projects);
            }
            projectsObject = projectsStorage;
            tasksObject = tasksStorage;
            displayEditTaskForm();
            deleteTaskListener();
            showDetailsListener();
        }
    })
}


export { populateStorage, loadStorage, todayTaskFilter };