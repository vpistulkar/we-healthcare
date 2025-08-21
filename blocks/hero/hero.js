import { getMetadata } from '../../scripts/aem.js';
import { isAuthorEnvironment, moveInstrumentation } from '../../scripts/scripts.js';
import { readBlockConfig } from '../../scripts/aem.js';

/**
 *
 * @param {Element} block
 */
export default async function decorate(block) {

//	const enableunderline = block.querySelector(':scope div:nth-child(3) > div')?.textContent?.trim() || 'true';
//	const ctastyle = block.querySelector(':scope div:nth-child(4) > div')?.textContent?.trim() || 'link';

	//button container : block.querySelector('p.button-container'), append class cta-${ctastyle}
}

