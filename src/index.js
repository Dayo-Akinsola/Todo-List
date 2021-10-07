import './style.css';

import * as pageEffect from './pageEffects.js';
import {addNewProjectListener, deleteProjectListener} from './projectDomChanges.js';
import { newTasklistener, editTaskListener, deleteTaskListener } from './taskDomChanges.js';
import * as displayControl from './displayControl.js';

displayControl.loadStorage();
displayControl.displayAllTasks();
displayControl.todayTaskFilter();
displayControl.thisWeekTaskFilter();
displayControl.urgentTaskFilter();
displayControl.overdueTaskFilter();
displayControl.displayProjectTasksListener();

pageEffect.displayNewProjectForm();
pageEffect.showSidebarProjectTasks();
pageEffect.displayNewTaskForm();
pageEffect.priorityButtonsChange();
pageEffect.showDetailsListener();
pageEffect.displayEditTaskForm();

addNewProjectListener();
deleteProjectListener();

newTasklistener();
editTaskListener();
deleteTaskListener();



