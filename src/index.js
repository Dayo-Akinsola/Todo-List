import './style.css';

import { Task, Project} from './createProjects.js';
import { displayNewProjectForm, showSidebarProjectTasks, displayNewTaskForm, priorityButtonsChange, showDetailsListener } from './pageEffects.js';
import {addNewProjectListener} from './projectDomChanges.js';
import { newTasklistener } from './taskDomChanges.js';

displayNewProjectForm();
showSidebarProjectTasks();
addNewProjectListener();
displayNewTaskForm();
priorityButtonsChange();
newTasklistener();
showDetailsListener();
