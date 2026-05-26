/**
 * map.js — Leaflet.js map integration with manual parser & auto plots
 */

const MapController = {
  map: null,
  markers: [],
  coordinateRegistry: {}, // Cell_ID -> {lat, lon, label}

  init() {
    // Check if map already exists and if its container is still in the DOM
    if (this.map) {
      const containerId = this.map.getContainer().id;
      const currentContainer = document.getElementById('mapContainer');
      if (currentContainer && this.map.getContainer() === currentContainer) {
        return; // Container is the same and still in DOM
      } else {
        // Old container was destroyed. Destroy Leaflet instance to prevent memory leaks and recreate
        try {
          this.map.remove();
        } catch(e) {
          console.warn('Failed to remove Leaflet map:', e);
        }
        this.map = null;
        this.markers = [];
      }
    }

    if (typeof L === 'undefined') {
      console.warn('Leaflet maps library not loaded.');
      return;
    }

    // Load coordinates from localStorage if any
    try {
      this.coordinateRegistry = JSON.parse(localStorage.getItem('cdr_cell_coords') || '{}');
    } catch {
      this.coordinateRegistry = {};
    }

    // Centered around India/Default
    this.map = L.map('mapContainer').setView([20.5937, 78.9629], 5);
    
    // Add dark style free tiles (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(this.map);

    this.renderSavedRegistryToTextarea();
  },

  renderSavedRegistryToTextarea() {
    const ta = document.getElementById('cellCoordInput');
    if (!ta) return;
    if (Object.keys(this.coordinateRegistry).length === 0) return;

    const csvLines = ['Cell_ID,Lat,Lon,Label'];
    for (const [cid, obj] of Object.entries(this.coordinateRegistry)) {
      csvLines.push(`${cid},${obj.lat},${obj.lon},${obj.label||''}`);
    }
    ta.value = csvLines.join('\n');
  },

  clear() {
    if (!this.map) return;
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];
  },

  plot() {
    this.init();
    if (!this.map) return;
    this.clear();

    const bounds = [];

    // 1. Plot Auto-detected coords from loaded CDR
    if (Store.records.length > 0) {
      Store.records.forEach(r => {
        if (r.lat && r.lon) {
          const lat = parseFloat(r.lat);
          const lon = parseFloat(r.lon);
          if (!isNaN(lat) && !isNaN(lon)) {
            const popup = `
              <div style="color:#000;font-family:sans-serif;font-size:0.75rem;">
                <strong>Auto Plot (CDR Record)</strong><br/>
                Number: ${r.number}<br/>
                Time: ${r.date_str}<br/>
                Cell ID: ${r.cell_id || 'N/A'}<br/>
                Coords: ${lat}, ${lon}
              </div>
            `;
            const m = L.circleMarker([lat, lon], {
              color: '#00f5ff',
              fillColor: '#00f5ff',
              fillOpacity: 0.6,
              radius: 6
            }).bindPopup(popup).addTo(this.map);
            this.markers.push(m);
            bounds.push([lat, lon]);
          }
        }
      });
    }

    // 2. Plot manually registered Cell IDs matched with records
    const manualInputs = document.getElementById('cellCoordInput').value.trim();
    if (manualInputs) {
      const lines = manualInputs.split('\n');
      lines.forEach((line, idx) => {
        if (idx === 0 && line.toLowerCase().includes('lat')) return; // Skip header
        const parts = line.split(',');
        if (parts.length >= 3) {
          const cid = parts[0].trim();
          const lat = parseFloat(parts[1]);
          const lon = parseFloat(parts[2]);
          const label = parts[3] ? parts[3].trim() : '';

          if (!isNaN(lat) && !isNaN(lon) && cid) {
            // Save to registry
            this.coordinateRegistry[cid] = { lat, lon, label };

            // Find count in current loaded data
            const hitCount = Store.records.filter(r => r.cell_id === cid).length;

            const popup = `
              <div style="color:#000;font-family:sans-serif;font-size:0.75rem;">
                <strong>Cell Tower: ${cid}</strong><br/>
                ${label ? `Label: ${label}<br/>` : ''}
                Coords: ${lat}, ${lon}<br/>
                Total Hits in CDR: <strong>${hitCount}</strong>
              </div>
            `;

            const m = L.marker([lat, lon]).bindPopup(popup).addTo(this.map);
            
            // If hits present, style with glowing circle indicator
            if (hitCount > 0) {
              const pulse = L.circle([lat, lon], {
                radius: Math.min(5000, 100 * hitCount),
                color: '#7c3aed',
                fillColor: '#7c3aed',
                fillOpacity: 0.15
              }).addTo(this.map);
              this.markers.push(pulse);
            }

            this.markers.push(m);
            bounds.push([lat, lon]);
          }
        }
      });
      // Save updated registry
      localStorage.setItem('cdr_cell_coords', JSON.stringify(this.coordinateRegistry));
    }

    if (bounds.length > 0) {
      this.map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      toast('No coordinates plotted. Paste Cell ID CSV data or ensure CDR has Lat/Lon.', 'warn');
    }
  }
};
