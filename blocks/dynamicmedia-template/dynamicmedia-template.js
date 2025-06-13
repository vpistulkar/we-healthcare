
/**
 * @param {HTMLElement} $block
 */
export default function decorate(block) {
  console.log(block);

  let inputs = block.querySelectorAll('.dynamicmedia-template > div');
  
  let configSrc = Array.from(block.children)[0]?.textContent?.trim(); //inline or cf

  
  if(configSrc === 'inline'){
    // Get DM Url input
    let templateURL = inputs[1]?.textContent?.trim();
    let variablemapping = inputs[2]?.textContent?.trim();

    if(!templateURL) {
      console.log("Missing mandatory template URL");
      return;
    }

    if (variablemapping) {
      // Step 1: Convert to key-value object
      const paramPairs = variablemapping.split(',');
      const paramObject = {};

      paramPairs.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
          paramObject[key.trim()] = decodeURIComponent(value.trim());
        }
      });

      // Manually construct the query string (preserving `$` in keys)
      const queryString = Object.entries(paramObject)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      // Combine with template URL (already includes ? or not)
      let finalUrl = templateURL.includes('?') 
        ? `${templateURL}&${queryString}` 
        : `${templateURL}?${queryString}`;

      console.log("Final URL:", finalUrl);

      if (finalUrl) {
        const finalImg = document.createElement('img');
        Object.assign(finalImg, {
          className: 'dm-template-image',
          src: finalUrl,
          alt: 'dm-template-image',
        });
        block.innerHTML = '';
        block.append(finalImg);
      }
    }
  } if(configSrc === 'cf'){

    
   
  }
   
}
