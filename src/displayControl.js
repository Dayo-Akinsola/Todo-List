import { Project } from './createProjects.js';
import { updateTaskTally } from './taskDomChanges.js';
import { increaseSidebarHeight, toggleFinishedPage } from './pageEffects.js';
import { addNewProject, addNewProjectToSidebar } from './projectDomChanges.js';
import * as displayHelpers from '../helpers/displayControlHelpers.js';
import { isThisWeek, isAfter, add } from 'date-fns';


// These functions help the app keep functionality when a page is replaced
const loadHelper = (projectsStorage, tasksStorage, projectElements) => {
    displayHelpers.setObjects(projectsStorage, tasksStorage);
    displayHelpers.hideProjects(projectElements);
    displayHelpers.restoreListeners();
    toggleFinishedPage(projectElements);
    displayProjectTasksListener();
}

// Displays all projects from local storage when the page is first loaded
const loadStorage = () => {
    if (!localStorage.getItem('projectsObject')){
        displayHelpers.populateStorage();
    }
    else{
        displayHelpers.resetDisplay();
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
            displayHelpers.loadProject(projectsStorage, key);
            addNewProjectToSidebar(projectsStorage[key]);   
            projectElements = document.querySelectorAll('.project-details');
            const lastProject = projectElements[projectElements.length - 1];
            projectsStorage[key].taskArray.forEach(task => {
                displayHelpers.restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                displayHelpers.loadTasks(tasksStorage, task, lastProject);
                updateTaskTally(projectsStorage[key]);
            })
        }
        displayHelpers.setObjects(projectsStorage, tasksStorage);
        toggleFinishedPage(projectElements);
        increaseSidebarHeight();
        displayHelpers.restoreListeners();
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
            displayHelpers.resetDisplay();
            todaySidebarLink.classList.add('active');
            let projectElements;
            for (const key in projectsStorage){
                displayHelpers.loadProject(projectsStorage, key);

                projectElements = document.querySelectorAll('.project-details');
                const lastProject = projectElements[projectElements.length - 1];
                lastProject.querySelector('.symbol-container').style.visibility = 'hidden';

                projectsStorage[key].taskArray.forEach(task => {
                    displayHelpers.restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                    if (tasksStorage[task.id].dueDate === displayHelpers.dateNow()){
                        displayHelpers.loadTasks(tasksStorage, task, lastProject);
                    }
                    updateTaskTally(projectsStorage[key]);
                })
            }
            loadHelper(projectsStorage, tasksStorage, projectElements);
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
            displayHelpers.resetDisplay();
            weekSidebarLink.classList.add('active');
            
            let projectElements;
            for (const key in projectsStorage){
                displayHelpers.loadProject(projectsStorage, key);

                projectElements = document.querySelectorAll('.project-details');
                const lastProject = projectElements[projectElements.length - 1];
                lastProject.querySelector('.symbol-container').style.visibility = 'hidden';

                projectsStorage[key].taskArray.forEach(task => {
                    const splitDate = task.dueDate.split('/');
                    displayHelpers.restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                    if (isThisWeek(new Date(splitDate[2], splitDate[1] - 1, splitDate[0]))){
                        displayHelpers.loadTasks(tasksStorage, task, lastProject);
                    }
                    updateTaskTally(projectsStorage[key]);
                })
            }
            loadHelper(projectsStorage, tasksStorage, projectElements);
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
            displayHelpers.resetDisplay();
            urgentSidebarLink.classList.add('active');

            let projectElements;
            for (const key in projectsStorage){
                displayHelpers.loadProject(projectsStorage, key);
                projectElements = document.querySelectorAll('.project-details');
                const lastProject = projectElements[projectElements.length - 1];
                lastProject.querySelector('.symbol-container').style.visibility = 'hidden';

                projectsStorage[key].taskArray.forEach(task => {
                    displayHelpers.restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                    if (task.priority === 'urgent'){
                        displayHelpers.loadTasks(tasksStorage, task, lastProject);
                    }
                    updateTaskTally(projectsStorage[key]);
                })
            }
            loadHelper(projectsStorage, tasksStorage, projectElements);
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
            displayHelpers.resetDisplay();
            overdueSidebarLink.classList.add('active');

            let projectElements;
            for (const key in projectsStorage){

                displayHelpers.loadProject(projectsStorage, key);
                projectElements = document.querySelectorAll('.project-details');
                const lastProject = projectElements[projectElements.length - 1];
                lastProject.querySelector('.symbol-container').style.visibility = 'hidden';

                projectsStorage[key].taskArray.forEach(task => {
                    const splitDate = task.dueDate.split('/');
                    
                    //Add day to due date so tasks due today are not classed as overdue. 
                    const lateDate = add(new Date(splitDate[2], splitDate[1] - 1, splitDate[0]), {days: 1});
                    displayHelpers.restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                    if (isAfter(new Date(), lateDate)){
                        displayHelpers.loadTasks(tasksStorage, task, lastProject);
                    }
                    updateTaskTally(projectsStorage[key]);
                })
            }
            loadHelper(projectsStorage, tasksStorage, projectElements);
        }
    })
}

const displayProjectTasksOnly = (sidebarProject) => {
    const pageHeading = document.querySelector('#todos-heading');
    if (!Array.from(sidebarProject.classList).includes('active')){
        pageHeading.textContent = '';
        displayHelpers.resetDisplay();
        sidebarProject.classList.add('active');  
        
        const projectsStorage = JSON.parse(localStorage.getItem('projectsObject'));
        const tasksStorage = JSON.parse(localStorage.getItem('tasksObject'));
        for (const key in projectsStorage){
            if (sidebarProject.dataset.projectid === projectsStorage[key].id){
                projectsStorage[key] = Object.assign(new Project(''), projectsStorage[key]);
                addNewProject(projectsStorage[key]); 

                // Because of the unique id only one project will render
                const projectElement = document.querySelector('.project-details');
                const projectHeadingContainer = projectElement.querySelector('.project-heading-container');
                const projectName = projectElement.querySelector('.project-name');
                projectHeadingContainer.style.justifyContent = 'space-around'; projectHeadingContainer.style.marginBottom = '1em';
                projectName.style.fontSize = '24px'; projectName.style.fontWeight = '600';
                
                if (projectsStorage[key].taskArray.length > 0){
                    projectsStorage[key].taskArray.forEach(task => {
                        displayHelpers.restoreTaskMethods(task, tasksStorage, projectsStorage, key);                    
                        displayHelpers.loadTasks(tasksStorage, task, projectElement);
                    })
                }
            }
            updateTaskTally(projectsStorage[key]);
        }
        displayHelpers.setObjects(projectsStorage, tasksStorage);
        displayHelpers.restoreListeners();
        displayProjectTasksListener();
        const projectElements = document.querySelectorAll('.project-details');  
        toggleFinishedPage(projectElements);
    }

}

const displayProjectTasksListener = () => {
    const sidebarProjectLinks = document.querySelectorAll('.sidebar-project');

    sidebarProjectLinks.forEach(sidebarProject => {
        sidebarProject.addEventListener('click', () => displayProjectTasksOnly(sidebarProject));
    })
   
}

export { 
    loadStorage, 
    todayTaskFilter, 
    displayAllTasks, 
    thisWeekTaskFilter, 
    urgentTaskFilter,
    overdueTaskFilter,
    displayProjectTasksListener,
    displayProjectTasksOnly, 
};  