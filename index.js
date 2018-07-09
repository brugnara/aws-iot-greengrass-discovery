/**
 * Created by brugnara on 09/07/18,
 * @ daniele@brugnara.me
 */

'use strict';

const Debug = require('debug');
const request = require('superagent');

const mandatoryFields = ['ca', 'cert', 'key', 'awsIotEndPoint'];
const port = 8443;
const proto = 'https';
const path = 'greengrass/discover/thing';
const defaultScope = 'aws-iot-greengrass-discovery';

/*
https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html#gg-discover-auth
*/

module.exports = function (options) {

  options = options || {};

  let debug;

  if (!(debug = options.debug)) {
    debug = Debug(defaultScope)
  }

  mandatoryFields.forEach(field => {
    if (!options[field]) {
      const err = `Missing mandatory field: '${field}'`;
      debug(err);
      throw new Error(err);
    }
  });

  debug(options);

  return async function(thingName, callback) {
    const url = `${proto}://${options.awsIotEndPoint}:${port}/${path}/${thingName}`;
    debug(`Starting request for ${thingName}: "${url}"`);
    const req = request
      .get(url)
      .ca(options.ca)
      .key(options.key)
      .cert(options.cert);

    if (typeof callback === 'function') {
      debug(`calling callback`);
      return req.then(res => {
        callback(null, res.body);
      }, err => {
        callback(err);
      });
    }

    debug(`returning promise`);

    const response = await req;

    return response && response.body;
  }
};
