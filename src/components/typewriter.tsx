import { useState } from 'react';
import { useTimeout } from '../lib/hooks';

interface Props {
  flag: string;
}

interface CharProps {
  delay: number;
  character: string;
}

function Char({ delay, character }: CharProps) {
  const [show, setShow] = useState(false);

  useTimeout(() => {
    setShow(!show);
  }, delay);

  return (
    <span style={{ display: show ? 'inline' : 'none' }}>{character}</span>
  );
}

export default function Typewriter({ flag }: Props) {
  const flagList = flag.split('');

  return (
    <p style={{ fontFamily: 'monospace' }}>
      {flagList.map((char, idx) => (
        <Char key={`${char}-${idx}`} character={char} delay={idx * 500} />
      ))}
    </p>
  );
}
