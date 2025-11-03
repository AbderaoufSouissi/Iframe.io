# 🪄 Image Background Remover

> **AI-powered web application** that automatically removes image backgrounds using deep learning–based segmentation.  
> Built with **React** (frontend) and **Spring Boot** (backend) for a full-stack, containerized architecture.

---

## 🚀 Features

- 🧠 **AI Background Removal** – Automatically removes the background from images.
- ⚛️ **Modern Frontend** – Built with **React**, offering a smooth and intuitive user interface.
- ☕ **Robust Backend** – Powered by **Spring Boot**, handling image processing and API management.
- 🐳 **Dockerized Setup** – Easily run both services via Docker Compose.
- 📤 **Upload / Preview / Download** – Drag-and-drop image upload with live preview and processed image download.

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

## ⚙️ Tech Stack

**Frontend:**  
- React  
- Axios  
- TailwindCSS (or other CSS framework of your choice)  

**Backend:**  
- Spring Boot  
- Spring Web  
- Spring DevTools  
- (Optional) AI/ML model integration for segmentation  

**DevOps:**  
- Docker / Docker Compose  
- Maven  
- Git & GitHub  

---

## 🧠 How It Works

    1. User uploads an image via the React interface.  
    2. The frontend sends the image to the Spring Boot API.  
    3. The backend processes the image using an AI segmentation model or image library.  
    4. The processed image (without background) is returned and displayed for preview/download.

---

## 🧪 Running Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AbderaoufSouissi/Image-Background-Remover.git
cd Image-Background-Remover
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

