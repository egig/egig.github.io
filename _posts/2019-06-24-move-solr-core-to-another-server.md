---
author: egig
date: 2019-06-24 10:00:00+00:00
layout: post
slug: move-solr-core-to-another-server
title: Move Solr Core to Another Server
tags:
- solr
---


I was need to move solr installation from one server to another. I can not do any reindexing from the beginning because its fairly large collection, about 15 million and I don't know how much time will it takes to do it from beginning. So I need to move the index data as well.

I do google it and then end up to this [question](https://stackoverflow.com/questions/32242873/how-to-move-data-to-solr-production-instance-without-re-indexing) on stackoverflow. The answer is not exactly what I need, but it gave me the idea. _You can try making backup on one system, and a restore on the other system_.

And then I learn about Solr Index [Replication, Backup and Restore](https://lucene.apache.org/solr/guide/6_6/making-and-restoring-backups.html).

I use Solr v6.6.0. It's farly easy, expescially I only install standalone mode. So all I need is execute this request in browser.

```
GET http://localhost:8983/solr/collection-name/replication?command=backup&wt=json
```

Note that, the backup is running asynchronously in server, and not finished right away, especially if the index data is large. My index data is about 15 million, about 45G, it takes 1 hour in ubuntu server with 16GB Ram.

To get status of the backup, also we can do it by simple GET request

```
GET http://localhost:8983/solr/collection-name/replication?command=details&wt=json
```

The json response will looks like this.

```json 
{
  "responseHeader": {
    "status": 0,
    "QTime": 1
  },
  "details": {
    "indexSize": "44.67 GB",
    "indexPath": "/data/solr/data/collection-name/data/index/",
    "commits": [
      [
        "indexVersion",
        1561325531462,
        "generation",
        749269,
        "filelist",[
          "segments_g251"
        ]
      ]
    ],
    "isMaster": "true",
    "isSlave": "false",
    "indexVersion": 1561325531462,
    "generation": 749269,
    "master": {
      "replicateAfter": [
        "commit"
      ],
      "replicationEnabled": "true",
      "replicableVersion": 1561325531462,
      "replicableGeneration": 749269
    },
    "backup": [
      "startTime",
      "Mon Jun 24 03:10:06 UTC 2019",
      "fileCount",
      278,
      "status",
      "success",
      "snapshotCompletedAt",
      "Mon Jun 24 03:38:28 UTC 2019",
      "snapshotName",
      null
    ]
  }
}
```

If the backup is still in progress, then there will no "backup" field. And if a backup failed, it will return somethins like this.

```json
    "backup": [
      "snapShootException",
      "No space left on device"
    ]
```

Ya, I experiance "No space left on device" error during the backup for the first time. You know how to fix this.

After backup finished, I get file named `snapshot.XXX` in collection data folder. And what I do is move that folder to target server using rsync

```sh
rsync -a --stats --progress `snapshot.XXX` user@otherserver:/location/to/new_collection/data
```

After that, run the the restore command in the new server

```
GET http://localhost:8983/solr/collection-name/replication?command=restore&location=/location/to/snapshot&wt=json
```

And run this to get the restore status:

```
GET http://localhost:8983/solr/collection-name/replication?command=restorestatus&wt=json
```

The response you will get is similar to this

```
{
  "responseHeader": {
    "status": 0,
    "QTime": 0
  },
  "restorestatus": {
    "snapshotName": "snapshot.20190624031006850",
    "status": "In Progress"
  }
}
```

I wait about an hour to get the "status" change from "In Progress" to "success".


