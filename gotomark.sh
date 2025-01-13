
_goto_complete() {
  # Extract all keys from the ~/.gotomark JSON file and suggest them
  local cur="${COMP_WORDS[COMP_CWORD]}"
  local marks=$(jq -r '.marks | keys[]' ~/.gotomark 2>/dev/null)
  COMPREPLY=($(compgen -W "$marks" -- "$cur"))
}


listMarks(){
  cat ~/.gotomark | jq -r '.marks | to_entries[] | "\(.key): \(.value)"'
}
goto(){
  if [ -z ${1} ]; then
      listMarks
      return 0
  fi

  loc=`cat ~/.gotomark | jq -r .marks.${1}`
  if [ -z ${loc} ]; then
    echo "$loc does not exist"
  elif [ -f ${loc} ]; then
    echo $loc
    $EDITOR $loc
  elif [ -d ${loc} ]; then
    echo "cd $loc"
    cd $loc
  fi
}

# Register the completion function for 'goto'
complete -F _goto_complete goto

mark(){
  if [ -z ${1} ]; then
      listMarks
      return 0
  fi

  if [ "$1" = "-d" ]; then
      if [ -z "$2" ]; then
          echo "Error: Please specify a key to delete."
          return 1
      fi

      # Check if the key exists
      existing_loc=$(jq -r ".marks.${2}" $file)
      if [ "$existing_loc" = "null" ]; then
          echo "Error: Key '$2' does not exist."
          return 1
      fi

      echo -n "Are you sure you want to delete '$2': $existing_loc (y/N): "
      read confirm
      if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
          echo "Aborted. '$2' was not removed."
          return 1
      fi
      # Remove the key
      cat $file | jq "del(.marks.${2})" > $file.tmp
      mv $file.tmp $file
      echo "Removed mark '$2'."
      return 0
  fi

  file=~/.gotomark
  if ! [ -f $file ]; then
    touch $file
    echo '{"marks": {}}' > $file
  fi

  if [ -z $2 ]; then
    loc=`pwd`
  else
    loc=$2
  fi

  # Check if the mark already exists
  existing_loc=$(jq -r ".marks.${1}" $file)
  if [ "$existing_loc" != "null" ]; then
      echo "Mark '$1' already exists with value: $existing_loc"
      echo -n "Do you want to overwrite it? (y/N): "
      read confirm
      if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
          echo "Aborted. '$1' was not updated."
          return 1
      fi
  fi

  echo $loc
  cat $file | jq ".marks.$1 = \"$loc\"" > $file.tmp
  mv $file.tmp $file
  echo "marked $loc as $1"
}

