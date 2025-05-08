// public/js/qr-scanner.js
document.addEventListener('DOMContentLoaded', function() {
    // Get device ID from URL
    const pathParts = window.location.pathname.split('/');
    const deviceId = pathParts[pathParts.length - 1];
    
    // Update device ID on page
    document.getElementById('device-id').textContent = deviceId;
    
    // Connect to Socket.IO
    const socket = io();
    
    // Join device room
    socket.emit('join-device', deviceId);
    
    // Handle QR code updates
    socket.on('qr-code', function(data) {
      if (data.deviceId !== deviceId) return;
      
      document.getElementById('status').textContent = data.status;
      document.getElementById('loading').classList.add('hidden');
      
      const qrElement = document.getElementById('qr-code');
      qrElement.innerHTML = `<img src="${data.qrDataUrl}" alt="QR Code">`;
      qrElement.classList.remove('hidden');
      
      document.getElementById('connected-info').classList.add('hidden');
    });
    
    // Handle device connected
    socket.on('device-connected', function(data) {
      if (data.deviceId !== deviceId) return;
      
      document.getElementById('status').textContent = data.status;
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('qr-code').classList.add('hidden');
      
      const connectedInfo = document.getElementById('connected-info');
      connectedInfo.classList.remove('hidden');
      
      document.getElementById('whatsapp-number').textContent = data.info?.number || 'Unknown';
      document.getElementById('whatsapp-name').textContent = data.info?.pushname || 'Unknown';
    });
    
    // Handle device removed
    socket.on('device-removed', function(data) {
      if (data.deviceId !== deviceId) return;
      
      document.getElementById('status').textContent = 'Device removed';
      document.getElementById('loading').textContent = 'This device has been removed';
      document.getElementById('loading').classList.remove('hidden');
      document.getElementById('qr-code').classList.add('hidden');
      document.getElementById('connected-info').classList.add('hidden');
    });
    
    // Try to get initial device status
    fetch(`/api/devices/${deviceId}`)
      .then(response => response.json())
      .then(data => {
        if (data.device) {
          document.getElementById('status').textContent = data.device.status;
          
          if (data.device.status === 'connected') {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('qr-code').classList.add('hidden');
            
            const connectedInfo = document.getElementById('connected-info');
            connectedInfo.classList.remove('hidden');
            
            document.getElementById('whatsapp-number').textContent = data.device.info?.number || 'Unknown';
            document.getElementById('whatsapp-name').textContent = data.device.info?.pushname || 'Unknown';
          }
        }
      })
      .catch(error => {
        console.error('Error fetching device info:', error);
      });
  });
  