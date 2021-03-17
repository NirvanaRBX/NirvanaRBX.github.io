let term;
let history;
let pointer;
let command;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
var browser='Unknown'
if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {browser=('Opera');}
else if(navigator.userAgent.indexOf("Chrome") != -1 && !navigator.brave){browser=('Chrome');}
else if(navigator.userAgent.indexOf("Chrome") != -1 && navigator.brave && await navigator.brave.isBrave()){browser=('Brave');}
else if(navigator.userAgent.indexOf("Safari") != -1){browser=('Safari');}
else if(navigator.userAgent.indexOf("Firefox") != -1 ) {browser=('Firefox');}
else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )){browser=('IE');}



const PROMPT = `${teal('[')}${cyan('Lvna')}${blue('@')}${cyan(browser)}${teal(']')} ${magenta('~')} $ `;
const PROMPT_LENGTH = PROMPT.replace(/\u001b\[[\d;]+m/g, '').length;
term = new Terminal({
  cols: 100,
  rows: 45,
  fontSize: 90,
  cursorBlink: true,
  theme: {
    selection: '#4C566A55',
    background: '#2E3440',
    foreground: '#ECEFF4',
  },
});
term.write('\u001B[?25l');
term.registerLinkMatcher(/https:\/\/\w+\.[^\s]*/, (event, uri) => window.open(uri, '_blank'));
term.open(document.getElementById('terminal'));
term.focus();
let r=1
for(i=0;i<20;i++){
  if(r===1){r=2;term.write('\033[A');term.write('\33[2K');term.writeln('-')}
  else if(r===2){r=3;term.write('\033[A');term.write('\33[2K');term.writeln('\\')}
  else if(r===3){r=4;term.write('\033[A');term.write('\33[2K');term.writeln('|')}
  else if(r===4){r=1;term.write('\033[A');term.write('\33[2K');term.writeln('/')}
  await sleep(100)
}
term.reset()
term.setOption('fontSize', 20)
term.write('\u001B[?25h');
term.write(`\r${PROMPT}`);

window.scrollTo(0, 0);

history = [];
pointer = 0;
command = '';

// TODO: Add boot sequence...

term.onData(event => {
  switch (event) {
    case '\r': // Enter
      execute(command);
    case '\u0003': // Ctrl+C
      command = '';
      pointer = history.length;
      term.write(`\r\n${PROMPT}`);
      break;
    case '\u0010': // Ctrl+P
      pointer = Math.max(pointer - 1, 0);
      term.write('\x1b[2K');
      term.write(`\r${PROMPT}`);
      term.write(history[pointer] || '')
      command = history[pointer] || '';
      break;
    case '\u000e': // Ctrl+N
      pointer = Math.min(pointer + 1, history.length);
      term.write('\x1b[2K');
      term.write(`\r${PROMPT}`);
      term.write(history[pointer] || '')
      command = history[pointer] || '';
      break;
    case '\u007F': // Backspace (DEL)
      if (term._core.buffer.x > PROMPT_LENGTH) {
        command = command.slice(0, -1);
        term.write('\b \b');
      }
      break;
    case '\u0015': // Ctrl+U
      command = '';
      term.write('\x1b[2K');
      term.write(`\r${PROMPT}`);
      break;
    case '\f': // Ctrl+L
      term.clear();
      break;
    default: // Print all other characters for demo
      if (event.charCodeAt(0) < 30 || event.charCodeAt(0) > 128) {
        break;
      }
      command += event;
      term.write(event);
  }
});

function execute(command) {
  history.push(command);
  term.writeln('\r');
  tokens = command.split(' ');
  if(command!==""){
    if (commands[tokens[0]]) {
      commands[tokens[0]](tokens.slice(1));
    } else {
      term.writeln(`Command not found: ${command}`);
    }
  }
}
})()