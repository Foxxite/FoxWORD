// Modules to control application life and create native browser window
const {app, BrowserWindow, session} = require('electron')
require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
	
	session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
		callback({ responseHeaders: Object.assign({
			"Content-Security-Policy": [ "default-src, unsafe-inline, 'self'" ]
		}, details.responseHeaders)});
	})
	
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		icon: __dirname + '/assets/img/fox.png',
		titleBarStyle: 'hiddenInset',
		backgroundColor: '#FFF',
		show: true,
		webPreferences: {
		  nodeIntegration: true
		}
	})

	mainWindow.setMenuBarVisibility(false)

	// and load the index.html of the app.
	mainWindow.loadFile('index.html')

	// Open the DevTools.
	//mainWindow.webContents.openDevTools()

	//Show window when ready
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.