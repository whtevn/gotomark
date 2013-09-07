#!/usr/bin/env sh

mkdir ~/.gotomark

touch ~/.gotomark/marked_destinations

cp ./etc/profile_update ~/.gotomark/profile

cat ./etc/bash_profile >> ~/.bash_profile
