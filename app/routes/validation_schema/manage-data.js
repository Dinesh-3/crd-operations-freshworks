const queryValidationSchema = {
    "type": "object",
    "properties": {
        "account_id": {
            "type": "string"
        },
        "id": {
            "type": "string",
            "minLength": 1,
            "maxLength": 13
        }
    },
    "required": [
        "account_id",
        "id"
    ]
}

const userDataSchema = {
    "type": "object",
    "properties": {
        "product_name": {
            "type": "string",
            "minLength": 1
        },
        "quantity": {
            "type": "integer",
            "minimum": 1
        },
        "order_id": {
            "type": "string"
        },
        "price": {
            "type": "number",
            "minimum": 1
        },
        "status": {
            "type": "string",
            "enum": [
                "Shipped",
                "Delivered",
                "Cancelled",
                "Ready To Ship",
                "Returned"
            ]
        }
    },
    required: [
        "product_name",
        "quantity",
        "order_id",
        "price",
        "status"
    ]
}

module.exports = {
    queryValidationSchema,
    userDataSchema
}