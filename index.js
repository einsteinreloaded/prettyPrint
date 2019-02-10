const express = require("express")
const app = express()
app.use(express.static('dist'))
const port = process.env.PORT || 3001

app.listen(port, ()=>{
    console.log(`app started listening on ${port}`)
})
