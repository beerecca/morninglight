'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (event, callback) => {
  const params = {
    TableName: 'schedules',
    Item: mapToModel(event.body)
  };

  //TODO: switch to promises
  return dynamoDb.put(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(null, params.Item);
  });
};

//TODO: decide on actual api schema
function mapToModel(eventBody) {
  const { daysOfWeek, timeOfDay, lengthOfTime, startTemp, startIntensity, endTemp, endIntensity, isActive } = eventBody;
  return {
    id: uuid.v4(),
    updatedAt: new Date().getTime(),
    daysOfWeek,
    timeOfDay, 
    lengthOfTime,
    startTemp,
    startIntensity,
    endTemp,
    endIntensity,
    isActive
  }
}