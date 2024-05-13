import { app, BrowserWindow, shell } from 'electron'
import path from 'path'
import { APP_NAME } from './utils/constants'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}
let mainWindow: BrowserWindow
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    title: APP_NAME,
    height: 600,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 32,
      color: '#0c0a09',
      symbolColor: '#22c55e',
    },
    icon: path.join(__dirname, './favicon.jpeg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    handleUrl(url)
    return { action: 'deny' }
  })

  async function handleUrl(url: string) {
    const parsedUrl = maybeParsedUrl(url)
    if (!parsedUrl) return

    const { protocol } = parsedUrl

    if (protocol === 'http:' || protocol === 'https:') {
      try {
        await shell.openExternal(url)
      } catch (err: unknown) {
        console.error(`Failed to open external URL: ${url}`)
      }
    }
  }

  function maybeParsedUrl(value: string) {
    if (typeof value === 'string') {
      try {
        return new URL(value)
      } catch (err) {
        console.log(`Failed to parse URL: ${value}`)
      }
    }

    return undefined
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
