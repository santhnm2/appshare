/**
 * @jsx React.DOM
 */

var React = require('react');
var Nav = require('react-bootstrap/Nav');
var Panel = require('react-bootstrap/Panel');
var Navbar = require('react-bootstrap/Navbar');
var DropdownButton = require('react-bootstrap/DropdownButton');
var NavItem = require('react-bootstrap/NavItem');
var MenuItem = require('react-bootstrap/MenuItem');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Itunes = require('./Itunes');

var xhr = require('./xhr');
//var XMLHttpRequest = require('xhr2');

var Search = React.createClass({
	getInitialState: function() {
		return {
			searchTerm: null,
			searchResults: null,
			apps: [
				{'name': '', 'img': 'res/default.png'}, 
				{'name': '', 'img': 'res/default.png'}, 
				{'name': '', 'img': 'res/default.png'},
				{'name': '', 'img': 'res/default.png'},
				{'name': '', 'img': 'res/default.png'}
			]
		};
	},
	
	_handleSubmit: function(event) {
		xhr('POST', 'api/itunes', {'searchTerm': this.state.searchTerm})
		.success(function(data) {
			this.parseData(data['results']);
		}.bind(this));
		event.preventDefault();
    },

    _handleChange: function(evt) {
        this.setState({searchTerm: evt.target.value});
    },

	_handleKeyDown: function(evt) {
        if (evt.keyCode == 13 ) {
            return this._handleSubmit(evt);
        }
    },

    parseData: function(data) {
    	var numResults = Object.keys(data).length;
    	var lim = (numResults < 5) ? numResults : 5;

    	this.setState({
    			apps: [
    				{
    					'name': data[0]['trackCensoredName'],
    					'img': data[0]['artworkUrl512']
    				},
    				{
    					'name': data[1]['trackCensoredName'],
    					'img': data[1]['artworkUrl512']
    				},
    				{
    					'name': data[2]['trackCensoredName'],
    					'img': data[2]['artworkUrl512']
    				},
    				{
    					'name': data[3]['trackCensoredName'],
    					'img': data[3]['artworkUrl512']
    				},
    				{
    					'name': data[4]['trackCensoredName'],
    					'img': data[4]['artworkUrl512']
    				}
    			]
    		});
    	// for (var i = 0; i < lim; i++) {
    	// 	this.setState({apps[i]['name']: data[i]['trackCensoredName']});
    	//  	this.setState({apps[i]['img']: data[i]['artworkUrl512']});
    	// }
    	this.render();
    },

	render: function() {
		var searchStyle = {"marginTop":"10%"};
		var panelGroupStyle = {"marginTop": "50px", "textAlign": "center", "clear": "both"};
		var panelStyle = {"height": "200px", "width": "200px", "display": "inline-block", "marginLeft": "10px", "marginRight": "10px"};
		var textPanelStyle = {"maxHeight": "100px", 
							  "maxWidth": "200px", 
							  "minHeight": "100px", 
							  "minWidth": "200px", 
							  "display": "inline-block", 
							  "marginLeft": "10px", 
							  "marginRight": "10px", 
							  "overflow": "auto",
							  "verticalAlign": "middle",
							};
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
				<div style={panelGroupStyle}>
					<div>
						<Panel style={panelStyle}>
							<img height="175px" width="175px" src={this.state.apps[0]['img']}/>
						</Panel>
						<Panel style={panelStyle}>
							<img height="175px" width="175px" src={this.state.apps[1]['img']}/>
						</Panel>
						<Panel style={panelStyle}>
							<img height="175px" width="175px" src={this.state.apps[2]['img']}/>
						</Panel>
						<Panel style={panelStyle}>
							<img height="175px" width="175px" src={this.state.apps[3]['img']}/>
						</Panel>
						<Panel style={panelStyle}>
							<img height="175px" width="175px" src={this.state.apps[4]['img']}/>
						</Panel>
					</div>
					<div>
						<Panel style={textPanelStyle}>
							{this.state.apps[0]['name']}
						</Panel>
						<Panel style={textPanelStyle}>
							{this.state.apps[1]['name']}
						</Panel>
						<Panel style={textPanelStyle}>
							{this.state.apps[2]['name']}
						</Panel>
						<Panel style={textPanelStyle}>
							{this.state.apps[3]['name']}
						</Panel>
						<Panel style={textPanelStyle}>
							{this.state.apps[4]['name']}
						</Panel>
					</div>
				</div>
				
			</div>
		);
	}
});

// <img height="175px" width="175px" src={this.state.imageURL[0]}/>
// 					<img height="175px" width="175px" src={this.state.imageURL[1]}/>
// 					<img height="175px" width="175px" src={this.state.imageURL[2]}/>
// 					<img height="175px" width="175px" src={this.state.imageURL[3]}/>
// 					<img height="175px" width="175px" src={this.state.imageURL[4]}/>


module.exports = Search;