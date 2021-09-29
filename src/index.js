import './style.css';

import { Task, Project} from './createProjects.js';
import { displayNewProjectForm, showSidebarProjectTasks, displayNewTaskForm, priorityButtonsChange } from './pageEffects.js';
import {addNewProjectListener} from './projectDomChanges.js';

displayNewProjectForm();
showSidebarProjectTasks();
addNewProjectListener();
displayNewTaskForm();
priorityButtonsChange();


