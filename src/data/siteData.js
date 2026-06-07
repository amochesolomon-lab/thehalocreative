const asset = (path) => new URL(`../../${path}`, import.meta.url).href;

export const site = {
  name: "Sol'o Mon",
  title: 'The Seraphic Designer',
  location: 'Onitsha, Nigeria',
  intro:
    'Creative director shaping immersive digital experiences, visual identities, and cinematic storytelling for brands and communities.',
  whatsapp: 'https://wa.link/wctpny',
  facebook: 'https://web.facebook.com/profile.php?id=100087343035499',
  instagram: 'https://www.instagram.com/theseraphicdesigner',
};

export const navigation = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/contact', label: 'Contact', cta: true },
];

export const heroStats = [
  { value: '200+', label: 'Projects crafted' },
  { value: '4', label: 'Core disciplines' },
  { value: '01', label: 'Creative vision' },
];

export const featuredCollections = [
  {
    number: '01',
    title: 'Event Flyers',
    category: 'Visual Communication',
    description:
      'Church campaigns, conferences, and live-event graphics with a clear hierarchy and cinematic polish.',
    image: asset('assets/Church/FESTIVAL OF WORSHIP full.png'),
    href: 'https://solomon83.pixieset.com/eventflyers/',
  },
  {
    number: '02',
    title: 'Birthday Designs',
    category: 'Personal Celebrations',
    description:
      'Warm, expressive birthday visuals designed to feel special without losing structure or readability.',
    image: asset('assets/birthday/Mummy Happi.png'),
    href: 'https://solomon83.pixieset.com/birthdaydesigns/',
  },
  {
    number: '03',
    title: 'Branding Projects',
    category: 'Identity Systems',
    description:
      'Logo-led brand work that keeps the message clean, memorable, and consistent across touchpoints.',
    image: asset('assets/homepage-projects/3.png'),
    href: 'https://solomon83.pixieset.com/brandingprojects/',
  },
  {
    number: '04',
    title: 'Social Media',
    category: 'Digital Campaigns',
    description:
      'Fast-moving social media visuals shaped for modern feeds, announcements, and repeated engagement.',
    image: asset('assets/homepage-projects/Digc Prayer meeting 3.png'),
    href: 'https://solomon83.pixieset.com/socialmedia/',
  },
];

export const services = [
  {
    number: '01',
    name: 'Web Development',
    summary:
      'Responsive websites with editorial layouts, refined motion, and a premium visual system.',
    details: ['Website Design', 'Frontend Development', 'Responsive Layouts', 'Brand-aligned UI'],
  },
  {
    number: '02',
    name: 'Graphic Design',
    summary:
      'Flyers, posters, social graphics, and campaign visuals with strong hierarchy and atmosphere.',
    details: ['Flyers & Posters', 'Social Media', 'Marketing Materials', 'Digital Graphics'],
  },
  {
    number: '03',
    name: 'Visual Storytelling',
    summary:
      'Concepts translated into visual narratives that feel intentional, cinematic, and memorable.',
    details: ['Campaign Design', 'Mood Boards', 'Concept Art', 'Editorial Direction'],
  },
  {
    number: '04',
    name: 'Cinematography',
    summary:
      'Motion-led visual work that captures atmosphere, clarity, and emotion in a single frame.',
    details: ['Video Production', 'Editing', 'Storyboarding', 'Color Grading'],
  },
];

export const tools = [
  'Adobe Photoshop',
  'Affinity',
  'Pixellab',
  'After Effects',
  'Adobe Premiere Pro',
  'CapCut / Kdenlive',
  'JavaScript',
  'HTML / CSS',
  'Dart',
];

export const aboutHighlights = [
  'I am Sol’o Mon, a creative director, designer, and web developer driven by purpose, atmosphere, and visual clarity.',
  'My work spans branding, logo design, campaign graphics, and digital storytelling with a premium, editorial finish.',
  'I also work in cinematography, bringing ideas to life through visual rhythm, composition, and emotional precision.',
];

export const socialLinks = [
  { label: 'WhatsApp', value: 'wa.link/wctpny', href: site.whatsapp },
  { label: 'Facebook', value: 'Sol\'o Mon', href: site.facebook },
  { label: 'Instagram', value: '@theseraphicdesigner', href: site.instagram },
];

export const portrait = asset('assets/20260502_012722 (Copy) (Edited).jpg');
export const logo = asset("assets/logo.png");

export const achievements = [
  { value: '200+', label: 'Completed projects' },
  { value: '50+', label: 'Brands and ministries served' },
  { value: '4.9', label: 'Creative satisfaction score' },
];

export const philosophy = [
  'Every page should feel like a publication spread, not a template.',
  'Motion should guide attention, not fight it.',
  'The best design is calm, deliberate, and impossible to mistake for noise.',
];
