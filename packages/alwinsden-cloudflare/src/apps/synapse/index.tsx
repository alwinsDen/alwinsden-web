import type { MetaFunction } from 'react-router';
import { AlwinsDenRepeat } from '../../components/articleBackgrounds/alwinsDenRepeat';
import IntroImage1 from './assets/intro_1.png';

import style from './index.module.css';

export const meta: MetaFunction = () => [
  { title: 'Project Synapse — alw1nsDen' },
  {
    name: 'description',
    content:
      'Experimental Compose Multiplatform UI: one codebase for Android and iOS, with Ktor auth and Claude API integration.',
  },
  { property: 'og:title', content: 'Project Synapse — alw1nsDen' },
];

const SynapseUI = () => {
  return (
    <AlwinsDenRepeat>
      <div
        style={{
          display: 'flex',
          gap: 20,
          marginTop: '10px',
          width: '605px',
        }}
        className={style.synapse_header}
      >
        <div>
          <h1>Project Synapse</h1>
          <br></br>
          <p>
            Project Synpase is an experimental UI test for Compose Multplatform, which is a subset
            of Kotlin Multiplatform. This current setup includes:
          </p>
          <br />
          <ul>
            <li>ComposeApp for Android and iOS using a singular UI code.</li>
            <li>Ktor framework for setting up authentication & integration of Claude APIs.</li>
          </ul>
        </div>
        <div
          style={{
            borderLeft: '1px solid #000000',
            paddingLeft: '15px',
          }}
        >
          <img src={IntroImage1} width={200} className={style.imageRadius} />
        </div>
      </div>
    </AlwinsDenRepeat>
  );
};

export default SynapseUI;
