---
author: egig
date: 2019-05-03 13:00:00+00:00
layout: post
slug: go-for-nodejs-developer-middlewares
title: "Go for Nodejs Developer: Middlewares"
tags:
- Go
- Middlewares
---

I code in nodejs daily, end then comes everybody learn Go, maybe because most of decacorn start up company in my neighborhood uses Go, then here I am, learn Go as well. Not to mention that in fact we should always learn new(any)thing to survive, and [Why should you learn Go ?](https://medium.com/@kevalpatel2106/why-should-you-learn-go-f607681fad65) mentions its something that fit future hardware architecture, nothing to lose to learn Go by the way.<!-- more -->

I feel lucky I learn Expressjs (nodejs) as before learning Go, because  I think Nodejs and Go, (maybe) has similar structure and behaviour in term of simple http application, or its indeed all programming language do the same thing. I don't know.

Http server in Go:

```golang
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	//..
})

log.Fatal(http.ListenAndServe(":8080", nil))
```

Http server in Nodejs (Expressjs):

```javascript
app.get('/', function (req, res) {
	//..
})
app.listen(port)
```

See, that both maps "path" to function that expect Response and Request as param and then call "listen". At this point I was pretty sure that I can code in Go. haha.


I extensively use Expressjs as framework to build web service, and do anything middlewares to decouple things. So once I try to build a project in Go, then I still bring that behaviour in mind. Decouple things problems also comes out when I try to code in Go, so I think I can do same thing as what I did in nodejs: Middlewares.

I found this Go library called "mux", "A powerful URL router and dispatcher for golang." they said. So in this case I need to make database connection shared accross the router and also decoupled.

And here it is.

```golang
func CreateDBMiddleware(driver, dsn string) mux.MiddlewareFunc {
	return func (next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			db, err := sql.Open(driver, dsn)
			if err != nil {
				log.Fatal(err)
			}

			ctx := context.WithValue(r.Context(), "db", db)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
```


This is how we use it in router. Note that here we use `config.DBdriver` and `config.DBDSN` which is we can get it from anywhare and we don't have to create it each time we create route.
```
router := *mux.NewRouter()
router.Use(CreateDBMiddleware(config.DBDriver, config.DBDSN))
```

And this is how we use the `DB` in route.

```
func handler(w http.ResponseWriter, r *http.Request) {

	db := r.Context().Value("db").(*sql.DB)
	// use db for whatever
}
```
