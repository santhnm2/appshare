/** @jsx React.DOM */

var React = require('react');
var Search = require('./Search.react');

React.renderComponent(
	<Search />,
	document.getElementById('search')
);