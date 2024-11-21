# Recipe Radar Application

Recipe Radar is a simple web application where users can search for recipes by ingredient or dish. It includes user authentication features (signup, login) and a dashboard to search and view recipe details using the Spoonacular API.

---

## Features

1. **User Authentication**  
   - **Signup**: Users can create an account by providing their first name, last name, email, and password.
   - **Login**: Registered users can log in to access the dashboard.
   - Passwords are securely hashed before storing in the database.

2. **Recipe Search**  
   - Users can search for recipes by entering ingredients or a dish name.
   - The search functionality integrates with the Spoonacular API to fetch real-time recipes.

3. **Recipe Details**  
   - Clicking on a recipe displays detailed information in a modal, including ingredients and instructions.

---

## Tech Stack

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript**
- **Bootstrap 5**

### Backend
- **Node.js**
- **Express.js**

### Database
- **MySQL**

### APIs
- **Spoonacular API** (for recipe data)

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MySQL** (Running instance)
- **npm** (Node Package Manager)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repository/recipe-radar.git
   cd recipe-radar
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup the Database**
   - Start your MySQL server.
   - Create the `Recipe_Radar` database:
     ```sql
     CREATE DATABASE Recipe_Radar;

     USE Recipe_Radar;

     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         first_name VARCHAR(50) NOT NULL,
         last_name VARCHAR(50) NOT NULL,
         email VARCHAR(100) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

4. **Configure Environment Variables**
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=Recipe_Radar
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```

   Replace `your_password` and `your_spoonacular_api_key` with your actual database password and Spoonacular API key.

5. **Start the Server**
   ```bash
   node server.js
   ```

6. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## API Integration

The app fetches recipe data using the **Spoonacular API**. To obtain an API key:
1. Visit [Spoonacular](https://spoonacular.com/food-api) and sign up.
2. Generate an API key in your account dashboard.
3. Add the key to your `.env` file.

Example API request:
```javascript
const axios = require('axios');

const apiKey = process.env.SPOONACULAR_API_KEY;
const searchQuery = "chicken";

axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${apiKey}`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## Folder Structure

```
recipe-radar/
│
├── public/
│   ├── index.html          # Homepage
│   ├── signup.html         # Signup page
│   ├── login.html          # Login page
│   ├── dashboard.html      # Dashboard page
│   ├── style.css           # Styling
│
├── server.js               # Node.js server file
├── app.js                  # JavaScript for frontend logic
├── auth.js                 # JavaScript for authentication logic
├── package.json            # Node.js dependencies
├── .env                    # Environment variables
└── README.md               # Project documentation
```

---

## Usage Instructions

1. **Signup**: 
   - Navigate to `/signup.html` and create an account.
   - Enter your first name, last name, email, and password.
   - Submit the form to register.

2. **Login**: 
   - Navigate to `/login.html`.
   - Enter your email and password to log in.

3. **Dashboard**:
   - Once logged in, search for recipes by typing ingredients or dish names in the search bar.
   - Click the search button to fetch results.
   - Click on a recipe to view details in a modal.

---

## Future Enhancements

- Add user profile management.
- Enable saving and sharing recipes.
- Improve search filters for dietary preferences and meal types.
- Add analytics to track popular searches.

---

## Troubleshooting

1. **Cannot Connect to MySQL**  
   - Verify your MySQL credentials in the `.env` file.
   - Ensure the `Recipe_Radar` database exists.

2. **API Issues**  
   - Ensure the Spoonacular API key in your `.env` file is valid.
   - Check your API usage quota on the Spoonacular dashboard.

3. **Port Already in Use**  
   - Change the `PORT` value in your `.env` file to an available port.

---

## License
This project is licensed under the MIT License. See `LICENSE` for more details.

---

Feel free to reach out if you have any questions or issues with the setup! 🎉

Connection of the server.js is fine but fetching data from spoonacular api and form registration coneection to the dashboard is not responding