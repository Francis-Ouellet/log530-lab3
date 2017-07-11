/* eslint-disable */
'use strict';

/**
 * Creates a response accordingly to the out format of a lambda function for
 * proxy integration.
 *
 * @param {any} isBase64Encoded Is the body is encoded or not.
 * @param {any} statusCode The status code of the response.
 * @param {any} headers The headers to add.
 * @param {any} body The body of the response.
 * @returns An object that satisfies the out format.
 * @see http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html#api-gateway-simple-proxy-for-lambda-output-format
 */
function createResponse(isBase64Encoded, statusCode, headers, body) {
  return {
    isBase64Encoded,
    statusCode,
    headers,
    body
  };
}

exports.get = (event, context, callback) => {
  callback(null, createResponse(false, 200, {}, 'Hello World!'));
};
