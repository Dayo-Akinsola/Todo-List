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
    detailsButton.classList.add('todo-details'); detailsButton.textContent = 'Details';
    editButton.classList.add('todo-edit'); editButton.textContent = 'Edit';
    deleteButton.classList.add('todo-delete'); deleteButton.textContent = 'Delete';

    return buttonArray;
}

const createDetailsContainer = (task) => {
    const detailsContainer = document.createElement('div');
    const todoNotes = document.createElement('p');
    detailsContainer.classList.add('details-container'); 
    todoNotes.classList.add('todo-notes');
    todoNotes.textContent = task.notes;
    detailsContainer.appendChild(todoNotes);

    return detailsContainer;
}

export {createTaskMainDetails, createTaskButtons, createDetailsContainer}