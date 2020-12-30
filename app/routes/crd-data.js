const express = require("express")
const router = express.Router();
const Validator = require('express-json-validator-middleware').Validator;
const validate = new Validator({
    allErrors: true
}).validate;

const operations = require("../services/crd-operations")

const validationSchemas = require("./validation_schema/manage-data")

router.route("/user/data")
    .get(
        validate({
            query: validationSchemas.queryValidationSchema
        }),
        (req, res) => operations.getData(req.query.account_id, req.query.id, res)
    )
    .post(validate({
            body: validationSchemas.userDataSchema,
            query: validationSchemas.queryValidationSchema
        }),
        (req, res) => operations.insertData(req.query.account_id, req.query.id, req.body, res)
    )
    .delete(
        validate({
            query: validationSchemas.queryValidationSchema
        }),
        (req, res) => operations.deleteData(req.query.account_id, req.query.id, res)
    )


module.exports = router