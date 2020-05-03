---
author: egig
comments: true
date: 2017-09-02 11:53:17+00:00
layout: post
slug: please-stop-echoing-things
title: Please Stop Echoing Things
wordpress_id: 65
categories:
- Best Practices
tags:
- php
---

For my little brother who likes to embedding PHP to html but not sure how to do it nicely.

You probably have ever seen or even written code like below:
<!-- more -->


    
```php  
<table>
<?php
    echo '<td>'.$row->name.'<td>';
    echo '<td>'.$row->email.'</td>';
    echo '</tr>';
}
?>
</table>
```


   1. PHP short echo tag (<?=) is now available forever (PHP version 5.4+)
   2. PHP have alternative syntax of control structure: [http://php.net/manual/en/control-structures.alternative-syntax.php](http://php.net/manual/en/control-structures.alternative-syntax.php)

With those powerful feature, we can rewrite code above little bit more handsome:


    
```php
<table>
  
    <tr>
         <td><?= $row->name; ?></td>
         <td><?= $row->email; ?></td>
    </tr>
  
</table>
```
    



See ? so what do you think ?

Note, this post already published long time ago in medium:
[https://medium.com/@eatpraycode/please-stop-echoing-things-1dde8ff57d71](https://medium.com/@eatpraycode/please-stop-echoing-things-1dde8ff57d71)
