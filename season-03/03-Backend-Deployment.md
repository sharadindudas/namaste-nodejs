# Devtinder Backend Deployment on AWS EC2

-   `npm i` to install dependencies mentioned on our project from package.json.
-   `npm start` for production and npm run dev for development purpose.
-   Add the .env file inside my copied repo on ubuntu machine using `sudo nano .env` then paste the .env files and then press Ctrl + O to save it and Ctrl + X to exit the file and done.
-   Allowed the backend PORT in our EC2 instance to connect to our backend.
-   When we close the npm start process or just close the terminal our backend stops so to keep our backend running all the time even after closing the terminal and all we need pm2 (process manager) who will run our backend all the time.
-   `npm i pm2 -g` to install the pm2 globally for all the projects
-   `pm2 logs` to see all our errors and status of our process
-   `pm2 flush <processName>` to clear the logs for the process
-   `pm2 list` to see all processes
-   `pm2 start npm -- start` to start, `pm2 stop <processName>` to stop, `pm2 delete <processName>` to delete the process
-   `pm2 start npm --name "<processName>" -- start` to provide custom name to the process
