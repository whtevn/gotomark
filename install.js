#!/usr/bin/env node

var fs = require('fs');
var homedir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var profile=homedir+"/.bash_profile";
var installer='./etc/profile_update';


fs.readFile(installer, {encoding: 'utf8'}, function(err, data){
	fs.writeFileSync(profile, data, {flag: 'a'});
});
