## Backend Technical Challenge: Mail Simulation API with NestJS
## Table of Contents
1. [Description](#description)
2. [Technologies](#technologies)
3. [Installation and Usage](#installation-and-usage)

___
### Description: 

The Mail Simulation API is a backend service built using the NestJS framework that simulates the process of sending emails. It interacts with a MongoDB database to store information 
about each email record and provides endpoints to retrieve and analyze the stored data. The API consists of the following key features and endpoints:

#### API Endpoints

1. **Send Mail Record (`POST /mail-record/send`)**
   - **Description:** This endpoint receives a request to send an email and stores the provided information in the MongoDB database. The request should include the details of the email in the form of a `CreateMailRecordDto` object.
   - **Request Body:**
     ```json
     {
       "email": "socio@mail.com",
       "plate": "123XYZ",
       "message": "Email Message",
       "parkingName": "Parking One"
     }
     ```
   - **Response:** Returns a `SendMailResponseDto` object simulating the result of the email sending process.

2. **Get All Mail Records (`GET /mail-record`)**
   - **Description:** This endpoint retrieves all the email records stored in the MongoDB database.
   - **Response:** Returns an array of `MailRecordResponseDto` objects, each containing the details of an email record.

3. **Find Most Frequent Email (`GET /mail-record/most-frequent-email`)**
   - **Description:** This endpoint determines and returns the email address that appears most frequently in the stored records along with the count of its occurrences.
   - **Response:** Returns an object containing the email address and its count.
     ```json
     {
       "email": "socio@mail.com",
       "count": 10
     }
     ```

4. **Get Mail Record Count Per Week (`GET /mail-record/count-per-week`)**
   - **Description:** This endpoint calculates and returns the number of email records created each week.
   - **Response:** Returns an array of objects, each containing a week date and the count of email records for that week.
     ```json
     [
       {
         "date": "2024-06-01",
         "count": 5
       },
       {
         "date": "2024-06-02",
         "count": 7
       }
     ]
     ```
     
___
### Technologies:
- [TypeScript v5.1.3](https://www.typescriptlang.org/ "TypeScript"): TypeScript version 5.1.3 or higher is required for developing and running the API.
- [Node.js v20.15.0](https://nodejs.org/ "Node.js"): Node.js version 20.15.0 or higher runtime is required to use the API.
- [NestJS v10.0.0](https://nestjs.com/ "NestJS"): NestJS version 10.0.0 or higher framework is used to build the API.
- [MongoDB v7.0.11](https://www.mongodb.com/ "MongoDB"): MongoDB version 7.0.11 or higher is used as the database to store email records.

|Backend|
|---|
|![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)|


___
### Installation and Usage:

1. **Clone the Project Repository**

   Open your terminal and execute the following command to clone the mail-simulator-nestjs project repository:

   ```bash
    $ git clone https://github.com/BrayanGuerreroXD/mail-simulator-nestjs.git
   ```

2. **Navigate to the Project Directory**

   Change your working directory to the project's root directory:

   ```bash
    $ cd mail-simulator-nestjs
   ```

3. **Create and Configure .env File**

   Create a .env file in the root directory of the project with the following content. Replace the placeholder values with actual secrets:

   ```dotenv
     # MongoDB connection URI
     MONGO_URI=mongodb://localhost:27017/mail-record-db

     # Port number for the server
     PORT=3000
   ```
   - MONGO_URI: Specifies the MongoDB connection URI where mail-record-db is the name of the database to be used for storing email records.
   - PORT: Specifies the port number on which the server will run.

     Ensure these values are kept secret and not shared publicly.

5. I**nstall all dependencies**
   
    ```bash
    $ npm install
    ```

6. **Running de app**

    ```bash
    # development
    $ npm run start
    
    # watch mode
    $ npm run start:dev
    
    # production mode
    $ npm run start:prod
    ```

7. **Access the Application**

   Once the application is running, you can access it at:

   ```sh
     http://localhost:3000
   ```
