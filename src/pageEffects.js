// This module creates functions that dynamically change css properties 

const displayNewProjectForm = () => {
    const addProjectButton = document.querySelector('.add-project-container');
    const addProjectForm = document.querySelector('.add-project-screen');
    addProjectButton.addEventListener('click', () => {
        addProjectForm.style.display = 'block';
    })
}

const displayNewTaskForm = () => {
    const projects = document.querySelectorAll('.project-details');
    const addTaskForm = document.querySelector('.add-task-screen');

    projects.forEach(project => {
        const addTaskSymbol = project.querySelector('.add-task-symbol');
        const projectName = project.querySelector('.project-name');
        const taskFormName = document.querySelector('#task-form-name');
        console.log(addTaskSymbol);
        console.log(taskFormName);
        addTaskSymbol.addEventListener('click', () => {
            console.log('hello');
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

export { displayNewProjectForm, showSidebarProjectTasks, displayNewTaskForm }