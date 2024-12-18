const { DynamoDBClient , PutItemCommand}  = require("@aws-sdk/client-dynamodb");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid'); 

const dynamoDb = new DynamoDBClient({ region: "us-east-1" });

module.exports.loginAdmin = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

exports.register = async (event) => {
  const { email, password } = JSON.parse(event.body);
  // const hashedPassword = await bcrypt.hash(password, 10);
  // const params = {
  //   tableName : 'Admins',
  //   items : {
  //     email : email,
  //     password : password
  //   }
  // }
  // await dynamoDb.put(params).promise()
  const command = new PutItemCommand({
    TableName: 'Admins',
    Item:  {
          email : {S : email},
          password : {S : password}
        }
  });
  const response = await dynamoDb.send(command);
  return {
    statusCode : 200,
    body : JSON.stringify({message:"user registered successfully."})
  }
}
