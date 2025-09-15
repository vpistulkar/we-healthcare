// Configuration reading is handled directly from block structure

// Sample doctor data - in production, this would come from your data source
const SAMPLE_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    location: 'New York, NY',
    zipCode: '10001',
    phone: '(555) 123-4567',
    email: 'sarah.johnson@healthcare.com',
    image: '/content/dam/weHealthcare/en/images/doctors/dr-sarah-johnson.jpg',
    rating: 4.8,
    experience: '15 years',
    languages: ['English', 'Spanish'],
    acceptingNewPatients: true,
    hospital: 'New York Medical Center'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    location: 'Los Angeles, CA',
    zipCode: '90210',
    phone: '(555) 234-5678',
    email: 'michael.chen@healthcare.com',
    image: '/content/dam/weHealthcare/en/images/doctors/dr-michael-chen.jpg',
    rating: 4.9,
    experience: '12 years',
    languages: ['English', 'Mandarin'],
    acceptingNewPatients: true,
    hospital: 'Children\'s Hospital LA'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    location: 'Chicago, IL',
    zipCode: '60601',
    phone: '(555) 345-6789',
    email: 'emily.rodriguez@healthcare.com',
    image: '/content/dam/weHealthcare/en/images/doctors/dr-emily-rodriguez.jpg',
    rating: 4.7,
    experience: '8 years',
    languages: ['English', 'Spanish'],
    acceptingNewPatients: false,
    hospital: 'Chicago Skin Institute'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Cardiology',
    location: 'Houston, TX',
    zipCode: '77001',
    phone: '(555) 456-7890',
    email: 'james.wilson@healthcare.com',
    image: '/content/dam/weHealthcare/en/images/doctors/dr-james-wilson.jpg',
    rating: 4.6,
    experience: '20 years',
    languages: ['English'],
    acceptingNewPatients: true,
    hospital: 'Houston Heart Center'
  },
  {
    id: '5',
    name: 'Dr. Lisa Park',
    specialty: 'Pediatrics',
    location: 'Seattle, WA',
    zipCode: '98101',
    phone: '(555) 567-8901',
    email: 'lisa.park@healthcare.com',
    image: '/content/dam/weHealthcare/en/images/doctors/dr-lisa-park.jpg',
    rating: 4.9,
    experience: '10 years',
    languages: ['English', 'Korean'],
    acceptingNewPatients: true,
    hospital: 'Seattle Children\'s'
  },
  {
    id: '6',
    name: 'Dr. Robert Thompson',
    specialty: 'Orthopedics',
    location: 'Boston, MA',
    zipCode: '02101',
    phone: '(555) 678-9012',
    email: 'robert.thompson@healthcare.com',
    image: '/content/dam/weHealthcare/en/images/doctors/dr-robert-thompson.jpg',
    rating: 4.5,
    experience: '18 years',
    languages: ['English', 'French'],
    acceptingNewPatients: true,
    hospital: 'Boston Orthopedic Center'
  }
];

const SPECIALTIES = [
  'Cardiology',
  'Pediatrics',
  'Dermatology',
  'Orthopedics',
  'Neurology',
  'Oncology',
  'Gynecology',
  'Urology',
  'Psychiatry',
  'Family Medicine',
  'Internal Medicine',
  'Emergency Medicine'
];

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function createElement(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.innerHTML = content;
  return element;
}

function createSearchInput(placeholder, className) {
  const input = createElement('input');
  input.type = 'text';
  input.className = className;
  input.placeholder = placeholder;
  return input;
}

function createSelect(options, placeholder, className) {
  const select = createElement('select', className);
  const defaultOption = createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = placeholder;
  select.appendChild(defaultOption);
  
  options.forEach(option => {
    const optionElement = createElement('option');
    optionElement.value = option.toLowerCase();
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
  
  return select;
}

function createDoctorCard(doctor) {
  const card = createElement('div', 'doctor-card');
  
  const cardContent = `
    <div class="doctor-image">
      <img src="${doctor.image}" alt="${doctor.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iI2YzZjRmNiIvPgo8cGF0aCBkPSJNMTIgMTJhNCA0IDAgMSAwIDAtOCA0IDQgMCAwIDAgMCA4WiIgZmlsbD0iIzk5YTNhZiIvPgo8cGF0aCBkPSJNMTIgMTRjLTMuMzEzIDAtNiAyLjY4Ny02IDZ2MmgxMnYtMmMwLTMuMzEzLTIuNjg3LTYtNi02WiIgZmlsbD0iIzk5YTNhZiIvPgo8L3N2Zz4K'">
      ${doctor.acceptingNewPatients ? '<span class="accepting-patients">Accepting New Patients</span>' : '<span class="not-accepting">Not Accepting New Patients</span>'}
    </div>
    <div class="doctor-info">
      <h3 class="doctor-name">${doctor.name}</h3>
      <p class="doctor-specialty">${doctor.specialty}</p>
      <p class="doctor-experience">${doctor.experience} experience</p>
      <div class="doctor-rating">
        <span class="rating-stars">${'★'.repeat(Math.floor(doctor.rating))}${'☆'.repeat(5 - Math.floor(doctor.rating))}</span>
        <span class="rating-number">${doctor.rating}</span>
      </div>
      <p class="doctor-location">
        <svg class="location-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        ${doctor.location}
      </p>
      <p class="doctor-hospital">${doctor.hospital}</p>
      <div class="doctor-languages">
        <strong>Languages:</strong> ${doctor.languages.join(', ')}
      </div>
      <div class="doctor-contact">
        <a href="tel:${doctor.phone}" class="contact-phone">${doctor.phone}</a>
        <a href="mailto:${doctor.email}" class="contact-email">Contact</a>
      </div>
      <button class="book-appointment-btn" data-doctor-id="${doctor.id}">
        Book Appointment
      </button>
  
    </div>
  `;
  
  card.innerHTML = cardContent;
  return card;
}

function filterDoctors(doctors, filters) {
  return doctors.filter(doctor => {
    // Provider name search
    if (filters.nameSearch && filters.nameSearch.length >= 2) {
      const nameMatch = doctor.name.toLowerCase().includes(filters.nameSearch.toLowerCase());
      if (!nameMatch) return false;
    }
    
    // Specialty filter
    if (filters.specialty && filters.specialty !== '') {
      const specialtyMatch = doctor.specialty.toLowerCase() === filters.specialty.toLowerCase();
      if (!specialtyMatch) return false;
    }
    
    // Location filter
    if (filters.location && filters.location.length >= 2) {
      const locationMatch = doctor.location.toLowerCase().includes(filters.location.toLowerCase()) ||
                           doctor.zipCode.includes(filters.location);
      if (!locationMatch) return false;
    }
    
    return true;
  });
}

function renderResults(doctors, container) {
  container.innerHTML = '';
  
  if (doctors.length === 0) {
    const noResults = createElement('div', 'no-results');
    noResults.innerHTML = `
      <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
      <h3>No doctors found</h3>
      <p>Try adjusting your search criteria or location.</p>
    `;
    container.appendChild(noResults);
    return;
  }
  
  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    container.appendChild(card);
  });
}

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  });
}

async function fetchDoctorData(config) {
  try {
    const { dataSourceType, damJsonPath, contentFragmentPath, apiUrl, staticJsonPath } = config;
    
    console.log('=== FETCH DOCTOR DATA DEBUG ===');
    console.log('Data source type:', dataSourceType);
    console.log('DAM JSON path:', damJsonPath);
    console.log('Content Fragment path:', contentFragmentPath);
    console.log('API URL:', apiUrl);
    console.log('Static JSON path:', staticJsonPath);
    console.log('Full config:', config);
    
    switch (dataSourceType) {
      case 'dam-json':
        if (damJsonPath) {
          console.log('Attempting to fetch from DAM JSON:', damJsonPath);
          return await fetchFromDAMJson(damJsonPath);
        } else {
          console.warn('DAM JSON path not provided, falling back to sample data');
        }
        break;
        
      case 'content-fragments':
        if (contentFragmentPath) {
          console.log('Attempting to fetch from Content Fragments:', contentFragmentPath);
          return await fetchFromContentFragments(contentFragmentPath);
        } else {
          console.warn('Content Fragment path not provided, falling back to sample data');
        }
        break;
        
      case 'api':
        if (apiUrl) {
          console.log('Attempting to fetch from API:', apiUrl);
          return await fetchFromAPI(apiUrl);
        } else {
          console.warn('API URL not provided, falling back to sample data');
        }
        break;
        
      case 'json':
      default:
        if (staticJsonPath) {
          console.log('Attempting to fetch from static JSON:', staticJsonPath);
          return await fetchFromStaticJson(staticJsonPath);
        } else {
          console.warn('Static JSON path not provided, falling back to sample data');
        }
        break;
    }
    
    console.log('No valid data source configured, using sample data');
    return SAMPLE_DOCTORS; // Fallback to sample data
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    console.log('Falling back to sample data due to error');
    return SAMPLE_DOCTORS; // Fallback to sample data
  }
}

async function fetchFromDAMJson(damPath) {
  try {
    // Convert DAM path to accessible URL
    let jsonUrl;
    if (damPath.startsWith('/content/dam/')) {
      // Remove .json extension if already present, then add it
      const cleanPath = damPath.replace(/\.json$/, '');
      jsonUrl = cleanPath + '.json';
    } else {
      jsonUrl = damPath;
    }
    
    console.log('Attempting to fetch DAM JSON from:', jsonUrl);
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      console.warn(`Failed to fetch DAM JSON from ${jsonUrl}: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch DAM JSON: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Successfully fetched DAM JSON data:', data);
    return Array.isArray(data) ? data : data.doctors || [];
  } catch (error) {
    console.error('Error fetching from DAM JSON:', error);
    throw error;
  }
}

async function fetchFromContentFragments(cfPath) {
  try {
    // Fetch Content Fragment data
    const cfUrl = cfPath.endsWith('.json') ? cfPath : cfPath + '.json';
    const response = await fetch(cfUrl);
    if (!response.ok) throw new Error('Failed to fetch Content Fragment');
    
    const data = await response.json();
    
    // Transform Content Fragment data to doctor format
    if (data[':type'] === 'wknd-universal/doctor') {
      return [transformContentFragmentToDoctor(data)];
    } else if (Array.isArray(data)) {
      return data.map(item => transformContentFragmentToDoctor(item));
    } else if (data.doctors && Array.isArray(data.doctors)) {
      return data.doctors.map(item => transformContentFragmentToDoctor(item));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching from Content Fragments:', error);
    throw error;
  }
}

async function fetchFromAPI(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch from API');
    const data = await response.json();
    return Array.isArray(data) ? data : data.doctors || [];
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
}

async function fetchFromStaticJson(staticPath) {
  try {
    const response = await fetch(staticPath);
    if (!response.ok) throw new Error('Failed to fetch static JSON');
    const data = await response.json();
    return Array.isArray(data) ? data : data.doctors || [];
  } catch (error) {
    console.error('Error fetching static JSON:', error);
    throw error;
  }
}

function transformContentFragmentToDoctor(cfData) {
  // Transform Content Fragment data to match our doctor structure
  return {
    id: cfData.id || cfData[':path'] || Math.random().toString(36).substr(2, 9),
    name: cfData.doctorName || cfData.name || 'Dr. Unknown',
    specialty: cfData.specialty || cfData.medicalSpecialty || 'General Medicine',
    location: cfData.location || cfData.practiceLocation || 'Location not specified',
    zipCode: cfData.zipCode || cfData.postalCode || '',
    phone: cfData.phone || cfData.phoneNumber || '',
    email: cfData.email || cfData.emailAddress || '',
    image: cfData.image || cfData.profileImage || cfData.imageRef || '/images/doctors/default-doctor.jpg',
    rating: parseFloat(cfData.rating || cfData.ratingScore || 4.5),
    experience: cfData.experience || cfData.yearsExperience || '5 years',
    languages: Array.isArray(cfData.languages) ? cfData.languages : 
               (cfData.languages ? cfData.languages.split(',').map(l => l.trim()) : ['English']),
    acceptingNewPatients: cfData.acceptingNewPatients === 'true' || cfData.acceptingNewPatients === true,
    hospital: cfData.hospital || cfData.affiliatedHospital || cfData.practiceName || 'Medical Center',
    latitude: parseFloat(cfData.latitude || 0),
    longitude: parseFloat(cfData.longitude || 0)
  };
}

function getDataSourceInfo(config) {
  const { dataSourceType, damJsonPath, contentFragmentPath, apiUrl, staticJsonPath } = config;
  
  switch (dataSourceType) {
    case 'dam-json':
      return damJsonPath ? `DAM JSON (${damJsonPath})` : 'DAM JSON (not configured)';
    case 'content-fragments':
      return contentFragmentPath ? `Content Fragments (${contentFragmentPath})` : 'Content Fragments (not configured)';
    case 'api':
      return apiUrl ? `External API (${apiUrl})` : 'External API (not configured)';
    case 'json':
    default:
      return staticJsonPath ? `Static JSON (${staticJsonPath})` : 'Sample Data (fallback)';
  }
}

function createSearchForm(config) {
  const form = createElement('form', 'find-doctor-form');
  
  const searchRow = createElement('div', 'search-row');
  
  // Provider name search
  if (config.enableProviderNameSearch !== false) {
    const nameGroup = createElement('div', 'search-group');
    const nameLabel = createElement('label', '', 'Search by Provider Name');
    const nameInput = createSearchInput('Enter doctor\'s name...', 'provider-name-search');
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);
    searchRow.appendChild(nameGroup);
  }
  
  // Specialty filter
  if (config.enableSpecialtyFilter !== false) {
    const specialtyGroup = createElement('div', 'search-group');
    const specialtyLabel = createElement('label', '', 'Specialty');
    const specialtySelect = createSelect(SPECIALTIES, 'All Specialties', 'specialty-filter');
    specialtyGroup.appendChild(specialtyLabel);
    specialtyGroup.appendChild(specialtySelect);
    searchRow.appendChild(specialtyGroup);
  }
  
  // Location search
  if (config.enableLocationSearch !== false) {
    const locationGroup = createElement('div', 'search-group');
    const locationLabel = createElement('label', '', 'Location');
    const locationInput = createSearchInput('City, State, or ZIP code...', 'location-search');
    const locationButton = createElement('button', 'location-button', '📍 Use My Location');
    locationButton.type = 'button';
    locationGroup.appendChild(locationLabel);
    locationGroup.appendChild(locationInput);
    locationGroup.appendChild(locationButton);
    searchRow.appendChild(locationGroup);
  }
  
  form.appendChild(searchRow);
  return form;
}

export default async function decorate(block) {
  // Debug: Log the entire block structure first
  console.log('=== BLOCK STRUCTURE DEBUG ===');
  console.log('Block HTML before processing:', block.innerHTML);
  console.log('Block children count:', block.children.length);
  console.log('Block children:', Array.from(block.children).map((child, index) => ({
    index,
    tagName: child.tagName,
    className: child.className,
    textContent: child.textContent?.trim().substring(0, 100) + '...'
  })));
  
  // Read configuration - try multiple approaches since AEM structure might vary
  let title = 'Find a Doctor';
  let subtitle = 'Search for healthcare providers in your area';
  let layout = 'default';
  let dataSourceType = 'dam-json';
  let damJsonPath = '';
  let contentFragmentPath = '';
  let apiUrl = '';
  let staticJsonPath = '/data/doctors.json';
  let enableLocationSearch = true;
  let enableSpecialtyFilter = true;
  let enableProviderNameSearch = true;
  
  // Try to read configuration from the block structure
  // AEM might render this differently, so we'll try multiple approaches
  
  // Approach 1: Try the standard div structure
  const titleDiv = block.querySelector(':scope > div:nth-child(1) > div');
  if (titleDiv && titleDiv.textContent?.trim() && titleDiv.textContent.trim() !== 'title') {
    title = titleDiv.textContent.trim();
  }
  
  const subtitleDiv = block.querySelector(':scope > div:nth-child(2) > div');
  if (subtitleDiv && subtitleDiv.textContent?.trim() && subtitleDiv.textContent.trim() !== 'subtitle') {
    subtitle = subtitleDiv.textContent.trim();
  }
  
  const layoutDiv = block.querySelector(':scope > div:nth-child(3) > div');
  if (layoutDiv && layoutDiv.textContent?.trim() && layoutDiv.textContent.trim() !== 'layout') {
    layout = layoutDiv.textContent.trim();
  }
  
  const dataSourceDiv = block.querySelector(':scope > div:nth-child(4) > div');
  if (dataSourceDiv && dataSourceDiv.textContent?.trim() && dataSourceDiv.textContent.trim() !== 'dataSourceType') {
    dataSourceType = dataSourceDiv.textContent.trim();
  }
  
  const damPathDiv = block.querySelector(':scope > div:nth-child(5) > div');
  if (damPathDiv && damPathDiv.textContent?.trim() && damPathDiv.textContent.trim() !== 'damJsonPath') {
    damJsonPath = damPathDiv.textContent.trim();
  }
  
  const cfPathDiv = block.querySelector(':scope > div:nth-child(6) > div');
  if (cfPathDiv && cfPathDiv.textContent?.trim() && cfPathDiv.textContent.trim() !== 'contentFragmentPath') {
    contentFragmentPath = cfPathDiv.textContent.trim();
  }
  
  const apiUrlDiv = block.querySelector(':scope > div:nth-child(7) > div');
  if (apiUrlDiv && apiUrlDiv.textContent?.trim() && apiUrlDiv.textContent.trim() !== 'apiUrl') {
    apiUrl = apiUrlDiv.textContent.trim();
  }
  
  const staticPathDiv = block.querySelector(':scope > div:nth-child(8) > div');
  if (staticPathDiv && staticPathDiv.textContent?.trim() && staticPathDiv.textContent.trim() !== 'staticJsonPath') {
    staticJsonPath = staticPathDiv.textContent.trim();
  }
  
  const locationDiv = block.querySelector(':scope > div:nth-child(9) > div');
  if (locationDiv && locationDiv.textContent?.trim() && locationDiv.textContent.trim() !== 'enableLocationSearch') {
    enableLocationSearch = locationDiv.textContent.trim() !== 'false';
  }
  
  const specialtyDiv = block.querySelector(':scope > div:nth-child(10) > div');
  if (specialtyDiv && specialtyDiv.textContent?.trim() && specialtyDiv.textContent.trim() !== 'enableSpecialtyFilter') {
    enableSpecialtyFilter = specialtyDiv.textContent.trim() !== 'false';
  }
  
  const providerDiv = block.querySelector(':scope > div:nth-child(11) > div');
  if (providerDiv && providerDiv.textContent?.trim() && providerDiv.textContent.trim() !== 'enableProviderNameSearch') {
    enableProviderNameSearch = providerDiv.textContent.trim() !== 'false';
  }
  
  // Fallback: Try readBlockConfig if the standard approach doesn't work
  if (title === 'Find a Doctor' || subtitle === 'Search for healthcare providers in your area' || !damJsonPath) {
    console.log('=== FALLBACK CONFIGURATION READING ===');
    console.log('Trying readBlockConfig...');
    
    try {
      const { readBlockConfig } = await import('../../scripts/aem.js');
      const config = readBlockConfig(block);
      console.log('readBlockConfig result:', config);
      
      if (config && Object.keys(config).length > 0) {
        if (config.title && config.title !== 'title') {
          title = config.title;
          console.log('Found title via readBlockConfig:', title);
        }
        if (config.subtitle && config.subtitle !== 'subtitle') {
          subtitle = config.subtitle;
          console.log('Found subtitle via readBlockConfig:', subtitle);
        }
        if (config.layout && config.layout !== 'layout') {
          layout = config.layout;
        }
        if (config.dataSourceType && config.dataSourceType !== 'dataSourceType') {
          dataSourceType = config.dataSourceType;
        }
        if (config.damJsonPath && config.damJsonPath !== 'damJsonPath') {
          damJsonPath = config.damJsonPath;
          console.log('Found DAM JSON path via readBlockConfig:', damJsonPath);
        }
        if (config.contentFragmentPath && config.contentFragmentPath !== 'contentFragmentPath') {
          contentFragmentPath = config.contentFragmentPath;
        }
        if (config.apiUrl && config.apiUrl !== 'apiUrl') {
          apiUrl = config.apiUrl;
        }
        if (config.staticJsonPath && config.staticJsonPath !== 'staticJsonPath') {
          staticJsonPath = config.staticJsonPath;
        }
        if (config.enableLocationSearch !== undefined) {
          enableLocationSearch = config.enableLocationSearch !== false;
        }
        if (config.enableSpecialtyFilter !== undefined) {
          enableSpecialtyFilter = config.enableSpecialtyFilter !== false;
        }
        if (config.enableProviderNameSearch !== undefined) {
          enableProviderNameSearch = config.enableProviderNameSearch !== false;
        }
      }
    } catch (error) {
      console.log('readBlockConfig failed:', error);
    }
    
    // Additional fallback: Try reading from all divs to see what's available
    console.log('Trying alternative selectors...');
    const allDivs = block.querySelectorAll(':scope > div');
    allDivs.forEach((div, index) => {
      const text = div.textContent?.trim();
      if (text && text !== '') {
        console.log(`Div ${index + 1} content:`, text);
      }
    });
    
    // Try reading title and subtitle from any div that might contain them
    const allTextDivs = block.querySelectorAll(':scope > div > div');
    allTextDivs.forEach((div, index) => {
      const text = div.textContent?.trim();
      if (text && text !== '') {
        console.log(`Text div ${index + 1}:`, text);
        // If we find text that looks like a title or subtitle, use it
        if (text.length > 5 && text.length < 100 && !text.includes('dataSourceType') && !text.includes('dam-json')) {
          if (title === 'Find a Doctor' && text.toLowerCase().includes('doctor')) {
            title = text;
            console.log('Found title in fallback:', title);
          } else if (subtitle === 'Search for healthcare providers in your area' && text.toLowerCase().includes('search')) {
            subtitle = text;
            console.log('Found subtitle in fallback:', subtitle);
          }
        }
      }
    });
  }
  
  // Debug: Log what we're reading from each div
  console.log('=== CONFIGURATION READING DEBUG ===');
  console.log('Raw div contents:');
  for (let i = 1; i <= 11; i++) {
    const div = block.querySelector(`:scope > div:nth-child(${i}) > div`);
    console.log(`Div ${i}:`, div?.textContent?.trim() || 'empty');
  }
  
  console.log('=== TITLE AND SUBTITLE DEBUG ===');
  console.log('Title from div 1:', block.querySelector(':scope > div:nth-child(1) > div')?.textContent?.trim());
  console.log('Subtitle from div 2:', block.querySelector(':scope > div:nth-child(2) > div')?.textContent?.trim());
  console.log('Final title value:', title);
  console.log('Final subtitle value:', subtitle);
  
  // Special handling: If we have a DAM JSON path but dataSourceType is not dam-json, fix it
  if (damJsonPath && damJsonPath !== '' && dataSourceType !== 'dam-json') {
    console.log('=== FIXING DATA SOURCE TYPE ===');
    console.log('Found DAM JSON path but dataSourceType is not dam-json, fixing...');
    dataSourceType = 'dam-json';
  }
  
  console.log('Find Doctor Configuration:', {
    title,
    subtitle,
    layout,
    dataSourceType,
    damJsonPath,
    contentFragmentPath,
    apiUrl,
    staticJsonPath,
    enableLocationSearch,
    enableSpecialtyFilter,
    enableProviderNameSearch
  });
  
  // Create config object for compatibility
  const config = {
    title,
    subtitle,
    layout,
    dataSourceType,
    damJsonPath,
    contentFragmentPath,
    apiUrl,
    staticJsonPath,
    enableLocationSearch,
    enableSpecialtyFilter,
    enableProviderNameSearch
  };
  
  // Hide configuration rows after reading them (same approach as search block)
  try {
    const configRows = [];
    for (let i = 1; i <= 11; i++) {
      const row = block.querySelector(`:scope > div:nth-child(${i})`);
      if (row) configRows.push(row);
    }
    configRows.forEach((row) => { if (row) row.style.display = 'none'; });
  } catch (e) {
    console.log('[find-doctor] config/hide rows error', e);
  }
  
  // Clear the block content and set up the component
  block.innerHTML = '';
  block.className = `find-doctor ${layout}`;
  
  // Create header
  const header = createElement('div', 'find-doctor-header');
  const dataSourceInfo = getDataSourceInfo(config);
  
  console.log('=== HEADER CREATION DEBUG ===');
  console.log('Creating header with title:', title);
  console.log('Creating header with subtitle:', subtitle);
  console.log('Data source info:', dataSourceInfo);
  
  header.innerHTML = `
    <h2 class="find-doctor-title">${title}</h2>
    <p class="find-doctor-subtitle">${subtitle}</p>
    <div class="data-source-info">
      <small>Data Source: ${dataSourceInfo}</small>
    </div>
  `;
  block.appendChild(header);
  
  console.log('Header HTML created:', header.innerHTML);
  
  // Create search form
  const searchForm = createSearchForm(config);
  block.appendChild(searchForm);
  
  // Create results container
  const resultsContainer = createElement('div', 'doctor-results');
  block.appendChild(resultsContainer);
  
  // Load doctor data
  let doctors = await fetchDoctorData(config);
  
  // Show loading state
  resultsContainer.innerHTML = '<div class="loading-state">Loading doctors...</div>';
  
  // Add loading styles
  const loadingStyle = document.createElement('style');
  loadingStyle.textContent = `
    .loading-state {
      text-align: center;
      padding: 2rem;
      color: var(--text-color-secondary, #666);
      font-size: 1.1rem;
    }
    .error-state {
      text-align: center;
      padding: 2rem;
      color: var(--error-color, #dc3545);
      background: var(--error-background, #f8d7da);
      border: 1px solid var(--error-border, #f5c6cb);
      border-radius: 8px;
      margin: 1rem 0;
    }
  `;
  document.head.appendChild(loadingStyle);
  
  // Initialize filters
  const filters = {
    nameSearch: '',
    specialty: '',
    location: ''
  };
  
  // Get form elements
  const nameInput = block.querySelector('.provider-name-search');
  const specialtySelect = block.querySelector('.specialty-filter');
  const locationInput = block.querySelector('.location-search');
  const locationButton = block.querySelector('.location-button');
  
  // Search functionality
  const performSearch = debounce(() => {
    const filteredDoctors = filterDoctors(doctors, filters);
    renderResults(filteredDoctors, resultsContainer);
  }, 300);
  
  // Event listeners
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      filters.nameSearch = e.target.value;
      performSearch();
    });
  }
  
  if (specialtySelect) {
    specialtySelect.addEventListener('change', (e) => {
      filters.specialty = e.target.value;
      performSearch();
    });
  }
  
  if (locationInput) {
    locationInput.addEventListener('input', (e) => {
      filters.location = e.target.value;
      performSearch();
    });
  }
  
  // Location button functionality
  if (locationButton) {
    locationButton.addEventListener('click', async () => {
      try {
        locationButton.textContent = '📍 Getting location...';
        locationButton.disabled = true;
        
        const position = await getCurrentLocation();
        
        // In a real implementation, you would reverse geocode the coordinates
        // For now, we'll just show a success message
        locationInput.value = 'Current location detected';
        filters.location = 'Current location detected';
        performSearch();
        
        locationButton.textContent = '📍 Location Found';
        setTimeout(() => {
          locationButton.textContent = '📍 Use My Location';
          locationButton.disabled = false;
        }, 2000);
        
      } catch (error) {
        console.error('Error getting location:', error);
        locationButton.textContent = '📍 Location Error';
        setTimeout(() => {
          locationButton.textContent = '📍 Use My Location';
          locationButton.disabled = false;
        }, 2000);
      }
    });
  }
  
  // Book appointment functionality
  block.addEventListener('click', (e) => {
    if (e.target.classList.contains('book-appointment-btn')) {
      const doctorId = e.target.dataset.doctorId;
      const doctor = doctors.find(d => d.id === doctorId);
      
      if (doctor) {
        // In a real implementation, this would open a booking modal or redirect to booking page
        alert(`Booking appointment with ${doctor.name}\n\nPhone: ${doctor.phone}\nEmail: ${doctor.email}`);
      }
    }
  });
  
  // Initial render
  renderResults(doctors, resultsContainer);
}