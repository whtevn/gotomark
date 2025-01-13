gotomark
========

command line program for marking directories for quick and easy access

```bash
	curl -sSL https://raw.githubusercontent.com/username/gotomark/main/gotomark.sh -o ~/.gotomark.sh
    echo 'source ~/.gotomark.sh' >> ~/.bashrc
    source ~/.bashrc
```

After which you will have two new commands available to you: mark and goto. Both take an optional single argument denoting the short name of the place you would like to mark or goto. 

basic usage: 

```bash
	mark [bookmark name] # <- makes a bookmark location
	goto [bookmark name] # <- goes to a bookmark location
```
ex.

make a mark

```bash
	yourComputer$ cd some/directory/you/use/a/lot/                      

	yourComputer$ mark myplace                      
```

goto mark

```bash
	yourComputer$ goto myplace                      
    
	yourComputer$ pwd
        some/directory/you/use/a/lot/                      
```

list marks - show all bookmarks and locations

```bash
	mark 
	goto      # these do the same thing
```

delete mark
	
```bash
	mark -d [markName]  # mark name has to be exact
```

