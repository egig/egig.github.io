---
author: egig
comments: true
date: 2017-11-10 10:51:42+00:00
layout: post
link: https://egig.org/thought/kebutuhan-akan-search-engine
slug: kebutuhan-akan-search-engine
title: Kebutuhan akan Search Engine
wordpress_id: 95
categories:
- Thought
tags:
- Search Engine
- Solr
---

Pada Sistem Relational Database (RDBMS), pengguna dapat melakukan pencarian data dengan menggunakan SQL. Tetapi terdapat keterbatasan. Pencarian hanya terbatas pada text yang terdapat pada kolom tabel saja juga ada keterbatasan lainnya juga.
<!-- more -->

Misalnya pengguna ingin menemukan buku tentang pembelian rumah baru. Beberapa judul buku yang mungkin relevan adalah sebagai berikut:

    
    
    The Beginner’s Guide to Buying a House
    How to Buy Your First Hous
    Purchasing a Home
    Becoming a New Home Owner 
    Buying a New Home
    Decorating Your Home
    



Daftar berikut tentu tidak releven:

    
    
    A Fun Guide to Cooking
    How to Raise a Child
    Buying a New Car 
    



Cara biasanya yang dilakukan pada pencarian database tradisional adalah dengan melakukan query  sebagai berikut:


    
    
    SELECT * FROM Books
    WHERE Name = 'buying a new home';
    


 
Masalahnya adalah tidak ada judul buku yang pasti cocok dengan kalimat “buying a new home”. Mungkin kita bisa memperbaharui query untuk mencari setiap kata dalam query:


    
    
    SELECT * FROM Books
    WHERE Name LIKE '%buying%'
    AND Name LIKE '%a%
    AND Name LIKE '%home%';
    


 
Tapi query diatas akan menampilkan hasil yang tidak relevan karena kata “Buying” cocok dengan kalimat “Buying a new Home” juga cocok dengan “Buying a new Car”.

Salah satu solusi akan masalah diatas adalah Search Engine menggunakan Apache Solr atau Elastic Search.


