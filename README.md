# MyKahoot

MyKahoot is a dynamic and interactive quiz platform built using ASP.NET Core Web API for the backend, MSSQL with Entity Framework Core for data management, and Angular for the frontend. The application supports multiple roles (teacher and student) and provides a range of features to enhance the quiz experience, including multimedia support, statistics tracking, user authentication, and much more.

## Features

### General Features
- **User Authentication**: Secure login and registration with hashed passwords.
- **Profile Management**: Edit profile information.
- **Dark/Light Mode**: Toggle between dark and light themes.
- **Multilingual Support**: Available in English, Russian, and Azerbaijani.
- **Search Functionality**: Easily search for quizzes and categories.
- **Feedback System**: Send feedback to the website administrator.
- **Gamification**: Earn levels and badges, use them to access VIP quizzes and other features.
- **Account Management**: Freeze or delete your account, with options to hide statistics or keep created quizzes available.

### Teacher Role
- **Create Quizzes**: Develop quizzes with plain text or multimedia (audio, video, photos).
- **Update/Delete Quizzes**: Manage your created quizzes.
- **Category Management**: Create new categories or use existing ones.
- **Statistics**: View top-10 results for a particular quiz and overall top leaderboard.
- **Messaging**: Receive and answer messages from students.
- **Feedback Management**: Receive feedback from students.

### Student Role
- **Take Quizzes**: Participate in quizzes created by teachers.
- **Statistics**: View your own stats for a particular quiz.
- **Interact**: Like, dislike, and comment on quizzes.
- **Messaging**: Send messages to quiz creators.
- **Download Quizzes**: Download quizzes for offline access.

### Admin Panel
- **User Management**: Ban users, delete accounts, and send messages.
- **Content Moderation**: Ban inappropriate quizzes and comments.
- **Notifications**: Send notifications via email.
- **Comprehensive Control**: Access a variety of administrative functions to maintain and improve the platform.

### Additional Features
- **Quiz Participation**: Pass quizzes online.
- **Comments**: Leave comments on quizzes and view the count of likes, dislikes, and comments.
- **Password Reset**: Securely reset your password.
- **Remember Me**: Stay logged in with the remember me feature.
- **Random Login Generator**: Generate a random login during registration if needed.
- **View and Manage Quizzes**: See your own created quizzes, update or delete them.
- **Send Messages**: Communicate with quiz creators and receive replies.
- **Multiple Categories**: Create quizzes in existing categories or create your own.
- **Built-in Categories**: Explore the four built-in categories and their quizzes.
- **Freeze Account**: Freeze your account to hide your stats while keeping your quizzes available.

**Note:** This is not an exhaustive list of features. MyKahoot includes many more functionalities to explore and enjoy.

## Installation

### Prerequisites
- .NET Core SDK
- MSSQL Server
- Node.js and Angular CLI

### Backend (ASP.NET Core)
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MyKahoot.git
   cd MyKahoot/Backend
   ```
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Update the database:
   ```bash
   dotnet ef database update
   ```
4. Run the application:
   ```bash
   dotnet run
   ```

### Frontend (Angular)
1. Navigate to the frontend directory:
   ```bash
   cd ../Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   ng serve
   ```

## Usage
1. Open your browser and navigate to `http://localhost:4200`.
2. Register as a new user and login.
3. Explore the features based on your role (teacher or student).
 
Enjoy creating and participating in quizzes with MyKahoot!
