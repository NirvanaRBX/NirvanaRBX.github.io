function format(string) {
  return string.replace('\n', '').replace(/\n/g, '\r\n');
}

const ABOUT = format(`
skidded website lllllllll
100% by luna yeah
https://maaslalani.com/ is cool too
`);

const CONTACT = format(`
Email:   lunarnightskies@gmail.com
Github:  https://github.com/imlvna
Discord: https://discord.io/nirvanarbx
`);

const PROJECTS = format(`
* Nirvana
* Lego hax
* School
`);

const BYPASS = format(`
https://discord.gg/mk5qak7e
`);

const files = {
  'about.txt': ABOUT,
  'contact.txt': CONTACT,
  'projects.txt': PROJECTS,
  'cock.txt': BYPASS
};
