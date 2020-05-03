---
author: egig
comments: true
date: 2017-04-03 18:25:55+00:00
layout: post
slug: belajar-react-hello-world
title: 'Belajar React: Hello World'
wordpress_id: 24
categories:
- Tutorial
tags:
- javascript
- react
---

Seperti biasa, sesuai tradisi belajar pemrograman, kita akan belajar menampilkan pesan "Hello World " di browser menggunakan React.

React bagaimanapun juga adalah javascript, dan kita akan membuat program React dengan cara membuat halaman web seperti biasanya, terdiri dari html, (belum ada) css, dan javascript.

<!-- more -->

Silahkan buka editor kesayangan, dan buat file dengan nama '1-hello-world.html'.

Kita buat template html sederhana


    
    
    
    <html>
      <head>
        <title>Belajar ReactJS</title>
      </head>
      <body>
    
      </body>
    </html>
    



React membutuhkan container untuk menempatkan komponennya, container disini adalah elemen DOM sederhana, kita bisa juga menggunakan elemen body tetapi sangat disarankan untuk membuat elemen baru. Untuk itu kita buat elemen baru dengan id tertentu. Untuk sekarang, kita buat elemen dengan id app setelah tag .


    
    
    <div id="app"></div>
    



Setalah itu kita muat 2 librari React yang utama dengan menggunakan tag script, yaitu react dan react-dom.


    
    
    <script src="https://unpkg.com/react@15/dist/react.min.js"></script>
    <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
    



Perhatikan kita menggunakan script eksternal dari internet, jadi pastikan komputer kita terhubung dengan internet.

Setelah memuat librari React, kita selanjutnya bisa membuat komponen React untuk menampilkan pesan 'Hello World' di browser.


    
    
    <script text="type/javscript">
    var Hello  = function (props) {
       return React.createElement('div', null, 'Hello World');
    };
    </script>
    


 
Ya, membuat satu React komponen sederhana semudah membuat satu function javascript saja.

Kita render komponen Hello dengan container yang telah kita buat dengan id 'app'. Perhatikan, kode javascript harus ditulis di dalam tag script ya.


    
    
    <script type="text/javascript">
    ReactDOM.render(
       React.createElement(Hello, null, null),
       document.getElementById('app')
    );
    </script>
    



Put it all together. Berikut ini adalah semua kode yang sudah kita buat jika digabungkan.


    
    
    
    <html>
      <head>
        <title>Belajar ReactJS</title>
      </head>
      <body>
    
        
        
        <div id="app"></div>
    
        
        <script src="https://unpkg.com/react@15/dist/react.min.js"></script>
        <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
    
        
        <script type="text/javascript">
          var Hello  = function (props) {
            return React.createElement('div', null, 'Hello World');
          };
    
          ReactDOM.render(
            React.createElement(Hello, null, null),
            document.getElementById('app')
          );
        </script>
      </body>
    </html>
    



Buka file tersebut diatas menggunakan browser, maka akan tampil text 'Hello World' sederhana.

Selesai. Selamat mencoba.
