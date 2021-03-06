import { format } from 'date-fns';

/* 
    This module is for functions with the purpose of
    dynamically changing css properties.
*/

const displayNewProjectForm = () => {
    const addProjectButton = document.querySelector('.add-project-container');
    const addProjectForm = document.querySelector('.add-project-screen');
    addProjectButton.addEventListener('click', () => {
        addProjectForm.style.display = 'block';
    })
}

const resetPriorityButton = () => {
    const priorityButtons = document.querySelectorAll('.priority-button');
    priorityButtons.forEach(button => button.classList.remove('clicked'));
    const normalPriorityButton = document.querySelector('#normal');
    normalPriorityButton.classList.add('clicked');
}

// Displays new task from for the specific project that was clicked 
const displayNewTaskForm = () => {
    const projects = document.querySelectorAll('.project-details');
    const addTaskForm = document.querySelector('.add-task-screen');
    const submitTaskButton = document.querySelector('#submit-task-button');

    projects.forEach(project => {
        const addTaskSymbol = project.querySelector('.add-task-symbol');
        const projectName = project.querySelector('.project-name');
        const taskFormName = document.querySelector('#task-form-name');
        addTaskSymbol.addEventListener('click', () => {
            resetPriorityButton();
            // Active class used to identify the project that has been clicked
            project.classList.add('active');
            addTaskForm.style.display = 'block';
            taskFormName.placeholder = `Add ${projectName.textContent} task`;
            submitTaskButton.value = 'Add Task';
        })
    })
}

const setEditFormValues = (event) => {
    const taskItems = document.querySelectorAll('.todo-list-item');

    const editTaskForm = document.querySelector('.add-task-screen');
    editTaskForm.classList.add('edit-mode');
    editTaskForm.style.display = 'block';

    // Default input fields for the edit form
    const taskFormName = document.querySelector('#task-form-name');
    const taskFormNotes = document.querySelector('#notes-form');
    const priorityButtons = document.querySelectorAll('.priority-button');
    const taskFormDate = document.querySelector('#task-form-date');
    const submitTaskButton = document.querySelector('#submit-task-button');

    taskItems.forEach(task => {
        if (task.querySelector('.edit-button') === event.target){
            const taskName = task.querySelector('.todo-title');
            const taskNotes = task.querySelector('#todo-notes');
            const taskPriority = task.querySelector('#todo-priority');
            const taskDate = task.querySelector('#todo-date');

            /* 
                Sets the default input values to be the current values of the
                task to be edited.
            */ 
            taskFormName.value = taskName.textContent;
            taskFormNotes.value = taskNotes.textContent;
            priorityButtons.forEach(button => {
                button.classList.remove('clicked');
                if (button.id === taskPriority.textContent.substring(10).toLowerCase()){
                    button.classList.add('clicked');
                }
            })
            const splitDate = taskDate.textContent.substring(5).split('/');
            taskFormDate.value = format(new Date(splitDate[2], parseInt(splitDate[1]) - 1, splitDate[0]), 'yyyy-MM-dd');
            submitTaskButton.value = 'Edit Task';

            task.classList.add('active');
        } 
    })
}

/*
    Since the listener loops through all buttons again when a new
    task is added the removeEventListener is included so the buttons
    don't have multiple click events attached to them.
*/
const displayEditTaskForm = () => {
    const editButtons = document.querySelectorAll('.edit-button');
    
    editButtons.forEach(button => {
        button.removeEventListener('click', setEditFormValues);
        button.addEventListener('click', setEditFormValues);
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
    let mainPageHeight = document.querySelector('.todos-container').clientHeight;
    
    mainPageHeight += 100; 
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

const showDetailsListener = () => {
    const detailsButtons = document.querySelectorAll('.details-button');

    detailsButtons.forEach(button => {
        button.removeEventListener('click', showDetails)
        button.addEventListener('click', showDetails)
    })
}

// The page is only displayed if all projects in the DOM are hidden or if there are no projects in the DOM.
const toggleFinishedPage = (projectElements) => {
    const allProjectsCompletePage = document.querySelector('.projects-complete-container');
    if (!projectElements) {
        allProjectsCompletePage.style.display = 'block';
        return;
    }

    const projectsHidden = Array.from(projectElements).some( (projectElement) => {
        return projectElement.style.display !== 'none';
    });

    if (!projectsHidden || Array.from(projectElements).length === 0) allProjectsCompletePage.style.display = 'block';
    else allProjectsCompletePage.style.display = 'none';
}




export { 
    displayNewProjectForm, 
    displayNewTaskForm, 
    priorityButtonsChange, 
    increaseSidebarHeight, 
    showDetailsListener,
    displayEditTaskForm,
    toggleFinishedPage,
}