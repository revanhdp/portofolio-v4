export interface TechIconDefinition {
  name: string;
  iconSrc: string;
  darkIconSrc?: string;
  color: string;
  darkColor?: string;
  glow: string;
}

export const TECH_ICONS: Record<string, TechIconDefinition> = {
  'TypeScript': {
    name: 'TypeScript',
    iconSrc: '/icons/tech/typescript.svg',
    color: '#3178C6',
    glow: 'rgba(49, 120, 198, 0.45)',
  },
  'React': {
    name: 'React',
    iconSrc: '/icons/tech/react.svg',
    color: '#61DAFB',
    glow: 'rgba(97, 218, 251, 0.45)',
  },
  'Next.js': {
    name: 'Next.js',
    iconSrc: '/icons/tech/nextjs.svg', darkIconSrc: '/icons/tech/nextjs-dark.svg',
    color: '#000000', darkColor: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.35)',
  },
  'Tailwind CSS': {
    name: 'Tailwind CSS',
    iconSrc: '/icons/tech/tailwindcss.svg',
    color: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.45)',
  },
  'Framer Motion': {
    name: 'Framer Motion',
    iconSrc: '/icons/tech/framermotion.svg',
    color: '#0055FF',
    glow: 'rgba(0, 85, 255, 0.45)',
  },
  'Vue.js': {
    name: 'Vue.js',
    iconSrc: '/icons/tech/vue.svg',
    color: '#41B883',
    glow: 'rgba(65, 184, 131, 0.45)',
  },
  'Vue': {
    name: 'Vue.js',
    iconSrc: '/icons/tech/vue.svg',
    color: '#41B883',
    glow: 'rgba(65, 184, 131, 0.45)',
  },
  'NestJS': {
    name: 'NestJS',
    iconSrc: '/icons/tech/nestjs.svg',
    color: '#E0234E',
    glow: 'rgba(224, 35, 78, 0.45)',
  },
  'Nest.js': {
    name: 'NestJS',
    iconSrc: '/icons/tech/nestjs.svg',
    color: '#E0234E',
    glow: 'rgba(224, 35, 78, 0.45)',
  },
  'Node.js': {
    name: 'Node.js',
    iconSrc: '/icons/tech/nodejs.svg',
    color: '#539E43',
    glow: 'rgba(83, 158, 67, 0.45)',
  },
  'Laravel': {
    name: 'Laravel',
    iconSrc: '/icons/tech/laravel.svg',
    color: '#FF2D20',
    glow: 'rgba(255, 45, 32, 0.45)',
  },
  'Express': {
    name: 'Express',
    iconSrc: '/icons/tech/express.svg',
    color: '#000000', darkColor: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.35)',
  },
  'REST API': {
    name: 'REST API',
    iconSrc: '/icons/tech/restapi.svg',
    color: '#FF6C37',
    glow: 'rgba(255, 108, 55, 0.45)',
  },
  'PostgreSQL': {
    name: 'PostgreSQL',
    iconSrc: '/icons/tech/postgresql.svg',
    color: '#4169E1',
    glow: 'rgba(65, 105, 225, 0.45)',
  },
  'MySQL': {
    name: 'MySQL',
    iconSrc: '/icons/tech/mysql.svg',
    color: '#4479A1',
    glow: 'rgba(68, 121, 161, 0.45)',
  },
  'Prisma': {
    name: 'Prisma',
    iconSrc: '/icons/tech/prisma.svg',
    color: '#5A67D8', darkColor: '#ffffff',
    glow: 'rgba(90, 103, 216, 0.45)',
  },
  'Redis': {
    name: 'Redis',
    iconSrc: '/icons/tech/redis.svg',
    color: '#DC382D',
    glow: 'rgba(220, 56, 45, 0.45)',
  },
  'Git': {
    name: 'Git',
    iconSrc: '/icons/tech/git.svg',
    color: '#F05032',
    glow: 'rgba(240, 80, 50, 0.45)',
  },
  'Docker': {
    name: 'Docker',
    iconSrc: '/icons/tech/docker.svg',
    color: '#2496ED',
    glow: 'rgba(36, 150, 237, 0.45)',
  },
  'Vercel': {
    name: 'Vercel',
    iconSrc: '/icons/tech/vercel.svg',
    color: '#000000', darkColor: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.35)',
  },
  'Figma': {
    name: 'Figma',
    iconSrc: '/icons/tech/figma.svg',
    color: '#F24E1E',
    glow: 'rgba(242, 78, 30, 0.45)',
  },
  'Vite': {
    name: 'Vite',
    iconSrc: '/icons/tech/vite.svg',
    color: '#646CFF',
    glow: 'rgba(100, 108, 255, 0.45)',
  },
};

export const defaultTechIcon: TechIconDefinition = {
  name: 'Code',
  iconSrc: '/icons/tech/typescript.svg',
  color: '#71717a',
  glow: 'rgba(113, 113, 122, 0.3)',
};
