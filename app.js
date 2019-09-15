const { app, BrowserWindow, ipcMain: ipc } = require('electron');
const { Kymera, Display } = require('@kymera/core');
const liblouis = require('liblouis');
const path = require('path');
const appRoot = require('app-root-path').toString();

liblouis.enableOnDemandTableLoading(path.join(appRoot, 'node_modules', 'liblouis-build', 'tables'));

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

ipc.on('ready', ({ sender: render }) => {
  Display.prototype._write = Display.prototype.write;

  Display.prototype.write = function write(text) {
    render.send('Display#write', {
      untranslated: text,
      translated: liblouis.translateString(this.tables, text),
    });

    return this._write(text);
  };

  const ky = new Kymera({
    displayGPIO: [
      { write: bit => render.send('GPIO:0', bit) },
      { write: bit => render.send('GPIO:1', bit) },
      { write: bit => render.send('GPIO:2', bit) },
      { write: bit => render.send('GPIO:3', bit) },
      { write: bit => render.send('GPIO:4', bit) },
      { write: bit => render.send('GPIO:5', bit) },
      { write: bit => render.send('GPIO:6', bit) },
      { write: bit => render.send('GPIO:7', bit) },
    ],
  });
});

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    show: process.env.npm_lifecycle_event !== 'test',
    autoHideMenuBar: true,
  });

  if (
    process.env.npm_lifecycle_event !== 'test' &&
    process.env.NODE_ENV === 'development'
  ) {
    win.webContents.openDevTools();
  }

  win.loadFile('app/index.html');
});
