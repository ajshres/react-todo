import React, { Component } from 'react';
import { formatText } from '../helper';

class Todo extends Component {
	constructor() {
		super();
		this.isCompleted = '';
		this.updateTodo = this.updateTodo.bind(this);
		this.editTodo = this.editTodo.bind(this);
		this.updateCheckbox = this.updateCheckbox.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
	}

	updateTodo(event) {
		event.preventDefault();
		let text = this.text.value;
		if(this.isValid(text)){
			let todo = {...this.props.todo};
			todo.text = text;
			todo.dText = formatText(text);
			this.props.actions.updateTodo(this.props.id,todo);
		}
	}

	updateCheckbox(event){
		let checked = event.target.checked;
		this.props.actions.updateCheckboxTodo(this.props.id,checked);
	}

	editTodo(event) {
		var todo = {...this.props.todo};
		this.props.actions.editTodo(this.props.id);
	}

	isValid(text) {
		if(!text){
			alert('Field cannot be empty');
			return false;
		}
		return true;
	}

	removeTodo(event) {
		this.props.actions.removeTodo(this.props.id);
	}

	render() {
		let todo = this.props.todo;
		var checked = todo.isCompleted ? true : false;
		if(todo.isEdit) {
			return (
				<form onSubmit={(e)=>this.updateTodo(e)}>
					<input type="checkbox" defaultChecked={checked} onClick={(e)=>this.updateCheckbox(e)}/>
					<span><input defaultValue={todo.text} ref={ (e) => this.text = e }/></span>
				</form>
				);
		} else {
			return (
				<li className="todo">
					<input type="checkbox" defaultChecked={checked} onClick={(e)=>this.updateCheckbox(e)}/>
					<span dangerouslySetInnerHTML={{__html: todo.dText}} onDoubleClick={(e)=>{this.editTodo(e)}}/>
					<span className="remove" onClick={(e)=>this.removeTodo(e)}>&nbsp;- Remove&nbsp;</span>
				</li>
			);
		}
	}
}

export default Todo;
