function format(string) {
  return string.replace('\n', '').replace(/\n/g, '\r\n');
}

const ABOUT = format(`
NirvanaRBX lead dev/founder
CocoZ Support
`);

const CONTACT = format(`
Email:   lunarnightskies@gmail.com
Github:  https://github.com/imlvna
Discord: https://discord.io/nirvanarbx
`);

const PROJECTS = format(`
* NirvanaRBX
  My main project!
  The latest roblox exploit. Powering Freedom!
  https://nirvanarbx.tk
* FreedomHost
  My upcoming https://astral.cool paste
  Open to suggestions!
  http://freedomhost.ml
* School
  AAAAAAAAAAAAAAAAAAAA
`);

const BYPASS = format(`
https://discord.gg/mk5qak7e
`);

const files = {
  'about.txt': ABOUT,
  'contact.txt': CONTACT,
  'projects.txt': PROJECTS
};
