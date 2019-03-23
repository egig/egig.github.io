---
author: egig
comments: true
date: 2018-05-11 14:16:42+00:00
layout: post
link: https://egig.org/best-practices/easier-to-ask-for-forgiveness-than-permission
slug: easier-to-ask-for-forgiveness-than-permission
title: Easier to ask for forgiveness than permission
wordpress_id: 113
categories:
- Best Practices
tags:
- Python
---

Baru tau kalo ada yang namanya prinsip EAFP dalam pemrograman. EAFP Principle as you might can google it, it is a principle or pattern to write code in python. Pretty sure we can use it in other programming language as well.<!-- more -->

[https://stackoverflow.com/questions/11360858/what-is-the-eafp-principle-in-python?utm_medium=organic&utm;_source=google_rich_qa&utm;_campaign=google_rich_qa](https://stackoverflow.com/questions/11360858/what-is-the-eafp-principle-in-python?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

Mungkin bahasa sederhananya bisa dikatakan begini



<blockquote>"Lebih mudah minta maaf daripada minta izin."</blockquote>



atau



<blockquote>"Jalanin aja dulu, kalo ada apa-apa nanti minta maaf."</blockquote>



Berikut adalah beda implementasinya antara "minta izin dulu" dan "jalanin dulu, nanti minta maaf":

Misalkan, kita harus check apakah key `key1` ada pada dictionary `dict`, kita harus check agar tidak terjadi Runtime Error. Menggunakan cara "minta izin dulu", penulisan koding nya akan menjadi sebagai berikut:


    
    
    if 'key1' in dict:
      print("key exists")
    else:
      print("key not exists")
    



sedangkan jika menggunakan cara "jalanin dulu, nanti minta maaf", kodingnya bisa kita tulis sebagai berikut


    
    
    try:
      key1 = dict['key1]
      print("key exists")
    except KeyError:
      print("key not exists")
    



Disarankan menggunakan prinsip EAFP apalagi dalam kasus-kasus tertentu, misalnya kita harus check nested key pada sebuah dictionary:


    
    
    dict['foo']['bar']['baz'];
    



tentunya repot and tedious banget kalo ngecek satu-satu seperti ini:


    
    
    if 'foo' in dict:
      if 'bar' in dict['foo]:
        if 'baz' in dict['foo']['bar]:
    



Lebih baik jika ditulis seperti ini:


    
    
    try:
      key1 = dict['foo']['bar']['baz']
       //..
    except KeyError:
       //..
    



Dengan hasil yang sama, koding diatas terlihat lebih singkat dan clean kan ya.

Jadi EAFP adalah salah satu prinsip penulisan algoritma pemrograman yang bisa kita gunakan agar struktur kode kita lebih rapi dan clean terutama pada kasus-kasus tertentu pada bahasa pemrograman Python.

