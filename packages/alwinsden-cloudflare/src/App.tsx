import Entry from './components/Entry';
import MainHero from './pages/mainHero/mainHero';

function App() {
  return <Entry children={<MainHero />} />;
}

export default App;
