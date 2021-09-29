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
    const sidebarProjectName = document.querySelector('.sidebar-project-name');
    const sidebarTasksList = document.querySelector('.sidebar-tasks-collapse');
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

// I included this function to be able to verify that a user chose a priority option.
const priorityButtonCheck = () => {
    const buttons = document.querySelectorAll('.priority-buttons');
    buttons.forEach(button => {
        if (Array.from(button.classList).includes('clicked')) return true;
    })
    return false;
}


export { displayNewProjectForm, showSidebarProjectTasks, displayNewTaskForm, priorityButtonsChange, priorityButtonCheck }