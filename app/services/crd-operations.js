const {
    getData: getDataById,
    writeFile,
    deleteData: removeData
} = require("./utils")

function getData(account_id, id, res) {
    const data = getDataById(account_id,id)
    if (data) {
        res.json({
            "status": true,
            "data": data
        })
    } else {
        res.status(406).json({
            "status": false,
            "message": "Error: Invalid account_id or id"
        })
    }
}

function insertData(account_id, id,data, res) {
    const response = writeFile(account_id, id, data)

    if (response) {
        res.status(200).json({
            "status": true,
            "message": "Data Successfully Inserted"
        })
    } else {
        res.status(406).json({
            "status": false,
            "message": "Client Error",
            "errors": {
                "description": "Invalid Input",
                "status_code": 406
            }
        })
    }


}

function deleteData(account_id, id, res) {

    const response = removeData(account_id, id)

    if (response) {
        res.json({
            "status": true,
            "message": "Success"
        })
    } else {
        res.status(406).json({
            "status": false,
            "message": "Error: Invalid account_id or id"
        })
    }
}

module.exports = {
    getData,
    insertData,
    deleteData
}