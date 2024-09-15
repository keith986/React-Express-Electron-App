import {app , BrowserWindow} from 'electron/main';
import path from 'path';
import  url from 'url';
import isDev from 'electron-is-dev';
import * as backend from '../build/backend/backend.js';

//import * as backend from '../public/backend/backend.js';
//import fs from 'fs'
const __dirname = path.resolve();
//var back_end = path.join(__dirname ,'backend','backend.js')

//const { app, BrowserWindow } = require('electron');
//const path = require('path');
//const isDev = require('electron-is-dev');
//require('./public/backend/backend.js');

function server () {
   return backend;
};

function createWindow() {
  const win = new BrowserWindow({
    width: 1300, 
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  //var loc = path.join(__dirname, '/dist/win-unpacked/resources/app.asar/build/index.html');
  var loc = url.format({
    pathname: path.join(__dirname, 'resources/app.asar/build/index.html'),
    protocol: 'file',
    slashes: true
  })
  console.log(loc)
  // and load the index.html of the app.
  win.loadURL(
    isDev 
    ?
    'http://localhost:3000'
    :
    url.format({
      pathname: path.join(__dirname, 'resources/app.asar/build/index.html'),
      protocol: 'file',
      slashes: true
    })

  );

  // Open the DevTools.
  if(isDev){
  win.webContents.openDevTools();
/*
  win.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
    },
  );
  
  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        'Access-Control-Allow-Origin': ['*'],
        'Access-Control-Allow-Headers': ['*'],
        ...details.responseHeaders,
      },
    });
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["*"],
      },
    });
  });
*/
  server();

  }

}

app.whenReady().then(createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

