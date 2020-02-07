---
author: egig
date: 2020-01-27 10:00:00+00:00
layout: post
slug: 2020-01-27-create-and-update-database-mysql
title: Create and Update Database MySQL
tags:
- mysql
- database
---

My first post this 2020. One of those things I want to write is that what I learn from sharing session from work
combined with a few experiences about database MySQL.

There are some that we need to consider when working with database MySQL so
our database can work seamlessly effective.

### Collation

When creating new database, often ignore about anything else except the short syntax
```shell
CREATE DATABASE <db-name>
```

Collation is basic thing we should care about. Character set is now evolved, so we need to
ready to handle even very strange emoji and smiley in our character set. Without concern
about the collation, we likely will get this error

```shell
1366 Incorrect string value: '\xF0\x9F\x98\x83\xF0\x9F...' for column 'column_name' at row X
```

as described in [this question](https://stackoverflow.com/questions/39463134/how-to-store-emoji-character-in-mysql-database).

In short, do not forget to set the Character set when creating database, for example:
```shell
CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Transaction

If we want our database to support transaction, then we should choose the database engine accordingly.
For Mysql, we likely need to choose endine InnoDB instead of MyISAM.

### Index

When creating table, we should think about how do we design the index. While index is useful
to speed up query, its also can be waste of resources or even slow down the query if wrongly
designed. Note that mysql has [the optimizer](https://dev.mysql.com/doc/internals/en/optimizer-code.html).
The MySQL Optimizer determines whether to use full table scan or related index

Here some points I want to note about designing Index
1. Mysql, left most scan first. Be aware when designing the composite index
2. Place most cardinal index in most left
3. Having index in low cardinality column also depends on distribution of data
4. More high cardinality then index will be more useful
5. Index also useful where data distribution is small, Index not useful  where data distribute is large,
   Because the SQL Optimizer will do full table scan instead if index for large distribution data.
   
Example for composite index.

Lets say, we have this table

```shell
TABLE users (
   id INT PRIMARY KEY AUTO_INCREMENT,
   first_name VARCHAR(55),
   last_name VARCHAR(55)
   status TINYINT(4),
)
```

And we create the composite index for 3 column with order `first_name`, `last_name` AND `status`.
That composite index will not used if we query for `status` only, but will be useful if we  query
for `first_name` column.

### Default Value
Do not forget add to default value to new column if you are updating
existing application since, as what I've experienced this often
leads to error `Field X doesn't have default value.`

### Data migration

When updating table structure, do not forget to check whether its affecting the existing data,
if it is, then we need to do data migration as well.

### Table Lock

Also when updating table, avoid table lock since it can lead a problem to existing running application.
To be sure set `ALGORITHM=inplace` and `LOCK=none` to your `ALTER TABLE` statement. Got that from my
co-worker and [this question](https://stackoverflow.com/questions/35424543/alter-table-without-locking-the-entire-table).
