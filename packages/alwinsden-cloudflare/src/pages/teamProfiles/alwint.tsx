import styles from './alwint.module.css';
import Work_Icon_1 from '../../assets/logos/past_work_experience/image_1.png';
import Work_Icon_2 from '../../assets/logos/past_work_experience/image_2.png';
import Work_Icon_3 from '../../assets/logos/past_work_experience/image_3.png';
import Work_Icon_4 from '../../assets/logos/past_work_experience/image_4.png';
import AlwinProfile from '../../assets/profiles/alwin.png';
import Pluribus from '../../assets/backgrounds/pluribus.png';
import { Mail, Paperclip } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import Entry from '../../components/Entry';

const AlwinT = () => {
  return (
    <div className={styles['alwin-entry']}>
      <div className={styles['header-row']}>
        <div className={styles['header-first-half']}>
          <p className={styles['bio-text']}>
            I got my start in open source through the XR Open Source Fellowship in 2023—and I've
            been hooked ever since. Professionally, I've had the opportunity to work with three
            startups in both intern and full-time roles, primarily focusing on UI development and
            front-end magic. Beyond code, I'm deeply passionate for 3D tech and love bringing ideas
            to life through Blender. I live at the intersection of creativity and code—and I'm
            always exploring what's next.
          </p>

          <div className={styles.section}>
            <p className={styles['section-label']}>WORKED HERE:</p>
            <Marquee speed={200} gradient={false}>
              {[Work_Icon_1, Work_Icon_2, Work_Icon_3, Work_Icon_4].map((icon, i) => (
                <img key={i} src={icon} className={styles['marquee-icon']} />
              ))}
            </Marquee>
          </div>

          <div className={styles.section}>
            <p className={styles['section-label']}>SOME THINGS I WROTE AND DEMOS:</p>
            <a
              href="https://docs.alwinsden.com/articles/compose-previews"
              className={styles['article-link']}
              target="_blank"
            >
              *Compose Previews - A Relaxed Development.
            </a>
            <a
              href="https://docs.alwinsden.com/articles/kmp-gauth-multiplatform"
              className={styles['article-link']}
              target="_blank"
            >
              *The KMP Way - GAuth for Android
            </a>
            <a
              href="https://youtu.be/dNnB43yC0T0"
              className={styles['article-link']}
              target="_blank"
            >
              *XR Open Source MomentumX demo
            </a>
          </div>

          <div className={styles.section}>
            <p className={styles['section-label']}>ABSOLUTELY INSPIRED BY COLORS OF:</p>
            <img src={Pluribus} width={'100%'} />
          </div>
        </div>
        <figure className={styles['profile-figure']}>
          <img src={AlwinProfile} className={styles['profile-image']} />
          <figcaption className={styles['profile-caption']}>
            From Flipkart’s FSG UI team outing ~ Krabi (Thailand)
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default () => <Entry children={<AlwinT />} backgroundColor="#fff" />;
