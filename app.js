// App.js - Main application logic

// Render Delivery Status Card
function renderDeliveryStatusCard(status) {
  // We have 3 segments total (start to 1, 1 to 2, 2 to 3)
  const totalSegments = 3;
  const currentStop = status.currentStop || 1;

  // Generate segments for the progress bar
  let segmentsHTML = '';
  for (let i = 1; i <= totalSegments; i++) {
    const isCompleted = i < currentStop;
    const isCurrent = i === currentStop;
    const segmentClass = isCompleted ? 'completed' : (isCurrent ? 'current' : 'pending');

    segmentsHTML += `
      <div class="progress-segment ${segmentClass}">
        <div class="progress-segment-line">
          ${isCurrent ? '<div class="progress-arrows"></div>' : ''}
        </div>
        <div class="progress-stop-marker ${i === totalSegments ? 'final-stop' : ''}">${i}</div>
      </div>
    `;
  }

  return `
    <div class="card-alt status-card">
      <button class="btn-reload" onclick="reloadStatus()" aria-label="Reload">
        <span class="material-icons">refresh</span>
      </button>
      <div class="status-header">
        <div class="status-info">
          <h2>${status.time}</h2>
          <p>${status.description}</p>
        </div>
      </div>
      
      <div class="progress-container">
        <div class="progress-bar-wrapper">
          <span class="material-icons progress-start-icon">local_shipping</span>
          <div class="progress-bar-segmented">
            ${segmentsHTML}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Driver Info Card
function renderDriverInfoCard(driver) {
  return `
    <div class="card">
      <h3 class="driver-section-title">Người tham gia (1)</h3>
      <div class="driver-card">
        <div class="driver-info">
          <img 
            alt="Driver ${driver.name}" 
            class="driver-avatar" 
            src="${driver.avatarUrl}" 
          />
          <div class="driver-details">
            <h3>
              ${driver.name}
            </h3>
            <p>${driver.vehicle} • ${driver.plateNumber}</p>
          </div>
        </div>
        <div class="driver-actions">
          <button 
            class="btn-icon"
            aria-label="Call driver"
            onclick="callDriver()"
          >
            <span class="material-icons">phone</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render GeoMap Info Card
function renderGeoMapInfo(geomap) {
  return `
    <div class="card geomap-card">
      <div class="geomap-header">
        <h3>${geomap.title}</h3>
      </div>
      <div class="geomap-details">
        <div class="geomap-row">
          <span class="geomap-label">Tên</span>
          <span class="geomap-value">${geomap.name}</span>
        </div>
        <div class="geomap-row">
          <span class="geomap-label">Mã</span>
          <span class="geomap-value">${geomap.code}</span>
        </div>
        <div class="geomap-row">
          <span class="geomap-label">Loại</span>
          <span class="geomap-value">${geomap.type}</span>
        </div>
        <div class="geomap-row">
          <span class="geomap-label">Bán kính</span>
          <span class="geomap-value">${geomap.radius}</span>
        </div>
        <div class="geomap-row">
          <span class="geomap-label">Ngày dữ liệu</span>
          <span class="geomap-value">${geomap.date}</span>
        </div>
      </div>
    </div>
  `;
}

// Render Timeline
function renderTimeline(steps) {
  const timelineBullets = steps.map((step, index) => {
    const isLast = index === steps.length - 1;
    let bulletClass = 'pending';
    if (step.status === 'completed') {
      bulletClass = 'completed';
    } else if (step.status === 'active') {
      bulletClass = 'active';
    }

    return `
      <div class="timeline-bullet ${bulletClass}">${step.id}</div>
      ${!isLast ? '<div class="timeline-connector"></div>' : ''}
    `;
  }).join('');

  const timelineItems = steps.map((step, index) => {
    return `
      <div class="timeline-item timeline-item-${index + 1}">
        <h4>${step.title}</h4>
        <p>${step.address}</p>
      </div>
    `;
  }).join('');

  return `
    <div class="card">
      <div class="timeline-container">
        <div class="timeline-line">
          ${timelineBullets}
        </div>
        <div class="timeline-content">
          ${timelineItems}
        </div>
      </div>
    </div>
  `;
}

// Render Tracking ID Card
function renderTrackingIdCard(info) {
  return `
    <div class="card tracking-card-wrapper">
      <div class="tracking-card">
        <span class="tracking-id">${info.id}</span>
        <button 
          class="btn-copy"
          title="Copy Tracking ID"
          onclick="copyTrackingId('${info.id}')"
        >
          <span class="material-icons" id="copy-icon">content_copy</span>
        </button>
      </div>
    </div>
  `;
}

// Event Handlers
function copyTrackingId(id) {
  navigator.clipboard.writeText(id).then(() => {
    const icon = document.getElementById('copy-icon');
    icon.textContent = 'check';

    setTimeout(() => {
      icon.textContent = 'content_copy';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

function callDriver() {
  alert('Chức năng gọi tài xế sẽ được thêm vào sau!');
}

function reloadStatus() {
  console.log('Reloading status...');
  // Reload the page or fetch new data
  window.location.reload();
}

function toggleExpandDetails() {
  const expandableSection = document.getElementById('expandable-details');
  const expandButton = document.getElementById('expand-button');
  const expandIcon = document.getElementById('expand-icon');
  const expandText = document.getElementById('expand-text');

  if (expandableSection.classList.contains('expanded')) {
    expandableSection.classList.remove('expanded');
    expandIcon.textContent = 'expand_more';
    expandText.textContent = 'Xem thêm';
  } else {
    expandableSection.classList.add('expanded');
    expandIcon.textContent = 'expand_less';
    expandText.textContent = 'Thu gọn';
  }
}

// Initialize App
function initApp() {
  const sidebar = document.getElementById('sidebar');

  if (!sidebar) {
    console.error('Sidebar element not found');
    return;
  }

  // Render all components
  sidebar.innerHTML = `
    ${renderDeliveryStatusCard(DELIVERY_STATUS)}
    
    <div class="driver-desktop-only">
      ${renderDriverInfoCard(DRIVER_INFO)}
    </div>
    
    <button class="btn-expand" id="expand-button" onclick="toggleExpandDetails()">
      <span id="expand-text">Xem thêm</span>
      <span class="material-icons" id="expand-icon">expand_more</span>
    </button>
    
    <div class="expandable-section" id="expandable-details">
      <div class="driver-mobile-only">
        ${renderDriverInfoCard(DRIVER_INFO)}
      </div>
      ${renderGeoMapInfo(GEOMAP_INFO)}
      ${renderTimeline(TIMELINE_STEPS)}
      ${renderTrackingIdCard(TRACKING_INFO)}
    </div>
  `;
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
