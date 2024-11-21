g

const signupForm = document.getElementById('LoginForm');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (response.ok) {
      alert('Signup successful! Redirecting to login page...');
      window.location.href = '/login.html';
    } else {
      const data = await response.json();
      alert(data.message || 'Error during signup.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});


const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token); // Save token
      alert('Login successful! Redirecting to dashboard...');
      window.location.href = '/dashboard.html';
    } else {
      const data = await response.json();
      alert(data.message || 'Invalid credentials.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});
