import './style.css';

import * as pageEffect from './pageEffects.js';
import {addNewProjectListener, deleteProjectListener, addNewProject, addNewProjectToSidebar} from './projectDomChanges.js';
import { newTasklistener, editTaskListener, deleteTaskListener, createNewTask, changeTaskCompleteStatus } from './taskDomChanges.js';
import * as displayControl from './displayControl.js';
import { Project } from './createProjects.js';
import {format} from 'date-fns';

if (!localStorage.getItem('projectsObject')){
    const exampleProject = new Project("Example Project");
    addNewProject(exampleProject);
    addNewProjectToSidebar(exampleProject);

    const info = new Project("Info");
    addNewProject(info);
    addNewProjectToSidebar(info);

    const todaysDate = format(new Date(), 'yyyy-MM-dd');
    const overdueDate = format(new Date('1965', '07', '12'), 'yyyy-MM-dd');
    const exampleProjectElement = document.querySelector(`.project-details[data-projectid="${exampleProject.id}"]`);
    createNewTask('Normal Task', "I'll complete this towards the end of the day", todaysDate, 'normal', exampleProjectElement);
    createNewTask('Urgent Task', "Need to complete this today!", todaysDate, 'urgent', exampleProjectElement);
    createNewTask('Overdue Task', "Might need to update the date for this.", overdueDate, 'low', exampleProjectElement);

    const date = format(new Date('2021', '10', '21'), 'yyyy-MM-dd');
    const infoElement = document.querySelector(`.project-details[data-projectid="${info.id}"]`);
    createNewTask('Dates are in dd/mm/yyyy format', "Hope you enjoy using the app!", date, 'normal', infoElement);
}

displayControl.loadStorage();
displayControl.displayAllTasks();
displayControl.todayTaskFilter();
displayControl.thisWeekTaskFilter();
displayControl.urgentTaskFilter();
displayControl.overdueTaskFilter();
displayControl.displayProjectTasksListener();

pageEffect.displayNewProjectForm();
pageEffect.displayNewTaskForm();
pageEffect.priorityButtonsChange();
pageEffect.showDetailsListener();
pageEffect.displayEditTaskForm();

addNewProjectListener();
deleteProjectListener();

newTasklistener();
editTaskListener();
deleteTaskListener();
changeTaskCompleteStatus();





