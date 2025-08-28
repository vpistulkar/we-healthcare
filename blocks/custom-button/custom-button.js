import { div, a, span } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const children = [...block.children];
  
  const linkDiv = children[0];
  const linkElement = linkDiv?.querySelector('a');
  const buttonLink = linkElement?.href || '#';
  
  const labelDiv = children[1];
  const labelElement = labelDiv?.querySelector('p');
  const buttonLabel = labelElement?.textContent?.trim() || 'Button';
  
  const styleDiv = children[2];
  const styleElement = styleDiv?.querySelector('p');
  const buttonStyle = styleElement?.textContent?.trim() || 'default-button';
  
  const buttonElement = div({ class: `button-container ${buttonStyle}` },
    a({ href: buttonLink, class: 'button' },
      span({ class: 'button-text' }, buttonLabel)
    )
  );
  
  block.innerHTML = '';
  block.appendChild(buttonElement);
}
