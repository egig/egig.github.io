---
author: egig
comments: true
date: 2017-04-24 18:43:12+00:00
layout: post
link: https://egig.org/tutorial/belajar-react-props-state
slug: belajar-react-props-state
title: 'Belajar React: Props & State'
wordpress_id: 34
categories:
- Tutorial
tags:
- Javascript
- React
---

Di React, kita menggunakan istilah "Component" untuk menggambarkan Komponen-komponen aplikasi atau interface yang ingin kita buat.

Ada dua cara untuk membuat React Component.

<!-- more -->

1. Menggunakan Function

Contoh:

    
    
    var SomeGreatComponent = function() {
        return  <div>..</div>;
    }
    



Jika kita membuat komponen menggunakan function, maka komponen tersebut tidak bisa memiliki State yang akan kita bahas nanti, oleh karena itu biasa disebut Stateless Component.

2. Menggunaan Class

Contoh:


    
    
    var SomeGreatComponent = React.createClass({
        render: function() {
            return <div>...</div>
        }
    });
    




Component yang dibuat menggunakan Class harus mempunyai method render yang me-return element-element yang dibutuhkan;

Ketika kita membuat suatu interface, atau katakan lah suatu tampilan HTML, tentu kita tidak lepas dari suatu data. Data bisa berupa konten sebuah artikel, isian form, tabel dari data tertentu dan masih banyak lagi. Di React, ketika kita harus bekerja dengan data, maka kita bekerja dengan State dan Props.

Props adalah istilah yang digunakan react untuk menunjukan data yang diterima komponen melalui attribut.

Perhatikan, suppose kita ingin membuat Component Button kita sendiri, dimana kita bisa menentukan text yang ditampilkan. Maka kurang lebih penggunaan React Component tersebut akan seperti berikut:


    
    
    <mybutton text="Kirim Pesan">
    



MyButton adalah nama Component, text="Kirim Pesan" adalah attribut. Ya, sama seperti pada HTML, text adalah nama attribut (attribut key), sedangankan Kirim Pesan adalah nilai dari atribut (attribut value).

Nama dan nilai attribut tersebut bisa diakses dalam React Component sebagai variable yang disebut props.

Pembuatan React Component dengan props menggunakan Function adalah sebagai berikut:


    
    
    var MyButton = function(props){    
        return (<button>{props.text}</button>)
    }
    



Pembuatan React Component dengan props menggunakan Class adalah sebagai berikut:


    
    
    var MyButton = React.createClass({
    
        render = function() {
            <button>{ this.props.text }</button>
        }
    })
    



Perhatikan, pada Component berdasarkan Class, kita menggunakan this pada this.props. karena pada saat Component tersebut di-evaluasi oleh react, Component Class tersebut akan dirubah menjadi object, dan props akan menjadi property dari object tersebut.


State adalah istilah dalam React yang digunakan untuk menggambarkan data yang terkait dengan interface komponen. Data disini hanyalah object javascript biasa, contoh:


    
    
    this.state = {
        foo: "bar"
    }
    



Kapanpun state berubah, maka view atau komponen yang berkaitan dengan state tersebut juga akan berubah atau di-render kembali oleh React.

Perhatikan object this pada this.state merujuk pada React Component. Lanjutkan membaca agar lebih mengerti.
Kapan state berubah ? state akan berubah setiap kali programmer memanggil fungsi setState(). Dengan demikian, setiap kali fungsi setState() dipanggil, maka akan terjadi render kembali pada komponen yang berkaitan.
