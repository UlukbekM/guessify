import AWS from 'aws-sdk'

AWS.config.update({
    region: 'us-east-1',
    // endpoint: 'dynamodb.us-east-1.amazonaws.com',
    accessKeyId: `${process.env.REACT_APP_AWS_ACCESSKEY_ID}`,
    secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESSKEY}`
});

const docClient = new AWS.DynamoDB.DocumentClient()

export const fetchData = (tableName) => {
    var params = {
        TableName: tableName
    }

    docClient.scan(params, function (err, data) {
        if (!err) {
            // console.log(data)
            return(data)
        } else {
            console.log(err)
        }
    })
}

export const putData = (tableName , data) => {
    var params = {
        TableName: tableName,
        Item: data
    }
    
    docClient.put(params, function (err, data) {
        if (err) {
            console.log('Error', err)
        } else {
            console.log('Success', data)
        }
    })
}

export const updateItem = (updatedItem) => {
    const params = {
    TableName: 'Leaderboard',
    Key: {
        playlistID: updatedItem.playlistID,
    },
    UpdateExpression: 'set userName = :r, score = :d',
    ExpressionAttributeValues: {
        ':r': updatedItem.userName,
        ':d': updatedItem.score
    },
    };

    docClient.update(params, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
}