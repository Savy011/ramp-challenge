import { ArticleRegex, CHALLENGE_URL, DivRegex, SectionRegex } from './constants';

export async function parseFlag() {
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
