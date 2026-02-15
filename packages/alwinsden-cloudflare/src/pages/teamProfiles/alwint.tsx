import styles from './alwint.module.css';
import { AlwinsDenRepeat } from '../../components/articleBackgrounds/alwinsDenRepeat';
import alwinsdenIcon from '../../../public/alwinsden-icon.svg';
import AlwinProfile from '../../assets/profiles/alwin.png';
import CombinedIcons from '../../assets/logos/combined-logos.png';
import Pluribus from '../../assets/backgrounds/pluribus.png';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import type { ISocials } from '../../commons/commonsTypes';
const AlwinT = () => {
  const socials: ISocials[] = [
    {
      icon: (
        <Github
          color="#000000"
          size={17}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            window.open('http://github.com/alwinsDen');
          }}
        />
      ),
      name: 'alwinsDen',
      url: 'http://github.com/alwinsDen',
    },
    {
      icon: (
        <Linkedin
          color="#000000"
          size={17}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            window.open('http://linkedin.com/in/alwinsden');
          }}
        />
      ),
      name: 'alwin-t',
      url: 'http://linkedin.com/in/alwinsden',
    },
    {
      icon: (
        <Twitter
          color="#000000"
          size={17}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            window.open('http://x.com/alwinsDen');
          }}
        />
      ),
      name: 'x.com/alwinsDen',
      url: 'http://x.com/alwinsDen',
    },
  ];
  return (
    <AlwinsDenRepeat>
      <div className={styles['alwin-entry']}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            style={{
              width: '253px',
            }}
            src={alwinsdenIcon}
            alt="KMP Client"
            width={400}
          />
          <p
            style={{
              fontSize: '60px',
            }}
          >
            alw<span>1</span>nsDen.com
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '15px',
          }}
        >
          <p
            style={{
              fontSize: '18px',
              textAlign: 'justify',
              fontWeight: 400,
            }}
          >
            I got my start in open source through the XR Open Source Fellowship in 2023—and I've
            been hooked ever since. Professionally, I’ve had the opportunity to work with three
            startups in both intern and full-time roles, primarily focusing on UI development and
            front-end magic. Beyond code, I’m deeply passionate for 3D tech and love bringing ideas
            to life through Blender. I live at the intersection of creativity and code—and I’m
            always exploring what’s next.
          </p>
          <img
            src={AlwinProfile}
            style={{
              width: '175px',
              height: '173px',
            }}
          />
        </div>
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <p style={{ fontSize: '18px' }}>Tried these:</p>
          <img
            src={CombinedIcons}
            style={{
              height: 'auto',
              maxHeight: '60px',
              width: 'auto',
              alignSelf: 'flex-start',
            }}
          />
        </div>
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <p style={{ fontSize: '18px' }}>Reach out at:</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <p style={{ fontSize: '18px' }}>
                <span style={{ fontFamily: 'eb-garamond', textDecoration: 'underline' }}>
                  @alwinsden
                </span>{' '}
                <span style={{ fontWeight: 600, fontFamily: 'eb-garamond', marginRight: 6 }}>
                  on
                </span>{' '}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '11px',
                  alignItems: 'center',
                }}
              >
                {socials.map(vls => {
                  return vls.icon;
                })}
              </div>
            </div>
            <p>|</p>
            <a
              href="mailto:alwintv5018@gmail.com"
              style={{
                fontSize: '18px',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Mail size={19} style={{ marginRight: '5px' }} /> <p>alwintv5018@gmail.com</p>
            </a>
          </div>
        </div>
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <p style={{ fontSize: '18px' }}>Some things I wrote & demos:</p>
          <a
            href="https://docs.alwinsden.com/articles/kmp-gauth-multiplatform"
            style={{ fontSize: '18px' }}
            target="_blank"
          >
            * The KMP Way - GAuth for Android
          </a>
          <a href="https://youtu.be/dNnB43yC0T0" style={{ fontSize: '18px' }} target="_blank">
            * XR Open Source MomentumX demo
          </a>
        </div>
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <p style={{ fontSize: '18px' }}>Absolutely inspired by colors of:</p>
          <img src={Pluribus} width={'100%'} />
        </div>
        <div
          style={{
            marginTop: '24px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '6px',
            fontSize: '18px',
          }}
        >
          <a href="https://docs.alwinsden.com/articles" target="_blank">
            articles
          </a>
          <p>|</p>
          <a href="/alwin" target="_blank">
            about
          </a>
        </div>
      </div>
    </AlwinsDenRepeat>
  );
};

export default AlwinT;
