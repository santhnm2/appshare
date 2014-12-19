/**
 * @jsx React.DOM
 */

var React = require('react');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var xhr = require('./xhr');

var Index = React.createClass({
	_onRegisterSubmit: function() {


	},

	_onSigninSubmit: function() {
		var email = this.refs.signinEmail.getValue();
    	var pass = this.refs.signinPass.getValue();
		console.log("email = " + email + ", pass = " + pass);	
		xhr('POST', 'api/login/', {'email': email, 'pass': pass}).success(function(data){
			if (data['status'] === 'success') {
				window.location.assign('/search.html');
			} else {
				
			}
			// console.log(data);
			// if(data['status'] === 'success') {
			// 	console.log("SUCCESS");
			// 				// } else {
			// 	console.log("FAIL");
			// }

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
						<Input type="text" ref="register-first" className="form-control" required placeholder="First name"/>
						<Input type="text" ref="register-last" className="form-control" required placeholder="Last name"/>
						<Input type="email" ref="register-email" className="form-control" required placeholder="Email address"/>
						<Input type="password" ref="register-pass" className="form-control" placeholder="Password"/>
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