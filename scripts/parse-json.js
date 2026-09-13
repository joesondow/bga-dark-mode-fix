//const jsdom = require("jsdom");
const fs = require('fs');
const path = require("path");

const srcPath = path.join(__dirname, "..", "data", "globalUserInfos.json");
const targetPath = path.join(__dirname, "..", "data", "game_list.json");
const gamesSassFolderPath = path.join(__dirname, "..", "src/games");

var srcFile = fs.createReadStream(srcPath);
var jsonText;
try {
	jsonText = fs.readFileSync(srcPath).toString();
	// file read successfully
	console.log(srcPath + " file read with length " + jsonText.length);
} catch (err) {
	console.error(err);
}

var jsonObj = JSON.parse(jsonText);
// console.log(jsonObj);


var fileGameNames = [];
try {
	srcFile.close();
	fs.readdirSync(gamesSassFolderPath).forEach(file => {
		// will also include directory names
		//console.log(file);
		if (file.endsWith(".scss")) {
			var filePrefix = file.substring(0, file.length - 5);
			fileGameNames.push(filePrefix);
		}
	});
	//jsonText = fs.readFileSync(gamesSassFolderPath);
	// file read successfully
	//console.log(srcPath + " file read with length " + jsonText.length);
} catch (err) {
	console.error(err);
}
//console.log(fileGameNames);



var srcGameList = jsonObj["game_list"];
var targetGameList = [];
var targetGameNameList = [];

// console.log(srcGameList.length);


var gamesString = "";
for (let i = 0; i < srcGameList.length; i++) {
	var srcGame = srcGameList[i];
	gamesString += " " + srcGame["name"];
	//console.log(srcGame["name"];
	var targetGame = {
		id: srcGame["id"],
		name: srcGame["name"],
		weight: srcGame["weight"],
		display_name_en: srcGame["display_name_en"],
		status: srcGame["status"],
		premium: srcGame["premium"],
		games_played: srcGame["games_played"]
	};
	targetGameList.push(targetGame);
	targetGameNameList.push(srcGame["name"]);
}
//console.log(JSON.stringify(targetGameList, null, 4));


var gamesWithFiles = [];
var filesWithoutGames = [];

fileGameNames.forEach(fileGameName => {
	if (targetGameNameList.indexOf(fileGameName) >= 0) {
		gamesWithFiles.push(fileGameName);
	} else {
		filesWithoutGames.push(fileGameName);
	}
});
if (filesWithoutGames.length > 0) {
	console.error("Files that don't match any game: " + filesWithoutGames);

}

var outText = JSON.stringify(targetGameList, null, 4);

var outFile = fs.createWriteStream(targetPath);
try {
	fs.promises.writeFile(targetPath, outText);
	// file written successfully
	console.log(targetPath + " file written with length " + outText.length);
} catch (err) {
	console.error(err);
}

