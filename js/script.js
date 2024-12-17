
/*  toggle switch  */
const themeToggle = document.getElementById("theme-toggle");
const portfolioImage = document.getElementById('portfolio-image');
const isHomePage = document.querySelector('.navbar a.active').getAttribute('href') === 'home.html';
// Disable transitions initially to prevent flickering when reloading the page
document.documentElement.classList.add("no-transition");

// Apply the theme preference immediately on page load
if (localStorage.getItem("theme") === "light") {
  document.documentElement.classList.add("light-mode");
  themeToggle.checked = true;
  if (isHomePage) {
    portfolioImage.src = "images/portfolio-white.jpg";
  }
} else {
  document.documentElement.classList.remove("light-mode");
  themeToggle.checked = false;
  if (isHomePage) {
  portfolioImage.src = "images/portfolio.jpg";
  }
}

// Re-enable transitions after the theme has been applied
window.addEventListener('load', () => {
  document.documentElement.classList.remove("no-transition");
});

// Toggle theme when the switch is clicked
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.documentElement.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    if (isHomePage) {
        portfolioImage.src = "images/portfolio-white.jpg";
      }
  } else {
    document.documentElement.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
    if (isHomePage) {
    portfolioImage.src = "images/portfolio.jpg";
    }
  }
});


/*  CV button*/

// Check if the current page is "home" and the button exists
if (window.location.pathname.includes("index") && document.getElementById("download-btn")) {
  document.getElementById("download-btn").addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = "files/cv.pdf"; 
      link.download = "cv.pdf"; 
      document.body.appendChild(link); 
      link.click();
      document.body.removeChild(link); 
  });
}


/*==============================Menu Button for Media Query==================================*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let main = document.querySelector('main');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  if (main) {
    let top = window.scrollY;
    let offset = main.offsetTop - 150;
    let height = main.offsetHeight;
    let id = main.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
      });
      
      // Check if the element exists before adding the class
      let activeLink = document.querySelector(`header nav a[href*='${id}']`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }
};
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}
  
/*==============================End Menu Button for Media Query===============================*/

/*==============================Skills===============================*/
if (window.location.pathname.includes("skills")) {
  const slider = document.querySelector('.image-slider');
  const images = document.querySelectorAll('.image-slider img');
  
  slider.addEventListener('mouseover', () => {
     images.forEach(img => img.style.animationPlayState = 'paused');
    });
  
   slider.addEventListener('mouseout', () => {
      images.forEach(img => img.style.animationPlayState = 'running');
      });
// copy of the html images for the slider animation 
var copy = document.querySelector('.image-track').cloneNode(true);
document.querySelector(".image-slider").appendChild(copy);
  }
/*==============================End Skills===============================*/

/*==============================Projects===============================*/

if (window.location.pathname.includes("projects")) {
const projects = document.querySelectorAll('.current-project');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

// Function to display the active project
function showProject(index) {
  projects.forEach((project, i) => {
    project.classList.remove('active');
    if (i === index) {
      project.classList.add('active');
    }
  });
}

// Initialize by showing the first project
showProject(currentIndex);

// Event listener for the 'Next' button
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % projects.length;
  showProject(currentIndex);
});

// Event listener for the 'Previous' button
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  showProject(currentIndex);
});

}

/*==============================End Projects===============================*/


/*==============================Quiz===============================*/


function submitQuiz() {
  const answers = {
      q1: ["Brazil", "Germany"],
      q2: ["Cristiano Ronaldo", "Lionel Messi"],
      q3: ["Real Madrid", "Barcelona", "Liverpool"],
      q4: ["Brazil", "Italy", "Mexico"],
      q5: ["Cristiano Ronaldo", "Samuel Eto'o"],
      q6: ["Inter Milan & AC Milan", "Manchester United & Manchester City", "Atletico Madrid & Real Madrid"],
      q7: ["Mohamed Salah", "Didier Drogba", "Sadio Mané"],
      q8: ["Egypt", "Cameroon"],
      q9: ["Cristiano Ronaldo", "Pelé", "Lionel Messi"],
      q10: ["Spain", "Germany", "France"],
      q11: ["Manchester City", "Chelsea", "Arsenal"],
      q12: ["Japan", "Saudi Arabia", "Iran"],
      q13: ["Luka Modrić", "Lionel Messi", "Zinedine Zidane"],
      q14: ["Juventus", "Inter Milan", "Napoli"],
      q15: ["Brazil", "Argentina", "Spain"]
  };

  const form = document.getElementById("quizForm");
  const resultDiv = document.getElementById("result");
  const progressContainer = document.querySelector(".progress-container");
  const circleProgress = document.querySelector(".circle-progress");
  const progressValue = document.querySelector(".progress-value");

  resultDiv.innerHTML = ""; // Clear previous results
  progressContainer.style.display = "flex";

  let correctCount = 0;

  for (let key in answers) {
    const selected = Array.from(form.elements[key])
                          .filter(input => input.checked)
                          .map(input => input.value);

    const correctAnswers = answers[key];

    // Check if the selected answers match the correct answers
    const isCorrect = arraysEqual(selected, correctAnswers);

    if (isCorrect) {
      correctCount++;
    }
  }

  let score = (correctCount / Object.keys(answers).length) * 100;

  // Animate the progress bar
  let progress = 0;
  const speed = 20; // Animation speed

  const progressInterval = setInterval(() => {
    if (progress >= score) {
      clearInterval(progressInterval);
      showResults(answers, form, resultDiv);
    } else {
      progress++;
      progressValue.textContent = `${progress}%`;
      circleProgress.style.background = `conic-gradient(#4caf50 ${progress * 3.6}deg, #e0e0e0 0deg)`;
    }
  }, speed);
}

function showResults(answers, form, resultDiv) {
  let correctCount = 0;

  for (let key in answers) {
    const selected = Array.from(form.elements[key])
                          .filter(input => input.checked)
                          .map(input => input.value);

    const correctAnswers = answers[key];

    if (arraysEqual(selected, correctAnswers)) {
      resultDiv.innerHTML += `<p style="color: green; text-align:left;">Question ${key.slice(1)}: Correct</p>`;
      correctCount++;
    } else {
      resultDiv.innerHTML += `<p style="color: red; text-align:left;">Question ${key.slice(1)}: Incorrect - Correct Answers: ${correctAnswers.join(", ")}</p>`;
    }
  }

  resultDiv.innerHTML += `<h3>You got ${correctCount} out of ${Object.keys(answers).length} correct!</h3>`;
}

// Function to check if two arrays are equal 
function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every(value => arr2.includes(value));
}

// Reset the quiz and hide the progress bar
function resetQuiz() {
  document.getElementById("result").innerHTML = "";
  document.querySelector(".progress-container").style.display = "none";
}



  
/*============================== End Quiz===============================*/

/*============================== Contact===============================*/

if (window.location.pathname.includes("contact")) {
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('confirmation-modal').style.display = 'flex';
});

document.getElementById('confirm-yes').addEventListener('click', function (event) {
  event.preventDefault();
  sendMail();
  document.getElementById('confirmation-modal').style.display = 'none';
});

document.getElementById('confirm-no').addEventListener('click', function () {
  document.getElementById('confirmation-modal').style.display = 'none';
});

function sendMail() {
  let parms = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };

  emailjs.send("service_evzgarf", "template_6hy9mj9", parms)
    .then(() => {
      showNotification("Email Sent Successfully!!");

      // Reload the page after a delay (e.g., 3 seconds) to allow the notification to be seen
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .catch(err => console.error("Error:", err));
}


function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';

  // Hide the notification after 3 seconds
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

}

/*==============================End Contact===============================*/
