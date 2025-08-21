import { getMetadata } from '../../scripts/aem.js';
import { isAuthorEnvironment, moveInstrumentation } from '../../scripts/scripts.js';
import { readBlockConfig } from '../../scripts/aem.js';

/**
 *
 * @param {Element} block
 */
export default async function decorate(block) {
	const properties = readBlockConfig(block);
  console.log("properties enableunderline:"+properties.enableunderline);
 /*
  block.innerHTML = `<div class='banner-content block ${displayStyle}' data-aue-resource=${itemId} data-aue-label="Offer Content fragment" data-aue-type="reference" data-aue-filter="contentfragment" style="${bannerContentStyle}">
    <div class='banner-detail' style="${bannerDetailStyle}" data-aue-prop="bannerimage" data-aue-label="Main Image" data-aue-type="media" >
          <p data-aue-prop="title" data-aue-label="Title" data-aue-type="text" class='cftitle'>${cfReq?.title}</p>
          <p data-aue-prop="cfsubtitle" data-aue-label="SubTitle" data-aue-type="text" class='cfsubtitle'>${cfReq?.subtitle}</p>
          
          <p data-aue-prop="cfdescription" data-aue-label="Description" data-aue-type="richtext" class='cfdescription'>${cfReq?.description?.plaintext}</p>
          <a href="${cfReq?.ctaUrl ? cfReq.ctaUrl : '#'}" data-aue-prop="ctaUrl" data-aue-label="Button Link/URL" data-aue-type="reference"  target="_blank" rel="noopener" data-aue-filter="page">
            <span data-aue-prop="ctalabel" data-aue-label="Button Label" data-aue-type="text">
              ${cfReq?.ctalabel}
            </span>
          </a>
      </div>
      <div class='banner-logo'>
      </div>
  </div>`;
  */
        
}
