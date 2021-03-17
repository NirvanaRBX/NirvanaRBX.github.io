const commands = {
  cat,
  ls,
  echo,
  help,
};

function help(args) {
  term.writeln('Commands Available:')
  Object.keys(commands).forEach(cmd => {
    term.writeln(cmd)
  });
}

function ls(args) {
  if (args.length == 1 && args[0] == '-1') {
    term.writeln(Object.keys(files).join('\r\n'));
    return;
  }
  term.writeln(Object.keys(files).join(' '));
}

function echo(args){
  term.writeln(args.join(' '))
}

function cat(args) {
  if (args.length !== 1) {
    term.writeln(`requires 1 argument, provided ${args.length}`)
    return;
  }
  if (!files[args[0]]) {
    term.writeln(`file not found: ${args[0]}`)
    return;
  }
  term.write(files[args[0]]);
}
