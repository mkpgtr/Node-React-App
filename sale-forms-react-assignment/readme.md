### How to run this app?

1. go to backend folder and run the command npm install. after installation completes run the command => node index.js
2. go to react-project(frontend) folder and run the command npm install
3. I used Vite to create my react app so I used the command npm run dev to start my react app on port 5173.
4. If you are using create-react-app then you can use npm start to start your frontend server on localhost:5000


### Folder Structure

1. backend(folder) : the backend part of the web-app.
2. react-project(folder) : the frontend part of the web-app.

### A note regarding backend folder structure

1. I have not used a separate controllers(folder). I have written all the code in the routes(folder) files.
2. This is a small project and I thought it would be great if I can put things in one place rather than spreading them out.

### utilities folder

1. Feels really good that I can write separate functions to do computations and keep them in a different folder.
2. the utilities(folder) has one file named auth_utils.js.
3. It has two functions which I have written for : 
    a) Generating JWT TOKEN.
    b) comparing password.

### Models folder

1. The models folder has two models : User Model and Sale Model.
2. These two models have validations from the Mongoose API which I found quite useful.
3. Performing validations is such a breeze with Mongoose and it greatly helped me lessen my code in the Routes(folder) files.

# Middleware folder

1. The Middleware(folder) includes a file named auth_middleware.
2. This auth_middleware(authentication middleware) stands in between our Sale routes and frontend.
3. When we send our frontend requests with axios, we also send headers along with our axios request. Refer from point 4 - 7 for my explanation of this middleware.
4. In the headers, we have our JWT(json web token). This JWT is issued from the backend to anyone who registers in my web-application.
5. Once the user is registered, the backend sends the JWT to the frontend and we save the JWT in our localStorage.
6. Now, whenever we send any request to any of the sale routes, we also send the JWT (token) along with it.
7. When this request that is coming with the token hits the auth_middleware (authentication middleware), we verify the token using jwt.verify function.
8. It helps us to perform validations regarding the authenticity of the requests being sent to the sale routes.
9. It also helps us to know, which user is making the requests to the sale routes. 

# Things I struggled with : 

1. Finding the logic for adding all the amount fields(only for today) in the sale Model(for the today's revenue page). After midnight, the calculation resets itself because a new day has started.
2. Keeping the frontend application working on page reload by retrieving saved user from localStorage. There was a time during development that I wanted to delete everything and start working again from scratch because everything was breaking. Then I figured out that, user.firstName was sometimes giving undefined, then I found out on Internet about using user?.firstName instead. It worked so well!
3. I have not at all used Redux much. The redux folder exists because I initially started out following the react social media app instructor(he used redux). And now that my app is working well, I am afraid to touch that folder(so leaving it just like that).

### Why I am not including an ENV file?

1. This is a submission of a project assignment which I have been given.
2. This version of my project will not be hosted on Heroku or something like that.
3. I want to keep it dead-simple so that my evaluator does not have to waste much time doing all the configuration.
4. When I will host this on Heroku or Render, .ENV will be mandatory.


# Regarding Screenshots and Video Demo of my Application.
0. Because things have gone wrong in the past due to some technical issues
    I am taking extra precautions from my side to ensure that my assignment is evaluated as if I am showing my project on my laptop.
1. To prove that my application works, I am recording a video of my working application.
2. Also I am adding screenshots in the screenshots(folder) so that anyone can get a glimpse of my working application.

# Protected Route on The Frontend

1. The protected route knows the reality(logged in state) whether the user is logged in or not from the localStorage. Please look into the src/components/ProtectedRoute.jsx for more details.

### About Console.logs here and there scattered

1. While testing my application and debugging errors, I had used console.log in so many places. I am leaving it there so that
the originality of my project remains intact. In this era of internet when help is available from so many resources, I think it's 
mandatory to try from my side to give full proof that this project has come to life after my constant attempts to build it across the week.


### Redundant folders and variables

1. For the fear of breaking my nice working app, I am not touching anything. Yes, I have been testing this app since three days and to be honest, I am quite afraid of running to bugs caused by my own stupidity.