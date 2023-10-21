# Users module

-   Feature:
-   IOC and DI with inversify
-   TypeORM
-   Sign up User
-   Sign in User to get token
-   Delete User
-   Update User email

## Install

    yarn install

## Setup infras

    docker-compose up -d

## Run the app

    yarn run dev

# REST API

The REST API

## Get list User - Need to login

### Request

`GET /auth`

    curl -i -H 'Accept: application/json' http://localhost:8000/auth/

## Create new user

### Request

`POST /auth/signup`

curl --location --request POST 'localhost:8000/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
"firstName": "John",
"lastName": "Doe",
"email": "johndoe@example.com",
"password": "fakepassword123",
"age": 30
}'

## Login to get token

### Request

`POST /auth/signin`

curl --location --request POST 'localhost:8000/auth/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
"email": "johndoe@example.com",
"password": "fakepassword123",
}'

## Update User email

### Request

`PATCH /auth/:id`

curl --location --request PATCH 'localhost:8000/auth/:id' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3ODkzNjI1LCJleHAiOjE2OTc4OTcyMjV9.FenF77RfBy1_m1A8TQgfDcFcnOmQcDitNCfQyxBfuCY' \
--data-raw '{
"email": "johndoe@example.com",
}'

## Delete a User

### Request

`DELETE /auth/id`

    curl -i -H 'Accept: application/json' -X POST -d'_method=DELETE' http://localhost:8000/auth/id
