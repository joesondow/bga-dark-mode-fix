//const jsdom = require("jsdom");
const fs = require('fs');
const path = require("path");

const htmlPath = path.join(__dirname, "..", "gamelist", "gamelist.html");
const jsonPath = path.join(__dirname, "..", "gamelist", "globalUserInfos.json");

var file = fs.createReadStream(htmlPath);
var htmlText;
try {
	htmlText = fs.readFileSync(htmlPath).toString();
	// file read successfully
	console.log(htmlPath + " file read with length " + htmlText.length);
} catch (err) {
	console.error(err);
}

//console.log(htmlText);
/*
const dom = new jsdom.JSDOM(htmlText);
const scripts = dom.window.document.querySelectorAll("script");
var gameListScriptText;
//console.log(htmlText);
for (let i = 0; i < scripts.length; i++) {
	var scriptElement = scripts[i];
	var scriptText = scriptElement.text;
	//console.log(i + " : " + scriptText.length);
	if (scriptText.indexOf("game_list") > -1) {
		gameListScriptText = scriptText;
		break;
	}
}
*/

const beforeJson = "globalUserInfos=";
const afterJson = "globalLangInfos=";
const startIndex = htmlText.indexOf(beforeJson) + beforeJson.length;
const endIndex = htmlText.indexOf(afterJson);
var jsonText = htmlText.substring(startIndex, endIndex).trim();
if (jsonText.endsWith(";")) {
	jsonText = jsonText.substring(0, jsonText.length - 1);
}
//console.log(jsonText);

var outFile = fs.createWriteStream(jsonPath);
try {
	fs.promises.writeFile(jsonPath, jsonText);
	// file written successfully
	console.log(jsonPath + " file written with length " + jsonText.length);
} catch (err) {
	console.error(err);
}


