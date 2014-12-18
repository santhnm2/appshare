/**
 * @jsx React.DOM
 */

var React = require('react');
var Nav = require('react-bootstrap/Nav');
var Navbar = require('react-bootstrap/Navbar');
var DropdownButton = require('react-bootstrap/DropdownButton');
var NavItem = require('react-bootstrap/NavItem');
var MenuItem = require('react-bootstrap/MenuItem');
//var Itunes = require('Itunes');

var Search = React.createClass({
	getInitialState: function() {
		return null;
	},

	render: function() {
		return(
			<div>
				<Navbar fixedTop="true" fluid="true" brand="Appshare" role="navigation">
					<Nav>
						<NavItem eventKey={1} href="friends.html">My Friends</NavItem>
        				<NavItem eventKey={2} href="favorites.html">My Favorites</NavItem>
        				<NavItem eventKey={3} href="search.html">Search</NavItem>
        				<DropdownButton eventKey={4} title="Account">
        					<MenuItem eventKey="1" href="#">Sign out</MenuItem>
        				</DropdownButton>
					</Nav>
				</Navbar>
			</div>
		);
	}
});

module.exports = Search;