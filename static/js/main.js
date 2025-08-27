// Forest Fire Weather Index (FWI) Prediction System - Main JavaScript

// DOM Elements
const predictionForm = document.getElementById('predictionForm');
const resultDiv = document.getElementById('predictionResult');
const fwiValueElement = document.getElementById('fwiValue');
const riskLevelElement = document.getElementById('riskLevel');
const riskDescriptionElement = document.getElementById('riskDescription');
const riskIconElement = document.getElementById('riskIcon');

// FWI Risk Levels
const fwiRiskLevels = [
    { max: 5.2, level: 'Low', color: 'green-600', icon: '✅', description: 'Minimal fire danger' },
    { max: 11.2, level: 'Moderate', color: 'yellow-500', icon: '⚠️', description: 'Moderate fire danger' },
    { max: 21.3, level: 'High', color: 'orange-500', icon: '🔥', description: 'High fire danger' },
    { max: 38.0, level: 'Very High', color: 'red-500', icon: '🔥', description: 'Very high fire danger' },
    { max: Infinity, level: 'Extreme', color: 'red-700', icon: '🚨', description: 'Extreme fire danger' }
];

// Get risk level based on FWI value
const getRiskLevel = (fwi) => {
    return fwiRiskLevels.find(level => fwi <= level.max) || fwiRiskLevels[fwiRiskLevels.length - 1];
};

// Animation Observer
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      el.classList.add('animate-fade-in');
    }
  });
};

// Form Submission Handler
document.getElementById('predictionForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Predicting...';

  // Collect form data
  const formData = new FormData(this);
  const data = {};

  // Convert form data to JSON
  for (let [key, value] of formData.entries()) {
    data[key] = parseFloat(value) || 0;
  }

  // Send prediction request
  fetch('/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    if (result.status === 'success') {
      // Display successful prediction
      const fwi = parseFloat(result.prediction).toFixed(1);

      // Determine risk level based on FWI value
      let riskLevel, riskColor, riskIcon, riskDescription;
      if (fwi <= 5.2) {
        riskLevel = 'Low';
        riskColor = 'text-green-600';
        riskIcon = '✅';
        riskDescription = 'Minimal fire danger';
      } else if (fwi <= 11.2) {
        riskLevel = 'Moderate';
        riskColor = 'text-yellow-500';
        riskIcon = '⚠️';
        riskDescription = 'Moderate fire danger';
      } else if (fwi <= 21.3) {
        riskLevel = 'High';
        riskColor = 'text-orange-500';
        riskIcon = '🔥';
        riskDescription = 'High fire danger';
      } else if (fwi <= 38.0) {
        riskLevel = 'Very High';
        riskColor = 'text-red-500';
        riskIcon = '🔥';
        riskDescription = 'Very high fire danger';
      } else {
        riskLevel = 'Extreme';
        riskColor = 'text-red-700';
        riskIcon = '🚨';
        riskDescription = 'Extreme fire danger';
      }

      // Update result display
      document.getElementById('fwiValue').textContent = fwi;
      document.getElementById('riskLevel').textContent = riskLevel;
      document.getElementById('riskLevel').className = `font-semibold ${riskColor}`;
      document.getElementById('riskDescription').textContent = riskDescription;
      document.getElementById('riskIcon').textContent = riskIcon;

      // Show results
      document.getElementById('predictionResult').classList.remove('hidden');
      document.getElementById('predictionResult').scrollIntoView({ behavior: 'smooth' });
    } else {
      // Display error
      alert('Error: ' + result.error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error making prediction. Please try again.');
  })
  .finally(() => {
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  });
});