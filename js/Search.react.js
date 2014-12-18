/**
 * @jsx React.DOM
 */

var React = require('react');
var Nav = require('react-bootstrap/Nav');
var Navbar = require('react-bootstrap/Navbar');
var DropdownButton = require('react-bootstrap/DropdownButton');
var NavItem = require('react-bootstrap/NavItem');
var MenuItem = require('react-bootstrap/MenuItem');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Itunes = require('./Itunes');

var Search = React.createClass({
	getInitialState: function() {
		return {
			"searchTerm": null
		};
	},
	
	_handleSubmit: function() {
		var URL = Itunes.getURL(this.state.searchTerm));
		
        //console.log(this.refs.searchBox.getDOMNode().value);
        //this.setState({text: ''});
    },

    _handleChange: function(evt) {
        this.setState({searchTerm: evt.target.value});
    },

	_handleKeyDown: function(evt) {
        if (evt.keyCode == 13 ) {
            return this._handleSubmit();
        }
    },

	render: function() {
		var searchStyle = {"marginTop":"10%"};
		return(
			<div>
				<Navbar fixedTop fluid brand="Appshare" role="navigation">
					<Nav>
						<NavItem eventKey={1} href="friends.html">My Friends</NavItem>
        				<NavItem eventKey={2} href="favorites.html">My Favorites</NavItem>
        				<NavItem eventKey={3} href="search.html">Search</NavItem>
        				<DropdownButton eventKey={4} title="Account">
        					<MenuItem eventKey="1" href="#">Sign out</MenuItem>
        				</DropdownButton>
					</Nav>
				</Navbar>
				<form style={searchStyle}>
					<Input ref="searchBox" type="text" placeholder="Search for an app..." onChange={this._handleChange} onKeyDown={this._handleKeyDown}/>
				</form>
			</div>
		);
	}
});

module.exports = Search;