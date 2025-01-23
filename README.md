### **Retail Pulse Image Processing Service**

---

#### **Description**

The Retail Pulse Image Processing Service simulates the execution of heavy tasks using a queuing mechanism. This service processes multiple images by leveraging asynchronous task execution through queues, ensuring efficient handling of jobs one by one.

---

#### **Features**

1. **Submit Job**:  
   Users can submit a job using a user-friendly form. On the server side, jobs are pushed to a queue (RabbitMQ), and the client receives an immediate response while the jobs are processed asynchronously in the background.

2. **Job Status**:  
   Users can check the status of their job anytime after submission. Possible statuses include:

   - **ongoing**: The image is still being processed.
   - **completed**: The image processing has finished successfully.
   - **failed**: The image processing failed due to an error.

3. **List Jobs**:  
   Users can retrieve all submitted jobs along with their current statuses. The most recent jobs are displayed at the top.

4. **Real-Time Feedback**:  
   Using WebSockets, a full-duplex connection between the client and server is established. This enables real-time updates on the frontend as each image is processed, culminating in the job's final status being displayed immediately upon completion.

---

#### **Prerequisites**

To seamlessly observe how everything works, set up the server. Installation instructions are available [here](https://github.com/imkhateeb/retail-pulse/blob/master/server/server.md).

If the deployed client URL is not working, please set up the client as well. Installation instructions are available [here](https://github.com/imkhateeb/retail-pulse/blob/master/client/client.md).
