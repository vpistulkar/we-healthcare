/*
import { patternDecorate } from '../../scripts/blockTemplate.js';

export default async function decorate(block) {
  patternDecorate(block);
}
*/

import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    
    const styleParagraph = row.querySelector('p[data-aue-prop="style"]');
    const cardStyle = styleParagraph?.textContent?.trim() || 'default';
    if (cardStyle && cardStyle !== 'default') {
      li.className = cardStyle;
    }
    
    const ctaStyleParagraph = row.querySelector('p[data-aue-prop="ctastyle"]');
    const ctaStyle = ctaStyleParagraph?.textContent?.trim() || 'default';
  
    // Hide the configuration paragraphs
    if (ctaStyleParagraph) {
      ctaStyleParagraph.style.display = 'none';
    }
    if (styleParagraph) {
      styleParagraph.style.display = 'none';
    }
    
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.querySelector('p[data-aue-prop="style"]') || div.querySelector('p[data-aue-prop="ctastyle"]')) div.className = 'cards-config';
      else if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    
    // Apply CTA styles after content has been moved to li
    const buttonContainers = li.querySelectorAll('p.button-container');
    buttonContainers.forEach(buttonContainer => {
      buttonContainer.classList.add(ctaStyle);
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
 
  block.textContent = '';
  block.append(ul);
}
