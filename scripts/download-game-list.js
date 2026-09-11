#!/usr/bin/env node
// Downloads BGA's web page for the list of all BGA games
// sorted by "Popularity" a.k.a. "weight".
// For use by other scripts to generate data tables about
// which games still need help looking good in dark mode.

const https = require('https');
const fs = require('fs');
const path = require("path");

const htmlPath = path.join(__dirname, "..", "gamelist", "gamelist.html");
const allGamesByPopularityDescUrl = "https://boardgamearena.com/gamelist?allGames=&sort=popularity%3Adesc";

var download = async function(url, dest) {
	
	// Make an HTTP GET request
	const response = await fetch(allGamesByPopularityDescUrl);
	// Always check the HTTP status before parsing the response
	// fetch only rejects on network errors, not on 4xx / 5xx
	if (!response.ok) {
	  throw new Error(`HTTP ${response.status}`);
	}

	var file = fs.createWriteStream(dest);
	
	// Parse the response body as JSON
	const htmlText = await response.text();
	console.log(htmlText.length);
	console.log(htmlText);
	
	try {
	    fs.writeFileSync(htmlPath, htmlText);
	    // file written successfully
		console.log(htmlPath + " file written with length " + htmlText.length);
	} catch (err) {
	    console.error(err);
	}
}

download(allGamesByPopularityDescUrl, htmlPath);
