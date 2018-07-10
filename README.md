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
const discovery = require('aws-iot-greengrass-discovery');
const options1 = {
  thingName: 'device1',
  awsIotEndPoint: '123456.iot.eu-central-1.amazonaws.com',
  ca: fs.readFileSync('./root-CA.pem', 'utf8'),
  cert: fs.readFileSync(`./device1.crt`, 'utf8'),
  key: fs.readFileSync(`./device1.key`, 'utf8'),
};
const options2 = {
  thingName: 'device2',
  awsIotEndPoint: '123456.iot.eu-central-1.amazonaws.com',
  ca: fs.readFileSync('./root-CA.pem', 'utf8'),
  cert: fs.readFileSync(`./device2.crt`, 'utf8'),
  key: fs.readFileSync(`./device2.key`, 'utf8'),
};

// get info
const deviceInfo = await discovery(options1);
const deviceInfo2 = await discovery(options2);

// using callback
discovery(options1, console.log.bind(console));
```

## AWS Official doc

https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-discover-api.html#gg-discover-auth
