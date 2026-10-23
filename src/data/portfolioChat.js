import { personalInfo } from './personalInfo'
import { experiences } from './experience'
import { projects } from './projects'
import { educationList } from './education'
import { allSkills } from './skills'

export const welcomeMessage = {
  role: 'assistant',
  text: 'Hey there! I’m Kartik’s portfolio guide. Want to explore his work, skills, or the story so far?',
}

export function getPortfolioReply(input) {
  const question = input.toLowerCase().trim()
  if (/\b(art|creative|lab|images|videos|films)\b/.test(question)) return { text: 'The AI Creative Lab is in progress. It will bring together AI imagery, short films, and creative experiments. The gallery is ready for its first collection.', link: '/ai-lab', label: 'Visit the creative lab' }
  if (/\b(github|contributions|commits)\b/.test(question)) return { text: 'Explore Kartik’s GitHub contribution calendar and public repositories in the activity section.', link: '#github', label: 'See GitHub activity' }
  const project = projects.find(item => question.includes(item.title.toLowerCase()))
  if (project) return { text: `${project.title} — ${project.description}\nBuilt with ${project.tags.join(', ')}.`, link: '#projects', label: 'Explore projects' }
  if (/\b(resume|cv)\b/.test(question)) return { text: 'You can download Kartik’s resume here, including his experience, education, and technical skills.', link: personalInfo.resumeUrl, label: 'Download resume', download: true }
  if (/\b(contact|email|hire|hiring|available|availability|connect)\b/.test(question)) return { text: `${personalInfo.availability}. You can reach him at ${personalInfo.email}. He’s based in ${personalInfo.location}.`, link: '#contact', label: 'Let’s connect' }
  if (/\b(journey|experience|work|job|internship|career)\b/.test(question)) return { text: `Currently ${experiences[0].role} at ${experiences[0].company}. Before that, he built his skills at ${experiences.slice(1).map(item => item.company).join(', ')}.`, link: '#experience', label: 'Explore the journey' }
  if (/\b(project|projects|built|building|portfolio)\b/.test(question)) return { text: `A few things Kartik has built: ${projects.map(item => item.title).join(', ')}. Ask me about a project by name to learn more.`, link: '#projects', label: 'See the projects' }
  if (/\b(skill|skills|stack|tech|technologies|react|backend|frontend|code|coding)\b/.test(question)) return { text: `His toolkit includes ${[...new Set(allSkills.map(item => item.name))].slice(0, 16).join(', ')}. Explore the skills section for the full stack, including databases, AI tools, and deployment.`, link: '#skills', label: 'Explore the toolkit' }
  if (/\b(education|degree|college|study|studied|gpa)\b/.test(question)) return { text: `${educationList[0].degree} at ${educationList[0].institution}, ${educationList[0].university}. GPA: ${educationList[0].gpa}.`, link: '#education', label: 'Education & credentials' }
  if (/\b(hello|hi|hey|about|who|info|kartik)\b/.test(question)) return { text: `${personalInfo.name} is a ${personalInfo.role} based in ${personalInfo.location}. ${personalInfo.shortBio}`, link: '#experience', label: 'Meet Kartik' }
  return { text: 'I can help with the information in this portfolio: projects, skills, experience, education, a resume, or contact details. Try “What projects has Kartik built?”' }
}
