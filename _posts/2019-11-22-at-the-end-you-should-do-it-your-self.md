---
author: egig
date: 2019-11-21 10:00:00+00:00
layout: post
slug: at-the-end-we-do-it-ourself
title: At the End, We Do it Ourself 
tags:
- microservices
---

I just learn about microservices. Then I got this kind of problem. Distributed data management problem. Its actually simple, I think, but this is kind of new problem I faced because I never focus on backend before. Then here it is I will just write it down.

I just join a new company, new team. Then I get this legacy application, a web service. This app pretty much like inventory app, where you can purchase and deduct stock. And its just that.

And here is the problem, the purchase transaction is recorded in MySql Database and the stock is stored as cache in Redis. Ya, the problem is doing a purchase transaction means you have to atomically insert record to MySql and deduct value in redis. The legacy code I found is just doing insert and update stock, I found no line that make this atomic. Ya, questions comes to my mind, what if, Mysql insert success, but redis is down, then the data will not fully integrated.

I ask arround my team. One suggest to wrap the process with the mysql transaction like this

```php
try {
  $Mysql->beginTransaction();
  $Mysql->processOder();
  $Redis->multi();         //start redis transaction
  $Redis->deductStock();
  $Redis->exec()           //redis commit
  $Mysql->commit();        //mysql commit
} catch (Exception $e)
  $Mysql->rollback();      //mysql rollback
  $Redis->discard();       //redis rollback
}
```
This solution also not satisfy me. Then I did [stackoverflow-ing](https://stackoverflow.com/questions/16441645/transactions-when-writing-to-two-or-more-different-data-storages), [asking](https://stackoverflow.com/questions/58918287/maintain-data-integrity-between-mysql-and-redis) what if the rollback operation also error/failed.

One suggests using 2 Phase Commit and Saga Patterns, ya then I do some research.

[![What Happens when Compensating Requests Fail?](https://user-images.githubusercontent.com/3479556/80872004-6f38b280-8cd9-11ea-8871-634bbe81c16b.png)](<https://www.youtube.com/watch?v=xDuwrtwYHu8>)

Got this conference talk, the presentation is pretty clear. I get the idea that certain request must have its compensating request. And I think I get something related to my problem. At arrount minute 21.40, this slide "What Happens when Compensating Requests Fail ?", the presenter said

"...because they can fail we need to be able to retry them indefinitely until they succeed..."

Also my question at SO got similar answer.

Then, question again, can we rely on machine to do something indefinitely ? well, this need another research. LOL. And comes to my mind that, Eventually, at the end we need to do it by ourself.

!["I'll do it myself..." Thanos.](https://user-images.githubusercontent.com/3479556/80871991-55976b00-8cd9-11ea-976a-0fdb21ab9523.jpg)

Some points to note for me for next development.
+ Avoid distributed data model if it's possible
+ Use tcp round trip as less as possible
+ Log is very important, especially in distributed transaction
+ Ask whether the service need the compensating job (using queue or cronjob)