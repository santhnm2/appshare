/**
 * @jsx React.DOM
 */

var React = require('react');

var Result = React.createClass({
	getInitialState: function() {
		return {
			'name': '', 
			'img': 'res/default.png' 
		};
	},

	setLoading: function() {
		this.setState({
			'img': 'res/loading.png'
		});
	}

	update: function(app) {
		this.setState({
			'name': data['trackCensoredName'],
			'img': data['artworkUrl512']
		});
	},

	render: function() {
		return (

		);
	}
});