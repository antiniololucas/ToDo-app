import { todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'All',
    Completed: 'Completados',
    Pending : 'Pendientes',
}

const state = {
    todos:[],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;
    
    const {todos = [] , filter} = JSON.parse (localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

export const getTodos = ( filter ) => {
    switch( filter ){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error(`Option ${ filter} is not valid. `)
    }
}

const addTodo = ( description ) => {
    if ( !description) throw new Error(`Description ir required`)

    state.todos.push( new todo(description));
    saveStateToLocalStorage();
}

// Cambiar elestado de hecho a incompleto, segun sea necesario
const toggleTodo =  ( todoId ) => {
        state.todos.forEach(element => {
        if(element.id === todoId){
            element.done = !element.done;
        }
      });
      saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter ( todo =>todo.id !== todoId );
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter ( todo => todo.done === false );
    saveStateToLocalStorage();
}

const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,toggleTodo, deleteTodo, deleteCompleted, setFilter, getCurrentFilter, getTodos, loadStore,addTodo
}