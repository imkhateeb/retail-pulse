### **NodeJs Server Documentation**

**Retail Pulse Image Processing Service**

---

#### **Description**

This project is a Node.js-based microservice designed to process images collected from stores. It handles job submissions for image processing, calculates image dimensions, and provides job status updates via REST APIs. The project is containerized using Docker for ease of deployment and scalability.

---

#### **Features**

1. **Submit Job API**: Accepts job requests with image URLs and store IDs.
2. **Job Status API**: Provides real-time updates on the job status.
3. **Dockerized Setup**: Easily deployable with Docker and Docker Compose.
4. **Works Without Docker**: Can be run locally using `npm`.
5. **Extensible Design**: Modular structure for adding more features.

---

#### **Technologies Used**

- **Node.js**: Backend framework.
- **Express.js**: API framework.
- **MongoDB**: To store processed data.
- **RabbitMQ**: For asynchronous operation.
- **Socket.Io**: For real-time image processing feedback.
- **Axios**: HTTP client for downloading images.
- **Sharp**: For image processing.
- **Docker**: Containerization.
- **Nodemon**: For development hot-reloading.
- **dotenv**: For managing environment variables.

---

#### **Assumptions**

1. Each job contains valid `store_id` and `image_url`.
2. The random sleep time (0.1–0.4 seconds) imitates GPU processing.
3. The system is designed to handle concurrent jobs efficiently.

---

#### **Installation Instructions**

##### **Without Docker**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd retail-pulse/server
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Application**:
   ```bash
   npm run dev
   ```
4. **Test the API**:
   - **URL**: `http://localhost:3000/api/test`
   - **Method**: `GET`

##### **With Docker**

1. **Build the Docker Image**:
   ```bash
   docker build -t retail-pulse .
   ```
2. **Run the Docker Container**:
   ```bash
   docker run -p 3000:3000 retail-pulse
   ```
3. **Alternatively, Use Docker Compose**:
   ```bash
   docker-compose up --build
   ```

---

#### **Testing Instructions**

1. Use Postman or curl to test the `/api/test` endpoint:
   ```bash
   curl http://localhost:3000/api/test
   ```
   Expected Response:
   ```json
   { "message": "Setup works perfectly!" }
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
  - Sharp 0.32.x

---

#### **Improvements for the Future**

1. **Retry Mechanism**: Retry image downloads on failure before marking the job as failed.
2. **Notifications**: Integrate notifications to notify users when the job completes.
3. **Cache Results**: Cache results in Redis for faster retrieval.
4. **Better UI/UX**: Current UI/UX is built in much hurry and it has a lot's of improvement needed.
