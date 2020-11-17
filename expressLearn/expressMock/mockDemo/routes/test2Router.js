const express = require('express')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const test2Router = express.Router()

test2Router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

test2Router.post('/test2/queryList', (req, res) => {
    const content = fs.readFileSync(path.join(__dirname, '../public/test2/queryList.json'))
    res.json(JSON.parse(content))  
})

module.exports = carRouter