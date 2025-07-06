document.addEventListener("DOMContentLoaded", () => {
  emailjs.init('3lomX-cNuTgdebxXZ');

  // ----------- Projects -----------

  const unityProjects = [
    {
      title: "Sombra del Gloton",
      image: "images/Logo.png",
      description: `Sombra del Gloton is a video game collaboratively developed by the entire class as part of the 3D section of the <strong>Postgraduate Specialization in Video Games and Virtual Reality.</strong>`,
      link: "https://github.com/MarioEspinosaFiguerez/SombraDelGloton",
    }
  ];

  const projectContainer = document.querySelector(".project-grid");
  projectContainer.innerHTML = ""; 

  unityProjects.forEach(project => {
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

    projectContainer.appendChild(card);
  });

  // ----------- Profiles -----------

  const profiles = [
    {
      rol: "Junior Backend Developer",
      stack: "C# | .NET | SQL Server | Linq | Entity Framework",
      cv_es: "docs/Backend/JuniorBackend_ES_MarioEspinosaFiguerez.pdf",
      cv_en: "docs/Backend/JuniorBackend_EN_MarioEspinosaFiguerez.pdf",
      about: "I’m a passionate software developer with a solid foundation in backend development using C# and .NET. I enjoy solving complex problems and building efficient, scalable solutions.",
      coreSkills: [ "C#", ".NET Framework",".NET Core (Actively learning)", "LinQ", "SQL", "SQL Server", "Entity Framework", "RESTful API" ],
      otherSkills: ["HTML, CSS, JavaScript", "Angular", "NodeJS", "Java", "Kotlin"],
      showOtherSkills: true,
      showProjects: false
    },
    {
      rol: "Junior Unity Developer",
      stack: "Unity Scripting | C# | Game Dev | AR/VR Enthusiast",
      cv_es: "docs/Gamedev/JuniorGameDeveloper_ES_MarioEspinosaFiguerez.pdf",
      cv_en: "docs/Gamedev/JuniorGameDeveloper_EN_MarioEspinosaFiguerez.pdf",
      about: "Passionate about video game development with a specialization in Unity C# scripting and AR/VR technologies. I enjoy creating immersive and dynamic experiences.",
      coreSkills: [ "C#", "Unity(Intermediate)", "Unity 2D", "Unity 3D", "Unity VR", "Unity AR", "Vuforia" ],
      showOtherSkills: false,
      showProjects: true
    }
  ];

  let currentProfileIndex = 0;

  const title = document.getElementById("title");

  const btn = document.getElementById("toggleProfile");
  const rol = document.getElementById("profileRole");
  const stack = document.getElementById("profileStack");
  const cvEsLink = document.getElementById("cvEsLink");
  const cvEnLink = document.getElementById("cvEnLink");
  const aboutText = document.getElementById("aboutText");
  const coreSkillsContainer = document.getElementById("coreSkills");
  const otherSkillsContainer = document.getElementById("otherSkills");
  const experienceSection = document.getElementById("experienceSection");
  const projectsSection = document.getElementById("projects");

  function renderSkills(skills) {
    const ul = document.createElement("ul");

    skills.forEach(skill => {
      const li = document.createElement("li");

      if (skill.includes("(Actively learning)")) {
        const cleanSkill = skill.replace("(Actively learning)", "").trim();
        li.textContent = cleanSkill;
        const span = document.createElement("span");
        span.textContent = " (Actively learning)";
        span.style.fontStyle = "italic";
        span.style.color = "#e67e22";
        li.appendChild(span);
      } else {
        li.textContent = skill;
      }

      ul.appendChild(li);
    });

    return ul;
  }

  function updateProfile(index) {
    const profile = profiles[index];
    rol.textContent = profile.rol;
    stack.textContent = profile.stack;
    cvEsLink.href = profile.cv_es;
    cvEnLink.href = profile.cv_en;
    aboutText.textContent = profile.about;
    title.textContent = !profile.showProjects ? "Junior Backend Portolio" : "Junior Unity Porfolio";

    coreSkillsContainer.innerHTML = "";
    coreSkillsContainer.appendChild(renderSkills(profile.coreSkills));

    otherSkillsContainer.parentElement.style.display = profile.showOtherSkills ? "block" : "none";
    experienceSection.style.display = profile.showOtherSkills ? "block" : "none";
    projectsSection.style.display = profile.showProjects ? "block" : "none";


    if (profile.showOtherSkills) {
      otherSkillsContainer.innerHTML = "";
      otherSkillsContainer.appendChild(renderSkills(profile.otherSkills));
    }

    btn.textContent = index === 0 ? "Change to Unity Profile" : "Change to Backend Profile";
  }

  btn.addEventListener("click", () => {
    currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
    updateProfile(currentProfileIndex);
  });

  updateProfile(currentProfileIndex);

  // ----------- Contact Form -----------

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

});
