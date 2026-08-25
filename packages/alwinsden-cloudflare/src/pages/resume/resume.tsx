import type { MetaFunction } from 'react-router';
import styles from './resume.module.css';
import Entry from '../../components/Entry';

export const meta: MetaFunction = () => [
  { title: 'Resume — alw1nsDen' },
  {
    name: 'description',
    content:
      'Resume of Alwin T — software engineer working across front-end, React Native and multiplatform development.',
  },
  { property: 'og:title', content: 'Resume — alw1nsDen' },
];

type Job = {
  company: string;
  companyNote?: string;
  dates: string;
  roles: {
    title: string;
    dates?: string;
    bullets: string[];
  }[];
};

const workExperience: Job[] = [
  {
    company: 'Myntra',
    dates: '04/2025 - present',
    roles: [
      {
        title: 'Software Engineer',
        bullets: [
          'Built a real-time return-pickup resolution flow on eKart FieldX (Android) enabling on-hold resolution within 2.5 minutes, cutting reattempt rates by 50% and improving image adherence by 37% for ~400k customers/month.',
          'Upgraded manual VM provisioning with a k8s workflow for a legacy application and implemented Vite bundling to enhance caching and CDN performance, while achieving a sub-30-second deployment time.',
          'Overhauled unit testing strategy across the UI monorepo, shifting from integration-heavy tests to pure, isolated spec-based testing — reducing average CI unit test runtime from 120+ minutes to under 5 minutes.',
          'Enhanced reconciliation accuracy on eKart FirstMile android app by introducing online-first architecture with OTP validation. This successfully reduced Cost of Doing Business and increased Seller satisfaction by +3%.',
          'Part of the Large Express 120 min delivery initiative, built systems to support hub manpower allocation. Introduced capability to upload up-to 5k+ records with chunking and parallelization along with handling of resolved failure cases.',
        ],
      },
    ],
  },
  {
    company: 'Dashwave',
    dates: '06/2024 - 04/2025',
    roles: [
      {
        title: 'Front-end Engineer',
        bullets: [
          'Added AI Agent feature to existing workflow, allowing users to utilize the app build engine with extensible features of the AI model.',
          "Implemented Figma design-to-app feature from scratch, with a custom JSON-CSS parser to match Dashwave AI agent's requirements. Further, divided the parsed output into toggleable chunks to reduce AI execution times by nearly 50%.",
          'Upgraded the existing Android emulation device in the platform with a higher-resolution variant, achieving a visual gain of nearly 10%. Worked across multiple verticals involving Docker deployment, instance management, the Genymobile/scrcpy streaming library, and orchestration with Nomad.',
          'Developed WebRTC-based live iOS simulation streaming at nearly 60fps, deployed a private NPM library to manage UI elements.',
        ],
      },
      {
        title: 'Engineering Intern',
        dates: '03/2024 - 05/2024',
        bullets: [
          'Designed and executed automated CI/CD pipelines with GitHub Actions, including multi-environment deployments to AWS CloudFront, resulting in reductions of costs by nearly 90% compared to previous Vercel-based deployment.',
          'Led the integration of advanced configurations and platform-specific builds in frontend, optimizing iOS and Android deployment pipelines, with implementation of highly customizable workflows and in-browser bug fixing capability.',
        ],
      },
    ],
  },
  {
    company: 'XR Open Source Fellowship',
    companyNote: ' @ The Hacedor',
    dates: '04/2023 - 07/2023',
    roles: [
      {
        title: 'Project Partner (AR dev intern)',
        bullets: [
          'Selected as one of the top 1% from over 10,000 applicants across India for this prestigious fellowship program focused on emerging XR technologies with central focus on building for the Metaverse.',
          'Spearheaded development of key interactive features for the Virtual Fashion Galleria project, a 3D platform enabling real-time customization of metaverse-ready fashion items, effectively a tool for faster collaboration between fashion designers.',
          'Implemented WebGL-based rendering solutions using React-Three-Fiber that improved visualization performance.',
          'Developed responsive UI components with React that helped increase accessibility across multiple devices.',
        ],
      },
    ],
  },
  {
    company: 'Clientell',
    dates: '10/2021 - 04/2023',
    roles: [
      {
        title: 'Front-end developer intern',
        bullets: [
          "Implemented forecast changes feature for Rolled-up Sales Forecasting module, resulting in a 20% improvement in accuracy and reduction in forecasting errors. Developed and integrated Manual Sync functionality, reducing data synchronization time between Salesforce and organization's database by 30%.",
          "Revamped the company's main website and added Revenue Leakage, RevOps Team Size and Cost Benefit calculators.",
        ],
      },
    ],
  },
];

const ResumePage = () => {
  return (
    <div className={styles['resume-entry']}>
      <h1 className={styles['page-title']}>RESUME</h1>
      <div className={styles['contact-row']}>
        <a
          href="https://github.com/alwinsDen"
          className={styles['contact-link']}
          target="_blank"
          rel="noreferrer"
        >
          github.com/alwinsDen
        </a>
        <a
          href="https://www.linkedin.com/in/alwinsden/"
          className={styles['contact-link']}
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/alwinsden
        </a>
      </div>

      <div className={styles.section}>
        <p className={styles['section-label']}>EDUCATION</p>
        <div className={styles['entry-header']}>
          <div>
            <h2 className={styles['entry-company']}>P.E.S College of Engineering, Mandya</h2>
            <p className={styles['entry-role']}>
              Candidate for Bachelor of Engineering in Mechanical Engineering
            </p>
          </div>
          <div className={styles['entry-meta']}>
            <p className={styles['entry-meta-line']}>2020 - 2024</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles['section-label']}>WORK EXPERIENCE</p>
        {workExperience.map(job => (
          <div key={job.company} className={styles['job-block']}>
            <div className={styles['entry-header']}>
              <div>
                <h2 className={styles['entry-company']}>
                  {job.company}
                  {job.companyNote && (
                    <span className={styles['entry-company-note']}>{job.companyNote}</span>
                  )}
                </h2>
                <p className={styles['entry-role']}>{job.roles[0].title}</p>
              </div>
              <div className={styles['entry-meta']}>
                <p className={styles['entry-meta-line']}>{job.dates}</p>
              </div>
            </div>
            {job.roles[0].dates && (
              <div className={styles['entry-header']}>
                <div>
                  <h2 className={styles['entry-company']}>{job.roles[0].title}</h2>
                </div>
                <div className={styles['entry-meta']}>
                  <p className={styles['entry-meta-line']}>{job.roles[0].dates}</p>
                </div>
              </div>
            )}
            <ul className={styles.bullets}>
              {job.roles[0].bullets.map((bullet, i) => (
                <li key={i} className={styles['bullet-item']}>
                  {bullet}
                </li>
              ))}
            </ul>
            {job.roles.slice(1).map(role => (
              <div key={role.title} className={styles['role-block']}>
                <div className={styles['entry-header']}>
                  <div>
                    <h2 className={styles['entry-company']}>{role.title}</h2>
                  </div>
                  <div className={styles['entry-meta']}>
                    <p className={styles['entry-meta-line']}>{role.dates}</p>
                  </div>
                </div>
                <ul className={styles.bullets}>
                  {role.bullets.map((bullet, i) => (
                    <li key={i} className={styles['bullet-item']}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <p className={styles['section-label']}>PROJECT EXPERIENCE</p>
        <div className={styles['entry-header']}>
          <div>
            <h2 className={styles['entry-company']}>
              MomentumX Fashion Galleria (Web-based 3D editor){' '}
              <a
                href="https://github.com/alwinsDen/XROS23-fashion-artist"
                className={styles['entry-link']}
                target="_blank"
                rel="noreferrer"
              >
                github
              </a>{' '}
              <a
                href="https://youtu.be/dNnB43yC0T0"
                className={styles['entry-link']}
                target="_blank"
                rel="noreferrer"
              >
                demo
              </a>
            </h2>
            <p className={styles['entry-role']}>
              Created as part of the XR Open Source Fellowship 2023.
            </p>
          </div>
          <div className={styles['entry-meta']}>
            <p className={styles['entry-meta-line']}>07/2023</p>
          </div>
        </div>
        <ul className={styles.bullets}>
          <li className={styles['bullet-item']}>
            AR experience for fashion designers to upload a 3D fashion model and project it into
            their real environment with AR functionality.
          </li>
          <li className={styles['bullet-item']}>
            In-editor editing: modify model parts, apply custom materials and add annotations
            directly on the model.
          </li>
          <li className={styles['bullet-item']}>
            Sharing workflow for designers to collaborate with peers, plus a custom HD render
            export feature.
          </li>
          <li className={styles['bullet-item']}>
            Built with <em>React Three Fiber</em>, <em>TypeScript</em> and <em>styled-components</em>.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <p className={styles['section-label']}>SKILLS &amp; INTERESTS</p>
        <p className={styles['skills-text']}>
          <strong>Computer:</strong> Javascript, Typescript, React Native, Kubernetes, Node, React,
          Golang, Nomad, Kotlin Multiplatform, Python, Docker.
        </p>
      </div>
    </div>
  );
};

export default () => <Entry children={<ResumePage />} backgroundColor="#fff" />;
