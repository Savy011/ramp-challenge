import { useEffect, useState } from 'react';
import { ArticleRegex, DivRegex, SectionRegex, CHALLENGE_URL } from './lib/constants';
import './App.css';

async function parseFlag() {
  let FlagBuilder: Array<string> = [];

  const res = await fetch(CHALLENGE_URL);
  const HTML = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(HTML, 'text/html');

  console.log(doc)
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
                      .forEach(b => {
                        if (b.classList.contains('ref')) {
                          const value = b.attributes['value'].value;

                          FlagBuilder.push(value);
                        }
                      })
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
    const word = parseFlag();
    setFlag(word);
  }, []);

  return (
    <>
      <h1>Ramp Challenge</h1>
      {flag === '' ? (
        <p>Loading...</p>
      ) : (
        <p>{flag}</p>
      )}
    </>
  );
}

export default App;
