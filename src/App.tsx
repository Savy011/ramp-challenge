import { useEffect, useState } from 'react';
import Typewriter from './components/typewriter';
import { parseFlag } from './lib/script';

function App() {
  const [flag, setFlag] = useState('');

  useEffect(() => {
    (async () => {
      const word = await parseFlag();
      setFlag(word);
    })();
  }, []);

  return (
    <>
      <h1>Ramp Challenge</h1>
      {flag === ''
        ? (
            <p>Loading...</p>
          )
        : (
            <Typewriter flag={flag} />
          )}
    </>
  );
}

export default App;
