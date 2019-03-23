---
author: egig
comments: true
date: 2018-08-20 02:47:19+00:00
layout: post
link: https://egig.org/thought/guard-clause-in-async
slug: guard-clause-in-async
title: Guard Clause in Async
wordpress_id: 117
categories:
- Thought
tags:
- Javascript
---

I really like Guard Clause, it makes me easier to read coding flow. Ya, you might want to google it "Guard Clause", is a pattern to write code. You'll end up on this link: [Replace Nested Conditional with Guard Clauses - Refactoring](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html). If you don't use it or even don't know it yet, I suggest you to learn and use it and share to your team. You all will love it.<!-- more -->

But, when it comes to javascript, its always be exhausted. Javascript is exhausting. I dive in to async world in javascript two years ago and still don't know to use Guard Clause in it. Ya, this code won't work whatsoever:


    
    
    function getItem(type) {
    
        if(type == 1) {
            return request.get("/onetype", (err, results) => {
              if(results.length) {
                return null;
              }
    
              return results[0];
            })
        }
    
        if(type == 2) {
             return request.get("/another_type", (err, results) => {
              if(results.length) {
                return null;
              }
    
              return results[0];
            })
        }
       
    
        return null;
    }
    
    let item =  getItem(); // Won't return the desired item
    



So, how do we do that ? I don't think we can do "Guard Clause" for async.

Lets take example for Martin Fowler website above, but in js.


    
    
    function getPayAmount() {
      if (_isDead) return deadAmount();
      if (_isSeparated) return separatedAmount();
      if (_isRetired) return retiredAmount();
      return normalPayAmount();
    }; 
    



If functions `deadAmount`, `separatedAmount`, `retiredAmount` and `normalPayAmount` are Promises, I used to do it like this.


    
    
    function getPayAmount(callback) {
      if (_isDead) return deadAmount().then(callback);
      if (_isSeparated) return separatedAmount().then(callback);
      if (_isRetired) return retiredAmount().then(callback);
      return normalPayAmount().then(callback);
    }; 
    



Ya but actually we can do it better like this.


    
    
    function getPayAmount() {
      if (_isDead) return deadAmount();
      if (_isSeparated) return separatedAmount();
      if (_isRetired) return retiredAmount();
      return normalPayAmount();
    }; 
    
    getPayAmount().then((amount) => {
       // do whatever with amount
    });
    



Or better better, we can use IIFE if `getPayAmount` doesn't necessary to be reusable function.


    
    
    (function getPayAmount() {
      if (_isDead) return deadAmount();
      if (_isSeparated) return separatedAmount();
      if (_isRetired) return retiredAmount();
      return normalPayAmount();
    };)()
    .then((amount) => {
       // do whatever with amount
    })
    
