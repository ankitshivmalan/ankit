export const siteData = {
  seo: {
    title: 'Ankit Singh | Senior Software Developer',
    description:
      'Portfolio of Ankit Singh featuring full-stack engineering, mobile app delivery, ERP and SaaS systems, and DevOps execution.',
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://ankit-one-xi.vercel.app'
        : 'http://localhost:3000'),
    image: '/portfolio/ankit-formal.png',
    googleSiteVerification: 'C7gS9UI8X-n08KWuaphX26dg1_7bnegjMWYQw6wZd5c',
    googleAdsenseAccount: 'ca-pub-3775988500417008',
    keywords: [
      'Ankit Singh portfolio',
      'MERN developer',
      'React Native developer',
      'full stack developer India',
      'ERP developer',
      'SaaS product engineer',
      'Node.js developer',
      'software developer portfolio'
    ]
  },
  profile: {
    name: 'Ankit Singh',
    role: 'Senior Software Developer',
    subheading: 'Full-stack engineer specializing in MERN, React Native, and scalable product development.',
    location: 'Delhi NCR, India',
    email: 'a.singh@astutelook.com',
    phone: '+91-9310566733',
    address: '',
    heroImage: '/portfolio/ankit-casual.png',
    aboutImage: '/portfolio/ankit-formal.png',
    resumeFile: '/portfolio/Ankit-Singh-CV.pdf',
    intro:
      'I build scalable web and mobile applications, architect backend systems, and deliver production-ready software used in real business operations.',
    summary:
      'I focus on practical engineering — designing reliable architectures, building maintainable software, and turning product ideas into production-ready digital platforms used in real business operations.',
  },
  stats: [
    { value: '9+ Years', label: 'Building Software' },
    { value: '20+', label: 'Projects Delivered' },
    { value: 'ERP & SaaS', label: 'Platforms Built' },
    { value: '50+', label: 'Developers Mentored' },
  ],
  services: [
    {
      title: 'Web Application Development',
      icon: 'code',
      description:
        'Scalable web platforms, SaaS products, dashboards, APIs, and internal tools built with modern MERN architecture.',
    },
    {
      title: 'Mobile App Development',
      icon: 'mobile',
      description:
        'Cross-platform mobile applications using React Native with seamless backend integration and production-ready architecture.',
    },
    {
      title: 'ERP & CRM Systems',
      icon: 'database',
      description:
        'Custom enterprise systems for HR, finance, inventory, workflow automation, and business operations.',
    },
    {
      title: 'Cloud & Deployment',
      icon: 'cloud',
      description:
        'CI/CD pipelines, cloud infrastructure, deployment automation, and production environment management.',
    },
  ],
  skills: [
    {
      icon: 'frontend',
      title: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    },
    {
      icon: 'mobile',
      title: 'Mobile',
      items: ['React Native', 'Android Studio', 'Expo', 'Mobile APIs'],
    },
    {
      icon: 'backend',
      title: 'Backend',
      items: ['Node.js', 'Express', 'REST APIs', 'JWT Auth'],
    },
    {
      icon: 'database',
      title: 'Database',
      items: ['MongoDB', 'SQL'],
    },
    {
      icon: 'devops',
      title: 'DevOps',
      items: ['CI/CD', 'Docker', 'Nginx', 'Linux Server'],
    },
    {
      icon: 'tools',
      title: 'Tools',
      items: ['Git', 'VS Code', 'Postman', 'Figma'],
    },
  ],
  experience: [
    {
      period: '08/2019 - Present',
      title: 'CTO & Product Engineering Lead',
      company: 'Astutelook',
      location: 'Noida, India',
      bullets: [
        'Built and delivered HRM, CRM, and e-commerce platforms using MERN architecture.',
        'Led engineering architecture, integrations, and system security.',
        'Implemented payment, social, and geolocation integrations.',
        'Mentored developers and trained professionals in practical product development.',
      ],
    },
    {
      period: '06/2024 - 02/2026',
      title: 'Senior Software Engineer',
      company: 'Grapes Group',
      location: 'Delhi, India',
      bullets: [
        'Developed digital platforms across mobility, real estate, and internal business tools.',
        'Architected Grapes Cab platform using MERN and React Native.',
        'Implemented CI/CD pipelines and DevOps deployment workflows.',
        'Coordinated product delivery for Safari Rummy platform.',
      ],
    },
    {
      period: '08/2023 - 02/2024',
      title: 'Senior Software Developer',
      company: 'Mscorpres Automation',
      location: 'Noida, India',
      bullets: [
        'Developed ERP modules including HRMS, finance, inventory, legal, and production systems.',
        'Built responsive web and mobile interfaces using React and React Native.',
        'Managed system architecture, deployment, and maintenance across the full product lifecycle.',
      ],
    },
    {
      period: '10/2016 - 04/2018',
      title: 'Network Operations Center Engineer',
      company: 'Reliance Jio',
      location: 'Ghaziabad, India',
      bullets: [
        'Monitored network infrastructure and managed outage response.',
        'Coordinated technical teams to ensure stable network performance.',
        'Analyzed network metrics and operational incidents.',
      ],
    },
  ],
  projects: [
    {
      type: 'Mobility Platform',
      name: 'Grapes Cab',
      summary:
        'A ride-hailing platform with user, driver, and backend flows inspired by production mobility systems.',
    },
    {
      type: 'Internal Product',
      name: 'Accounting and Bookkeeping System',
      summary:
        'An Electron.js system for real-time expense, revenue, and financial reporting visibility.',
    },
    {
      type: 'Enterprise Suite',
      name: 'ERP Platform',
      summary:
        'ERP delivery across HRMS, finance, inventory, legal, production, and Android stock operations.',
    },
    {
      type: 'Freelance Delivery',
      name: 'Shini Fashion / DesignShilp / Prasiddh Travels',
      summary:
        'Business websites and digital experiences built with a strong execution and conversion focus.',
    },
  ],
  education: [
    {
      title: 'B.Tech',
      institution: 'DPGITM, Gurugram - MDU University',
      period: '08/2013 - 07/2016',
    },
    {
      title: 'Diploma in Computer Science Engineering',
      institution: 'VTI, Rohtak',
      period: '08/2010 - 07/2013',
    },
    {
      title: 'High School',
      institution: 'DAV, Sahibabad',
      period: '03/2009 - 06/2010',
    },
  ],
  certifications: [
    'CCNA (Routing and Switching)',
    'CCNP (R&S)',
    'CCNA Security',
    'CEH (Safe Security)',
  ],
};
