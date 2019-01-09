const { ipcRenderer: ipc } = require('electron');
const $ = q => document.querySelector(q);

ipc.send('ready');

ipc.on('Display#write', (event, { untranslated, translated }) => {
  $('.untranslated').innerText = untranslated;
  $('.translated').innerText = translated;
});

ipc.on('GPIO:0', (event, bit) => $('#gpio-0').className = bit ? 'active' : '');
ipc.on('GPIO:1', (event, bit) => $('#gpio-1').className = bit ? 'active' : '');
ipc.on('GPIO:2', (event, bit) => $('#gpio-2').className = bit ? 'active' : '');
ipc.on('GPIO:3', (event, bit) => $('#gpio-3').className = bit ? 'active' : '');
ipc.on('GPIO:4', (event, bit) => $('#gpio-4').className = bit ? 'active' : '');
ipc.on('GPIO:5', (event, bit) => $('#gpio-5').className = bit ? 'active' : '');
ipc.on('GPIO:6', (event, bit) => $('#gpio-6').className = bit ? 'active' : '');
ipc.on('GPIO:7', (event, bit) => $('#gpio-7').className = bit ? 'active' : '');
