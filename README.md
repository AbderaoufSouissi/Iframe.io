# 🪄 IFrame.io

> IFrame.io is a **Full Stack web application** that removes image backgrounds automatically using the ClipDrop API.  
> Built with **React** (frontend) and **Spring Boot** (backend) in a full-stack, containerized architecture.

---

## 🚀 Features

- 🧠 **Automatic Background Removal** – Remove image backgrounds in seconds using ClipDrop API.  
- ⚛️ **Modern Frontend** – Responsive React interface with live image preview and download.  
- ☕ **Secure Backend** – Spring Boot backend handling API requests, authentication, and image processing.  
- 🔐 **Authentication** – User login with **Clerk** and **JWT** for secure access.  
- 🗄️ **Metadata Storage** – Images and related data stored in **MySQL**.  
- 🐳 **Dockerized Setup** – Easily run frontend, backend, and database via Docker Compose.  

---

## 🧩 Project Structure

    image-background-remover/
    ├── backend/ # Spring Boot application
    │ ├── src/
    │ ├── pom.xml
    │ └── ...
    ├── frontend/ # React application
    │ ├── src/
    │ ├── package.json
    │ └── ...
    ├── docker-compose.yml # optional: run both apps together
    ├── .gitignore
    └── README.md


---


---

## ⚙️ Tech Stack

**Frontend:**  
- React  
- TypeScript  
- Tailwind CSS  
- Axios  

**Backend:**  
- Spring Boot  
- Spring Web  
- Spring Security  
- Clerk (Authentication)  
- ClipDrop API integration  
- MySQL  

**DevOps:**  
- Docker / Docker Compose  
- Maven / Node.js & npm  

---

## 🧠 How It Works

1. User logs in via Clerk authentication.  
2. User uploads an image through the React interface.  
3. Frontend sends the image to the Spring Boot API.  
4. Backend calls the **ClipDrop API** to remove the image background.  
5. Processed image is returned and displayed in the frontend for preview/download.  
6. Metadata and image info are stored in **MySQL**.  

---

## 🧪 Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AbderaoufSouissi/Iframe.io.git
cd Image-Background-Remover


## 🧪 Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AbderaoufSouissi/Iframe.io.git
cd Image-Background-Remover
```


## 🧪 Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AbderaoufSouissi/Iframe.io.git
cd bg-remover
```
2️⃣ Run the backend
```bash

cd backend
mvn spring-boot:run
```
Backend runs on http://localhost:8080

3️⃣ Run the frontend
```bash
cd ../frontend
npm install
npm start
```
Frontend runs on http://localhost:3000

