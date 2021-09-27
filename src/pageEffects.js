// This module creates functions that dynamically change css properties 

const displayNewProjectForm = () => {
    const addProjectButton = document.querySelector('.add-project-container');
    const addProjectForm = document.querySelector('.add-project-screen');
    addProjectButton.addEventListener('click', () => {
        addProjectForm.style.display = 'block';
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

export { displayNewProjectForm, showSidebarProjectTasks }