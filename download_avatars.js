
// request and secrets require
var request = require('request');
var token = require('./secrets');

// we retrieve the username and repo that will have the images downloaded
var username = process.argv[2];
var repo = process.argv[3];

console.log('Welcome to the Github Avatar Downloader!');

// function to retrieves all the contributors data of a github username and repo
function getRepoContributors(repoOwner, repoName, cb) {

  // URL, user-agent and TOKEN to validate our request
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers : {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };

  request(options,function(err, res, body){
    cb(err, body);
  });

}

// function that check if the folder exist
// and if doesnt, it's created
function checkFolder(folder) {

  var fs = require('fs');
  var result = true;
  fs.exists(folder, function(exists) {
    if (!exists) {
      fs.mkdir(folder, function(err){
        if (err) {
          console.log(err);
        }
      })
    }
  });

}

// function to show the results of the github API
function showInfo(err, body) {

  var content;
  var folder = 'avatars';
  var fullPath = folder + '/';

  // console of any error during the process
  if (err) {
    console.log(err);
  }

  // parsing of the JSON data to array
  content = JSON.parse(body);

  // if the folder doesnt exist, we create it
  checkFolder(folder);

  // we loop the array retrieving the avatar link to the image of the user
  content.forEach(function(item){
    fullPath += item.login + '.jpg';
    downloadImageByURL(item.avatar_url,fullPath);
  });
}

// function to download the github avatar image
function downloadImageByURL(url, filePath) {

  var fs = require('fs');

  // we download the github avatar images
  request.get(url)
              .on('error', function(err) {
                console.log(err);
              })
              .on('response', function(response) {
                console.log('Downloading image...');
              })
              .on('end', function() {
                console.log('Download complete.');
              })
              .pipe(fs.createWriteStream(filePath));
}

// function execution
if (!username || !repo) {
  console.log('Please define a github username and repo first like the sample above:');
  console.log('<program_name> <username> <repo>');
}
else {
  getRepoContributors(username,repo,showInfo)
}

