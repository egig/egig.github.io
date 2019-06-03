---
author: egig
comments: true
date: 2013-10-15 10:00:24+00:00
layout: post
slug: understanding-laravel-4
title: Understanding Laravel 4
wordpress_id: 109
categories:
- Review
tags:
- laravel
- php
---

[Why Laravel](https://www.reddit.com/r/PHP/comments/1eld2t/why_would_anyone_choose_laravel_over_symfony_or) ? There is Taylor Otwel, Author of Laravel, commented at that post. Personally, one of the reason that I used to pick a framework is "taste", and I admit it, laravel has nice taste, Laravel has nice sintax. However, "Tak Kenal Maka Tak Sayang", that means if you don't really know, then you don't really love. Started about two weeks ago, I dig into Laravel. And Now, what I've got ?<!-- more -->



## Similiar system like Silex



If you familiar with Silex, then you've got half way to understand Laravel. The system is quite similiar to Silex. Laravel main interface is `Illuminate\Foundation\Application` extends `Illuminate\Container` component that implements `ArrayAccess`, as well as `Silex\Application` that extends `Pimple`. The Biggest differ is the Service Provider and Facade. I don't try it yet, but probably I will, I guess `Illuminate\Support\Facade` can be implemented to Silex.

this lines:


    
```php 
Route::get('/', function()
{
   return View::make('hello');
});
```


can be written as


    
```php    
$app['router']->get('/', function() use ($app)
{
   return $app['view']->make('hello');
});
```
    

## Facade


When you call a class in Laravel, e.g `Route::get()` or `DB::Schema()`, you actually call a facade extension class. The facade class then make use of magic method `__callStatic()` to run desired function on 'real' class. 'Real' class is a class that registered to be bound to Laravel Application. Each class registered via it's Service Provider listed at the app config file (`app/config/app.php`) as array : 'providers'. To get to know what is the 'Real' Class that you are calling, you can use


    
```php    
Facade::getFacadeRoot();
```
    



e.g,


    
```php
$realClass  = View::getFacadeRoot();
return get_class($realClass); // will print Illuminate\View\Environment

//or

$realClass  = Route::getFacadeRoot();
return get_class($realClass); // will print Illuminate\Routing\Router
```



Have a look into `vendor/laravel/framework/src/Illuminate/Route/RoutingServiceProvider`, that one of listed provider at app config file, it contains such this line:


    
    
    $this->app['router'] = $this->app->share(function($app)
    {
        $router = new Router($app); //<<-- has namespace Illuminate\Routing 
    



and also `vendor/laravel/framework/src/Illuminate/View/ViewServiceProvider`


    
```php
$this->app['view'] = $this->app->share(function($app)
{
    $resolver = $app['view.engine.resolver'];

    $finder = $app['view.finder'];

    $env = new Environment($resolver, $finder, $app['events']); //<<-- has namespace Illuminate/View

    return $env
```
    



And take a look into array 'aliases' at `app/config/app.php`. Notice that `View` is (or alias of) Facade for `$app['view']` that instantiate `Illuminate\View\Environment`, as well ass `Route` is (or alias of) Facade for `$app['router']` that instantiate `Illuminate\Routing\Router`;



## Artisan, where are those commands registered ?



Artisan use Symfony Console component that you have to do `$console->add(new YourOwnCommand);` to register your own Command. While running `php artisan list` then you get some list and description for each command that available in artisan, e.g migrate:make, dump-autoload, etc, You may wonder, where are those commands registered ? I also have some question at the time and then start to think of a list of `add` calls or such an iteration. However, there is no such massal regitration for those command. Take a look into `vendor/laravel/framework/src/illuminate/Support/ServiceProvider.php`, you'll find


    
```php    
public function commands($commands)
```



In fact, each artisan command is registered via above `commands` method when related ServiceProvider run `register()` method. Just for sure, take a look at `vendor/laravel/framework/src/illuminate/Database/MigrationServiceProvider.php` contains


    
```php
protected function registerCommands()
{
    $commands = array('Migrate', 'Rollback', 'Reset', 'Refresh', 'Install', 'Make');

    $this->commands(
    'command.migrate', 'command.migrate.make',
    'command.migrate.install', 'command.migrate.rollback',
    'command.migrate.reset', 'command.migrate.refresh'
);
```
    



See ? it seems like we always need Laravel Application to use Artisan.




## Conclusion



Beside it's Artisan, Eloquent ORM and Blade Template System, Laravel is Silex with it's own Service Provider Class. And Facade is a sugar that make 'em all tasted better.
