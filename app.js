const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  win = new BrowserWindow({
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
