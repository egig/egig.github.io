---
author: egig
comments: true
date: 2015-06-18 01:27:59+00:00
layout: post
slug: hello-phabricator
title: Hello Phabricator
wordpress_id: 59
categories:
- Review
tags:
- development
- php
---

So, due to the codes that always being sucks and hard to manage, I proposed my current company to do code reviews. As the tool, we choose Phabricator. At first I guess I'll choose Gitlab, or even Atlasian, but Phabricator seems worth to be tried.
<!-- more -->


Seriously, you can get general information about phabricator by just google it. Here I am just sharing my experiences.


What Phabricator can do for you ?
Phabricator is complete collection of software intended to aids software development. Some feature are already complete, some in prototype phase. For now, Phabricator can do:

Repository Hosting Management
Code Review
Project and Task Management.
Wiki
Kind of chat room called "Conpherence"
and many more

Why Phabricator ?
We choose phabricator becouse of some reasons :

It's LAMP application, which is also our daily environment.
Free and Open
Why Not ?

Install

You can follow the instruction https://secure.phabricator.com/book/phabricator/article/installation_guide/. First repo pull via http, I got error about git-http-backend. If you do too, you can do the following:


    
    
    cd  /path/tp/phabricator/support/bin
    sudo ln -sv /usr/lib/git-core/git-http-backend
    



**Herald**
Herald is phabricator application you can use to control data in phabricator, for example, In my company I need to restrict some push when no accepted revision exists, then I use herald to control it. I make the herald rule as following:


    
    
    When all of these conditions are met:
    Accepted Differential revision does not exist
    Pusher is not any of <username>
    
    Take these actions every time this rule matches:
    Block change with message Review is required for all changes.
    



**Differential Test Plan**
By default, when creating a revision thru arc diff , you will be prompted to fill test plan. If you don't need it, you can turn it off by:

phabricator/$ ./bin/config set differential.require-test-plan-field false
and edit differential.fields to the following:


    
    
     "differential:test-plan": {
        "key": "differential:test-plan",
        "disabled": true
    }
    



You can go to Config application by clicking Config on sidebar menu.
