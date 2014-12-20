/**
 * @jsx React.DOM
 */

var React = require('react');
var NavbarWrapper = require('./NavbarWrapper.react');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Label = require('react-bootstrap/Label');
var Col = require('react-bootstrap/Col');
var xhr = require('./xhr');

var Favorites = React.createClass({
	getInitialState: function() {
		return {
			'favorites': ['(Favorite app #1)', '(Favorite app #2)', '(Favorite app #3)', '(Favorite app #4)', '(Favorite app #5)', '(Favorite app #6)', '(Favorite app #7)', '(Favorite app #7)', '(Favorite app #8)', '(Favorite app #9)']
		}
	},

	_getFavorites: function() {
		xhr('GET', 'api/favorite').success(function(data) {
			var temp = this.state.favorites;
			var favorites = data['favorites'].split('%:%');
			var result = null;
			var len = favorites.length;
			if (len > 10) {
				len = 10;
			}
			for (var i = 0; i < len; i++) {
				temp[i]=favorites[i];
			}
			this.setState({favorites: temp});
		}.bind(this));
	},

	render: function() {
		this._getFavorites();
		var gridStyle = {"marginTop": "200px"};
		var rowStyle = {"fontSize": "40px", "borderColor": "#000", "border": "1px solid black"};
		return (
			<div>
				<NavbarWrapper />
				<div style={gridStyle}>
					<Grid>
						<Row className="show-grid" style={rowStyle}>
							<Col>{this.state.favorites[0]}</Col>
						</Row>
						<Row className="show-grid" style={rowStyle}>
							<Col>{this.state.favorites[1]}</Col>
						</Row>
						<Row className="show-grid" style={rowStyle}>
							<Col>{this.state.favorites[2]}</Col>
						</Row>
						<Row className="show-grid" style={rowStyle}>
							<Col>{this.state.favorites[3]}</Col>
						</Row>
						<Row className="show-grid" style={rowStyle}>
							<Col>{this.state.favorites[4]}</Col>
						</Row>
						<Row className="show-grid" style={rowStyle}>
							<Col>{this.state.favorites[5]}</Col>
						</Row>
						<Row className="show-grid" style={rowStyle}>
							<Col>{this.state.favorites[6]}</Col>
						</Row>
						<Row className="show-grid" style={rowStyle}>
							<Col>{this.state.favorites[7]}</Col>
						</Row>
						<Row className="show-grid" style={rowStyle}>
							<Col>{this.state.favorites[8]}</Col>
						</Row>
						<Row className="show-grid" style={rowStyle}>
							<Col>{this.state.favorites[9]}</Col>
						</Row>
					</Grid>					
				</div>
			</div>
		);

		
	}
});

// <Grid>
// 					<Row className="show-grid">
// 						<Col>{this.state.favorites[0]}</Col>
// 					</Row>
// 					<Row className="show-grid">
// 						<Col>{this.state.favorites[1]}</Col>
// 					</Row>
// 				</Grid>

module.exports = Favorites;