import style from './Entry.module.css';
import alwinsdenIcon from '../../public/alwinsden-icon.svg';

const navLinks = [
  { label: 'WHO AM I?', href: '/alwin' },
  { label: 'ARTICLES', href: '#articles' },
  { label: 'GITHUB', href: 'https://github.com/alwinsden' },
  { label: 'OPEN SOURCE PRODUCTS', href: '#products' },
];

const Entry = () => {
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
        </div>
      </nav>

      <section className={style.hero}>
        <div className={style['hero-inner']}>
          <div className={style['hero-content']}>
            <h1 className={style['hero-headline']}>Better frontend,{'\n'}for the AI age.</h1>
            <div className={style['hero-subtext']}>
              <div className={style['hero-explore']}>
                <p className={style['hero-subtitle']}>
                  We spark curiosity in people about science, humanity and our future on the planet
                  – and the universe we all inhabit. We are fascinated by the world that surrounds
                  us and want to spread our enthusiasm through our work.
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
