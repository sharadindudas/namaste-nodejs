# Devtinder Frontend Deployment on AWS EC2

-   `npm i` to install dependencies mentioned on our project from package.json.
-   `npm run build` to bundle all the files together for production ready application
-   `sudo apt-get update` to update every packages inside ubuntu
-   `sudo apt install nginx` to run a web server inside our ubuntu machine
-   `sudo systemctl start nginx` to start the nginx
-   `sudo systemctl enable nginx` to enable the nginx
-   Now to copy the dist/build files inside /var/www/html/ to run our application on nginx we have to use the command `sudo scp -r dist/* /var/www/html/`
-   Now to allow the nginx server to get all the requests we have to allow the PORT 80 (default port for nginx) to allow it we have to mention the PORT number in the security rules of our instance
-   Now we can see our frontend running smoothly on the Public IPv4 address and make sure to use http:// instead of https:// (Took me some time to figure this out)
-   Find the config of nginx - `/etc/nginx/sites-available/default` and here edit the default using nano default and add the following configuration to fix the routing error issue

```
location / {
        try_files $uri /index.html;
    }
```
