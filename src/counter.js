/* 
    Counters for when a new project or task is created
    to give each one a unique identifier.
*/

const counter = () => {
    let i = 0;
    return function(){
        return i++;
    }
}

let taskId = counter();
let projectId = counter();


export {taskId, projectId}