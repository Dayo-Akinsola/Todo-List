import './style.css';

import { Task, Project} from './createProjects.js';
import * as pageEffect from './pageEffects.js';
import {addNewProjectListener} from './projectDomChanges.js';
import { newTasklistener, editTaskListener } from './taskDomChanges.js';

pageEffect.displayNewProjectForm();
pageEffect.showSidebarProjectTasks();
pageEffect.displayNewTaskForm();
pageEffect.priorityButtonsChange();
pageEffect.showDetailsListener();
pageEffect.displayEditTaskForm();
addNewProjectListener();
newTasklistener();
editTaskListener();

