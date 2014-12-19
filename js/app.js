/** @jsx React.DOM */

var React = require('react');
var Index = require('./Index.react');
var Search = require('./Search.react');
var Favorites = require('./Favorites.react');

//React.render(<Index />, document.getElementById('index'));
//React.render(<Search />, document.getElementById('search'));
React.render(<Favorites />, document.getElementById('favorites'));