

https://github.com/user-attachments/assets/17b61558-3ace-4d28-acbc-11daeca774fb

# Run

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

- NODE_ENV: Specify the enviroment as development of production

- MONGODB_CONNECTION_STRING: Specify the Mongodb URI to access the database

- JWT_SECRET_KEY: Specify the secret which is used to generate JWT token on authorization

- FRONTEND_URL: http://localhost:5173 , for me it is this

- VITE_API_BASE_URL: It is used to fetch data from or send data to different API servers 

- CLOUDINARY_CLOUD_NAME: Specify the Cloud name to access the cloudinary (which is listed in dashboard)
  
- CLOUDINARY_API_KEY: Specify the Cloudinary Api , which is essential for account identification

- CLOUDINARY_API_SECRET:Specify the Cloudinary Api , which is used for securing interaction with cloudinary API. It is used for cryptographic signatures for secure uploads.

- STRIPE_API_KEY: It is used in backend of the code, to  authenticate API request

- VITE_STRIPE_PUB_KEY: Used in the frontend of  application to identify  Stripe account 




After you've set these environmental variables in the .env file at the server folder and client folder of the project, and install node modules using npm install in both server and client folder.

Now you can run npm run dev in the terminal to run server and 'npm run dev' to run client and the application should work.


# Technology

The application is built with:

- Node.js
  
- MongoDB
  
- Express.js
  
- JWT authentication and authorization
  
- React TS
  
- React router dom for client routes
  
- Tailwind CSS for user interfaces
  
- React Query for API data fetching and Use Hook Form for validation and form handling , Express validator is used at backend for validation.
  
- React DatePicker for displaying date

- Automated testing is done using Playwright


 # Features

 ## It is a Hotel booking application.

 #### Users can do the following

 - Create an account , login and logout
 - Search for different hotels either by name or just random search
 - You have filter and sorting options ( according to star rating, types , facilities and much more )
 - Pagination has been added
 - You can add images 
 - Stripe feature is integrated for payment 
 - Can see the history of booked hotels
 - Created an admin panel for creation , updation and deletion of hotels
