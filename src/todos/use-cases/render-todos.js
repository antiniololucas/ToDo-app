import { createTodoHTML } from "./";
import { todo } from "../models/todo.model";

 // Cargar TODOS los to-do en el html cada vez que sea necesario
let element;
/**
 * 
 * @param {String} elementoId 
 * @param {todo} todos 
 */
export const renderTodos = (elementoId , todos = []) =>{

    if(!element)
        element = document.querySelector(elementoId);

    if(!element) throw new error("Error en encontrar elemento HTML");

    element.innerHTML = '';
    todos.forEach( todo =>{
        element.append( createTodoHTML(todo));
    })
}