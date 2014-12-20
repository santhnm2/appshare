/**
 * @jsx React.DOM
 */

var React = require('react');
var Nav = require('react-bootstrap/Nav');
var Navbar = require('react-bootstrap/Navbar');
var DropdownButton = require('react-bootstrap/DropdownButton');
var NavItem = require('react-bootstrap/NavItem');
var MenuItem = require('react-bootstrap/MenuItem');

var NavbarWrapper = React.createClass({
	render: function() {
		return (
			<Navbar fixedTop fluid brand="Appshare" role="navigation">
				<Nav>
    				<NavItem eventKey={1} href="../favorites.html">My Favorites</NavItem>
    				<NavItem eventKey={2} href="../search.html">Search</NavItem>
    				<DropdownButton eventKey={3} title="Account">
    					<MenuItem eventKey="1" href="#">Sign out</MenuItem>
    				</DropdownButton>
				</Nav>
			</Navbar>
			);
		
	}
});

module.exports = NavbarWrapper;