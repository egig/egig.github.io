---
author: egig
date: 2019-05-23 23:00:00+00:00
layout: post
slug: jekyll-again
title: Jekyll Again
tags:
- jekyll
- hugo
- static-site-generator
---

I actually already aware about static site generator far years ago, and already used once, Jekyll. And then, I need to learn another then I try some other static site generator. One can consider this as wasting time, but, I don't know. This might give me some experience by changing blog engine all the time.

Once I falling in love with Python, then I change this site to Pelican, static site generator powered by Python.

I've ever make this site to be wordpress once. Had an intend to make a professional blog, but I lack of consistency and funding, so, I failed. then here I am, using Jekyll again and host this site as github pages.

This site is Jekyll initially, then I changed to [Pelican](https://blog.getpelican.com/), then I changed to Wordpress, then now I changed to Jekyll again. LOL.

I don't learn Ruby intensively yet, simply because I haven't get a job using Ruby. In contrast I am learning Go. But I chose jekyll again instead of Hugo (or other go powered static site generator) to build this site.

Building static site, usually involved these steps.

1. Write posts
2. Build the html
3. Deploy the html

Sure we can do automate the build and deploy step, for example using Gitlab CI as described [here](https://ariya.io/2017/05/static-site-with-hugo-and-firebase).

With Hugo we need to setup the GitLab CI pipeline, and firebase hosting. with Jekyll you don't need to, you are set, you are ready to do the `git push`.

And I will just leave this script here. Simple script to run dockerized jekyll.

```sh
docker run --rm \
  -p 4000:4000 \
  --volume="$PWD":/usr/src/app \
  -it starefossen/github-pages
```




