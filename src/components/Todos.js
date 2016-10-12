import React, { Component } from 'react';
import Todo from './Todo';

class Todos extends Component {
	constructor() {
		super();
		this.getTotalPercentage = this.getTotalPercentage.bind(this);
	}

	getTotalPercentage(todos) {
		var keys = Object.keys(todos);
		var total = keys.length || 0;
		var completed = keys.reduce((prevValue,k)=>{
			let isCompleted = todos[k].isCompleted;
			if(isCompleted){
				return prevValue + 1;
			}
			return prevValue;
		},0);
		this.total = total;
		this.completed = completed;
		let percentage = 0;
		if(total>0){
			percentage = completed / total * 100;
		}
		this.percentage = percentage.toFixed(2);
	}

	// react component lifecycle
	
	componentWillMount(){
		this.getTotalPercentage(this.props.todos);
	}
	
	componentWillUpdate(nextProps) {
		this.getTotalPercentage(nextProps.todos);
	}

	render() {

		let todos = this.props.todos;
		let keys = Object.keys(todos);
		let actions = this.props.actions;
		let todoList = keys.map(function(t){
			let todo = todos[t];
			if(todo.isCompleted){
				return false;
			}
			return (
				<Todo todo={todo} key={t} id={t} actions={actions}/>
			);
		});

		let completedTodo = keys.map(function(t){
			let todo = todos[t];
			if(!todo.isCompleted){
				return false;
			}
			return (
				<s key={t}><Todo todo={todo} key={t} id={t} actions={actions}/></s>
			);
		});

		return (
			<ul>
				{todoList}
				{completedTodo}
				<li>{this.completed} of {this.total} ({this.percentage} % completed)</li>
			</ul>
		);
	}
}

export default Todos;
