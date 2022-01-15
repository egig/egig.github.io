---
author: egig
date: 2020-05-31 10:00:00+00:00
layout: post
slug: google-cloud-cost-for-a-website
title: Google Cloud Cost For a Website
tags:
- google-cloud
---

This is about my personal experience in google cloud cost, I make the title simple, but it's not about overall "Google Cloud Cost"
whatsoever. So people make mistakes. Including me, yeah. But I am grateful  I learned a lot. I involved in a project that uses google cloud. The compute engine, the load balancer, the storage, and CDN, etc. I was the one who manages the budget, then I made a mistake, I didn't know what I was doing.
We should count the most basic yet pricey thing on the web development: Bandwidth.

## Network Egress
The website is a popular company profile with a lot of images, traffics caused huge bandwidth, for me at least. We serve more than 2.7TB for a month, and that makes more than Rp. 4.000.000 counting on billing, that is only for the bandwidth, not for the compute engine yet. I was so depressed, haha.

!["Over Budget](https://user-images.githubusercontent.com/3479556/83371766-a213ba80-a3ed-11ea-831f-62b1919f7558.png)

Knowing it's on over budget, I start to looking for the workaround to push the bandwidth down.

## Cloud CDN
First I try the Google Cloud CDN. I put all images on google cloud storage and serve it behind Google CDN. No luck, Google CDN bandwidth is still expensive. I monitor the website for 2 days and it still cost me a lot.

!["Google CDN Cost""](https://user-images.githubusercontent.com/3479556/83372145-b60bec00-a3ee-11ea-9ed8-67a2e4d0a06e.png)

Then I change CDN to Cloudflare, yeah, the free one, the first band-aid, I know, and it works. I reduce bytes send from the server about 60%. I need to figure out about going paid Cloudflare customers later.

## Optimization
Then I started to optimize the server. I add limit rate, limit request, and limit connection. Until I see the line graph is going down.
This is snippet of my nginx config.

```shell
   limit_rate 256k;
   limit_req zone=<req_limit> burst=20 nodelay;
   limit_req_status 429;
   limit_conn <con_limit> 50;
```

I still do not know if this is affect the SEO or web analytics, we will see.
 