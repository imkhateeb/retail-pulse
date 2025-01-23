### **Node.js Server Documentation**

**Retail Pulse Image Processing Service - Server**

---

#### **Description**

This project is a Node.js-based microservice designed to process images collected from stores. It handles job submissions for image processing, calculates image dimensions, and provides job status updates via REST APIs. The project is containerized using Docker for ease of deployment and scalability.

---

#### **Features**

1. **Submit Job API**: Accepts job requests with image URLs and store IDs.
2. **Job Status API**: Provides real-time updates on job status.
3. **List Jobs API**: Retrieves all submitted jobs with their current statuses.
4. **Dockerized Setup**: Easily deployable with Docker and Docker Compose.
5. **Works Without Docker**: Can be run locally using `npm`.
6. **Extensible Design**: Modular structure for adding more features.

---

#### **Technologies Used**

- **Node.js**: Backend framework.
- **Express.js**: API framework.
- **MongoDB**: To store processed data.
- **RabbitMQ**: For asynchronous operations.
- **Socket.IO**: For real-time image processing feedback.
- **Axios**: HTTP client for downloading images.
- **Sharp**: For image processing.
- **Winston**: For development and production logs in different transports.
- **Docker**: Containerization.
- **Nodemon**: For development hot-reloading.
- **dotenv**: For managing environment variables.
- **csv-parser**: To parse CSV file data to JSON.
- **express-rate-limit**: Middleware to control the rate of incoming API requests and prevent abuse or overloading of the server.

---

#### **APIs**

1. **Submit Job API**

   - **Endpoint**: `/api/submit`
   - **Method**: `POST`
   - **Description**: Submits a new image processing job.
   - **Request Body**:
     ```json
     {
       "count": 2,
       "visits": [
         {
           "store_id": "S00339218",
           "image_url": [
             "https://www.gstatic.com/webp/gallery/2.jpg",
             "https://www.gstatic.com/webp/gallery/3.jpg"
           ],
           "visit_time": "time of store visit"
         },
         {
           "store_id": "S01408764",
           "image_url": ["https://www.gstatic.com/webp/gallery/3.jpg"],
           "visit_time": "time of store visit"
         }
       ]
     }
     ```
   - **Response**:
     ```json
     {
       "status": "success",
       "message": "Job submitted",
       "data": { "jobId" },
       "error": {}
     }
     ```

2. **Job Status API**

   - **Endpoint**: `/api/status`
   - **Method**: `GET`
   - **Description**: Fetches the status of a specific job.
   - **Query Parameters**:
     - `jobId`: The ID of the job to fetch the status for.
   - **Response**:
     ```json
     {
       "status": "success",
       "message": "Job found",
       "data": { "job" },
       "error": {}
     }
     ```

3. **List Jobs API**

   - **Endpoint**: `/api/jobs`
   - **Method**: `GET`
   - **Description**: Retrieves all submitted jobs with their statuses.
   - **Response**:
     ```json
     {
       "status": "success",
       "message": "Jobs found",
       "data": { "jobs" },
       "error": {}
     }
     ```

---

#### **Assumptions**

1. Each `storeId` has its corresponding `storeName` and `areaCode`.
2. The random sleep time (0.1–0.4 seconds) imitates GPU processing.
3. The system is designed to handle concurrent jobs efficiently.

---

#### **Installation Instructions**

##### **Without Docker**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/imkhateeb/retail-pulse.git
   cd retail-pulse/server
   ```
2. **Spin up RabbitMQ Server**:
   ```bash
   docker run -d --name rabbitmq-server -p 5672:5672 -p 15672:15672 rabbitmq:management
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Set Environment Variables**:
   ```bash
   PORT=3000
   MONGO_CONNECTION_STRING=<Your-MongoDB-Connection-string>
   NODE_ENV=development
   ```
5. **Run the Application**:
   ```bash
   npm run dev
   ```
6. **Test the API**:
   - **URL**: `http://localhost:3000/api/test`
   - **Method**: `GET`

##### **With Docker**

1. **Build the Docker Image**:
   ```bash
   docker build -t retail-pulse .
   ```
2. **Spin up RabbitMQ**:
   ```bash
   docker run -d --name rabbitmq-server -p 5672:5672 -p 15672:15672 rabbitmq:management
   ```
3. **Set Environment Variables**:
   ```bash
   PORT=3000
   MONGO_CONNECTION_STRING=<Your-MongoDB-Connection-string>
   NODE_ENV=development
   ```
4. **Run the Docker Container**:
   ```bash
   docker run -p 3000:3000 retail-pulse
   ```

##### **With Docker Compose**

1. **Set Environment Variables**:
   ```bash
   PORT=3000
   MONGO_CONNECTION_STRING=<Your-MongoDB-Connection-string>
   NODE_ENV=development
   ```
2. **Start Services**:
   ```bash
   docker-compose up --build
   ```

---

#### **Testing Instructions**

1. Use Postman or `curl` to test the `/api/test` endpoint:
   ```bash
   curl http://localhost:3000/api/test
   ```
   Expected Response:
   ```json
   {
     "status": "success",
     "message": "Setup works perfectly!",
     "data": {},
     "error": {}
   }
   ```

---

#### **Work Environment**

- **OS**: Windows 11
- **Editor**: VSCode
- **Node.js Version**: 18.x
- **Docker Version**: 24.x
- **Libraries**:
  - Express.js 4.x
  - Axios 1.x
  - Sharp 0.33.x
  - Winston 3.x
  - socket.io 4.x
  - mongoose 8.x
  - amqplib 0.10.x
  - express-rate-limit 7.x

---

#### **Improvements for the Future**

1. **Retry Mechanism**: Retry image downloads on failure before marking the job as failed.
2. **Notifications**: Integrate notifications to inform users when a job is completed.
3. **Cache Results**: Cache results in Redis for faster retrieval.
4. **Better UI/UX**: Improve the current UI/UX, which was developed in a hurry.
5. **Schema Validation**: Integrate `zod` for schema validation.
6. **Unit Testing**: Integrate `Jest` for module and system testing.
