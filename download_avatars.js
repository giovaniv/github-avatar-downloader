var request = require('request');
var token = require('./secrets');
console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

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

function showInfo(err, body) {

  var content;
  var fullPath = '';

  if (err) {
    console.log(err);
  }

  content = JSON.parse(body);

  content.forEach(function(item){
    fullPath = 'avatars/' + item.login + '.jpg';
    downloadImageByURL(item.avatar_url,fullPath);
  });
}

function downloadImageByURL(url, filePath) {
  var fs = require('fs');
  console.log(url);
  console.log(filePath);
}

//getRepoContributors('nodejs','node',showInfo);
getRepoContributors('lighthouse-labs','blockchain-resources',showInfo)