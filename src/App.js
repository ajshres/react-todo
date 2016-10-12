import React, { Component } from 'react';
import CreateTodo from './components/CreateTodo';
import Todos from './components/Todos';
import base from './rebase'
import './App.css';

class App extends Component {
	constructor() {
		super();
		// @todo: use localstorage for storing and retrieving data
		this.state = {
			todos:{},
			reminders:{}
		};
		this.addTodo = this.addTodo.bind(this);
		this.editTodo = this.editTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.clearTodo = this.clearTodo.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
		this.updateCheckboxTodo = this.updateCheckboxTodo.bind(this);
		let addTodo = this.addTodo;
		let removeTodo = this.removeTodo;
		let editTodo = this.editTodo;
		let clearTodo = this.clearTodo;
		let updateCheckboxTodo = this.updateCheckboxTodo;
		let updateTodo = this.updateTodo;
		this.actions = { addTodo, removeTodo, editTodo, clearTodo, updateCheckboxTodo, updateTodo };
	}

	addTodo(todo) {
		const todos = {...this.state.todos};
		//@add validation here
		let timeNow = Date.now();
		todos[`todo-${timeNow}`] = todo;
		this.setState({'todos':todos});
	}

	removeTodo(id) {
		let todos = {...this.state.todos};
		todos[id] = null;
		this.setState({'todos':todos});	
	}

	editTodo(todo) {
		let todos = {...this.state.todos};
		let keys = Object.keys(todos);
		for(let i=0,size=keys.length;i<size;i++){
			todos[keys[i]].isEdit = false;
		}
		todos[todo].isEdit = true;
		this.setState({'todos':todos});
	}

	updateCheckboxTodo(id,value) {
		let todos = {...this.state.todos};
		todos[id].isCompleted = value;
		this.setState({'todos':todos});
	}

	updateTodo(id,todo){
		let todos = {...this.state.todos};
		todos[id] = todo;
		todos[id].isEdit = false;
		this.setState({'todos':todos});
	}

	clearTodo(todo) {
		this.setState({'todos':{}});
	}

	// react lifecycle

	componentWillMount() {
		this.ref = base.syncState(`todos`, {
      context: this,
      state: 'todos'
    });
	}

	componentWillUnmount() {
    base.removeBinding(this.ref);
  }

	render() {
		return (
			<div className="todo-app">
				React js Tutorial
				<CreateTodo addTodo={this.addTodo} />
				<Todos todos={this.state.todos} actions={this.actions}/>
			</div>
		);
	}
}

export default App;
