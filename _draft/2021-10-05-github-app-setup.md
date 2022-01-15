---
author: egig
date: 2021-10-05 10:00:00+00:00
layout: post
slug: github-app-setup
title: Github App Setup
tags:
- github
---

Here is how I obtain access token from my own github app.

After creating the Github App, we have the App ID and the Private key
that we can  use to obtain the access token. The access token later
can be used to call another rest api endpoints.

Its actually involve three steps
1. Create JWT and sign the token using the private key.
2. Get the installation ID on which the app is installed.
3. Get the access tokens.

## Create JWT

The github docs already explain this well.
Here is how I create the JWT using golang.

```go
import (
	"github.com/golang-jwt/jwt"
	"io/ioutil"
	"time"
)

func Token(Issuer, privateKeyPem string) (string, error) {

	signBytes, err := ioutil.ReadFile(privateKeyPem)
	if err != nil {
		return "", err
	}

	signKey, err := jwt.ParseRSAPrivateKeyFromPEM(signBytes)
	if err != nil {
		return "", err
	}

	claims := jwt.StandardClaims{
		ExpiresAt: time.Now().Unix() + (10 * 60),
		IssuedAt:  time.Now().Unix() - 60,
		Issuer:    Issuer,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodRS256, &claims)
	tokenStr, err := token.SignedString(signKey)
	if err != nil {
		return "", err
	}

	return tokenStr, nil
}
```

## Get Installation ID
To access the rest api related to a repo, for example, get the repo detail,
then we need the installation ID. We need to actually install the app to the
repo of course.

Here is how I get the Installation ID.

```go
import (
	"context"
	"github.com/google/go-github/v39/github"
)


func GetInstallationID(ctx context.Context, auth string) (string, error) {

	c := github.NewClient(http2.CreateAuthClient("bearer", auth))

	i, _, err := c.Apps.FindRepositoryInstallation(ctx, "REPO_OWNER", "REPO_NAME")
	if err != nil {
		return "", err
	}

    return i.GetID(), nil
}
```
TBD what is CrateAuthClient ?