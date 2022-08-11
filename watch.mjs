import chokidar from "chokidar"
import normalizePath from "normalize-path"

const files = [
  "./tailwind.config.js",
  "./src/index.html",
]

const watcher = chokidar.watch(files.map(normalizePath), {
  usePolling: false,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 50,
    pollInterval: 10,
  },
})

watcher.on("raw", (event) => console.log("Event [raw]", { event }))
watcher.on("add", async (file) => console.log("Event [add]", { file }))
watcher.on("change", async (file) => console.log("Event [change]", { file }))
watcher.on("error", (...args) => console.log("Event [error]", { args }))
watcher.on("unlink", (file) => {
  console.log("Event [unlink]", { file })
  // watcher.add(normalizePath(file))
})
