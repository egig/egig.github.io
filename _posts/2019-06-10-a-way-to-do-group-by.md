---
author: egig
date: 2019-06-10 13:00:00+00:00
layout: post
slug: a-way-to-do-group-by
title: A Way to Do Group By
tags:
- database
- sql
- mysql
---

How do you do `Group By` in SQL ? (or MySql) ? This post is note about my experience writing query in sql, There is worth-to-note something about 'Group By', there is may be better way to do it.

So lets say, we have following schema, table `users` and table `orders`, they have relation one to many. One user can has zero or many orders.

```sql
CREATE TABLE orders
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    order_date DATE NOT NULL,
    user_id INT(11) NOT NULL
);

CREATE TABLE users
(
    id INT(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
);

CREATE UNIQUE INDEX users_email_unique ON users (email);

```

and suppose we need to get all users for certain order, for `SELECT *` fan, the query pretty much will looks like this

```sql
SELECT * FROM users as u
LEFT JOIN orders as o on o.user_id = u.id
WHERE o.order_date=NOW()
GROUP BY u.id
```

For MySQL v5.7.11, this will be resulting an error:

```
[42000][1055] Expression #1 of SELECT list is not in GROUP BY clause and
contains nonaggregated column 'u.id' which is not functionally dependent on
columns in GROUP BY clause; this is incompatible with
sql_mode=only_full_group_by
```

There is already good [post](https://gabi.dev/2016/03/03/group-by-are-you-sure-you-know-it/) describe why the error happen and how to overcome this. It said that this is because mysql adhere some [spec](http://dev.cs.ovgu.de/db/sybase9/help/dbugen9/00000284.htm), which is good, and can be fixed by using aggregators function (`ANY_VALUE`, `MAX`, `MIN`, etc..) in the fields, include the fields in GROUP BY clause, or fully disable the `sql_mode`.

But this is my experience. I discovered there is also better way to do Group By in certain case. If we need to do complex join multiple table, its straightforward to one to one relationship, but for on to many, this is I am gonna do it.


Make use of above example, let say we need to get order count of each user. Then first, I will make distinc order table group by the user id.

```sql
SELECT COUNT(1) as order_count, o.order_id
FROM orders
GROUP BY o.order_id
```

And then, join the table with the user table using "Subquery", like this.

```sql
SELECT u.*m, uo.order_count
FROM users as u
JOIN (
    SELECT COUNT(1) as order_count, o.order_id
    FROM orders
    GROUP BY o.order_id   
) as uo on uo.user_id=u.id
```

This way make the query more clean and structured. I feel that way at least. And we also get rid of the `only_full_group_by sql_mode` compatibility. But Note, this query structure is not tested for its performance for complex query.


