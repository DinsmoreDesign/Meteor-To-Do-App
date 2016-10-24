import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//Subscribe to user-specific collections
Meteor.subscribe('todos');


// Helpers
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



// Events
Template.main.events({
	"submit .new-todo": function(event) {
		var text = event.target.text.value;

		// Insert Text in Mongo
		Meteor.call("addTodo", text);

		// Clear Form
		event.target.text.value = "";

		// Prevent Submit
		return false;
	},
	"click .toggle-checked": function() {
		Meteor.call("setChecked", this._id, !this.checked);
	},
	"click .delete-todo": function(){
		Meteor.call("deleteTodo", this._id);
	}
});



// Accounts
Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});



