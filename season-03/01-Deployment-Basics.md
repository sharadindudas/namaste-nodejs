# How to start deployment manually

-   Signup on AWS
-   Launch an instance of AWS EC2
-   Create a key-pair to login to your instance and use `chmod 400 <secret>.pem` command to grant permission to access the secret key to login to your instance (Ubuntu machine) (For Linux Users)
-   To grant permission to access the key for windows users are the following commands:
    -   `icacls.exe <secret>.pem /reset`
    -   `icacls.exe <secret>.pem /grant:r "$($env:username):(r)"`
    -   `icacls.exe <secret>.pem /inheritance:r`
-   Paste your command (ssh -i ....) on the terminal and you will be able to access your instance of ubuntu machine
-   Install Node.js on your ubuntu machine and make sure the version of both (local and ubuntu) exactly matches or not
-   Clone your repositories of the project to get them into your ubuntu and install and required dependencies accordingly using `npm i` / `npm install`
