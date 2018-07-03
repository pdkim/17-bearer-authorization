##Travis:

##Heroku:

##Github:
https://github.com/pdkim/17-bearer-authorization

##Feature:
Continue the basic authentication application but include bearer authorization for another module.  This should have  


###Intructions:
1. Go to the github link and clone the repository. You may want to fork prior to cloning the repository.
2. 'npm install' before running anything.
3. If you haven't already, install mongo. Once installed or already installed, run mongod to get mongo up and running.
4. Create a .env file with the following content: 
PORT=3000 
MONGODB_URI="mongodb://localhost/lab-17"
APP_SECRET=idontknow
5. In another terminal, 'nodemon index.js' to start server.
6. In postman, have a tab for the following configurations:
  - POST at http://localhost:3000/api/signup
    - set body to JSON with the following keys; pairs can be any value you want
      username:
      password:
      email:
    - leave this tab open for the token created
  - GET at http://localhost:3000/api/signin
    - set authorization to Basic and enter username and password information
  - Set another POST at http://localhost:3000/api/sleep
    - Set authorization to Bearer Authentication and leave token empty for now
    - set body to JSON with the following keys; pairs can be any value you want
      Name:
      Allowed:
  - Set another GET at http://localhost:3000/api/sleep/
    - Set authorization to Bearer Authentication and leave token empty for now
  - PUT at http://localhost:3000/api/sleep/
    - Set authorization to Bearer Authentication and leave token empty for now
    - set body to JSON with the following keys; pairs can be any value you want as long as data is different
      Name:
      Allowed:
  - DELETE at http://localhost:3000/api/sleep/
    - Set authorization to Bearer Authentication and leave token empty for now  
7. In signup POST, press POST.  This should generate a token. Copy this token and paste it to every tab that is set to Bearer authentication.
8. In signin GET, press GET.  This should get the login information.
9. In sleep POST, press POST.  A new object should be created. Copy the id generated from this and paste it in the GET, PUT, and DELETE tabs after sleep/
10. In sleep GET, press GET.  You should recieve the the object created.
11. In PUT, press PUT.  Then go back to sleep GET and press GET.  The object should now be updated with the new data.
12. In DELETE, press DELETE.  You should recieve a message.  To verify, go back to GET, and it should no longer populate an object.