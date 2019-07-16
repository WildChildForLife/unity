# Unity Test



## Headlines :

In order to achieve the test, I have used Loopback4 (By IBM) , a powerful NodeJS plugin that handles RestAPI scenarios and MVC patterns using express as a middleware.

The used JS version is ES7.

The architecture of the project has been split in 3 bricks : 

* A NodeJS Server (Loopback 4) to serve the API's (Port 3000)
* A NodeJS Server middleware to connect with the API's / Client (PUG Templates) for the UI (Port 7000)
* A Dockerized accessible MySQL Database (Port 3306)

I have created a model and the required architecture for model User, which will be used for authentication using a JWT Token to access some specific API's.

Authentication has been handled by a JWT Authentication signature sent by the API server, the Token expiration has been set to 30 min (1800 sec).

------



## Installation :

In order to run and visualize the unity-test, you'll need the have the following requirements :

- Docker
- NPM

### Automatic Installation : 

On the project root "unity", run the following command :

```bash
$ npm run preinstall
```

 This will : 

- Run the ./setup.sh, which will :
  - Run **npm install** on the Server Application ( server/ )
  - Run **npm install** on the Middleware Application ( middleware-ui/ )
  - Execute **npm docker:start:database** on the Server Application, which will
    - Execute ./server/database/setup.sh, which will : 
      - Check if there's already a names "mysql_c" Docker running, if yes, it will kill it
      - Pull **mysql:5.7.22** docker image
      - Run the mysql container with the required params
      - Wait for the container to be up and running (you can check the docker running by "docker ps | grep mysql")
      - Create the Database
      - Create the Schema according to the NodeJS given Models
      - Create a default User which is considered as Ops Team (Login : **john-riccitiello@unity.com** / Password : **very-secured-password**)
      - Set up environment variables

### Automatic Bundled Servers Start : 

To start the servers, run the following command in the root of the project : 

```bash
$ npm start
```

This will : 

- Run ./start.sh, which will : 
  - Check if no process is using Ports 3000 and 7000, if yes, it will prompt to ask if I can kill them.
  - Start the Application Server (Logs will be kept in ./logs/server.log)
  - Start the Application Middleware (Logs will be kept in ./logs/middleware-ui.log)

------



## Model Schema Definition :

### Entities :

### Player :

- id (PK, Auto-increment)
- firstname
- lastname
- email
- sessionId

#### Session :

- id (PK, Auto-increment)
- createdAt
- Players[]

#### Rating :

- id (PK, Auto-increment)
- score
- sessionId
- playerId

#### Comment :

- id (PK, Auto-increment)
- createdAt
- feedback
- playerId
- sessionId

#### User (Ops Team) :

- id (PK, Auto-increment)
- email
- password
- firstname
- lastName

## Authentication : 

In a browser, navigate to [http://[::1\]:3000](http://127.0.0.1:3000/) or [http://127.0.0.1:3000](http://127.0.0.1:3000/), and click on `/explorer` to open the `API Explorer`.

In the `UserController` section, click on `POST /users`, click on `'Try it out'`, specify :

```json
{
    "id": "2",
    "email": "john-riccitiello@unity.com",
    "password": "very-secured-password",
    "firstName": "John",
    "lastName": "Riccitiello"
}
```

and click on `'Execute'`.

A JWT token is sent back in the response to be used as a Bearer in the header of the secured requests as the follow :

```bash
$ curl -X GET \
--header 'Authorization: Bearer <token>' \
http://127.0.0.1:3000/users/me
```

**<u>I have secured all the POST methods, so you will have to be authenticated in order to use the UI and create Players / Sessions / Ratings / Comments.</u>**



### What I could have done if I had more time :

- Dockerize all the project using an NPM docker image and mounting a volume to the project that I would be attached with a network to a second Docker for the Database.
- Run a docker-compose up which going to trigger all the services and run the required commands to install and run the project.
- Using passport plugin for an oAuth2 (OpenID optional) protocols for more secured Authentication.
- API Gateaway to handle permissions
- Use React on the Front End, with [Ant-Design](https://ant.design/) 
- Handle Logs using ELK Stack (Elasticsearch / Logstash / Kibana) in a Dockerized environment
- ...

------

Thank You.

Youssef El Gharbaoui.



