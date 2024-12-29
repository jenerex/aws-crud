const { DynamoDBClient , PutItemCommand}  = require("@aws-sdk/client-dynamodb");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid'); 
require('dotenv').config()

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  DYNAMODB_ENDPOINT,
  DYNAMODB_TABLE,
} = process.env;


//
let dynamoDb = {}
if(process.env.ENV=="Dev"){
   dynamoDb = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://localhost:8080",
    credentials: {
      accessKeyId: "dummy", // Not actually used
      secretAccessKey: "dummy" // Not actually used
    }
  });
} else{
   dynamoDb = new DynamoDBClient({ region: "us-east-1" });
}

// const dynamoDb = DynamoDBDocumentClient.from(dynamoDBClient);


module.exports.login = async (event) => {

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        proccessdata:process.env
      }
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
