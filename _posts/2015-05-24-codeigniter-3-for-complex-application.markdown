---
author: egig
comments: true
date: 2015-05-24 00:20:25+00:00
layout: post
link: https://egig.org/thought/codeigniter-3-for-complex-application
slug: codeigniter-3-for-complex-application
title: Codeigniter 3 for Complex Application
wordpress_id: 102
categories:
- Thought
tags:
- Codeigniter
- PHP
---

This is why I think that Codeigniter is not suitable for a complex application.

If you plan your app can be customized in the future without pain, if data involved is not predictable, if it is intended to be developed across various team member for a long term period, thats require a little bit complexity. I mean, complex feature means complex requirements, and as far as i know, codeigniter is designed to be just... codeigniter.<!-- more -->

Magic is never good for development, I heard that once. Codeigniter has a lot of magic which is make it a framework that i love at the time. Codeigniter have magic routing, magic model and library instantiation, unfortunately the magician needs sacrifice... limitation.<!-- more -->

**Magic Routing**

let’s say you access codeigniter app via route `setting`, the route will magically leads you to class controller named 'setting' and method named 'index'.

And it'll keep that way, we can’t do anything about it until we utilize routing config or '\_remap' function. But still, it's complicated.

**Magic class instantiation**

You know how to load model and library in codeigniter. When you call `$this->load->library('email')`, your current controller class will magically have public property named 'email'. What if the controller class already have the property named 'email' ? Will it be overridden or the library never be loaded ? or even threw an error or exception ? Its something that we will always worry about during the development.

**Simple Error**

Codeigniter use function named `show_error()` to show error either in production or development environment. And it, at least for me, is too simple and lack of information, give me a headache each time I have to trace the mistake. On a codeigniter normal app it’s fine, but what if the app is getting bigger ??

**Codeigniter not join the party (yet)**

PHP dependency management, composer, till now codeigniter still not utilizes it. I dont know why. By the way it’s now widely used by many php community and framework. Not just composer, php autoloading, support for newer version of php, codeigniter still not join the party.

**Limited environment**

For now, in `index.php` file codeigniter defines 3 built in environment: development, production and testing. Yes, we can add one if we want, but it means we add one more concern when updating the framework/application on the future which is one additional job.

**Codeigniter and HMVC**

Often times an app requires modularity, Codeigniter is designed to be one application. One application directory contains one config, one controller, one model and one view directory. We know there is a [codeigniter extension to support HMVC architecture](https://www.google.co.id/#q=codeigniter+hmvc), but still,its done by unclean way, hacks.

What hack ?

Codeigniter routing system relies on directory named 'controllers', so if we access a url, let say, '/post/view', codeigniter will looks for controller class file named 'post' then execute method 'view', if one of them not found, then 404 thrown. The controller class file is checked whether it exists in controllers directory or not.

[The HMVC extension](https://bitbucket.org/wiredesignz/codeigniter-modular-extensions-hmvc) does the same way, however, it’s not looking into the inside of the controllers directory, but into the outside, but still need the controllers directory to be exists, that’s why we need a module path config:


    
    
     '../modules/',
     );
    



Is it not ok ? .. that's fine so far. But, trust me, as a programmer, as a member of development team, you want a better architecture than that. And there are several way to make it done way more even better.

That's all for now.
