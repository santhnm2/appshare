/**
 * @jsx React.DOM
 */

var React = require('react');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Label = require('react-bootstrap/Label');
var xhr = require('./xhr');

var Index = React.createClass({
	getInitialState: function() {
		return {
			invalidLogin: false,
			'first': '',
			'last': '',
			'email': '',
			'pass': ''
		};
	},

	_handleRegisterChange: function() {
		this.setState({
			'first': this.refs.registerFirst.getValue(),
			'last': this.refs.registerLast.getValue(),
			'email': this.refs.registerEmail.getValue(),
			'pass': this.refs.registerPass.getValue()	
		})
	},

	_onRegisterSubmit: function() {
		var first = this.refs.registerFirst.getValue();
    	var last = this.refs.registerLast.getValue();
		var email = this.refs.registerEmail.getValue();
    	var pass = this.refs.registerPass.getValue();
    	var payload = {
    		'first': first,
    		'last': last,
    		'email': email,
    		'pass': pass
    	}
    	this.setState({
    			'first': '',
				'last': '',
				'email': '',
				'pass': ''
    	});
    	this.render();
    	xhr('POST', 'api/register/', payload).success(function(data) {
    		if (data['status'] === 'success') {
    			window.alert(first + ', your account was successfully created. Log in to continue.');
    		} else {
    			window.alert('Error. An account with that email has already been created. Please try again.');
    		}
    		
    		this.render();
    	}.bind(this));
    	event.preventDefault();
	},

	_onSigninSubmit: function() {
		var email = this.refs.signinEmail.getValue();
    	var pass = this.refs.signinPass.getValue();
		console.log("email = " + email + ", pass = " + pass);	
		xhr('POST', 'api/login/', {'email': email, 'pass': pass}).success(function(data){
			if (data['status'] === 'success') {
				window.location.assign('/search.html');
			} else {
				window.alert("Invalid credentials. Please try again.");
			}
		}.bind(this));
		event.preventDefault();
	},

	render: function() {
		return (
			<div className="container">
				<div className="welcome">
					<h1 className="welcome-banner">Welcome to Appshare</h1>
					<h2 className="welcome-message">The platform for sharing your favorite apps with your friends</h2>
				</div>
				<div className="form-group">
					<form className="form-register" role="form">
						<h2 className="form-register-heading">Register</h2>
						<Input type="text" ref="registerFirst" onChange={this._handleRegisterChange} value={this.state.first} className="form-control" required placeholder="First name"/>
						<Input type="text" ref="registerLast" onChange={this._handleRegisterChange} value={this.state.last} className="form-control" required placeholder="Last name"/>
						<Input type="email" ref="registerEmail" onChange={this._handleRegisterChange} value={this.state.email} className="form-control" required placeholder="Email address"/>
						<Input type="password" ref="registerPass" onChange={this._handleRegisterChange} value={this.state.pass} className="form-control" placeholder="Password"/>
						<Button type="submit" bsStyle="primary" onClick={this._onRegisterSubmit}>Sign up</Button>

					</form>
					
				</div>
				<div>
					<img id="iphone" src ="res/iphone.png"/>
				</div>
				<div className="form-group">
					<form className="form-signin" role="form">
						<h2 className="form-signin-heading">Sign in</h2>
						<Input type="email" ref="signinEmail" className="form-control" required placeholder="Email address"/>
						<Input type="password" ref="signinPass" className="form-control" placeholder="Password"/>
						<Button type="submit" bsStyle="primary" onClick={this._onSigninSubmit}>Sign in</Button>
					</form>
				</div>
				
			</div>
		);			
	}

});

module.exports = Index;