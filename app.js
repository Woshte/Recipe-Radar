

// Select elements
const searchForm = document.getElementById('searchform');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const recipeModalBody = document.getElementById('recipeModalBody');

// Spoonacular API key and base URL
const SPOONACULAR_API_KEY = 'b892a5705fb54130b73536a839f7637d'; // Replace with your Spoonacular API key
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';

// Event listener for the search form
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const query = searchInput.value.trim();

  // Validate input
  if (!query) {
    alert('Please enter an ingredient or dish name.');
    return;
  }

  // Fetch recipes from Spoonacular API
  try {
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/recipes/complexSearch?query=${encodeURIComponent(
        query
      )}&number=9&apiKey=${b892a5705fb54130b73536a839f7637d}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      displayRecipes(data.results);
    } else {
      resultsContainer.innerHTML = '<p class="text-center">No recipes found. Try a different search term.</p>';
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    alert('An error occurred while fetching recipes. Please try again later.');
  }
});

// Function to display recipes in the results container
function displayRecipes(recipes) {
  resultsContainer.innerHTML = ''; // Clear previous results

  recipes.forEach((recipe) => {
    // Create recipe card
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('col-md-4', 'mb-4');

    recipeCard.innerHTML = `
      <div class="card">
        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <button class="btn btn-primary btn-sm view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
        </div>
      </div>
    `;

    resultsContainer.appendChild(recipeCard);
  });

  // Add event listeners to "View Recipe" buttons
  const viewRecipeButtons = document.querySelectorAll('.view-recipe-btn');
  viewRecipeButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const recipeId = event.target.getAttribute('data-id');
      await fetchRecipeDetails(recipeId);
    });
  });
}

// Function to fetch and display recipe details in the modal
async function fetchRecipeDetails(recipeId) {
  try {
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/recipes/${recipeId}/information?apiKey=${b892a5705fb54130b73536a839f7637d}`
    );
    const recipe = await response.json();

    displayRecipeDetails(recipe);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    alert('An error occurred while fetching recipe details. Please try again later.');
  }
}

// Function to display recipe details in the modal
function displayRecipeDetails(recipe) {
  recipeModalBody.innerHTML = `
    <h5>${recipe.title}</h5>
    <img src="${recipe.image}" class="img-fluid mb-3" alt="${recipe.title}">
    <p><strong>Ingredients:</strong></p>
    <ul>
      ${recipe.extendedIngredients
        .map((ingredient) => `<li>${ingredient.original}</li>`)
        .join('')}
    </ul>
    <p><strong>Instructions:</strong> ${recipe.instructions || 'No instructions available.'}</p>
    <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
    <p><strong>Servings:</strong> ${recipe.servings}</p>
    <p><strong>Source:</strong> <a href="${recipe.sourceUrl}" target="_blank">${recipe.sourceName || 'Link'}</a></p>
  `;

  // Show the modal
  $('#recipeModal').modal('show');
}


const token = localStorage.getItem('token');

if (!token) {
  alert('You need to log in first!');
  window.location.href = '/login.html';
}

(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const user = await response.json();
      document.querySelector('.container').innerHTML = `<h2>Welcome, ${user.first_name}!</h2>`;
    } else {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token');
      window.location.href = '/login.html';
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please log in again.');
    window.location.href = '/login.html';
  }
})();
