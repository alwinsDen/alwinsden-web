import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import style from './Entry.module.css';
import alwinsdenIcon from '../../public/alwinsden-icon.svg';

const navLinks = [
  { label: 'WHO AM I?', href: '/alwin' },
  { label: 'ARTICLES', href: '#articles' },
  { label: 'GITHUB', href: 'https://github.com/alwinsden' },
  { label: 'OPEN SOURCE PRODUCTS', href: '#products' },
];

const Entry = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={style.page}>
      <nav className={style.navbar}>
        <div className={style['navbar-inner']}>
          <span className={style.logo}>
            alw<i className={style['inner-i']}>1</i>nsDen.com
          </span>
          <div className={style['nav-links']}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className={style['nav-link']}>
                {link.label}
              </a>
            ))}
          </div>
          <button className={style.hamburger} onClick={() => setMobileMenuOpen(true)}>
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={style['mobile-menu']}>
          <div className={style['mobile-menu-header']}>
            <span className={style['logo']}>
              alw<i className={style['inner-i']}>1</i>nsDen.com
            </span>
            <button className={style['mobile-menu-close']} onClick={() => setMobileMenuOpen(false)}>
              <X size={26} strokeWidth={1.5} />
            </button>
          </div>
          <div className={style['mobile-menu-links']}>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={style['mobile-menu-link']}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.label}</span>
                <ArrowRight size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      )}

      <section className={style.hero}>
        <div className={style['hero-inner']}>
          <div className={style['hero-content']}>
            <h1 className={style['hero-headline']}>
              <span style={{ whiteSpace: 'nowrap' }}>Better frontend,</span>
              <br />
              for the AI age.
            </h1>
            <div className={style['hero-subtext']}>
              <div className={style['hero-explore']}>
                <p className={style['hero-subtitle']}>
                  We ignite wonder in developers about interfaces, logic and our future on the web –
                  and the digital realms we all build. We are fascinated by the code that connects
                  us and want to share our passion through our craft.
                </p>
                <a href="/alwin" className={style['cta-button']}>
                  Explore my work →
                </a>
              </div>
              <div className={style['hero-icon']}>
                <img src={alwinsdenIcon} alt="alwinsDen" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={style.footer}>
        <div className={style['footer-inner']}>
          <span className={style['footer-logo']}>
            alw<i className={style['inner-i']}>1</i>nsDen.com
          </span>
          <div className={style['footer-links']}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className={style['footer-link']}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Entry;
