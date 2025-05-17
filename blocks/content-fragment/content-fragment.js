import { getMetadata } from '../../scripts/aem.js';
import { isAuthorEnvironment, moveInstrumentation } from '../../scripts/scripts.js';

/**
 *
 * @param {Element} block
 */
export default async function decorate(block) {
	const hostname = getMetadata('hostname');	
  const aemauthorurl = getMetadata('authorurl') || '';
	
  const aempublishurl = hostname?.replace('author', 'publish')?.replace(/\/$/, '');  
	
	//const aempublishurl = getMetadata('publishurl') || '';
	
  const persistedquery = '/graphql/execute.json/wknd-universal/CTAByPath';
  const contentPath = block.querySelector(':scope div:nth-child(1) > div a')?.textContent?.trim();
  const variationname = block.querySelector(':scope div:nth-child(2) > div')?.textContent?.trim()?.toLowerCase()?.replace(' ', '_') || 'master';
  block.innerHTML = '';
  const isAuthor = isAuthorEnvironment();
  const url = window?.location?.origin?.includes('author')
    ? `${aemauthorurl}${persistedquery};path=${contentPath};variation=${variationname};ts=${
        Math.random() * 1000
      }`
    : `${aempublishurl}${persistedquery};path=${contentPath};variation=${variationname};ts=${
        Math.random() * 1000
      }`;
  const options = { credentials: 'include' };

  const cfReq = await fetch(url, options)
    .then((response) => response.json())
    .then((contentfragment) => {
      let offer = '';
      if (contentfragment.data) {
        offer = contentfragment.data[Object.keys(contentfragment.data)[0]].item;
      }
      return offer;
    });
  const itemId = `urn:aemconnection:${contentPath}/jcr:content/data/${variationname}`;
  block.setAttribute('data-aue-type', 'container');

  const imgUrl = window.location.origin.includes('author')?cfReq.bannerimage._authorUrl:cfReq.bannerimage._publishUrl;
	
	block.innerHTML = `
  <div class='banner-content block' data-aue-resource=${itemId} data-aue-label="Offer Content fragment" data-aue-type="reference" data-aue-filter="contentfragment">
		<div class='banner-detail' style="background-image: linear-gradient(90deg,rgba(0,0,0,0.6), rgba(0,0,0,0.1) 80%) ,url(${
      imgUrl
    });" data-aue-prop="bannerimage" data-aue-label="Main Image" data-aue-type="media" >
          <p data-aue-prop="cftitle" data-aue-label="Title" data-aue-type="text" class='cftitle'>${
            cfReq?.title
          }</p>
          <p data-aue-prop="cfsubtitle" data-aue-label="SubTitle" data-aue-type="text" class='cfsubtitle'>${
           cfReq?.subtitle
          }</p>
					
          <p data-aue-prop="cfdescription" data-aue-label="Description" data-aue-type="richtext" class='cfdescription'>${
            cfReq?.description?.plaintext
          }</p>
					<a href="${cfReq?.ctaUrl ? cfReq.ctaUrl : '#'}" data-aue-prop="ctaUrl" data-aue-label="Button Link/URL" data-aue-type="reference"  target="_blank" rel="noopener" data-aue-filter="page">
					  <span data-aue-prop="ctalabel" data-aue-label="Button Label" data-aue-type="text">
					    ${cfReq?.ctalabel}
					  </span>
					</a>
      </div>
      <div class='banner-logo'>
      </div>
  </div>
	`;
 
	/*
	block.innerHTML = `
  <div class='banner-content block'>
		<div class='banner-detail' style="background-image: linear-gradient(90deg,rgba(0,52,127,0.6), rgba(35,70,120,0.2) 80%) ,url(${
      aemauthorurl + cfReq.bannerimage?._authorUrl
    });" data-aue-prop="bannerimage" data-aue-label="Image" data-aue-type="reference">
          <p class='cftitle' data-aue-prop="cftitle" data-aue-label="Title" data-aue-type="text">${
            cfReq?.title
          }</p>
          <p class='cfsubtitle' data-aue-prop="cfsubtitle" data-aue-label="Sub Title" data-aue-type="text">${
            cfReq?.subtitle
          }</p>
          <p class='cfdescription' data-aue-prop="cfdescription" data-aue-label="Description" data-aue-type="richtext">${
            cfReq?.description?.plaintext
          }</p>
					<a href="${cfReq?.ctaUrl ? cfReq.ctaUrl : '#'}" class="cfbutton" target="_blank" rel="noopener">
					  <span data-aue-prop="ctalabel" data-aue-label="Button Label" data-aue-type="text">
					    ${cfReq?.ctalabel}
					  </span>
					</a>
      </div>
      <div class='banner-logo'>
      </div>
  </div>
	`;
 */

	/*
  if (!isAuthor) {
    moveInstrumentation(block, null);
    block.querySelectorAll('*').forEach((elem) => moveInstrumentation(elem, null));
  }
	*/
}
