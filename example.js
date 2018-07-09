/**
 * Created by brugnara on 09/07/18,
 * @ daniele@brugnara.me
 */

'use strict';

const Debug = require('debug');
const debug = Debug('aws-iot-greengrass-discovery:example');
debug.verbose = Debug('verbose:aws-iot-greengrass-discovery:example');

const fs = require('fs');
const help = 'usage: DEBUG=* node example.js thingname xyz.iot.us-west-1.amazonaws.com';
const thingName = process.argv[2];
const awsIotEndPoint = process.argv[3];

if (!thingName || !awsIotEndPoint) {
 console.warn(help);
 throw new Error('Missing parameters');
}

(async function() {
  const discovery = require('./')({
    awsIotEndPoint,
    ca: fs.readFileSync('./root-CA.pem', 'utf8'),
    cert: fs.readFileSync(`./${thingName}.crt`, 'utf8'),
    key: fs.readFileSync(`./${thingName}.key`, 'utf8'),
  });

  try {
    const gccInfo = await discovery(thingName);
    debug(JSON.stringify(gccInfo));
  } catch(e) {
    throw e;
  }

  discovery(thingName, console.log.bind(console));

})().catch(e => {
  throw e;
});
