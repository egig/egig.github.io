---
author: egig
date: 2019-03-24 10:10:00+00:00
layout: post
slug: refactor-loopback-directory-structure-to-custom-expressjs
title: Refactor Loopback 2.0 Directory Structure to Custom Expressjs
categories:
- Best Practices
tags:
- nodejs
- loopback
---

The challange is to keep eveerythings fine, not break single thing while we do change things to be like what we need. I know there is some best practice already [out there](https://github.com/i0natan/nodebestpractices). This is only documentary notes. Who knows I need this again in the future.

We was using loopback 2.0 to initiate some projects, my previous developer choose it. I don't know why. But then I feel loopback does not suit our current state, So, I think I want to change  to just use expressjs. Fortunately loopback 2.0 is based on Expressjs so its possible to refactor the structure.<!-- more -->

This is loopback 2.0 directory structure, pretty much.

```shell
- client
- common
- server
	- boot
	- explorer
	- config
	- model-config.js
	- datasources.js
	- server.js
- package.json
```


I don't have enough time to learn more about Loopback 2.0 and this project already miss-designed by previous developer, IMO. Even, no one in my team really understand the concept (this is not best thing in team, lessons). So I need to change it to more known simpler structure: MVC. I don't think this is best solution as well, but at least I can explain to everyone what we are building.


This is the structure looks like now:

```
- legacy
	- client
	- common
	- server
- src
	- routes
	- repository
	- services
	- common
	- server.js
- tests
- package.json
- config.json
```


This is what I do.
1. I move all Loopback directory to `legacy`, so no one might touch this ever again.
2. Creat new structure in `src`, as you see, its pretty much like MVC, typical.
3. Import `legacy/server.js` in  `src/server.js`, and use it as base of the application.
4. Import `config.json` to `legecy/server/config.js` and export it. So we only take the reference. Same with other config, respectively.
4. The most important things, move boot function to `src/server.js` and change the legacy root directory, `legacy/server` in this case.


```js
boot(app, <path/to/legacy/server/dir>, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
```

5. that's it

