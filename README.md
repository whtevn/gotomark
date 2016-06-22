gotomark
========

command line program for marking directories for quick and easy access

	npm install gotomark -g

The installer will ask you what your shell profile is called, defaulting to .bash_profile. This location
is saved within the ~/.gotomark folder. When the installer is finished, source your profile:

`$ source ~/<profile name>`

After which you will have two new commands available to you: mark and goto. Both take an optional single argument denoting the short name of the place you would like to mark or goto. 

basic usage: 

	mark [place]
	goto [place]

list marks

	mark -l
	goto -l      # these do the same thing

delete mark
	
	mark -d [markName]  # mark name has to be exact

	mark -d             # find the markname for the current directory and delete it

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


==Thanks to

Options parsing
https://github.com/substack/node-optimist


Bash Completion
http://fahdshariff.blogspot.com/2011/04/writing-your-own-bash-completion.html





