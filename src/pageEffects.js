// This module creates functions that dynamically change css properties 
const displayNewProjectForm = () => {
    const addProjectButton = document.querySelector('.add-project-container');
    const addProjectForm = document.querySelector('.add-project-screen');
    addProjectButton.addEventListener('click', () => {
        addProjectForm.style.display = 'block';
    })
}

// Displays new task from for the specific project that was clicked 
const displayNewTaskForm = () => {
    const projects = document.querySelectorAll('.project-details');
    const addTaskForm = document.querySelector('.add-task-screen');
    projects.forEach(project => {
        const addTaskSymbol = project.querySelector('.add-task-symbol');
        const projectName = project.querySelector('.project-name');
        const taskFormName = document.querySelector('#task-form-name');
        addTaskSymbol.addEventListener('click', () => {
            // Active class used to identify the project that has been clicked
            project.classList.add('active');
            addTaskForm.style.display = 'block';
            taskFormName.placeholder = `Add ${projectName.textContent} task`;
        })
    })
}

const showSidebarProjectTasks = () => {
    const sidebarProjects = document.querySelectorAll('.sidebar-project');

    sidebarProjects.forEach(project => {
        const sidebarProjectName = project.querySelector('.sidebar-project-name');
        const sidebarTasksList = project.querySelector('.sidebar-tasks-collapse');
        sidebarProjectName.addEventListener('click', () => {
            if (Array.from(sidebarTasksList.classList).includes('hidden')){
                sidebarTasksList.classList.remove('hidden');
                sidebarTasksList.classList.add('shown');
            }
    
            else{
                sidebarTasksList.classList.remove('shown');
                sidebarTasksList.classList.add('hidden');
            }
        }) 
    })
}

const priorityButtonsChange = () => {
    const buttons = document.querySelectorAll('.priority-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(button => button.classList.remove('clicked'));
            button.classList.add('clicked');
        })
    })
}

const increaseSidebarHeight = () => {
    const sidebar = document.querySelector('.sidebar');
    const mainPageHeight = document.querySelector('.todos-container').clientHeight;

    sidebar.style.minHeight = mainPageHeight + 50 + "px";
}

const showDetails = (event) => {
    const taskItems = document.querySelectorAll('.todo-list-item');
    let taskItem
    taskItems.forEach(task => {
        if (task.querySelector('.details-button') === event.target){
            taskItem = task;
        }
    })
    const detailsContainer = taskItem.querySelector('.details-container');
    if (Array.from(detailsContainer.classList).includes('hidden')){
        detailsContainer.classList.remove('hidden');
    }
    else detailsContainer.classList.add('hidden');
    increaseSidebarHeight();
}

/*
    Since the listener loops through all buttons again when a new
    task is added the removeEventListener is included so the buttons
    don't have multiple click events attached to them.
*/
const showDetailsListener = () => {
    const detailsButtons = document.querySelectorAll('.details-button');

    detailsButtons.forEach(button => {
        button.removeEventListener('click', showDetails)
        button.addEventListener('click', showDetails)
    })
}



export { 
    displayNewProjectForm, 
    showSidebarProjectTasks, 
    displayNewTaskForm, 
    priorityButtonsChange, 
    increaseSidebarHeight, 
    showDetailsListener,
}