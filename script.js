// script.js
document.addEventListener('DOMContentLoaded', function() {

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
  document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  icon.className = document.body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Enhanced Contact Form
document.getElementById('contactForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  const feedback = document.createElement('div');
  feedback.className = 'form-feedback';
  
  submitButton.disabled = true;
  submitButton.appendChild(spinner);
  spinner.style.display = 'inline-block';
  
  try {
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      feedback.textContent = `Thank you, ${formData.name}, for contacting us!`;
      feedback.classList.add('success');
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    feedback.textContent = 'Oops! There was a problem submitting your form.';
    feedback.classList.add('error');
  } finally {
    submitButton.disabled = false;
    spinner.remove();
    form.appendChild(feedback);
    feedback.style.display = 'block';
    
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 5000);
  }
});
});