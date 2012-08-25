var git = require('gitty'),
    fs_helper = require('./fs_helper');

exports.clone_adafruit_libraries = function(adafruit_repository, remote, cb) {
  fs_helper.check_for_repository(adafruit_repository, function(err, status) {
    if (!err && !status) {
    git.clone(__dirname + "/../repositories", remote, function(output) {
      console.log(output);
      cb();
    });
    } else {
      cb();
    }
  });
};

exports.clone_repository = function(profile, repository, cb) {
  var clone_path = "git@bitbucket.org:" + profile.username + "/" + repository + ".git";
  console.log(clone_path);
  git.clone(__dirname + "/../repositories", clone_path, function(output) {
    console.log(output);
    cb();
  });
};

exports.update_remote = function(profile, repository, cb) {
  var remote_url = "ssh://git@bitbucket.org/" + profile.username + "/" + repository.toLowerCase() + ".git";
  git.remote.update(__dirname + "/../repositories/" + repository, "origin", remote_url, function(output) {
    console.log(output);
    cb(output);
  });
};

exports.add = function add(repository, file, cb) {
  var repository_path = __dirname + "/../repositories/" + repository;
  git.add(repository_path, [file], function(obj) {
    console.log(obj);
    cb();
  });
};

exports.commit = function commit(repository, message, cb) {
  var repository_path = __dirname + "/../repositories/" + repository;
  git.commit(repository_path, message, function(obj) {
    console.log(obj);
    cb();
  });
};

exports.push = function push(repository, remote, branch, cb) {
  var repository_path = __dirname + "/../repositories/" + repository;
  git.push(repository_path, remote, branch, function(obj) {
    console.log(obj);
    cb();
  });
};

exports.commit_push_and_save = function(repository, file, cb) {
  var that = this;
  that.add(repository, file.name, function(err, status) {
    var commit_message = "Modified " + file.name;
    that.commit(repository, commit_message,  function(err, status) {
      that.push(repository, "origin", "master", function(err, status) {
        cb(status);
      });
    });
  });
};