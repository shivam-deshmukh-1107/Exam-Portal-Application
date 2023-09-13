# **Exam Portal Application**

The Exam Portal Application is a web-based platform built with Angular, Spring Boot, and PostgreSQL, designed for managing and taking quizzes. It includes two main parts: Admin and User, with role-based access control and authentication.

**Application Live Url:** https://astonishing-flan-9eee3b.netlify.app/

## Features
### Admin:
- **Category Management:** Admins can add, edit, and delete different categories, such as Programming Quizzes, Quantitative Quizzes, Verbal Quizzes, General Knowledge Quizzes, etc.
- **Quiz Management:** Admins can create quizzes within categories. Each quiz stores multiple questions, but only a specified number of questions are randomly displayed based on the total marks and number of questions input for the quiz.
- **Question Management:** Admins can add, update, and delete questions associated with quizzes.

### User:
- **Category Navigation:** Users can explore different categories of quizzes and select any active quiz to attempt.
- **Quiz Attempt:** After selecting a quiz, users are presented with an instruction page followed by the quiz. The quiz page is divided into two parts: the question display and a timer. The timer is calculated based on the number of questions and total marks for that quiz.
- **Automatic Submission:** Quizzes are automatically submitted when the timer expires.
- **Role-Based Dashboard:** Users are presented with either the Admin Dashboard or User Dashboard based on their authentication roles. Unauthorized users cannot access these dashboards or any associated content.
- **User Entity Diagram**
![user_entity_diagram](https://github.com/shivam-deshmukh-1107/Examportal-Backend-Server/assets/143519202/2a540952-5d61-474f-89f4-cd9d92a6298d)
- **Quiz Entity Diagram**
![Quiz_entity_diagram](https://github.com/shivam-deshmukh-1107/Examportal-Backend-Server/assets/143519202/d98f7847-3bb7-466e-8b14-8a91adbf87ce)

## Technologies Used
- **Frontend:** Angular, Angular Material, Bootstrap, Bootstrap Grid CSS, jQuery, ngx-ui-loader, SweetAlert2, TypeScript
- **Backend:** Spring Boot, JSON Web Tokens (JWT), Spring Security
- **Database:** PostgreSQL

## Prerequisites
>Before running the application, make sure you have the following installed:
- **IDE:** IntelliJ IDEA
- **Frontend IDE:** Visual Studio Code
- **Database Management Tool:** PgAdmin 4

## Deployment
The backend application is deployed on _Render_, which includes the associated database in PostgreSQL. The frontend Angular part is deployed using _Netlify_.
>Please note that the free-tier deployments may result in slower loading times, but the application is fully functional.

## Access the Application
You can access the deployed application at the following URL: [ExamPortal](https://astonishing-flan-9eee3b.netlify.app/)
>New users can register on the signup page and once registered, they can log in and attempt quizzes.

## Usage
- Access the Admin Dashboard by logging in as an admin user.
- Access the User Dashboard by logging in as a regular user.
- Follow the on-screen instructions to manage categories, quizzes, and questions (Admin) or take quizzes (User).

## License
This project is licensed under the MIT License.

## Contact
If you have any questions or issues, please feel free to contact shivamsdeshmukh1107@gmail.com.




