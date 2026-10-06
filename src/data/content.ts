export interface Project {
  id: string
  index: string
  title: string
  client: string
  year: string
  tags: string[]
  description: string
  impact?: string
  link?: string
  linkLabel?: string
  hue: string // gradient visual
  monogram: string
}

export const projects: Project[] = [
  {
    id: 'payit',
    index: '01',
    title: 'payit Wallet',
    client: 'First Abu Dhabi Bank',
    year: '2018 – 2022',
    tags: ['Fintech', 'DesignOps', 'CX Framework'],
    description:
      "The first fully-featured digital wallet in the UAE, powered by the country's largest bank. I set up the DesignOps and we scaled the product with features like remittances, cash pick-up and quick cash. We also built a customer experience framework with NPS and CSAT for the digital support team.",
    impact: 'App rating went from 3.5 to 4.5 in 30 days',
    link: 'https://www.payit.ae',
    linkLabel: 'payit.ae',
    hue: 'from-[#0d5c46] via-[#12805f] to-[#0a3d30]',
    monogram: 'p.',
  },
  {
    id: 'unimed',
    index: '02',
    title: 'Unimed Brasil',
    client: 'Unimed',
    year: '2019',
    tags: ['Healthcare', 'Mobile App', 'Service Design'],
    description:
      'I created the entire experience for the biggest healthcare cooperative in Brazil. Featured on the App Store and Google Play in 2019, the app is used across the country to find doctors and book appointments and exams.',
    impact: 'Featured on App Store & Google Play, 2019',
    link: 'https://www.unimed.coop.br/site/',
    linkLabel: 'unimed.coop.br',
    hue: 'from-[#14532d] via-[#1d7a4a] to-[#0b3b21]',
    monogram: 'u.',
  },
  {
    id: 'smartgate',
    index: '03',
    title: 'Dubai Smart Gate',
    client: 'emaratech × Dubai Airports',
    year: '2014',
    tags: ['Product Design', 'Gov Tech', 'Research'],
    description:
      'The second generation of the smart gate for Dubai Airports, from product design to the passenger inflow experience. We built styrofoam mockups to test the interface and the new machine housing. Yes, styrofoam. That concept became the foundation for the gates running at the airport today.',
    impact: 'Foundation for the gates in operation at DXB today',
    link: 'https://www.dropbox.com/s/qmo5m8492mr215o/Smartgate.pdf',
    linkLabel: 'Case study (PDF)',
    hue: 'from-[#1c3a4d] via-[#2a5a74] to-[#122633]',
    monogram: 'sg.',
  },
  {
    id: 'etisalat-digital',
    index: '04',
    title: 'Gas Station, Re-imagined',
    client: 'Etisalat Digital',
    year: '2016 – 2018',
    tags: ['Strategy', 'Innovation', 'Concept'],
    description:
      'A strategy project that re-imagines the experience of visiting a gas station. New revenue streams, smarter payments, data for better decision-making, and digital touchpoint concepts that actually make sense for customers.',
    link: 'https://www.dropbox.com/s/ecpakdrh5173xp0/Gas%20station-Re-imagined.pdf?dl=0',
    linkLabel: 'Presentation (PDF)',
    hue: 'from-[#4a2c14] via-[#8a5a24] to-[#2e1c0c]',
    monogram: 'e.',
  },
  {
    id: 'etisalat-studio',
    index: '05',
    title: 'Etisalat Design Studio',
    client: 'Etisalat',
    year: '2016 – 2018',
    tags: ['Team Leadership', 'Digital Transformation', 'E-commerce'],
    description:
      'I led UX and operations of a 42-person studio: service, interaction and visual designers, content strategists and creative technologists. Together we delivered the digital transformation program covering etisalat.ae, e-commerce, the My Etisalat app and the payment machines, plus the first redesign of Smiles.',
    impact: 'Smiles reached ~1.2M users, 4.6★ on the App Store',
    hue: 'from-[#3d1420] via-[#7a2440] to-[#260a12]',
    monogram: 'st.',
  },
  {
    id: 'corecase',
    index: '06',
    title: 'CoreCase',
    client: 'CoreCase',
    year: '–',
    tags: ['Mining Tech', 'Prototyping', 'End-to-end'],
    description:
      'CoreCase sells eco-friendly boxes for mining companies. We digitised the whole process of recording mineral extraction in the field, with an end-to-end flow and functional prototypes that show the full solution, from on-ground to warehouse to back-office admin.',
    impact: 'Details upon request',
    hue: 'from-[#2b2b26] via-[#4d4d42] to-[#1a1a16]',
    monogram: 'cc.',
  },
]

export interface Role {
  index: string
  company: string
  location: string
  title: string
  period: string
  duration: string
  current?: boolean
  description: string
}

export const experience: Role[] = [
  {
    index: '01',
    company: 'Public Investment Fund',
    location: 'Riyadh, KSA',
    title: 'Senior VP, Digital Experiences & Platforms',
    period: 'Jun 2022 – Present',
    duration: '+4 yrs',
    current: true,
    description:
      "At Saudi Arabia's sovereign wealth fund, I lead a team of digital platform experts. Our job is to grow the Fund's digital presence and the way it communicates online. We choose and enable the right platforms, explore tech like the metaverse, and deploy CDP to extend marketing and user experiences.",
  },
  {
    index: '02',
    company: 'First Abu Dhabi Bank',
    location: 'Abu Dhabi, UAE',
    title: 'AVP, Customer Experience & Design',
    period: 'Jun 2018 – Apr 2022',
    duration: '+3 yrs',
    description:
      "I led the end-to-end customer experience transformation for payit, the UAE's first fully-featured digital wallet. We embedded design thinking across the product lifecycle, designed customer journeys for B2C and B2B, and put VoC, NPS and RPA-driven feedback frameworks in place. The app rating went from 3.5 to 4.5 within 30 days.",
  },
  {
    index: '03',
    company: 'Etisalat',
    location: 'Dubai, UAE',
    title: 'Manager, User Experience & Operations',
    period: 'Sep 2016 – May 2018',
    duration: '1.8 yrs',
    description:
      'I managed the Etisalat Design Studio, 42 people across service, interaction and visual design, content strategy and creative technology. We shipped the Smiles loyalty app (about 1.2M users) and the digital transformation program covering etisalat.ae, e-commerce, the My Etisalat app and the payment machines.',
  },
  {
    index: '04',
    company: 'EOV Media',
    location: 'Dubai, UAE',
    title: 'Partner & Head of UX Design',
    period: 'Oct 2014 – May 2016',
    duration: '1.7 yrs',
    description:
      'I joined as partner and Head of UX. I briefed and coordinated internal teams, suppliers and remote freelancers, and handled premium accounts like the Ministry of Finance, Dubai SME, Hamdan Innovation Incubator, Abu Dhabi Pension Fund and the entire eDirham marketing account. Lots of prototyping and client workshops.',
  },
  {
    index: '05',
    company: 'emaratech',
    location: 'Dubai, UAE',
    title: 'Lead User Experience',
    period: 'Jun 2012 – Sep 2014',
    duration: '2.3 yrs',
    description:
      'I joined as Information Architect and became UX Lead nine months later. My team created solutions for key government organisations in Dubai. The big one: a new design and experience for the Dubai Smart Gate, built together with Dubai Airports and technical suppliers. That concept is the foundation of the gates you use at the airport today.',
  },
  {
    index: '06',
    company: 'Hewlett Packard',
    location: 'Porto Alegre, Brazil',
    title: 'Software Designer',
    period: 'Apr 2011 – Dec 2011',
    duration: '8 mo',
    description:
      "UX designer inside an agile R&D team of 8. I prototyped new features on the product's own front-end platform before implementation, so we could validate and fix requirements early. It saved costs and sped up development by nearly 50%.",
  },
  {
    index: '07',
    company: 'TOTVS',
    location: 'Porto Alegre, Brazil',
    title: 'User Interface Specialist',
    period: 'Sep 2009 – Dec 2010',
    duration: '1.3 yrs',
    description:
      "I started as a C# developer on the healthcare ERP. A few months in, I was challenged to move the entire web interface to the company's new digital identity: about 3,500 screens in one month. Later I worked with business analysts on prototypes and flows so clients could see concepts early, cutting development costs and requirements time.",
  },
  {
    index: '08',
    company: 'ConceitoWeb',
    location: 'Porto Alegre, Brazil',
    title: 'System Analyst & Operations Manager',
    period: 'Dec 2006 – Aug 2009',
    duration: '2.8 yrs',
    description:
      'My first chapter. I planned and modelled e-commerce and back-office web systems with a team of VB.NET developers, front-end developers and database analysts, while reporting operations, team allocation and project status directly to management.',
  },
]

export const mantras = [
  {
    index: '01',
    title: 'Work hard, play harder',
    body: 'Nothing beats getting things done, making people happy, and the team too. Achieve and celebrate.',
  },
  {
    index: '02',
    title: 'Design is never done',
    body: 'I believe in design thinking and the power of what people can do together. Co-creation and collaboration between humans and machines.',
  },
  {
    index: '03',
    title: 'Success fast. Innovate.',
    body: 'Ideate, create, build, test, learn, repeat. In the end, it changes the way things are usually done.',
  },
]

export const processSteps = ['Ideate', 'Build', 'Test', 'Learn', 'Repeat']

export const skillGroups = [
  {
    label: 'Practice',
    items: ['UX / UI Design', 'Design Thinking', 'Research', 'Rapid Prototyping', 'Figma', 'Front-end Dev', 'User Testing', 'Customer Journey', 'Design Systems'],
  },
  {
    label: 'Strategy',
    items: ['Digital Transformation', 'Innovation', 'Customer Experience', 'NPS & VoC', 'Data Analytics', 'Digital Marketing'],
  },
  {
    label: 'Leadership',
    items: ['Team Leadership', 'Agile / Scrum', 'GenAI', 'Stakeholder Management'],
  },
]

export const marqueeSkills = [
  'Digital Transformation',
  'Design Thinking',
  'User Experience',
  'GenAI',
  'Customer Experience',
  'Innovation',
  'Rapid Prototyping',
  'Research',
  'Leadership',
  'NPS & VoC',
  'Figma',
  'Agile / Scrum',
]

export const education = [
  { year: '2025', title: 'Executive Development Program', school: 'Wharton' },
  { year: '2024', title: 'Leading AI & Digital Transformation', school: 'INSEAD' },
  { year: '2023', title: 'Cultivating Creative Collaboration', school: 'IDEO U' },
  { year: '2022', title: 'Disruptive Strategy', school: 'Harvard Business School Online' },
  { year: '2020', title: 'PG, Innovation & Design Thinking', school: 'Emeritus' },
  { year: '2009', title: 'Bachelor, Information Systems', school: 'Faculdade Dom Bosco' },
]

export const languages = ['Português', 'English', 'Español', 'Italiano']

export const stats = [
  { value: 20, suffix: '+', label: 'Years in digital' },
  { value: 1.2, suffix: 'M', label: 'Users reached', decimals: 1 },
  { value: 8, suffix: '', label: 'Companies, 3 countries' },
]

export const roles = [
  'Digital Transformation Leader',
  'Experience Designer',
  'Design Thinking Practitioner',
  'Innovation Catalyst',
]

export const blogTopics = [
  {
    index: '01',
    title: 'AI stuff',
    body: 'Honest takes on where AI fits with us humans. Vibe coding adventures, co-creation with machines, and what we should never offload to the bots.',
    postTitle: 'To me, AI is 50/50',
    postUrl: 'https://blog.gui-ux.com/ai-stuff/to-me-ai-is-50-50/',
  },
  {
    index: '02',
    title: 'Design & UX',
    body: 'Reflections on teams, leadership and design thinking. The stuff I wish someone had told me earlier in my career.',
    postTitle: 'If your team were a startup, would you invest on it?',
    postUrl: 'https://blog.gui-ux.com/design-ux/if-your-team-were-a-startup-would-you-invest-on-it/',
  },
  {
    index: '03',
    title: 'Globe & hobbies',
    body: 'Yes, I ride a motorbike inside a metal sphere. Globe riding stories, classic cars, and the never-ending hunt for good coffee.',
    postTitle: 'Globe riding in Baku. Can’t make it :(',
    postUrl: 'https://blog.gui-ux.com/globe-of-death/globe-riding-in-baku-cant-make-it/',
  },
]

export const blogUrl = 'https://blog.gui-ux.com/'
