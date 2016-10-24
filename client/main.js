import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Todos = new Mongo.Collection('todos');

Template.main.helpers({
	todos: function() {
		return Todos.find(
			{},
			{	// Sort Todos with newest first
				sort: {createdAt: -1}
			}
		);
	}
});

Template.main.events({
	"submit .new-todo": function(event) {
		var text = event.target.text.value;

		// Insert Text in Mongo
		Todos.insert({
			text: text,
			createdAt: new Date()
		});

		// Clear Form
		event.target.text.value = "";

		// Prevent Submit
		return false;
	},
	"click .toggle-checked": function() {
		Todos.update(this._id, {$set:{checked: !this.checked}});
	},
	"click .delete-todo": function(){
		if (confirm("Are you sure?")) {
			Todos.remove(this._id);
		}
	}
});