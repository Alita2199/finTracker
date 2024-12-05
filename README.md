

# Finance Tracker Web Application 📊💰

## Overview  
The **Finance Tracker Web Application** is designed to empower users to manage their finances efficiently. With this application, users can track income, expenses, and savings, while enjoying a user-friendly interface to view, add, and manage transactions. Additionally, users can set and monitor savings goals to stay on top of their financial health.

---

## Tech Stack 🛠️  

| **Category**        | **Technology**                                                      |
|----------------------|--------------------------------------------------------------------|
| **Frontend**         | [Next.js](https://nextjs.org/) - React-based framework for SSR apps |
| **Language**         | [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript   |
| **Database**         | [MongoDB](https://www.mongodb.com/) - NoSQL flexible database      |
| **Authentication**   | [NextAuth](https://next-auth.js.org/) - OAuth & JWT authentication |

---

## Features 🚀  
- **User Authentication**: Secure login and registration using NextAuth.  
- **Dashboard**: Overview of financial data including income, expenses, and savings.  
- **Transactions Management**: Add, view, edit, and delete income and expense records.  
- **Savings Goals**: Set and track savings targets.  
- **Data Visualization**: Graphs and charts for analyzing financial trends.  
- **Responsive Design**: Optimized for both desktop and mobile devices.  

---

## Installation and Running Locally ⚙️  

### Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (v14 or later)  
- [MongoDB](https://www.mongodb.com/try/download/community) (local or cloud instance)  
- [Git](https://git-scm.com/) (optional, for cloning the repository)  

---

### Steps to Run the Project Locally  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/finance-tracker.git
   cd finance-tracker
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env.local` file in the root directory and add the following:  
   ```env
   NEXT_PUBLIC_BASE_API_URL=https://your-api-url.com (this is the backend url).
   NEXTAUTH_SECRET=your-nextauth-secret
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/FinanceTracker?retryWrites=true&w=majority
   ```

4. **Configure CORS Origins**  
   Update your backend or middleware to allow your frontend's origin:  
   ```javascript
   res.headers.set("Access-Control-Allow-Origin", "https://your-frontend-domain.com");
   res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
   res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
   ```  
   Replace `"https://your-frontend-domain.com"` with your actual frontend URL.

5. **Run the Development Server**  
   ```bash
   npm run dev
   ```  
   Open your browser at [http://localhost:3000](http://localhost:3000).

---

## Deployment 🚀  
The application is deployed at:  
**[https://fin-tracker-smoky.vercel.app](https://fin-tracker-smoky.vercel.app)**  

### Important for Deployment  
Ensure the backend allows CORS requests from your deployed frontend by updating the headers:  
```javascript
res.headers.set("Access-Control-Allow-Origin", "https://fin-tracker-smoky.vercel.app");
```

---

## Documentation & Code Comments 📚  

### Folder Structure  
- **`pages/`**: Contains route pages and their associated logic.  
- **`components/`**: Reusable UI components.  
- **`models/`**: Mongoose schemas for MongoDB collections.  
- **`utils/`**: Helper functions and utilities.  
- **`middleware/`**: Authentication and CORS middleware.  

### Code Comments  
The codebase is thoroughly commented to explain key sections and logic, ensuring ease of understanding and maintainability.

---

## License 📝  
This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more details.

---


