/**
 * index.js
 *
 * A tiny Express API with four endpoints, used as the target for the rate-limit
 * load-testing experiments. Every route returns the same trivial body so any
 * behavior we observe comes from load, not from the work the endpoint does.
 */

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config() // Load PORT (and anything else) from .env into process.env

const PORT = process.env.PORT || 3000

const app = express()


// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

app.use(cors())          // allow cross-origin requests
app.use(express.json())  // parse JSON request bodies


// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// Generic endpoint used as the main load-test target.
app.get('/api/test', (req, res) => {
    res.json({ "message": "success" })
})

// Stands in for a costly operation (heavy DB query, 3rd-party call, etc.).
app.get('/api/expensive', (req, res) => {
    res.json({ "message": "success" })
})

// Stands in for a common, frequently-hit endpoint.
app.get('/api/search', (req, res) => {
    res.json({ "message": "success" })
})

// Liveness check — is the server up?
app.get('/health', (req, res) => {
    res.send('OK')
})


// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}. http://localhost:${PORT}/health`)
})
