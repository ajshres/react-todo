import React, { Component } from 'react';
import { formatText } from '../helper';

class CreateTodo extends Component {
	constructor() {
		super();
		this.createTodoAction = this.createTodoAction.bind(this);
		this.reset = this.reset.bind(this);
		this.isValid = this.isValid.bind(this);
		this.todo = {text:""};
		this.errors = "";

	}

	createTodoAction(event) {
		event.preventDefault();
		// add validation here
		let text = this.todo.text.value;
		if(!this.isValid(text)){
			return;
		}
		let isCompleted = false;
		let dText = formatText(text);
		let timestamp = Date.now();
		const todo = { text, isCompleted, dText, timestamp };
		this.props.addTodo(todo);
		this.reset();
	}
	
	reset() {
		if("text" in this.todo){
			this.todo.text.value = "";
		}
	}

	isValid(text) {
		if(!text){
			alert('Field cannot be empty');
			return false;
		}
		return true;
	}

	render() {
		return (
			<form onSubmit={(e) => this.createTodoAction(e)}>
				<input type="text" className="form-control input-lg" ref={ (input) => this.todo.text = input } />
			</form>
		);
	}
}

export default CreateTodo;
