

export default function decorate(block) {
  // Get style and spacing values from block data
  //const style = block.querySelector('select[data-style]')?.value || '';
  //const spacing = block.querySelector('select[data-spacing]')?.value || '';
  const style = block.querySelectorAll('.separator > div')[0]?.textContent?.trim();
  const spacing = block.querySelectorAll('.separator > div')[1]?.textContent?.trim();
  //block.querySelectorAll('.separator > div');

  // Create separator line with classes
  const separatorClasses = ['separator-line'];
  if (style) separatorClasses.push(style);
  if (spacing) separatorClasses.push(spacing);

  // Create wrapper div and add separator line
  const wrapper = document.createElement('div');
  wrapper.className = 'separator-block';
  wrapper.innerHTML = `<div class="${separatorClasses.join(' ')}"></div>`;

  // Replace block content with wrapper
  block.textContent = '';
  block.appendChild(wrapper);
}