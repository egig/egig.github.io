---
author: egig
comments: true
date: 2013-10-21 10:00:33+00:00
layout: post
link: https://egig.org/tips/implement-laravel-facade-to-silex
slug: implement-laravel-facade-to-silex
title: Implement Laravel Facade to Silex
wordpress_id: 110
categories:
- Tips
tags:
- Laravel
- PHP
---

Last post, while I understanding how does laravel work behind, I said that I guess I can implement laravel facade to silex since they have similiar inner structure. And I just did it. This is how.<!-- more -->

first, of course we need them both;


    
    
    {
        "require": {
            "php": ">=5.3.0",
            "silex/silex": "1.*",
            "illuminate/foundation": "4.0.*",
             "illuminate/support": "4.0.*"
        }
    



and then lets do it. mmmm... hold on, other things that most important is `Alias Loader`, facade is just a class, and alias loader let us to naming our facades.

For now, we will only work with Twig, but i am pretty sure it's more than enough to let you understand and then you can implement this to other Service Provider that compatible with Silex. Here it is.


    
    
         '\Facades\Twig',
    ))->register();
           
    



Then we have to create `\Facades\Twig.php` some where that accessed by composer;

Optionally for this article, you can create views/hello.twig and put anything on its file. e.g 'Hello World !' or whatever. Next we can create the silex application, don't forget to register TwigServiceprovider since we need it.


    
    
    //create new application
    $app = new \Silex\Application();    
            
    //register twig
    $app->register(new Silex\Provider\TwigServiceProvider(), array(
       'twig.path' => __DIR__.'/views',
     ));
    



By now, instead of using `$app['twig']->render()`, you can use laravel style: `Twig::render()`.


    
    
    $app->get('/', function() use ($app) {
    
        return Twig::render('hello.twig');
    });
            
    $app->run();
    



See ?
