const express = require('express')
const bodyParser = require('body-parser')
const marked = require('marked')
const port = 3022

const app = express()

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  const allowedOrigins = ['https://robipop.io']
  const origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'POST')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/', (req, resp) => {
  console.log(req)
  const { body } = req
  const { markdown } = body
  console.log(body)

  const html = marked(markdown)

  resp.send({ html })
})

app.listen(port, () => console.log(`Mass app listening on port ${port}!`))
