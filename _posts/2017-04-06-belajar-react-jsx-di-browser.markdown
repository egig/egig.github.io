---
author: egig
comments: true
date: 2017-04-06 18:37:36+00:00
layout: post
slug: belajar-react-jsx-di-browser
title: 'Belajar React: JSX di Browser'
wordpress_id: 32
categories:
- Tutorial
tags:
- Javascript
- React
---

JSX tidak bisa dijalankan di browser begitu saja, karena browser, bahkan yang terbaru sekalipun, hanya mendukung javascript murni saja. Agar bisa menggunakan sintak JSX di browser, kita harus menggunakan librari lain yang bernana Babel.

Apa itu Babel ?

<!-- more -->



<blockquote>Babel is a JavaScript compiler.</blockquote>




Begitu kata website-nya, bisa dikunjungi di https://babeljs.io. Babel adalah javascript compiler. Secara teknis, Babel bisa kita gunakan untuk men-transformasi-kan bahasa javascript modern (EcmaScript 6) dan atau JSX React menjadi javascript yang didukung oleh browser.

Bagaimana menggunakan Bebel di Browser ?
Untuk menjalankan babel di browser, kita cukup memuat librari Babel langsung:


    
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    



Namun, text javascript yang ingin kita transformasikan, tidak lagi disertakan dengan HTML sebagai tipe text/javascript, melainkan sebagai tipe text/babel

Contoh:


    
    
    <script type="text/babel">
        const getMessage = () => "Hello World";
        document.getElementById('output').innerHTML = getMessage();
    </script>
    



Pada artikel sebelumnya dimana kita membuat program Hello World, kita belum menggunakan JSX.


    
    
    
    <html>
      <head>
        <title>Sinau ReactJS</title>
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
    



Mari kita rubah kode tersebut diatas menjadi menggunakan JSX.

Tambahkan script librari babel setelah librari react:


    
    
    <script src="https://unpkg.com/react@15/dist/react.min.js"></script>
    <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    



Gunakan JSX. Ganti kode berikut


    
    
    var Hello  = function (props) {
       return React.createElement('div', null, 'Hello World');
    };
    
    ReactDOM.render(
        React.createElement(Hello, null, null),
        document.getElementById('app')
     );
    



menjadi:


    
    
    var Hello  = function (props) {
        return <div>Hello World</div>;
    };
    
    ReactDOM.render(
       <hello></hello>,
       document.getElementById('app')
    );
    



Hasil akhir:


    
    
    
    <html>
    <head>
      <title>Sinau ReactJS: JSX</title>
    </head>
    <body>
    
    
    
    <div id="app"></div>
    
    
    <script src="https://unpkg.com/react@15/dist/react.min.js"></script>
    <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    
    
    <script type="text/babel">
        var Hello  = function (props) {
            return <div>Hello World</div>;
        };
    
        ReactDOM.render(
            <Hello />,
            document.getElementById('app')
        );
    </script>
    </body>
    </html>
    



Simpan dengan nama 2-jsx.html dan buka di browser, maka akan tampil pesan sederhana "Hello World" seperti yang sudah kita lakukan sebelumnya.
