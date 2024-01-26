import { Filters , getTodos } from "../../store/todo.store"; 

//Permite llevar la cuenta de todos los pendientes
let element;
export const renderCount = (elementId) => {
    if (!element)
        element = document.querySelector( elementId);

    if (!element)
        throw new error("Element not found");

    element.innerHTML =  getTodos(Filters.Pending).length;
}