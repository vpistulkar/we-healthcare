import { readBlockConfig } from '../../scripts/aem.js';
import { div, a, span } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  // Read configuration from the block
  const properties = readBlockConfig(block);
  
  // Extract properties with defaults
  const buttonLink = properties.link || '#';
  const buttonLabel = properties.label || 'Button';
  const buttonStyle = properties.style || 'default-button';
  
  // Create the button element
  const buttonElement = div({ class: 'button-container' },
    a({ href: buttonLink, class: `button ${buttonStyle}` },
      span({ class: 'button-text' }, buttonLabel)
    )
  );
  
  // Clear the block and append the new button
  block.innerHTML = '';
  block.appendChild(buttonElement);
}
