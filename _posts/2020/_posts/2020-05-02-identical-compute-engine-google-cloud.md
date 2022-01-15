---
author: egig
date: 2020-05-02 10:00:00+00:00
layout: post
slug: identical-compute-engine-google-cloud
title: Identical Compute Engine Google Cloud
tags:
- google-cloud
- devops
---

I was learning google cloud lately. I learn to setup compute instance with custom disk size, setup instance group, ssl certificate and successfully, i guess, running the load balancer.

Actually this is first time I do little deep practice into the cloud tech. I have experience with AWS S3 and the cloudflare before, this time I got few surprises.

With the google cloud, maybe AWS are same, vm, disk, IP address all are decoupled, reusable also customized event after runtime. You can upgrade the VM instance RAM by just fill out the edit form and little downtime.

I had this story I want to write down. So I had a project, a LEMP based website on google cloud using Compute engine. We have staging and production environment.

We have all setup, running well untill somehow the staging env messed up. The PHP version was upgraded somehow cousing the php-fpm on nginx stopped working.

This idea came up out of our discussion, the team, to fix the problem. How can we re-setup staging env that identical with live env asap?. Its surprised me that we can use snapshot as boot disk, and the disk willl be system disk. So I create the snapshot from production system disk, make new disk from that snapshot and attach the disk to staging instance as boot disk.

New surprises, turn out that we do not have to create new instance. we can edit existing intance to have new boot disk attached. This is how I do it.

1. Create Snapshot from production boot disk
2. Create disk with Source Type: Snapshot, select snapshot source you've just created
3. Stop staging instance, Edit
4. Replace boot disk with disk you've just created, Save and restart
5. Done.

Then now I have my very own production-identical staging instance. I am very grateful.