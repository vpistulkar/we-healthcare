

export default function decorate(block) {
  // Get style and spacing values from block data
  const style = block.querySelector('select[data-style]')?.value || '';
  const spacing = block.querySelector('select[data-spacing]')?.value || '';

  // Create separator line with classes
  const separatorClasses = ['separator-line'];
  if (style) separatorClasses.push(style);
  if (spacing) separatorClasses.push(spacing);

  // Create wrapper div and add separator line
  const wrapper = document.createElement('div');
  wrapper.className = 'separator-wrapper';
  wrapper.innerHTML = `<div class="${separatorClasses.join(' ')}"></div>`;

  // Replace block content with wrapper
  block.textContent = '';
  block.appendChild(wrapper);
}