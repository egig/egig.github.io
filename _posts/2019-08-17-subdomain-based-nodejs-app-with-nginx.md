---
author: egig
date: 2019-08-17 10:00:00+00:00
layout: post
slug: subdomain-based-nodejs-app-with-nginx
title: Subdomain Based NodeJS App with NGINX 
tags:
- nginx
- nodejs
---

This is part of my pet projects. I need to create web app which the state is depends on the subdomain. Similar with wordpress or blogspot blog. e.g mysite.wordpress.com or mysite.blogspot.com. This is how I do it.

So in NGINX, we can create vhost a.k.a server block and map the server name by wildcard. So to point any subdomain of certain domain to our server, we can do something like this.

```
server {
   server_name ~^(?<subdomain>[^.]+).mydomain.com;
   location / {
   	  #..
   }
}
```

We also need to proxy pass that server block to our nodejs app. Lets say, my nodejs app is live in port 8080, so the complete config would look like this.

```
server {
   server_name ~^(?<subdomain>[^.]+).mydomain.com;
   location / {
      proxy_pass http://<the-ip-address>:8080;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
   }
}
```

And then in my nodejs app, which is ExpressJS, I can get the subdomain as described [here](http://expressjs.com/en/4x/api.html#req.subdomains).

```js
app.get("/", (req, res) => {
	// 
	let subDomainSegments = req.subdomains

	// Do whatever with the subdomains segments,
	// for example, get data from table based on that
	// or just simple console.log this time.
	console.log(subDomainSegments)
})
```

We can test this in our local machine by adding hosts by editing hosts file. In linux it would be `etc/hosts`.

```
sudo vi etc/hosts
```

then, add some lines to test our subdomains.

```
127.0.0.1	sub1.mydomain.com
127.0.0.1	sub2.mydomain.com
```
