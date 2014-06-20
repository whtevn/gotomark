#!/usr/bin/env node

var fs = require('fs');
var homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var profile=homedir+"/.bash_profile";
var profile_update='./etc/bash_profile';
var installer='./etc/profile_update';
var markdir = homedir+"/.gotomark"; 

/*
fs.exists(markdir, function (exists) {
	if(exists){
		fs.unlink(markdir+"/marked_destinations", function(){
			fs.unlink(markdir+"/profile.sh", function(err){
				fs.rmdir(markdir);
			});
		});
	}
});
*/

fs.readFile(profile, 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}

	var result = data.replace(/(^\s*$\s)+#* added by gotomark #*$\s(^.*$\s)*^#*\shttps:.*gotomark\s#*$\s#*\s/mg, '');
	fs.writeFile(profile, result, 'utf8', function (err) {
		if (err) return console.log(err);
	});
});
// http://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs
