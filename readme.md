# Jobly Backend

This is the Express backend for Jobly, version 2.

To run this:

    node server.js
    
To run the tests:

    jest -i

## API Documentation

### **POST /users/:username/jobs/:id**
**Description:** Allows a user or an admin to apply for a job.

#### **Request:**
- **Method:** POST
- **URL:** `/users/:username/jobs/:id`
- **Authorization:** Admin or the same user

#### **Response:**
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "applied": jobId
  }
