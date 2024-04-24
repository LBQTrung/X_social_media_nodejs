<p align="center">
  <br>
  <img src="https://github.com/LBQTrung/X_social_media_nodejs/blob/main/img_for_readme/cover.png?raw=true"/>
  <br/>
</p>

<p align="center">
  <a href="https://www.facebook.com/lebaquoctrung39/">
    <img src="https://img.shields.io/badge/Facebook-1877F2?logo=facebook&logoColor=white">
  </a>
  <a href="https://www.instagram.com/quoctrung.39/">
    <img src="https://img.shields.io/badge/Instagram-FED9ED?logo=instagram&logoColor=white">
  </a>
</p>

# Social Media Feature Clone Project

This project aims to replicate several key features of the popular social media platform X. Currently, it includes functionalities such as login, register, logout, verify-email, forgot-password, and follow. The project is built using TypeScript, Node.js, and MongoDB.

## Features (Currently, Update soon)

- **Login:** Users can securely log into their accounts using their credentials.
- **Register:** New users can create accounts by providing necessary information.
- **Logout:** Users can securely log out of their accounts to end their session.
- **Verify Email:** Email verification functionality ensures the authenticity of user accounts.
- **Forgot Password:** Users can reset their passwords in case they forget them.
- **Follow:** Users can follow other users to stay updated with their activities.

## Technologies Used

- **TypeScript:** A superset of JavaScript that adds static typing to the language, enhancing code quality and maintainability.
- **Node.js:** A JavaScript runtime environment that allows the execution of JavaScript code outside of a web browser.
- **MongoDB:** A NoSQL database that provides scalability, flexibility, and performance for handling large volumes of data.

## Setup Instructions

1. **Clone the Repository:** 
   ```bash
   https://github.com/LBQTrung/X_social_media_nodejs.git
   ```
2. **Install Dependencies**
   ```bash
   cd X_social_media_nodejs
   npm install
   ```
3. **Set up Environment Variables**
   - Create a  '.env' file in the root directory of the project
   - Copy and paste the following variable into '.env' file:
    ```bash
   PORT=4000
   HOST='your_production_host'
   DB_USERNAME='your_username_of_database'
   DB_PASSWORD='your_password_of_database'
   DB_NAME='your_database_name'
   DB_USERS_COLLECTION='users'
   DB_REFRESH_TOKENS_COLLECTION='refresh_tokens'
   DB_FOLLOWERS_COLLECTION='followers'
   DB_TWEETS_COLLECTION='tweets'
   DB_HASHTAGS_COLLECTION='hashtags'

   PASSWORD_SECRET='your_password_secret'
   JWT_SECRET_ACCESS_TOKEN='your_jwt_secret_access_token'
   JWT_SECRET_REFRESH_TOKEN='your_jwt_secret_refresh_token'
   JWT_SECRET_EMAIL_VERIFY_TOKEN='your_jwt_email_verify_token'
   JWT_SECRET_FORGOT_PASSWORD_TOKEN='your_jwt_secret_forgot_password_token'
   ACCESS_TOKEN_EXPIRES_IN='15m'
   REFRESH_TOKEN_EXPIRES_IN='100d'
   EMAIL_VERIFY_TOKEN_EXPIRES_IN='7d'
   FORGOT_PASSWORD_TOKEN_EXPIRES_IN='7d'

   GOOGLE_CLIENT_ID='your_google_client_id'
   GOOGLE_CLIENT_SECRET='your_google_client_secret'
   GOOGLE_REDIRECT_URI='http://localhost:4000/user/oauth/google'
   CLIENT_REDIRECT_CALLBACK='your_client_redirect_callback'
   ```

4. **Start the Server (For developemnt environment)**
   ```bash
   npm run dev
   ```

## Notes
- This is a basic clone, and more features can be developed
- You need to configure MongoDB before running the application
- This project is a non-commercial educational endeavor aimed at replicating select features from the social media platform Twitter. It follows an API-first approach and is intended solely for learning purposes.
- Developers are encouraged to test the project's APIs using Postman or similar tools to ensure system stability and functionality.

## Contributing
If you encounter any issues during testing with Postman or need additional assistance, please contact us via [lebaquoctrung@gmail.com] or open an issue in the repository.
Thank you for your interest in this project!


