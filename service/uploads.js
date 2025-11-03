const documents = require('../model/documents.js')
const { S3 } = require('aws-sdk')
const files = async (userUserId) => {
    try {
        const record = await documents.findOne({
            where: {
                userUserId
            }
        })
        return record
    }
    catch (e) {
        console.log(e)
    }
}
const uploadFile = async (filedata, filetype, filename, userId) => {
    try {
        const s3 = new S3({ accessKeyId: process.env.aws_accesskey, secretAccessKey: process.env.aws_secretkey })
        const params = {
            Bucket: 'documents500',
            Key: `${filetype}/${userId}/${new Date().toISOString()}${filename}`,
            Body: filedata,
            ACL: 'public-read'
        }
        const response = await s3.upload(params).promise()
        const url = response.Location
        const record = await documents.findOne({
            where: {
                userUserId: userId
            }
        })
        if (!record) {
            await documents.create({ [filetype]: url, userUserId: userId })
        }
        else {
            record[filetype] = url
            await record.save()
        }
        return url
    }
    catch (e) {
        throw e
    }
}
module.exports = { files, uploadFile }