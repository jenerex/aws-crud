const { DynamoDBClient }  = require("@aws-sdk/client-dynamodb");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new DynamoDBClient({});

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
  const hashedPassword = await bcrypt.hash(password, 10);
  const params = {
    tableName : 'Admins',
    items : {
      email : email,
      password : hashedPassword
    }
  }
  await dynamoDb.put(params).promise()
  return {
    statusCode : 200,
    body : JSON.stringify({message:"user registered successfully."})
  }
}
