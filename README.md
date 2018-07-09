# aws-iot-greengrass-discovery
> 09/07/18

```bash
aws iot describe-endpoint
{
    "endpointAddress": "a1b2c3d4e5f6g7.iot.us-west-2.amazonaws.com"
}
DEBUG=* node example.js thingName $endpointAddress
```

Include this module and use as stated into the `example.js` file.

```js
const discovery = require('aws-iot-greengrass-discovery')({
    awsIotEndPoint: '123456.iot.eu-central-1.amazonaws.com',
    ca: fs.readFileSync('./root-CA.pem', 'utf8'),
    cert: fs.readFileSync(`./${thingName}.crt`, 'utf8'),
    key: fs.readFileSync(`./${thingName}.key`, 'utf8'),
});

// get info
const deviceInfo = await discovery('device1');
const deviceInfo2 = await discovery('device2');

// using callback
discovery('device1', console.log.bind(console));
```

# AWS Official doc

https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html#gg-discover-auth
