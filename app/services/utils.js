const fs = require("fs");
const path = require("path")
const AppError = require('./app-error')

// Write new data object
function writeFile(account_id, id, data) {
    const filePath = path.join(__dirname, `../file-db/user-${account_id}.json`)
    const userData = getFullData(account_id)
    let insertData = {}
    if (userData) {
        let fileSize = getFileSize(account_id)
        const validate = validateKey(userData, id)
        if (validate & fileSize <= 1073741824) {
            fileSize = Buffer.byteLength(JSON.stringify(data), 'utf8')
            if (fileSize <= 13312) {
                userData[id] = data
                insertData = userData
            }else{
                throw new AppError(
                    {
                        status: false,
                        message: "Client Error",
                        errors: {
                            status_code: 406,
                            description: "Data Object Limit Exceed. Please reduce data"
                        },
                        error_stack: new Error().stack
                    }
                )
            }
        }else{
            throw new AppError(
                {
                    status: false,
                    message: "Client Error",
                    errors: {
                        status_code: 406,
                        description: validate ? "File Size Limit Exceed": "Duplicate Key Please try again"
                    },
                    error_stack: new Error().stack
                }
            )
        }
    }else{
        insertData[id] = data
    }
    
    let dataObj = JSON.stringify(insertData);
    fs.writeFileSync(filePath, dataObj);

    return true
}

// Returns full data object
function getFullData(account_id) {
    const filePath = path.join(__dirname, `../file-db/user-${account_id}.json`)
    try {
        let rawData = fs.readFileSync(filePath);
        let student = JSON.parse(rawData);
        return student
    } catch (error) {
        return false
    }
}

// get unique data
function getData(account_id, id) {
    let data = getFullData(account_id)
    if (data) {
        data = data[id]
        return data
    }
    return false
}

// Remove data using unique key
function deleteData(account_id, id) {
    const filePath = path.join(__dirname, `../file-db/user-${account_id}.json`)
    let userData = getFullData(account_id)
    const validate = validateKey(userData, id)
    if (!validate) {
        delete userData[id]
        let dataObj = JSON.stringify(userData);
        fs.writeFileSync(filePath, dataObj);
        return true
    }
    return false
}

// To find Duplicates
function validateKey(userData, id) {
    if (id in userData) {
        return false
    }
    return true
}

// Returns file Size in bytes
function getFileSize(account_id) {
    const filePath = path.join(__dirname, `../file-db/user-${account_id}.json`)
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}



module.exports = {
    writeFile,
    deleteData,
    getData
}