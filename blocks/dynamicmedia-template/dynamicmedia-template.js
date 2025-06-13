
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

      // Step 2: Append as query params to templateURL
      const finaldmurl = new URL(templateURL);
      Object.entries(paramObject).forEach(([key, value]) => {
        finaldmurl.searchParams.append(key, value);
      });

      console.log("Final URL:", finaldmurl.toString());
    }

    const finalImg = document.createElement('img');
    Object.assign(finalImg, {
      className: 'dm-template-image',
      src: finaldmurl.toString(),
      alt: 'dm-template-image',
    });
    
    block.append(finalImg);
  } if(configSrc === 'cf'){

    
   
  }
  block.children[0]?.remove();
  block.children[1]?.remove();
  block.children[2]?.remove();
  block.children[3]?.remove();
  block.children[4]?.remove();  
}
