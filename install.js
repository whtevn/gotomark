#!/usr/bin/env node

var fs = require('fs');
var homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var profile=homedir+"/.bash_profile";
var installer='./etc/profile_update';

fs.readFile(installer, {encoding: 'utf8'}, function(err, data){
	fs.createWriteStream(profile, {'flags': 'a'}).write(data);;
});

console.log("\n#######################################\n#");
console.log("# Installation Success, I presume\n#");
console.log("# Now Run this command:");
console.log("# \tsource ~/.bash_profile");
console.log("#\n#######################################\n");
