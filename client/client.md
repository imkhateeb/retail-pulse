### **Retail Pulse Image Processing Service - Client**

---

#### **Description**

This project is designed to simulate and test the Node.js Retail Pulse Image Processing Service APIs.

---

#### **Features**

1. **Submit Job**: Users can submit a job using a user-friendly form.
2. **Job Status**: Users can check the status of their job anytime after submission.
3. **List Jobs**: Users can retrieve all submitted jobs along with their current statuses.

---

#### **Prerequisites**

To seamlessly observe how everything works, set up the server. Installation instructions are available [here](https://github.com/imkhateeb/retail-pulse/blob/master/server/server.md).

---

#### **Technologies Used**

- **Vite**: The build tool.
- **React.js**: For building the frontend.
- **TailwindCSS**: For styling components.
- **socket.io-client**: To create a socket client.
- **Axios**: HTTP client for downloading images.
- **react-router-dom**: For seamless routing in the React SPA.

---

#### **Pages**

1. **Home Page** - `/`
2. **Job Submission Page** - `/jobs/submit`
3. **List of All Jobs Page** - `/jobs`
4. **Find a Job Page** - `/jobs/find`

---

#### **Assumptions**

1. Each `storeId` corresponds to a `storeName` and an `areaCode`.

---

#### **Installation Instructions**

##### **Without Docker**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/imkhateeb/retail-pulse.git
   cd retail-pulse/client
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Application**:
   ```bash
   npm run dev
   ```

---

#### **Work Environment**

- **OS**: Windows 11
- **Editor**: VSCode
- **Node.js Version**: 18.x
- **React.js**: 18.x
- **TailwindCSS**: 3.x
- **Libraries**:
  - `react-hot-toast` 2.x
  - `react-loader-spinner` 6.x
  - `react-router-dom` 7.x
  - `socket.io-client` 4.x

---

#### **Improvements for the Future**

1. **Better UI/UX**: Enhance the current UI/UX, which was developed quickly.
2. **Authentication**: Add user authentication to manage jobs seamlessly.
