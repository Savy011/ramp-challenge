import { useEffect, useState } from 'react';
import { HTML } from './lib/challenge';
import { ArticleRegex, DivRegex, SectionRegex } from './lib/constants';
import './App.css';

function parseFlag() {
  let FlagBuilder: Array<string> = [];

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
  const word = fetch(flagUrl).then(res => res.text()) 

  return word;
}

function App() {
  const [flag, setFlag] = useState('');
  useEffect(() => {
    const word = parseFlag();
    setFlag(word);
  }, []);

  return (
    <>
      <h1>Ramp</h1>
      {flag === '' ? (
        <p>Loading...</p>
      ) : (
        <p>{flag}</p>
      )}
    </>
  );
}

export default App;
