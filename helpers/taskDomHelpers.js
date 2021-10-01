const createTaskMainDetails = (task) => {
    const mainDetailsContainer = document.createElement('div');
    mainDetailsContainer.classList.add('radio-title-container');
    const taskRadio = document.createElement('input');
    taskRadio.classList.add('todo-check'); taskRadio.type = 'radio';
    const taskTitle = document.createElement('span');
    taskTitle.classList.add('todo-title'); taskTitle.textContent = task.title;
    mainDetailsContainer.appendChild(taskRadio); mainDetailsContainer.appendChild(taskTitle);

    return mainDetailsContainer;
}

const createTaskButtons = () => {
    const detailsButton = document.createElement('button');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const buttonArray = [ detailsButton, editButton, deleteButton];
    buttonArray.forEach(button => button.type = 'button');
    detailsButton.classList.add('details-button'); detailsButton.textContent = 'Details';
    editButton.classList.add('edit-button'); editButton.textContent = 'Edit';
    deleteButton.classList.add('delete-button'); deleteButton.textContent = 'Delete';

    return buttonArray;
}

const createDetailsContainer = (task) => {
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container'); 
    detailsContainer.classList.add('hidden');

    const todoNotes = document.createElement('p');
    todoNotes.id = 'todo-notes'; todoNotes.classList.add('details');
    todoNotes.textContent = task.notes;
    detailsContainer.appendChild(todoNotes);
    
    const taskDate = document.createElement('span');
    taskDate.id = 'todo-date'; taskDate.classList.add('details');
    taskDate.textContent = 'Due: ' + task.dueDate; 
    detailsContainer.appendChild(taskDate);

    const taskPriority = document.createElement('span');
    taskPriority.id = 'todo-priority'; taskPriority.classList.add('details');
    taskPriority.textContent = 'Priority: ' + task.priority;
    if (task.priority === 'low') taskPriority.style.color = '#84f14e';
    else if (task.priority === 'normal') taskPriority.style.color = '#f1bb4e';
    else taskPriority.style.color = '#f14e4e';
    detailsContainer.appendChild(taskPriority);

    return detailsContainer;
}

export {createTaskMainDetails, createTaskButtons, createDetailsContainer}