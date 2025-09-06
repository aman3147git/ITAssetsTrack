# 💻 IT Asset Tracking System (AssetFlow)

A full-stack **MERN application** for managing **IT asset requests and approvals**, inspired by **ServiceNow’s Service Catalog & Request Management**.  
Employees can raise requests for IT assets (laptops, keyboards, mobiles, etc.), while managers can approve or reject them based on business needs.  
---

## 🚀 Features

- **User Authentication & Authorization** (JWT + Cookies)  
- **Role-based Access** (Employee / Manager) → similar to **ServiceNow ACLs**  
- **Asset Request Workflow**  
  - Employee submits request with justification & needed-by date  
  - Manager approves or rejects requests  
  - Request status is updated in real-time  
- **Request History & Audit Trails** → ServiceNow-style tracking  
- **Redux State Management** for consistent UI/UX  
- **Responsive UI** built with React & TailwindCSS  

---

## 🛠️ Tech Stack

**Frontend:** React, Redux Toolkit, TailwindCSS  
**Backend:** Node.js, Express.js, JWT Authentication  
**Database:** MongoDB (Mongoose ODM)  
**Others:** Axios, Cookie-parser, CORS  

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/aman3147git/ITAssetsTrack.git
cd servicenow
-> Backend Setup
cd backend
npm install
npm start
-> Frontend Setup
cd ../frontend
npm install
npm run dev

## 🧑‍💼 User Roles

Employee: Can request assets, view status & history.
Manager: Can view pending requests, approve/reject, and track history.

## 📌 Future Enhancements

🔹 Email/Slack notifications for approvals/rejections
🔹 Admin dashboard with analytics
🔹 Multi-level approvals (like ServiceNow workflows)



