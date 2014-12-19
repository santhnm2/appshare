/**
 * @jsx React.DOM
 */

var React = require('react');
var NavbarWrapper = require('./NavbarWrapper.react');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Itunes = require('./Itunes');
var xhr = require('./xhr');

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
		this.setState({
			apps: [
				{'img': 'res/loading.gif'},
				{'img': 'res/loading.gif'},
				{'img': 'res/loading.gif'},
				{'img': 'res/loading.gif'},
				{'img': 'res/loading.gif'}
			]
		});
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
    	this.render();
    },

	render: function() {
		var searchStyle = {"marginTop":"10%"};
		var panelGroupStyle = {"marginTop": "50px", "textAlign": "center", "clear": "both"};
		var panelStyle = {"height": "200px", "width": "200px", "display": "inline-block", "marginLeft": "10px", "marginRight": "10px"};
		var textPanelStyle = {"maxHeight": "60px", 
							  "maxWidth": "200px", 
							  "minHeight": "60px", 
							  "minWidth": "200px", 
							  "display": "inline-block", 
							  "marginLeft": "10px", 
							  "marginRight": "10px", 
							  "overflow": "auto",
							  "verticalAlign": "middle",
							};
		return(
			<div>
				<NavbarWrapper />
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

module.exports = Search;