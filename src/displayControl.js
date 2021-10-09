import { Project, projectsObject, tasksObject } from './createProjects.js';
import { updateTaskTally } from './taskDomChanges.js';
import { increaseSidebarHeight, toggleFinishedPage } from './pageEffects.js';
import { addNewProject, addNewProjectToSidebar } from './projectDomChanges.js';
import { isThisWeek, isAfter, add } from 'date-fns';
import { dateNow, loadTasks, hideProjects, restoreListeners, resetDisplay, loadProject, restoreTaskMethods } from '../helpers/displayControlHelpers.js';


const populateStorage = () => {
    localStorage.setItem('projectsObject', JSON.stringify(projectsObject));
    localStorage.setItem('tasksObject', JSON.stringify(tasksObject));
}

// Displays all projects from local storage when the page is first loaded
const loadStorage = () => {
    if (!localStorage.getItem('projectsObject')){
        populateStorage();
    }
    else{
        resetDisplay();
        document.querySelector('.sidebar-projects-list').textContent = '';

        const pageHeading = document.querySelector('#todos-heading');
        pageHeading.textContent = 'All'

        const allSidebarLink = document.querySelector('#all-item');
        allSidebarLink.classList.add('active');

        const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
        const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));

        // Defined element here first so it's value at the end of the loop can be used outside the loop's scope
        let projectElements;
        for (const key in projectsStorage){ 
            loadProject(projectsStorage, key);
            addNewProjectToSidebar(projectsStorage[key]);   
            projectElements = document.querySelectorAll('.project-details');
            const lastProject = projectElements[projectElements.length - 1];
            projectsStorage[key].taskArray.forEach(task => {
                restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                loadTasks(tasksStorage, task, lastProject);
                updateTaskTally(projectsStorage[key]);
            })
        }
        projectsObject = projectsStorage;
        tasksObject = tasksStorage;
        toggleFinishedPage(projectElements);
        increaseSidebarHeight();
        restoreListeners();
        displayProjectTasksListener();
    }
}

const displayAllTasks = () => {
    const allSidebarLink = document.querySelector('#all-item');
    const pageHeading = document.querySelector('#todos-heading');

    allSidebarLink.addEventListener('click', () => {
        if (pageHeading.textContent !== 'All'){
            loadStorage();
            pageHeading.textContent = 'All'
        }
    })
}

const todayTaskFilter = () => {
    const todaySidebarLink = document.querySelector('#today-item');
    const pageHeading = document.querySelector('#todos-heading');
    
    todaySidebarLink.addEventListener('click', () => {
        const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
        const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));
        if (pageHeading.textContent !== 'Today'){
            pageHeading.textContent = 'Today';
            resetDisplay();
            todaySidebarLink.classList.add('active');

            let projectElements;
            for (const key in projectsStorage){
                loadProject(projectsStorage, key);

                projectElements = document.querySelectorAll('.project-details');
                const lastProject = projectElements[projectElements.length - 1];
                projectsStorage[key].taskArray.forEach(task => {
                    restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                    if (tasksStorage[task.id].dueDate === dateNow()){
                        loadTasks(tasksStorage, task, lastProject);
                    }
                    updateTaskTally(projectsStorage[key]);
                })
            }
            hideProjects(projectElements);
            toggleFinishedPage(projectElements);
            projectsObject = projectsStorage;
            tasksObject = tasksStorage;
            restoreListeners();
            displayProjectTasksListener();
        }
    })
}

const thisWeekTaskFilter = () => {
    const weekSidebarLink = document.querySelector('#this-week-item');
    const pageHeading = document.querySelector('#todos-heading');

    weekSidebarLink.addEventListener('click',  () => {
        const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
        const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));
        if (pageHeading.textContent !== 'This Week'){
            pageHeading.textContent = 'This Week';
            resetDisplay();
            weekSidebarLink.classList.add('active');
            
            let projectElements;
            for (const key in projectsStorage){
                loadProject(projectsStorage, key);

                projectElements = document.querySelectorAll('.project-details');
                const lastProject = projectElements[projectElements.length - 1];
                projectsStorage[key].taskArray.forEach(task => {
                    const splitDate = task.dueDate.split('/');
                    restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                    if (isThisWeek(new Date(splitDate[2], splitDate[1] - 1, splitDate[0]))){
                        loadTasks(tasksStorage, task, lastProject);
                    }
                    updateTaskTally(projectsStorage[key]);
                })
            }
            hideProjects(projectElements);
            toggleFinishedPage(projectElements);
            projectsObject = projectsStorage;
            tasksObject = tasksStorage;
            restoreListeners();
            displayProjectTasksListener();
        }
    })
}

const urgentTaskFilter = () => {
    const urgentSidebarLink = document.querySelector('#urgent-item');
    const pageHeading = document.querySelector('#todos-heading');

    urgentSidebarLink.addEventListener('click',  () => {
        const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
        const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));
        if (pageHeading.textContent !== 'Urgent'){
            pageHeading.textContent = 'Urgent';
            resetDisplay();
            urgentSidebarLink.classList.add('active');

            let projectElements;
            for (const key in projectsStorage){
                loadProject(projectsStorage, key);
                projectElements = document.querySelectorAll('.project-details');
                const lastProject = projectElements[projectElements.length - 1];
                projectsStorage[key].taskArray.forEach(task => {
                    restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                    if (task.priority === 'urgent'){
                        loadTasks(tasksStorage, task, lastProject);
                    }
                    updateTaskTally(projectsStorage[key]);
                })
            }
            hideProjects(projectElements);
            toggleFinishedPage(projectElements);
            projectsObject = projectsStorage;
            tasksObject = tasksStorage;
            restoreListeners();
            displayProjectTasksListener();
        }
    })
}


const overdueTaskFilter = () => {
    const overdueSidebarLink = document.querySelector('#overdue-item');
    const pageHeading = document.querySelector('#todos-heading');

    overdueSidebarLink.addEventListener('click',  () => {
        const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
        const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));
        if (pageHeading.textContent !== 'Overdue'){
            pageHeading.textContent = 'Overdue';
            resetDisplay();
            overdueSidebarLink.classList.add('active');

            let projectElements;
            for (const key in projectsStorage){

                loadProject(projectsStorage, key);
                projectElements = document.querySelectorAll('.project-details');
                const lastProject = projectElements[projectElements.length - 1];
                projectsStorage[key].taskArray.forEach(task => {
                    const splitDate = task.dueDate.split('/');
                    
                    //Add day to due date so tasks due today are not classed as overdue. 
                    const lateDate = add(new Date(splitDate[2], splitDate[1] - 1, splitDate[0]), {days: 1});

                    restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                    if (isAfter(new Date(), lateDate)){
                        loadTasks(tasksStorage, task, lastProject);
                    }
                    updateTaskTally(projectsStorage[key]);
                })
            }
            hideProjects(projectElements)
            toggleFinishedPage(projectElements);
            projectsObject = projectsStorage;
            tasksObject = tasksStorage;
            restoreListeners();
            displayProjectTasksListener();
        }
    })
}

const displayProjectTasksOnly = (sidebarProject) => {
    const pageHeading = document.querySelector('#todos-heading');
    const sidebarProjectName = sidebarProject.querySelector('.sidebar-project-name');
    if (!Array.from(sidebarProject.classList).includes('active')){
        pageHeading.textContent = '';
        resetDisplay();
        sidebarProject.classList.add('active');  
        
        const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
        const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));
        for (const key in projectsStorage){
            if (sidebarProject.dataset.projectid === projectsStorage[key].id){
                projectsStorage[key] = Object.assign(new Project(''), projectsStorage[key]);
                addNewProject(projectsStorage[key]); 

                // Because of the unique id only one project will render
                const project = document.querySelector('.project-details');
                
                if (projectsStorage[key].taskArray.length > 0){
                    projectsStorage[key].taskArray.forEach(task => {
                        restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                        loadTasks(tasksStorage, task, project);
                    })
                }
            }
            updateTaskTally(projectsStorage[key]);
        }
        projectsObject = projectsStorage;
        tasksObject = tasksStorage;
        restoreListeners();
        displayProjectTasksListener();  
        const allProjectsCompletePage = document.querySelector('.projects-complete-container');
        allProjectsCompletePage.style.display = 'none';
    }

}


const displayProjectTasksListener = () => {
    const sidebarProjectLinks = document.querySelectorAll('.sidebar-project');

    sidebarProjectLinks.forEach(sidebarProject => {
        sidebarProject.addEventListener('click', () => displayProjectTasksOnly(sidebarProject));
    })
}




export { 
    populateStorage, 
    loadStorage, 
    todayTaskFilter, 
    displayAllTasks, 
    thisWeekTaskFilter, 
    urgentTaskFilter,
    overdueTaskFilter,
    displayProjectTasksListener,
    displayProjectTasksOnly, 
};  