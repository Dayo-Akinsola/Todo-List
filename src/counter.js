/* 
    This counter increments every time a new todo list item is created
    which gives each item a unique identifier
*/

const counter = () => {
    let i = 0;
    return function(){
        return i++;
    }
}

let id = counter();

export default id;