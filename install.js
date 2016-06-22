#!/usr/bin/env node

var fs = require('fs');
var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
var homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var profile_add='./etc/profile';
var installer='./etc/profile_installer';
var markdir = homedir+"/.gotomark";
var profile_loc = markdir + "/profile_loc"
var uid, gid, profile;

rl.question("What is your shell's profile called? (default: .bash_profile)\n", function(answer){
	profile = answer || ".bash_profile";
	profile = homedir+"/"+profile;
	console.log("Using profile at " + profile);
	fs.mkdir(markdir, function(e){
		fs.createWriteStream(profile_loc, {'flags': 'a'}).write(profile, 'utf8', function(err, data){
			if(err) throw(err);
			copyFile(installer, markdir+"/profile.sh", function(){
				fs.readFile(profile_add, {encoding: 'utf8'}, function(err, data){
					if (process.env.GOTOMARK !== "INSTALLED") {
						fs.createWriteStream(profile, {'flags': 'a'}).write(data, 'utf8', function(err, data){
							uid = process.env.SUDO_UID || process.getuid()
							gid = process.env.SUDO_GID || process.getgid()
							fs.chownSync(markdir, +(uid), +(gid));
							fs.chownSync(markdir+"/profile.sh", +(uid), +(gid));
							fs.exists(homedir+"/.marked_destinations", function(exists){
								if(exists){
									fs.rename(homedir+"/.marked_destinations", markdir+"/marked_destinations");
								}
							});
							if(err) throw(err);
							console.log("\n#######################################\n#");
							console.log("# Installation Success, I presume\n#");
							console.log("# Now Run this command:");
							console.log("# \tsource " + profile);
							console.log("#\n#######################################\n");
						});
					} else {
						console.log("\n#######################################\n#");
						console.log("# Already installed!");
						console.log("#\n#######################################\n");
					}
				});
			});
		});
	});
	rl.close();
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
