/**
 * @jsx React.DOM
 */

var React = require('react');
var Nav = require('react-bootstrap/Nav');
var Navbar = require('react-bootstrap/Navbar');
var DropdownButton = require('react-bootstrap/DropdownButton');
var NavItem = require('react-bootstrap/NavItem');
var MenuItem = require('react-bootstrap/MenuItem');
var xhr = require('./xhr');

var NavbarWrapper = React.createClass({
	_handleLogout: function() {
		xhr('GET', 'api/logout/').success(function(data) {
			window.location = '/index.html'
		}.bind(this));
		event.preventDefault();
	},

	render: function() {
		return (
			<Navbar fixedTop fluid brand="Appshare" role="navigation">
				<Nav>
    				<NavItem eventKey={1} href="../favorites.html">My Favorites</NavItem>
    				<NavItem eventKey={2} href="../search.html">Search</NavItem>
    				<DropdownButton eventKey={3} title="Account">
    					<MenuItem eventKey="1" onSelect={this._handleLogout}>Sign out</MenuItem>
    				</DropdownButton>
				</Nav>
			</Navbar>
			);
		
	}
});

module.exports = NavbarWrapper;