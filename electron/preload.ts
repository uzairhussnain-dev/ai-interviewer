const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  invoke: (channel: string, data?: any) => {
  return ipcRenderer.invoke(channel, data);
}
});