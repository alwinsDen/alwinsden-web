import { AlwinsDenRepeat } from '../../components/articleBackgrounds/alwinsDenRepeat';
import IntroImage1 from './assets/intro_1.png';

import style from './index.module.css';
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
      >
        <div>
          <h1>Project Synapse</h1>
          <br></br>
          <p>
            Project Synpase is an experimental UI test for Compose Multplatform, which is a subset
            of Kotlin Multiplatform. This current setup includes:
            <br></br>* ComposeApp for Android and iOS using a singular UI code.
            <br></br>* Ktor framework for setting up authentication & integration of Claude APIs.
          </p>
        </div>
        <div
          style={{
            borderLeft: '1px solid #000000',
            paddingLeft: '15px',
          }}
        >
          <img src={IntroImage1} width={300} className={style.imageRadius} />
        </div>
      </div>
    </AlwinsDenRepeat>
  );
};

export default SynapseUI;
