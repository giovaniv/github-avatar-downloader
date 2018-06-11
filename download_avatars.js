var request = require('request');
console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers : {
      'User-Agent': 'request'
    }
  };

  request(options,function(err, res, body){
    cb(err, body);
  });

}

function showInfo(err, body) {
  var content;
  if (err) {
    console.log(err);
  }
  content = JSON.parse(body);
  content.forEach(function(item){
    console.log(item.avatar_url);
  });
  //console.log(content.avatar_url);
  console.log(content.length);
}

//getRepoContributors('nodejs','node',showInfo);
getRepoContributors('lighthouse-labs','blockchain-resources',showInfo)