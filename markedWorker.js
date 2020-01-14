const marked = require('marked')
const { parentPort } = require('worker_threads')

parentPort.on('message', markdownString => {
  parentPort.postMessage(marked(markdownString))
})
