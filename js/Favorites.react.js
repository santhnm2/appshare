/**
 * @jsx React.DOM
 */

var React = require('react');
var NavbarWrapper = require('./NavbarWrapper.react');

var Favorites = React.createClass({
	render: function() {
		return (
			<NavbarWrapper />
			);
		
	}
});

module.exports = Favorites;