var BASE = 'https://itunes.apple.com/search/';

function getURL(input) {
	var url = BASE;
	var searchTerm = input.replace(" ", "%20");
	var parameters = {
		"term": searchTerm,
		"country": "us",
		"entity": "software",
		"limit": 5
	}
	var first = true;
	for (var parameter in parameters) {
		if (parameters.hasOwnProperty(parameter)) {
			if (first) {
				url += '?';
				first = false;
			}
			else {
				url += '&';
			}
			url += parameter + '=' + parameters[parameter];
		}
	}
	return url;
}


module.exports = {getURL: getURL};