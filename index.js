document.addEventListener("DOMContentLoaded", () => {
  emailjs.init('3lomX-cNuTgdebxXZ')

  const projects = [
    {
      title: "Sombra del Gloton",
      image: "images/Logo.png",
      description: `Sombra del Gloton is a video game collaboratively developed by the entire class as part of the 3D section of the <strong>Postgraduate Specialization in Video Games and Virtual Reality.</strong>`,
      link: "https://github.com/MarioEspinosaFiguerez/SombraDelGloton",
    },
  ];

  const container = document.querySelector(".project-grid");
  container.innerHTML = "";

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "card project-single";

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title} logo" class="project-icon" />
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank" class="btn">View Project</a>
      </div>
    `;

    container.appendChild(card);
  });
});


// Modal logic
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openContact');
const closeBtn = document.getElementById('closeModal');
const form = document.getElementById('contactForm');
const responseMessage = document.getElementById('responseMessage');

openBtn.addEventListener('click', e => {
  e.preventDefault();
  modal.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  resetForm();
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('show');
    resetForm();
  }
});

function resetForm() {
  responseMessage.textContent = '';
  form.reset();
}

form.addEventListener('submit', async e => {
  e.preventDefault();

    responseMessage.textContent = 'Sending...';

    await emailjs.sendForm('service_7np190m', 'template_ysf9c1y', form)
      .then(() => {
        responseMessage.textContent = 'Thank you! Your message has been sent.';
        form.reset();
      }, (error) => {
        responseMessage.textContent = 'Failed to send: ' + JSON.stringify(error);
      });
});