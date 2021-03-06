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
			searchComplete: false,
			buttonEnableStatus: [false, false, false, false, false],
			favorites: '',
			apps: [
				{'name': '', 'url': '', 'img': 'res/default.png'}, 
				{'name': '', 'url': '', 'img': 'res/default.png'}, 
				{'name': '', 'url': '', 'img': 'res/default.png'},
				{'name': '', 'url': '', 'img': 'res/default.png'},
				{'name': '', 'url': '', 'img': 'res/default.png'}
			],
		};
	},

	_setButtonsEnabled: function() {
		if (!this.state.searchComplete) {
			console.log("search hasn't finished...");
			this.setState({buttonEnableStatus: [false, false, false, false, false]});	
			return;
		}
		xhr('GET', 'api/favorite').success(function(data) {
			var enableTemp = [true, true, true, true, true];
			var favorites = data['favorites'].split('%:%');
			for (var j = 0; j < favorites.length; j++) {
				var appname = favorites[j];
				for (var i = 0; i < this.state.apps.length; i++) {
					if (appname === this.state.apps[i]['name']) {		
						enableTemp[i] = false;
					}
				}
			}
			this.setState({buttonEnableStatus: enableTemp});
		}.bind(this));
	},

	_handleSubmit: function(event) {
		var searchTerm = this.refs.searchBox.getValue();
		this.setState({
			searchComplete: false,
			apps: [
				{'img': 'res/loading.gif'},
				{'img': 'res/loading.gif'},
				{'img': 'res/loading.gif'},
				{'img': 'res/loading.gif'},
				{'img': 'res/loading.gif'}
			]
		});
		this._setButtonsEnabled();
		xhr('POST', 'api/itunes', {'searchTerm': searchTerm})
		.success(function(data) {
			this.parseData(data['results']);
			this.setState({searchComplete: true});
			this._setButtonsEnabled();
		}.bind(this));
		event.preventDefault();
    },

    _handleChange: function(evt) {
        //this.setState({searchTerm: evt.target.value});
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
					'img': data[0]['artworkUrl512'],
					'url': data[0]['trackViewUrl']
				},
				{
					'name': data[1]['trackCensoredName'],
					'img': data[1]['artworkUrl512'],
					'url': data[1]['trackViewUrl']
				},
				{
					'name': data[2]['trackCensoredName'],
					'img': data[2]['artworkUrl512'],
					'url': data[2]['trackViewUrl']
				},
				{
					'name': data[3]['trackCensoredName'],
					'img': data[3]['artworkUrl512'],
					'url': data[3]['trackViewUrl']
				},
				{
					'name': data[4]['trackCensoredName'],
					'img': data[4]['artworkUrl512'],
					'url': data[4]['trackViewUrl']
				}
			]
		});
    	this.render();
    },

    _handleFav0: function() {
    	var app = this.state.apps[0];
    	this._setButtonsEnabled();
    	xhr('POST', 'api/favorite', {'appname': app['name']}).success(function(data) {
    		if (data['status'] === 'success') {
    			this._setButtonsEnabled();
    		}
    	}.bind(this));
    	event.preventDefault();
    },

    _handleFav1: function() {
    	var app = this.state.apps[1];
    	this._setButtonsEnabled();
    	xhr('POST', 'api/favorite', {'appname': app['name']}).success(function(data) {
    		if (data['status'] === 'success') {
    			this._setButtonsEnabled();
    		}
    	}.bind(this));
    	event.preventDefault();
    },

    _handleFav2: function() {
    	var app = this.state.apps[2];
    	this._setButtonsEnabled();
    	xhr('POST', 'api/favorite', {'appname': app['name']}).success(function(data) {
    		if (data['status'] === 'success') {
    			this._setButtonsEnabled();
    		}
    	}.bind(this));
    	event.preventDefault();
    },

    _handleFav3: function() {
    	var app = this.state.apps[3];
    	this._setButtonsEnabled();
    	xhr('POST', 'api/favorite', {'appname': app['name']}).success(function(data) {
    		if (data['status'] === 'success') {
    			this._setButtonsEnabled();
    		}
    	}.bind(this));
    	event.preventDefault();
    },

    _handleFav4: function() {
    	var app = this.state.apps[4];
    	this._setButtonsEnabled();
    	xhr('POST', 'api/favorite', {'appname': app['name']}).success(function(data) {
    		if (data['status'] === 'success') {
    			this._setButtonsEnabled();
    		}
    	}.bind(this));
    	event.preventDefault();
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
							  "backgroundColor": "#eee"
							};
		var buttonStyle = {
			"width": "200px",
			"marginLeft": "10px",
			"marginRight": "10px",
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
							<a href={this.state.apps[0]['url']}>{this.state.apps[0]['name']}</a>
						</Panel>
						<Panel style={textPanelStyle}>
							<a href={this.state.apps[1]['url']}>{this.state.apps[1]['name']}</a>
						</Panel>
						<Panel style={textPanelStyle}>
							<a href={this.state.apps[2]['url']}>{this.state.apps[2]['name']}</a>
						</Panel>
						<Panel style={textPanelStyle}>
							<a href={this.state.apps[3]['url']}>{this.state.apps[3]['name']}</a>
						</Panel>
						<Panel style={textPanelStyle}>
							<a href={this.state.apps[4]['url']}>{this.state.apps[4]['name']}</a>
						</Panel>
					</div>
					<div>
						<Button bsStyle="primary" onClick={this._handleFav0} disabled={!this.state.buttonEnableStatus[0]} style={buttonStyle}>Favorite</Button>
						<Button bsStyle="primary" onClick={this._handleFav1} disabled={!this.state.buttonEnableStatus[1]} style={buttonStyle}>Favorite</Button>
						<Button bsStyle="primary" onClick={this._handleFav2} disabled={!this.state.buttonEnableStatus[2]} style={buttonStyle}>Favorite</Button>
						<Button bsStyle="primary" onClick={this._handleFav3} disabled={!this.state.buttonEnableStatus[3]} style={buttonStyle}>Favorite</Button>
						<Button bsStyle="primary" onClick={this._handleFav4} disabled={!this.state.buttonEnableStatus[4]} style={buttonStyle}>Favorite</Button>
					</div>
				</div>
				
			</div>
		);
	}
});

module.exports = Search;