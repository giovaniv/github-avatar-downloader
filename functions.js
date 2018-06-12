module.exports = {

  checkFolder: function(folder) {
    var fs = require('fs');
    fs.exists(folder, function(exist) {
      if (!exist) {
        fs.mkdir(folder, function(err) {
          if (err) {
            return err;
          }
        })
      }
    })
  }

};