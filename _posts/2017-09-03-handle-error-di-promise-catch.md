---
author: egig
comments: true
date: 2017-09-03 17:43:37+00:00
layout: post
slug: handle-error-di-promise-catch
title: Handle Error di Promise.catch()
wordpress_id: 71
categories:
- Tips
tags:
- javascript
- nodejs
- promise
---

Baru sempat baca lebih lanjut tentang error handling di Promise Javascript. Agak ketinggalan sih, karena ini masalah sudah ada dari 2 tahun-an lalu, tapi gak apa, baru fokus ke Javascript setahun terakhir, dan anyway agak susah juga cari artikel yang bahas ini pake Bahasa Indonesia jadi saya tulis aja disini.
<!-- more -->

Mungkin teman-teman pernah dengar, kalo kita `throw`-ing error di `resolve` function atau di `then` function, maka Error itu akan otomatis menjadi _Rejection_ ? Contoh:


    
    
    let p1 = function foo(a) {
      return new Promise((resolve, reject) => {
        return resolve(a);
      });
    }
    
    p1(0).then((result) => {
      throw Error('error from then');
      console.log("from THEN: ", result);
    })
    .catch((e) => {
      console.log("from CATCH:", e);
    })
    



Output yang akan keluar kira-kira seperti berikut:

    
    
    from CATCH: Error: error from then
        at p1.then (evalmachine.<anonymous>:8:11)
        at <anonymous>
    



Artinya, tidak perlu khawatir jika ada typo atau programmer error yang lain di block function `then`.

Pada awalnya saya kira `then`-`catch` ini sama dengan `try`-`catch`. Ternyata nggak sama sekali. Baru saya ketahui setelah saya test error di block `catch`:


    
    
    p1(0).then((result) => {
      console.log("from THEN: ", result);
    })
    .catch((e) => {
      console.log(x);
      console.log("from CATCH:", e);
    })
    



Yang saya harapkan adalah muncul `ReferenceError: x not defined`. Tetapi nggak, malah silent error. Dan ini bahaya sekali. Kenapa silent Error ? Ini by design, karena setiap error akan otomatis jadi `Rejection` dan di teruskan ke resolver/rejector selanjutnya, maka kita harus menambah block `catch` lagi:


    
    
    p1(0).then((result) => {
      console.log("from THEN: ", result);
    })
    .catch((e) => {
      console.log(x);
      console.log("from CATCH:", e);
    })
    .catch((e) => {
      console.log("from CATCH2:", e);
    })
    



Bagaimana kalo kita typo lagi di block catch yang ke-2 ? ke-3 dan seterusnya ?

Lalu saya googling sedikit dan dapet solusinya, sebagai berikut.


    
    
     process.on("unhandledRejection", function(error, promise){
       // handle  error disini
     });
    



Kita bisa menuliskan kode diatas sebelum kode javascript kita yang lainnya. Sekian.


Referensi:
[http://jamesknelson.com/are-es6-promises-swallowing-your-errors/](http://jamesknelson.com/are-es6-promises-swallowing-your-errors/)
[https://gist.github.com/benjamingr/0237932cee84712951a2](https://gist.github.com/benjamingr/0237932cee84712951a2)
[https://stackoverflow.com/questions/29689143/trap-when-js-unhandled-rejections/29689261](https://stackoverflow.com/questions/29689143/trap-when-js-unhandled-rejections/29689261)
