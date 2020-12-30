'use strict'

const bodyParser = require("body-parser")
const _ = require("lodash")
const router = require("./app/routes/crd-data")

const express = require("express")
const app = express()

app.use(bodyParser.json())
app.use("", router)


app.use(function (err, req, res, next) {

    if (err.name == "JsonSchemaValidationError") {

        let errorMessage = ""
        if (err.validationErrors.query) {
            errorMessage = (_.map(err.validationErrors.query, "message")).join(", ")
        } else if (err.validationErrors.params) {
            errorMessage = (_.map(err.validationErrors.params, "message")).join(", ")
        } else {
            errorMessage = (_.map(err.validationErrors.body, "message")).join(", ")
        }
        let error_payload = {
            "status": false,
            "message": "Validation Error",
            "errors": {
                "description": errorMessage || "Error in Input Validations",
                "status_code": 406
            }
        }
        res.status(406).json(error_payload)
    } else {
        console.log(err);
        res.status(err.errors.status_code || 500).json({
            "status": false,
            "message": err.message,
            "errors": {
                "description": err.errors.description || "We're trying hard to fix the problem please try again",
                "status_code": err.errors.status_code || 500
            }
        })
    }
})

const PORT = 8080

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))