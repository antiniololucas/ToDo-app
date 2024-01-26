import { todo } from "../models/todo.model";

/**
 * 
 * @param {todo} todo 
 */


// Crea el html en donde se van a cargar los to-do que fueron enviados en el metodo render.
export const createTodoHTML = (todo ) => {
    if(!todo) throw new console.error( 'A todo object is requiered');
    
    const html = `
                <div class="view">
                    <input class="toggle" type="checkbox" ${ todo.done ? 'checked' : ''}>
                    <label> ${todo.description} </label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">

    `;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.id);
    if(todo.done)
        liElement.classList.add('completed');

    return liElement;
}