#!/usr/bin/env sh

sudo mkdir ~/.gotomark

sudo touch ~/.gotomark/marked_destinations

sudo cp ./etc/profile_update ~/.gotomark/profile

sudo cat ./etc/bash_profile >> ~/.bash_profile
