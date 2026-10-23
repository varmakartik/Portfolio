import { experiences } from './experience'
import { projects } from './projects'
import { allSkills } from './skills'

// Portfolio totals stay in sync with the published data.
export const personalInfo = {
  name: 'Kartik Ramesh Varma',
  firstName: 'Kartik',
  lastName: 'Varma',
  role: 'Full-Stack Web Developer',
  roles: [
    'Full-Stack Web Developer',
    'React & Next.js Expert',
    'Node.js & API Engineer',
    'AI & Automation Enthusiast',
  ],
  bio: 'Passionate Full Stack Developer with practical experience designing and building real-world web applications. Specializing in high-performance web systems using React, Next.js, Node.js, and databases.',
  shortBio: 'Building responsive, secure, and performant web applications.',
  location: 'Mumbai, India',
  email: 'kartikvarma.dev@gmail.com',
  phone: '+91 9082165766',
  availability: 'Open to opportunities',
  resumeUrl: '/Resume_4.0_Kartik.pdf',
  avatar: '/profile_photo.jpg',
  socials: {
    github: 'https://github.com/varmakartik',
    linkedin: 'https://linkedin.com/in/kartikvarma200430',
    twitter: '/',
    youtube: 'https://youtube.com/@kartikverse30',
    instagram: 'https://instagram.com/ig_crosser',
  },
  stats: [
    { label: 'Roles & Internships', value: experiences.length, suffix: '' },
    { label: 'Selected Projects', value: projects.length, suffix: '' },
    { label: 'B.Sc. CS GPA', value: 8.35, suffix: '/10' },
    { label: 'Technologies', value: new Set(allSkills.map(skill => skill.name)).size, suffix: '' },
  ],
}
