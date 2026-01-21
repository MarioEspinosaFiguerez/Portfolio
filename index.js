const { createApp, ref, onMounted, computed, nextTick } = Vue;

createApp({
  setup() {
    // Estado Reactivo
    const currentLanguage = ref('es');
    const isDataLoaded = ref(false);
    const i18n = ref({});
    const content = ref({});
    const skills = ref({});
    const projects = ref({});
    const formResponse = ref('');
    const selectedProjectTechnologies = ref([]);
    const selectedProjectTitle = ref('');

    let technologiesUsedModal = null; 

    const form = ref({ name: '', email: '', message: '' });

    const loadJsons = async () => {
      try {
        const [resI18n, resContent, resSkills, resProjects] = await Promise.all([
          fetch('content-json/i18n.json'), 
          fetch('content-json/content.json'),
          fetch('content-json/skills.json'), 
          fetch('content-json/projects.json')
        ]);
                
        if (!resI18n.ok || !resContent.ok || !resSkills.ok || !resProjects.ok) {
            throw new Error("Failed to load files.");
        }
        
        i18n.value = await resI18n.json();
        content.value = await resContent.json();
        skills.value = await resSkills.json();
        projects.value = await resProjects.json();

        isDataLoaded.value = true;
      } catch (error) {
        console.error('Error en loadJsons():', error);
      }
    };

    const setLanguage = (lang) => {
      currentLanguage.value = lang;
      document.documentElement.lang = lang;
    };

    const getUrl = (htmlString) => {
      const match = htmlString.match(/href='([^']+)'/);
      return match ? match[1] : '#';
    }

    const cvLink = computed(() => {
        const baseLink = content.value.docs?.cvlink || '';
        const langSuffix = currentLanguage.value === 'es' ? '_ES_' : '_EN_';
        return baseLink.replace('_ENES_', langSuffix);
    });

    const processedProjects = computed(() => {
      if (!projects.value || !currentLanguage.value) return [];

      return Object.entries(projects.value).map(([key, projectData]) => {
          const langData = projectData[currentLanguage.value] || projectData['en'] || {};

        return {
          key: key,
          title: langData.title || 'Title not found',
          description: langData.description || 'Description not found.',
          technologies: langData.technologiesUsed || [],
          link: langData.github || langData.link || '#',
          status: langData.status || 'unkown',
        };
      })
    });

    const showTechnologiesUsedModal = (project) => {
      if (!technologiesUsedModal) {
        const modalElement = document.getElementById('technologiesUsedModal');
        if (!modalElement) return;

        technologiesUsedModal = new bootstrap.Modal(modalElement);
      }
      
      selectedProjectTechnologies.value = project.technologies;
      selectedProjectTitle.value = project.title
      technologiesUsedModal.show();
    }

    onMounted(() => {
      try {
        loadJsons();

        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) { return new bootstrap.Tooltip(tooltipTriggerEl)});

      } catch (e) {
        console.error("Error onMounted:", e);
      }
    });

    return {
      currentLanguage, isDataLoaded, i18n, content, skills, projects,
      form, formResponse, cvLink, processedProjects, 
      selectedProjectTechnologies, selectedProjectTitle, showTechnologiesUsedModal,
      setLanguage, getUrl
    };
  }
}).mount('#app');