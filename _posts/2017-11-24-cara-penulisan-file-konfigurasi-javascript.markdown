---
author: egig
comments: true
date: 2017-11-24 07:06:46+00:00
layout: post
link: https://egig.org/best-practices/cara-penulisan-file-konfigurasi-javascript
slug: cara-penulisan-file-konfigurasi-javascript
title: Cara Penulisan File Konfigurasi Javascript
wordpress_id: 96
categories:
- Best Practices
tags:
- Configuration
- Javascript
- Nodejs
---

Hampir setiap kali kita membangun aplikasi, kita membutuhkan file konfigurasi. File konfigurasi untuk menyimpan data yang _configurable_ disesuaikan dengan _environment_ aplikasi. Contoh data koneksi database, data _credential_ API dan sebagainya. Berbeda orang atau tim, maka berbeda pula format file konfigurasi nya.<!-- more -->

Format file konfigurasi javascript biasanya mempunyai ekstensi file .json atau .js. Jika data pada konfigurasi file tersebut sederhana dan hanya bisa disediakan oleh developer (manusianya), maka gunakan ekstensi .json. Jika kita lebih perlu flexibilitas, maka gunakan .js. Tapi yang akan dibahas ini bukan ekstensi, melainkan format penulisannya.

Berikut beberapa contoh file konfigurasi, biasanya file konfigurasi diberi nama config.js.

Lalu bagaimana menulis file konfigurasi yang baik ? Berikut adalah beberapa pemikiran.



## File Konfigurasi Harus Berupa Flat Object



Flat object artinya hanya mempunyai satu level property, jadi satu property tidak punya property lagi. Contoh.


    
    
    module.exports = {
        foo: "bar"
    }
    



Jadi tidak boleh ada nested property lagi seperti berikut.


    
    
    module.exports = {
        foo: {
            bar: "baz",
            qux: "norf"
        }
    }
    



Kenapa harus flat object ? Pertama, mudah melakukan validasi. File konfigurasi adalah file yang bisa berubah disunting oleh developer, jadi sebelum aplikasi dijalankan baiknya ada function yang melakukan check dulu pada file konfigurasi. Jika file konfigurasi adalah object dengan nested property yang banyak tentu akan memakan waktu untuk melakukan check property di setiap level. contoh file konfigurasi berikut.


    
    
    module.exports = {
        db: {
            host: "localhost",
            user: "root",
            password: "",
        },
        api: {
            baseUrl: "",
            apiKey: ""
        }
    }
    



Kita harus check apakah konfigurasi memiliki field `db` dan `api`, dan untuk masing-masing property tersebut, kita harus check lagi propertynya. Belum lagi jika property itu punya property lagi. PR.

Lebih mudah jika kita membuatnya flat seperti ini.


    
    
    module.exports = {
      DB_HOST: '',
      DB_USER: '',
      DB_PASSOWORD: '',
      API_BASE_URL: '',
      API_KEY: ''
    }
    



Kita hanya perlu melakukan check untuk satu level saja. Hemat.

Alasan kedua kenapa harus flat object, kemudahan penggunaan _accross the team_. Lihat file konfigurasi diatas, satu developer mungkin akan import file, lalu menggunakan konfigurasi nya dengan format `db.host` atu `api.apiKey`. Developer lain bisa saja import langsung propertinya. Misal:


    
    
    const host = require('config.js').db.host;
    



Dan bisa banyak lagi bentuk nya, ini menyebabkan kita harus membuat dokumentasi atau convention baru untuk team. PR juga.

Alasan yang ketiga adalah, why not. Toh kebanyakan konfigurasi nantinya dibuat [environment variable](https://en.wikipedia.org/wiki/Environment_variable) yang format-nya sama flatnya.



## Property harus UPPERCASE



Untuk meminimalisasi error karena typo, salah ketik, maka baiknya format penulisan propertinya harus seragam. Lebih baik jika ALL CAPS atau Uppercase, karena untuk pembeda dengan variable biasa dan untuk menunjukan bahwa variable tersebut adalah konstanta konfigurasi yang tidak bisa diubah pada saat runtime.
