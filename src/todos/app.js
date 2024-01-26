import todoStore from '../store/todo.store';
import html from './app.html?raw'; //Exportar en curdo todo un archivo gracias a vite
import { renderCount, renderTodos } from './use-cases';
import {Filters } from '../store/todo.store';

//Referencias a Html para no sobnreescribir
const elementIds = {
    TodoList :'.todo-list' ,
    newToDoInput : '#new-todo-input',
    btnDeleteComplete : '.clear-completed',
    todoFilters: '.filtro',
    lblCounter : '#pending-count'
}

/**Funcion anonima que se autoinvoca y que le agrega un elemento html dentro de cierto div. Reenderiza la app
 * 
 * @param {String} elementId 
 */

//App que se exporta como llamada de funcion en el main.js
export const App =( elementId) => {

    const displayToDos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos(elementIds.TodoList , todos);
        updatePendingCount();
    }

    const updatePendingCount = () =>{
        renderCount(elementIds.lblCounter);
    }
    
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html; // agregar al div enviado como parametro todo el html exportado arriba
        document.querySelector(elementId).append( app );
        displayToDos();
    })();


    //Referencias a HTML
    const newDescriptionInput = document.querySelector(elementIds.newToDoInput);
    const todoListUL = document.querySelector( elementIds.TodoList);
    const btnDeleteComplete = document.querySelector (elementIds.btnDeleteComplete);
    const filtersLI = document.querySelectorAll (elementIds.todoFilters);
    // //Eventos listener
    
    //Agregar ToDo
    newDescriptionInput.addEventListener ('keyup', ( event ) => {
        if(event.keyCode !== 13) return ;
        if(event.target.value.trim().length === 0) return ;
        todoStore.addTodo ( event.target.value);
        displayToDos();
        event.target.value = '';
    });

    //Elimina o tacha ToDo
    todoListUL.addEventListener('click' , (event) => {
        const element = event.target.closest('[data-id]');
        if(event.target.className === 'destroy')
        {
            todoStore.deleteTodo (element.getAttribute('data-id'));
        }
        else
        {
            todoStore.toggleTodo (element.getAttribute('data-id'));
        }
        displayToDos();
    });

    //Elimina los ToDo completados
    btnDeleteComplete.addEventListener('click' , (event) => {
        todoStore.deleteCompleted();
        displayToDos();
    });

    //Cambia el filtro de los ToDo que se desean ver
    filtersLI.forEach(element => {

        element.addEventListener('click' , (element) => {

            filtersLI.forEach(el => el.classList.remove ( 'selected' ));
            
            element.target.classList.add('selected');

            switch(element.target.text){
                case 'Todos' : 
                    todoStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todoStore.setFilter ( Filters.Pending )
                break;
                case 'Completados' :
                    todoStore.setFilter ( Filters.Completed)
                    break;
            }
        displayToDos();
        })
    })
}
