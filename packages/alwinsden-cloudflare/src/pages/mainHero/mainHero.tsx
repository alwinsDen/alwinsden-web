import style from './mainHero.module.css';
import alwinsdenIcon from '../../assets/alwinsden-icon.svg';
import { WebButton } from '@alwinsden-unified-ui/web-ui';

const MainHero = () => {
  return (
    <section className={style.hero}>
      <div className={style['hero-inner']}>
        <div className={style['hero-content']}>
          <h1 className={style['hero-headline']}>
            <span style={{ whiteSpace: 'nowrap' }}>
              <span className={style['special-span']}>Better</span> frontend,
            </span>
            <br />
            for the AI age.
          </h1>
          <div className={style['hero-subtext']}>
            <div className={style['hero-explore']}>
              <p className={style['hero-subtitle']}>
                Frontend engineering is rapidly evolving in pace with changing AI frontier. LLMs
                have become a daily driver for automating mindless typing, while aiding in mindfully
                focusing on the long-term product architecture.
              </p>
              <WebButton
                className={style['cta-button']}
                onPress={() => window.location.assign('/alwin')}>
                Explore my works →
              </WebButton>
            </div>
            <div className={style['hero-icon']}>
              <img src={alwinsdenIcon} alt="alwinsDen" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
