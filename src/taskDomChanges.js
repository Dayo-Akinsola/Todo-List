import { Task, projectsObject, tasksObject } from './createProjects.js';
import { createTaskMainDetails, createTaskButtons, createDetailsContainer, controlPriorityColor } from '../helpers/taskDomHelpers.js';
import { increaseSidebarHeight, showDetailsListener, displayEditTaskForm } from './pageEffects.js';
import { populateStorage } from '../helpers/displayControlHelpers.js';

/*
    The function finds the project that the user wants to add
    a task to and adds it to that project.
*/
const addTaskMainPage = (task, project) => {
    const taskList = project.querySelector('.todo-list-items');

    const taskListItem = document.createElement('div');
    taskListItem.classList.add('todo-list-item');
    taskListItem.setAttribute('data-taskId', task.id);

    const summaryContainer = document.createElement('div');
    summaryContainer.classList.add('summary-container');
    taskListItem.appendChild(summaryContainer);

    const mainDetailsContainer = createTaskMainDetails(task);
    summaryContainer.appendChild(mainDetailsContainer);

    const editTaskButtons = document.createElement('div');
    editTaskButtons.classList.add('edit-task-buttons');
    const buttonArray = createTaskButtons();
    buttonArray.forEach(button => editTaskButtons.appendChild(button)); 
    summaryContainer.appendChild(editTaskButtons);

    const detailsContainer = createDetailsContainer(task);
    taskListItem.appendChild(detailsContainer);


    taskList.appendChild(taskListItem);

}

// Matches project id in the sidebar with the project id stored in the projectsObject to update tally
const updateTaskTally = (projectInstance) => {
    const sidebarProjects = document.querySelectorAll('.sidebar-project');
    
    sidebarProjects.forEach(sidebarProject => {
        if (sidebarProject.dataset.projectid === projectInstance.id){
            const taskTally = sidebarProject.querySelector('.task-tally');
            taskTally.textContent = projectInstance.taskArray.length;               
        }
    })
}

/**
 * Created this function to separate the logic of creating a new task and submitting
 * a new task form. 
 * Returns Task class instance object created
 * @param {string} title - Task Title
 * @param {string} notes - Task Notes/Details
 * @param {string} date - Task Date
 * @param {string} priority - Task priority (low, normal, urgent)
 * @param {HTMLElement} project - The <li> element of the project that the task will belong to.
 */
const createNewTask = (title, notes, date, priority, project) => {

    const projectInstance = projectsObject[project.dataset.projectid];
    const task = new Task(title, notes, date, priority);
    task.formatDate();
    projectInstance.addTask(task);
    addTaskMainPage(task, project);
    updateTaskTally(projectInstance);

    return task;
}



const newTasklistener = () => {
    const form = document.querySelector('#add-task-form');
    const formTitle = document.querySelector('#task-form-name');
    const formNotes = document.querySelector('#notes-form');
    const formDate = document.querySelector('#task-form-date');
    const cancelButton = document.querySelector('#cancel-task-button');
    const addTaskScreen = document.querySelector('.add-task-screen');

    form.addEventListener('submit', (event) => {
        const projects = document.querySelectorAll('.project-details');
        projects.forEach(project => {
            if (Array.from(project.classList).includes('active')){
                event.preventDefault();

                const priority = document.querySelector('.priority-button.clicked');
                createNewTask(formTitle.value, formNotes.value, formDate.value, priority.id, project);
                
                // Resets the form
                formTitle.value = ''; formNotes.value = ''; formDate.value = '';
                addTaskScreen.style.display = 'none';
                project.classList.remove('active');

                increaseSidebarHeight();
            }
        })
        showDetailsListener();
        displayEditTaskForm();
        deleteTaskListener();
        changeTaskCompleteStatus();
        populateStorage();
    })

    cancelButton.addEventListener('click', () => {
        const projects = document.querySelectorAll('.project-details');
        projects.forEach(project => {
            if (Array.from(project.classList).includes('active')){
                formTitle.value = ''; formNotes.value = ''; formDate.value = '';
                addTaskScreen.style.display = 'none';
                project.classList.remove('active');
            }
        })
    })
}

// Function to handle the editing of a task
const editTaskListener = () => {
    const form = document.querySelector('#add-task-form');
    const formTitle = document.querySelector('#task-form-name');
    const formNotes = document.querySelector('#notes-form');
    const formDate = document.querySelector('#task-form-date');
    const cancelButton = document.querySelector('#cancel-task-button');
    const editTaskScreen = document.querySelector('.add-task-screen');


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskItems = document.querySelectorAll('.todo-list-item');
        const clickedPriorityBtn = document.querySelector('.priority-button.clicked');

        taskItems.forEach(task => {
            if (Array.from(task.classList).includes('active')){
                // Changing the task details in the dom
                const taskName = task.querySelector('.todo-title');
                const taskNotes = task.querySelector('#todo-notes');
                const taskPriority = task.querySelector('#todo-priority');
                const taskDate = task.querySelector('#todo-date');
                const taskCheck = task.querySelector('.todo-check');

                // Reflecting the change in the instance of the Task class
                const taskInstance = tasksObject[task.dataset.taskid];
                taskInstance.title = formTitle.value;
                taskInstance.notes = formNotes.value;
                taskInstance.dueDate = formDate.value;
                taskInstance.formatDate();
                taskInstance.priority = clickedPriorityBtn.id;

                taskName.textContent = taskInstance.title;
                taskNotes.textContent = taskInstance.notes;
                taskPriority.textContent = `Priority: ${taskInstance.priority}`;
                taskPriority.style.color = controlPriorityColor(taskInstance.priority);
                taskCheck.style.borderColor = controlPriorityColor(taskInstance.priority);
                taskDate.textContent = `Due: ${taskInstance.dueDate}`;


                // Stores the new task details in taskObject so they can be replaced in local storage
                const projectNode = task.parentNode.parentNode;
                const projectObject = projectsObject[projectNode.dataset.projectid];
                projectObject.taskArray.forEach(taskObject => {
                    if (taskObject.id === task.dataset.taskid){
                        taskObject.title = taskInstance.title;
                        taskObject.notes = taskInstance.notes;
                        taskObject.dueDate = taskInstance.dueDate;
                        taskObject.priority = taskInstance.priority;
                    }
                })

                // Reset form inputs and remove form
                formTitle.value = ''; formNotes.value = ''; formDate.value = '';
                task.classList.remove('active');
                editTaskScreen.classList.remove('edit-mode');
                editTaskScreen.style.display = 'none';
            }
        })
        populateStorage();
    })

    cancelButton.addEventListener('click', () => {
        const taskItems = document.querySelectorAll('.todo-list-item');
        taskItems.forEach(task => {
            if (Array.from(task.classList).includes('active')){
                formTitle.value = ''; formNotes.value = ''; formDate.value = '';
                task.classList.remove('active');
                editTaskScreen.classList.remove('edit-mode');
                editTaskScreen.style.display = 'none';

            }
        })
    })
}

const deleteTask = (event) => {
    const taskItems = document.querySelectorAll('.todo-list-item');

    taskItems.forEach(task => {
        /*
            The delted to task is removed from the DOM and all 
            references to its class instance is also removed.
        */
        if (task.querySelector('.delete-button') === event.target){
            tasksObject[task.dataset.taskid] = null;
            
            delete tasksObject[task.dataset.taskid];
            for (const project in projectsObject){
                projectsObject[project].taskArray.forEach(projectTask => {
                    if (projectTask.id === task.dataset.taskid){
                        projectsObject[project].removeTask(projectTask.id);
                        task.remove();
                        updateTaskTally(projectsObject[project]);
                    }
                })
            }
        }
    })
    populateStorage();
}

const deleteTaskListener = () => {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.removeEventListener('click', deleteTask);
        button.addEventListener('click', deleteTask);
    })
}

const changeTaskCompleteStatus = () => {
    const taskItems = document.querySelectorAll('.todo-list-item');

    taskItems.forEach(task => {
        const taskCheckbox = task.querySelector('input[type="checkbox"]');
        taskCheckbox.addEventListener('change', () => {
            const taskTitle = task.querySelector('.todo-title');
            if (!taskCheckbox.checked){
                tasksObject[task.dataset.taskid].complete = false;
                taskTitle.classList.remove('checked');
                task.classList.remove('checked');
            }
            else{
                tasksObject[task.dataset.taskid].complete = true;
                taskTitle.classList.add('checked');
                task.classList.add('checked');
            }
            populateStorage();
        })
    })
} 
 


export { 
    newTasklistener, 
    editTaskListener, 
    deleteTaskListener, 
    addTaskMainPage, 
    updateTaskTally,
    createNewTask,
    changeTaskCompleteStatus,
};