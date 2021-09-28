import './style.css';

import { Task, Project} from './createProjects.js';
import { displayNewProjectForm, showSidebarProjectTasks } from './pageEffects.js';
import {addNewProjectListener} from './domChanges.js';

displayNewProjectForm();
showSidebarProjectTasks();
addNewProjectListener();

