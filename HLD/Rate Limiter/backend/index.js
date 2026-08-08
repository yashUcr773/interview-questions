const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000


const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/test', (req, res) => {
    res.json({
        "message": "success"
    })
    return
})

app.get('/api/expensive', (req, res) => {
    res.json({
        "message": "success"
    })
    return
})

app.get('/api/search', (req, res) => {
    res.json({
        "message": "success"
    })
    return
})

app.get('/health', (req, res) => {
    res.send('OK')
    return
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}. http://localhost:${PORT}/health`)
})