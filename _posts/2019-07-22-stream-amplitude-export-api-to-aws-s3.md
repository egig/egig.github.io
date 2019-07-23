---
author: egig
date: 2019-07-22 10:00:00+00:00
layout: post
slug: stream-amplitude-export-api-to-aws-s3
title: Stream Amplitude Export API to AWS S3
tags:
- amplitude
- aws
- aws-s3
---


A lot of drama at work, this time I need to backup the Amplitude logs events to S3. The dumb idea, I think I can just export the all amplitude events to my local machine, and upload it to S3. And not, so dumb idea, I think, we can do it all at once: [Streaming](https://nodejs.org/api/stream.html).

And thanks God, there is also the npm package already: `s3-stream-upload`. So this is all I have to do to send amplitude exports between `startDate` and `andDate`

```javascript
const AWS = require("aws-sdk");
const Amplitude = require('amplitude');
const UploadStream = require('s3-stream-upload');

const AWSBUCKET = "<YOUR-AWS-BUCKET>";
const accessKeyId = "<YOUR-AWS-ACCESS-KEY-ID>";
const secretAccessKey = "<YOUR-AWS-SECRET-KEY-ID>";
AWS.config.update({ accessKeyId, secretAccessKey });

const s3 = new AWS.S3();

let amplitude = new Amplitude(apiToken, { secretKey });

let key = `amplitude_logs/${startDate}_${endDate}.zip`;

amplitude.export({
    start: startDate,
    end: endDate
  })
  .pipe(UploadStream(s3, { Bucket: AWSBUCKET, Key: key}))
  .on("error", function (err) {
    console.error(err);
  })
  .on("finish", function () {
    console.log("Uploaded: ", key);
  });
```

You have to install all dependency first, of course.

```
npm install amplitude aws-sdk s3-stream-upload
```

And, by the way, in fact I should do more than above actually. I need to export 3 years Amplitude history, so need to create some async/thread call to make it feasible and faster at run.


