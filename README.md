gotomark
========

command line program for marking directories for quick and easy access

	npm install gotomark -g

This will alter your +~/.bash_profile+. To use gotomark you must either close and re-open your terminal or run this command

	source ~/.bash_profile

After which you will have two new commands available to you: mark and goto. Both take an optional single argument denoting the short name of the place you would like to mark or goto. 

usage: 

	mark [place]
	goto [place]

ex:

	evan@~$ cd dev/                      # currently in home dir

	evan@dev$ mark                       # marking dev/ as default

	evan@dev$ cd                         # going back to home dir

	evan@~$ goto                         # going to default [~/dev/]

	evan@dev$ cd gotomark/               # going to a new dir

	evan@gotomark (master)$ mark gm      # marking as 'gm'

	evan@gotomark (master)$ cd           # leaving directory

	evan@~$ goto gm                      # going to 'gm'

	evan@gotomark (master)$ pwd          # showing in new dir
	/Users/evan/dev/gotomark




