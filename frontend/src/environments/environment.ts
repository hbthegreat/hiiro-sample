export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/hiiro', // Local backend proxy
  hiiroApiUrl: 'http://localhost:5001/v2',   // Direct Hiiro API URL (for reference only)
  currentPort: window.location.port || '4200' // Dynamically get the current port
}; 