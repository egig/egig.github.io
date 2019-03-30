---
author: egig
date: 2019-03-29 21:00:00+00:00
layout: post
slug: mongodb-sort-by-nested-array-of-object-item
title: Mongodb Sort By Nested Array of Object Item
categories:
- Tips
tags:
- MongoDB
---

Le's say, I have this kindof list of Mongodb documents, named `hardwares`;

 		[
 			{
 				_id: ObjectId(...),
 				name: "Unit x",
 				parts: [
 					{ name: "CPU", model: "x" },
 					{ name: "Memory", size: "4"  }
 				]
 			},
 			{
 				_id: ObjectId(...),
 				name: "Unit y",
 				parts: [
 					{ name: "CPU", model: "y" },
 					{ name: "Memory", size: "8"  }
 				]
 			},
 			{
 				_id: ObjectId(...),
 				name: "Unit z",
 				parts: [
 					{ name: "CPU", model: "z" },
 					{ name: "Memory", size: "2"  }
 				]
 			}
 		]

Recently I've struggle to find a way to sort those document list by nested array of object item, in this case, certain item in `parts` array.

So, If we want to sort documents above by parts named "Memory" by field `size`, then here comes the mongodb aggregator.


		db.hardwares.aggregate([
			{$unwind: "$parts"},
			{$sort: {"parts.size": 1}},
			{$group: {_id:"$_id", parts: {$push:"$parts"}}}
		]);


But the query above will result only one item for  `parts`, so to overcome this problem, first we can project new temporary field from `parts`, then unwind by that temporary fields, rather than unwind by orginal field (`parts`), so the query that works for me is this, pretty much.

		db.hardwares.aggregate([
			{$project: { "_tmp_parts": "$parts", parts: 1 },
			{$unwind: "$_tmp_parts"},
			{$match: { "_tmp_parts.name": "Memory" }},
			{$sort: {"_tmp_parts.size": 1}}
		]);
		
Note that I am MongoDB noob, so you might not find this article useful. :).