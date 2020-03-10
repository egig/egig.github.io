---
author: egig
date: 2020-02-07 10:00:00+00:00
layout: post
slug: versioning-grpc-services-example-in-go
title: Versioning gRPC Services Example in Go
tags:
- golang
- grpc
- microservices
---

Sure we need the versioning for our microservices, its also apply for grpc services.
I current working on service that used by another several service.
My service periodically evolved and updated so I think its good practice to give it
version, keep the code base tracked for update and deprecation.

In REST API we usually use path or `Accept` header to identify versioning.
For gRPC, I didn't know I can apply versioning until I get in this page:
[Versioning gRPC services](https://docs.microsoft.com/en-us/aspnet/core/grpc/versioning?view=aspnetcore-3.1]).

The page described that gRPC versioning can be done using `package`.
The page provides example in C# then I try to implement it in go.
Then I find its easy and very applicable.

The Idea is to register all supported server implementation to one gRPC server.

```go

import (
//..
pb "./helloworld"
pb2 "./helloworldv2"
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

type serverV2 struct {
	pb2.UnimplementedGreeterServer
}

//...

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	pb2.RegisterGreeterServer(s, &serverV2{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

```

Above code is the snippet from the [repo I created](https://github.com/egig/grpc_versioning_example)
to create the example implementation.
See that I create two protobuf `helloworld` and `hellowordv2`.
And register both server implementation in the gRPC server.

```go
pb.RegisterGreeterServer(s, &server{})
pb2.RegisterGreeterServer(s, &serverV2{})
```

By Doing this, I believe we can manage deprecation easier rather than using
function name like `SayHelloV2`, `SayHelloV3` and so on.