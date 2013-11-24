#!/usr/bin/env node

var fs = require('fs');
var homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var profile=homedir+"/.bash_profile";
var profile_update='./etc/bash_profile';
var installer='./etc/profile_update';
var markdir = homedir+"/.gotomark"; 

fs.mkdir(markdir, function(e){
	copyFile(installer, markdir+"/profile.sh", function(){
		fs.readFile(profile_update, {encoding: 'utf8'}, function(err, data){
			fs.createWriteStream(profile, {'flags': 'a'}).write(data, 'utf8', function(err, data){
				fs.chown(markdir, +(process.env.SUDO_UID), +(process.env.SUDO_GID));
				fs.chown(markdir+"/profile.sh", +(process.env.SUDO_UID), +(process.env.SUDO_GID));
				if(err) throw(err);
				console.log("\n#######################################\n#");
				console.log("# Installation Success, I presume\n#");
				console.log("# Now Run this command:");
				console.log("# \tsource ~/.bash_profile");
				console.log("#\n#######################################\n");
			});
		});
	});
});

function copyFile(source, target, cb) {
	var cbCalled = false;

	var rd = fs.createReadStream(source);
	rd.on("error", function(err) {
		done(err);
	});
	var wr = fs.createWriteStream(target);
	wr.on("error", function(err) {
		done(err);
	});
	wr.on("close", function(ex) {
		done();
	});
	rd.pipe(wr);

	function done(err) {
		if (!cbCalled) {
			cb(err);
			cbCalled = true;
		}
	}
}
