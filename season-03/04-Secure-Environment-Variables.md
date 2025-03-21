# How to keep our credentials safe and secure

-   To keep our credentials safe and secure we can use a package named dotenv which you can install `npm i dotenv`
-   Keep all the credentials such as mongodb url, port and jwt secret inside .env file and access it using `process.env.PORT`
-   There can be various environment variables depending on the environment such as .env.production, .env.development, .env.staging, .env.local
-   You can directly use .env files without using dotenv package by defining it inside package.json but make sure to have the latest nodejs version installed in the system

```
    "scripts": {
        "start": "node --env-file=.env src/index.js",
        "dev": "nodemon --env-file=.env src/index.js"
    },
```
