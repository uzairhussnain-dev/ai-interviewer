const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:5173");

  win.webContents.openDevTools(); // 👈 IMPORTANT for debugging
}

ipcMain.handle("get-question", async (_, role) => {
  const res = await fetch("http://127.0.0.1:8000/question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });

  return res.json();
});

ipcMain.handle("evaluate-answer", async (_, data) => {
  const res = await fetch("http://127.0.0.1:8000/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
});


app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});