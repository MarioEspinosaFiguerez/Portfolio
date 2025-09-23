document.addEventListener('DOMContentLoaded', () => {
    emailjs.init('3lomX-cNuTgdebxXZ');
    loadJsons()
});

let currentLanguage = 'en';
let isThemeLight = true;
let translations = {};
let sharedContent = {};

    // Projects Data
    const backendProjects = [
        {
            "en": {
                title: "To-Do List API",
                description: `To-Do List API is a minimalistic RESTful API built with <strong>.NET Core</strong>. This project was mainly developed as a hands-on practice to strengthen my skills in .NET Core and RESTful API development.`,
                link: "https://github.com/MarioEspinosaFiguerez/ToDoListAPI",
                inDevelopment: false,
                completed: true
            },
            "es": {
                title: "To-Do List API",
                description: `To-Do List API es una API RESTful minimalista construida con <strong>.NET Core</strong>. Este proyecto fue desarrollado principalmente como práctica para fortalecer mis habilidades en .NET Core y el desarrollo de APIs RESTful.`,
                link: "https://github.com/MarioEspinosaFiguerez/ToDoListAPI",
                inDevelopment: false,
                completed: true
            }           
        }
    ];


// Lang Buttons
document.getElementById('lang-es').addEventListener('click', () => updateContent('es'));
document.getElementById('lang-en').addEventListener('click', () => updateContent('en'));

function updateContent(lang) {
    currentLanguage = lang;
    const t = translations[lang];
    if (!t) return;

    document.documentElement.lang = lang;

    // Contact Modal
    document.getElementById('modalTitle').textContent = currentLanguage === 'en' ? "Contact me" : "Contáctame"
    document.getElementById('modal-name').textContent = currentLanguage === 'en' ? "Name" : "Nombre"
    document.getElementById('modal-email').textContent = currentLanguage === 'en' ? "Email" : "Correo"
    document.getElementById('modal-message').textContent = currentLanguage === 'en' ? "Message" : "Mensaje"
    document.getElementById('modal-submit').textContent = currentLanguage === 'en' ? "Submit" : "Enviar"

    // Header
    document.getElementById('job-title').textContent = t.jobTitle;
    document.getElementById('job-stack').textContent = "C# | .NET | SQL Server | Linq | Entity Framework";
    document.getElementById('About').textContent = currentLanguage === 'en' ? "About me" : "Acerca de mi"
    document.getElementById('Projects').textContent = currentLanguage === 'en' ? "Projects" : "Proyectos";
    document.querySelector('.Contact').textContent = currentLanguage === 'en' ? "Contact" : "Contáctame";
    document.getElementById('cv-link').href = t.cvlink

    // About me
    document.getElementById('aboutme-title').textContent = lang === 'en' ? 'About me' : 'Sobre mí';
    document.getElementById('aboutText').textContent = t.aboutme;

    // Professional Experience
    document.getElementById('experience-title').textContent = t.profesionalExperience.title || '';
    document.getElementById('experience-date').textContent = t.profesionalExperience.date || '';
    document.getElementById('experience-position').textContent = t.profesionalExperience.title_experience || '';
    document.getElementById('key-responsabilities-title').textContent = currentLanguage === 'en' ? "Key Responsibilities" : "Responsabilidades Clave"

    const respUl = document.getElementById('experience-responsibilities');
    respUl.innerHTML = '';
    if (Array.isArray(t.profesionalExperience.responsabilities)) {
        t.profesionalExperience.responsabilities.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            respUl.appendChild(li);
        });
    }

    // My studies
    document.getElementById('mystudies-title').textContent = currentLanguage === 'en' ? "My Studies" : "Mis Estudios"
    document.getElementById('specialization-course-title').textContent = currentLanguage === 'en' ? "Postgraduate Specialization in Video Games and Virtual Reality" : "Curso de Especializacion en Desarrollo de Videojuegos y Realidad Virtual"
    document.getElementById('specialization-skills-gained').textContent = currentLanguage === 'en' ? "Core Skills: Unity 2D, 3D, VR, AR (Vuforia)" : "Habilidades Técnicas: Unity 2D, 3D, VR, AR (Vuforia)"
    document.getElementById('dam-course-title').textContent = currentLanguage === 'en' ? "Multiplatform Application Development + Internship at NTT DATA" : "Desarrollo de Aplicaciones Multiplataforma + Prácticas en NTT DATA"
    document.getElementById('dam-skills-gained').textContent = currentLanguage === 'en' ? "Core Skills: C#, .NET, Linq, Sql, SQL Server, Entity Framework" : "Habilidades Técnicas: C#, .NET, Linq, Sql, SQL Server, Entity Framework"


    // Skills titles
    document.getElementById('skills-main-title').textContent = t.skills;
    document.getElementById('skills-subtitle').textContent = t.techSkills;
    document.getElementById('core-title').textContent = t.coreSkills;
    document.getElementById('others').textContent = t.othersSkills;

    document.getElementById('skills-note').textContent = lang === 'en' ?
        "Technologies I’ve studied or used in the past but are currently not part of my active stack. Willing to revisit them if needed for a project." :
        "Tecnologías que he estudiado o usado en el pasado, pero actualmente no forman parte de mi stack activo. Estoy dispuesto a retomarlas si el proyecto lo requiere.";

    // Core Skills
    const coreSkillsList = document.getElementById('coreSkills');
    coreSkillsList.innerHTML = '';
    if (sharedContent.coreSkills) {
        sharedContent.coreSkills.forEach(skill => {
            const li = document.createElement('li');
            if (skill.includes("Actively Learning")) {
                const cleanSkill = skill.replace("(Actively Learning)", "").trim();
                li.textContent = cleanSkill;

                const span = document.createElement("span");
                span.textContent = translations[currentLanguage].activelylearning;
                span.style.fontStyle = 'italic';
                span.style.color = "#e67e22";
                li.appendChild(span)
            } else { li.textContent = skill; }
            coreSkillsList.appendChild(li);
        });
    }

    // Other Skills
    const otherSkillsList = document.getElementById('otherSkills');
    otherSkillsList.innerHTML = '';
    if (sharedContent.otherSkills) {
        sharedContent.otherSkills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            otherSkillsList.appendChild(li);
        });
    }

    // Soft Skills
    document.getElementById('soft-skills-title').textContent = t.softSkills.title;
    const softSkillsList = document.getElementById('soft-skills');
    softSkillsList.innerHTML = '';
    t.softSkills.softSkills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        softSkillsList.appendChild(li);
    });

    // Languages
    document.getElementById('languages-title').textContent = t.langs.title;
    const langsList = document.getElementById('languages');
    langsList.innerHTML = '';
    t.langs.list.forEach(langItem => {
        const li = document.createElement('li');
        li.innerHTML = langItem;
        langsList.appendChild(li);
    });

    // Projects
    document.getElementById('projects-title-section').textContent = currentLanguage === 'en' ? "Projects" : "Proyectos";

    const projectContainer = document.querySelector(".project-grid");
    projectContainer.innerHTML = ""; 

    backendProjects.forEach(project => {
    const card = document.createElement("div");
    card.className = "card project-single";

    const isInDevelopment = project[currentLanguage].inDevelopment;
    const isCompleted = project[currentLanguage].completed;

    let devBadge = "";

    if (isInDevelopment) devBadge = `<span class="dev-badge-in-development">${translations[currentLanguage].inDevelopment}</span>`
    else if (isCompleted) devBadge = `<span class="dev-badge-completed">${translations[currentLanguage].completed}</span>`

    if (currentLanguage === 'en') {
        card.innerHTML = `
        <div class="project-info">
            <h3>${project.en.title}${devBadge}</h3>
            <p>${project.en.description}</p>
            <a href="${project.en.link}" target="_blank" class="btn">View Project</a>
      </div>
    `;
    }
    else {
        card.innerHTML = `
        <div class="project-info">
            <h3>${project.es.title}${devBadge}</h3>
            <p>${project.es.description}</p>
            <a href="${project.es.link}" target="_blank" class="btn">Ver Proyecto</a>
      </div>
    `;
    }
    

    projectContainer.appendChild(card);
  });

}

async function loadJsons() {
    try {
        // Ajusta las rutas a donde guardes tus JSON
        const [resContent, resShared] = await Promise.all([
            fetch('content-json/content.json'),
            fetch('content-json/content-shared.json')
        ]);

        translations = await resContent.json();
        sharedContent = await resShared.json();

        updateContent(currentLanguage);
    } catch (err) {
        console.error('Error loading JSON', err);
    }
}

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
