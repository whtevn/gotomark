gotomark
========

command line program for marking directories from the command line for quick and easy access

npm install gotomark -g

then copy the following lines into your .bash_profile

		function __goto {
			cd `gotomark "$@"`
		}
		alias goto=__goto

