import { useEffect, useState } from 'react';
import Typewriter from './components/typewriter';
import { ArticleRegex, CHALLENGE_URL, DivRegex, SectionRegex } from './lib/constants';

async function parseFlag() {
  const FlagBuilder: Array<string> = [];

  const res = await fetch(CHALLENGE_URL);
  const HTML = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(HTML, 'text/html');

  doc.querySelectorAll('section')
    .forEach((section) => {
      const dataIdValue = section.attributes['data-id'].value;

      if (SectionRegex.test(dataIdValue)) {
        section.querySelectorAll('article')
          .forEach((article) => {
            const dataClassValue = article.attributes['data-class'].value;

            if (ArticleRegex.test(dataClassValue)) {
              article.querySelectorAll('div')
                .forEach((div) => {
                  const dataTagValue = div.attributes['data-tag'].value;

                  if (DivRegex.test(dataTagValue)) {
                    div.querySelectorAll('b')
                      .forEach((b) => {
                        if (b.classList.contains('ref')) {
                          const value = b.attributes.value.value;

                          FlagBuilder.push(value);
                        }
                      });
                  };
                });
            }
          });
      }
    });

  const flagUrl = FlagBuilder.join('');
  const resFlag = await fetch(flagUrl);
  const flag = await resFlag.text();

  return flag;
}

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
