/**
 * Vistaguay Dashboard Logic
 * Handles data rendering for charts, counters, and tables.
 */

// --- Constants & Data ---

const IMPACT_DATA = {
    totalHectares: 42850,
    segments: [
        { name: 'Mapeo de Malezas', percentage: 65, value: '27.8K', color: 'var(--accent-green)', offset: 88, rotate: 0 },
        { name: 'Planting Quality', percentage: 28, value: '12.0K', color: 'var(--grafana-blue)', offset: 180.8, rotate: 234 },
        { name: 'Aplicación', percentage: 7, value: '3.0K', color: 'var(--grafana-orange)', offset: 233.6, rotate: 335 }
    ],
    savings: { value: '34,150', unit: 'lts/ha' },
    monthlySavings: [10, 15, 25, 35, 50, 65, 70]
};

// DATA: Monitor de Operaciones (Map)
const OPERATIONS_MAP_DATA = [
    { name: 'Las Acacias', surface: '142 Ha', task: 'Mapeo de Malezas', status: 'Procesado', color: 'var(--accent-green)', top: 40, left: 30 },
    { name: 'El Triunfo', surface: '85 Ha', task: 'Planting Quality', status: 'Solicitado', color: 'var(--grafana-blue)', top: 60, left: 60 },
    { name: 'La Reserva', surface: '210 Ha', task: 'Aplicación', status: 'Pendiente', color: 'var(--grafana-orange)', top: 25, left: 20 },
    { name: 'San José', surface: '95 Ha', task: 'Mapeo de Malezas', status: 'Procesado', color: 'var(--accent-green)', top: 75, left: 40 },
    { name: 'Don Pedro', surface: '120 Ha', task: 'Aplicación', status: 'Solicitado', color: 'var(--grafana-blue)', top: 35, left: 70 }
];

// DATA: Ranking de Cultivos por Provincia
const CROP_RANKING_DATA = [
    {
        name: 'SOJA',
        total: '25.000 Ha',
        segments: [
            { province: 'Córdoba', percentage: 50, ha: '12.500 Ha', color: '#00ff88' },
            { province: 'Santa Fe', percentage: 30, ha: '7.500 Ha', color: '#0066ff' },
            { province: 'Buenos Aires', percentage: 20, ha: '5.000 Ha', color: '#a855f7' }
        ]
    },
    {
        name: 'MAÍZ',
        total: '18.200 Ha',
        segments: [
            { province: 'Córdoba', percentage: 40, ha: '7.280 Ha', color: '#00ff88' },
            { province: 'Entre Ríos', percentage: 40, ha: '7.280 Ha', color: '#0066ff' },
            { province: 'La Pampa', percentage: 20, ha: '3.640 Ha', color: '#d97706' }
        ]
    },
    {
        name: 'GIRASOL',
        total: '9.500 Ha',
        segments: [
            { province: 'Buenos Aires', percentage: 70, ha: '6.650 Ha', color: '#a855f7' },
            { province: 'Chaco', percentage: 30, ha: '2.850 Ha', color: '#fade62ff' }
        ]
    },
    {
        name: 'TRIGO',
        total: '12.800 Ha',
        segments: [
            { province: 'Buenos Aires', percentage: 60, ha: '7.680 Ha', color: '#a855f7' },
            { province: 'Santa Fe', percentage: 25, ha: '3.200 Ha', color: '#0066ff' },
            { province: 'Córdoba', percentage: 15, ha: '1.920 Ha', color: '#00ff88' }
        ]
    },
    {
        name: 'CEBADA',
        total: '7.400 Ha',
        segments: [
            { province: 'Buenos Aires', percentage: 80, ha: '5.920 Ha', color: '#a855f7' },
            { province: 'La Pampa', percentage: 20, ha: '1.480 Ha', color: '#d97706' }
        ]
    },
    {
        name: 'MANÍ',
        total: '5.200 Ha',
        segments: [
            { province: 'Córdoba', percentage: 90, ha: '4.680 Ha', color: '#00ff88' },
            { province: 'San Luis', percentage: 10, ha: '520 Ha', color: '#f15c95ff' }
        ]
    },

];

const NETWORK_STATS = [
    { label: 'Pilotos Contratados', value: 38, icon: 'badge', color: 'var(--accent-green)' },
    { label: 'Postulaciones por Vuelo', value: 6, icon: 'send_and_archive', color: 'var(--grafana-blue)' },
    { label: 'Solicitudes Realizadas', value: 56, icon: 'history', color: 'var(--grafana-orange)', hasPulse: true }
];

// DATA: Red de Pilotos (Map)
const RED_PILOTOS_DATA = [
    { top: 45, left: 30, color: 'var(--accent-green)', name: 'Ana T.', tasks: 'Planting Quality (3)', drones: 'DJI Mavic 3M, Phantom 4 RTK' },
    { top: 65, left: 70, color: 'var(--grafana-blue)', name: 'Carlos P.', tasks: 'Planting Quality (2) - Mapeo de Malezas (1)', drones: 'DJI Mavic 3M, DJI Agras T40' },
    { top: 25, left: 20, color: 'var(--grafana-orange)', name: 'Luis G.', tasks: 'Aplicación (1)', drones: 'DJI Agras T30' }
];

const PRICES_DATA = [
    { name: 'Mapeo de Malezas', price: 2.5, color: 'var(--accent-green)' },
    { name: 'Planting Quality', price: 1.8, color: 'var(--grafana-blue)' },
    { name: 'Aplicación', price: 4.5, color: 'var(--grafana-orange)' }
];

const DRONE_RANKING = [
    {
        category: 'Fotogrametría',
        color: 'var(--grafana-blue)',
        legend: [{ Color: 'var(--grafana-blue)', Label: 'Planting Quality' }, { Color: 'var(--accent-green)', Label: 'Mapeo de Malezas' }],
        drones: [
            { name: 'DJI Mavic 3M', hours: '1.240', segments: [{ w: 60, c: 'var(--grafana-blue)' }, { w: 40, c: 'var(--accent-green)' }] },
            { name: 'Phantom 4 RTK', hours: '820', segments: [{ w: 40, c: 'var(--grafana-blue)' }, { w: 60, c: 'var(--accent-green)' }] },
            { name: 'WingtraOne Gen II', hours: '550', segments: [{ w: 20, c: 'var(--grafana-blue)' }, { w: 80, c: 'var(--accent-green)' }] }
        ]
    },
    {
        category: 'Aplicadores',
        color: 'var(--grafana-orange)',
        legend: [{ Color: 'var(--grafana-orange)', Label: 'Pulverización' }, { Color: '#8b5cf6', Label: 'Fertilización' }, { Color: 'white', Label: 'Siembra' }],
        drones: [
            { name: 'DJI Agras T40', hours: '950', segments: [{ w: 50, c: 'var(--grafana-orange)' }, { w: 20, c: '#8b5cf6' }, { w: 30, c: 'white' }] },
            { name: 'XAG P100', hours: '410', segments: [{ w: 40, c: 'var(--grafana-orange)' }, { w: 40, c: '#8b5cf6' }, { w: 20, c: 'white' }] },
            { name: 'DJI Agras T30', hours: '280', segments: [{ w: 80, c: 'var(--grafana-orange)' }, { w: 15, c: '#8b5cf6' }, { w: 5, c: 'white' }] }
        ]
    }
];

const AUDIT_DATA = [
    { establishment: 'La Perseverancia', client: 'AgroSud', surface: '450 Ha', task: 'Mapeo Malezas', pilot: 'Carlos R.', status: 'Procesado', date: '10/01', flight: '12/01/2026', statusColor: '#32d74b' },
    { establishment: 'Don Luis', client: 'Estancias S.A', surface: '280 Ha', task: 'Planting Quality', pilot: 'Sofía M.', status: 'Pendiente', date: '15/01', flight: '---', statusColor: '#f2994a' },
    { establishment: 'El Amanecer', client: 'Grupo Terra', surface: '600 Ha', task: 'Aplicación', pilot: 'Marcos P.', status: 'Solicitado', date: '18/01', flight: '---', statusColor: '#3274d9' },
    { establishment: 'Santa Isabel', client: 'BioAgro', surface: '120 Ha', task: 'Mapeo Malezas', pilot: 'Ana T.', status: 'Procesado', date: '05/01', flight: '07/01/2026', statusColor: '#32d74b' },
    { establishment: 'Las Acacias', client: 'AgroSud', surface: '340 Ha', task: 'Planting Quality', pilot: 'Carlos R.', status: 'Procesado', date: '12/01', flight: '14/01/2026', statusColor: '#32d74b' },
    { establishment: 'Los Ombúes', client: 'Pampa Viva', surface: '510 Ha', task: 'Aplicación', pilot: 'Luis G.', status: 'Solicitado', date: '20/01', flight: '---', statusColor: '#3274d9' }
];

const REQUEST_DETAILS = [
    {
        title: 'Planting Quality',
        color: 'var(--grafana-blue)',
        items: [
            { icon: 'grid_view', label: 'Siembra Fija', count: '45 tareas' },
            { icon: 'layers', label: 'Siembra Variable', count: '32 tareas' }
        ]
    },
    {
        title: 'Mapeo de Malezas',
        color: 'var(--accent-green)',
        items: [
            { icon: 'eco', label: 'Verde sobre Verde', count: '88 tareas' },
            { icon: 'potted_plant', label: 'Verde sobre Marrón', count: '54 tareas' }
        ]
    },
    {
        title: 'Aplicación',
        color: 'orange',
        items: [
            { label: 'Pulverización', count: '12 tareas' },
            { label: 'Fertilización', count: '25 tareas' },
            { label: 'Siembra', count: '18 tareas' }
        ]
    }
];

// --- Render Functions ---

function renderImpactChart() {
    const container = document.getElementById('impact-chart-container');
    if (!container) return;

    let svgContent = `
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#2f3032" stroke-width="10"></circle>
    `;

    IMPACT_DATA.segments.forEach(seg => {
        svgContent += `
            <circle class="hover:opacity-80 transition-opacity" cx="50" cy="50"
                fill="transparent" r="40" stroke="${seg.color}" stroke-dasharray="251.2"
                stroke-dashoffset="${seg.offset}" stroke-width="10"
                style="transform: rotate(${seg.rotate}deg); transform-origin: center;">
            </circle>
        `;
    });

    svgContent += `
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span class="text-3xl lg:text-4xl font-black leading-none">${IMPACT_DATA.totalHectares.toLocaleString()}</span>
            <span class="text-[10px] lg:text-xs text-zinc-500 uppercase font-bold">HA TOTAL</span>
        </div>
    `;

    container.innerHTML = svgContent;

    const legendContainer = document.getElementById('impact-legend');
    if (legendContainer) {
        legendContainer.innerHTML = IMPACT_DATA.segments.map(seg => `
            <div>
                <div class="flex items-center gap-2">
                    <span class="size-2 rounded-full" style="background-color: ${seg.color}"></span>
                    <span class="text-[10px] text-zinc-400 font-bold uppercase">${seg.name}</span>
                </div>
                <span class="text-lg font-black block pl-4">${seg.percentage}% <span class="text-[10px] text-zinc-500 font-normal">${seg.value} ha</span></span>
            </div>
        `).join('');
    }
}

function renderSavingsChart() {
    const container = document.getElementById('savings-chart-container');
    const valueEl = document.getElementById('savings-value');
    if (valueEl) valueEl.textContent = IMPACT_DATA.savings.value;

    if (!container) return;

    const pathD = "M0,70 L133,65 L266,50 L400,35 L533,25 L666,15 L800,10 L800,80 L0,80 Z";
    const lineD = "M0,70 L133,65 L266,50 L400,35 L533,25 L666,15 L800,10";

    container.innerHTML = `
        <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 80">
            <defs>
                <linearGradient id="areaGradHeader" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="var(--accent-green)" stop-opacity="0.3"></stop>
                    <stop offset="100%" stop-color="var(--accent-green)" stop-opacity="0"></stop>
                </linearGradient>
            </defs>
            <path d="${pathD}" fill="url(#areaGradHeader)"></path>
            <path d="${lineD}" fill="none" stroke="var(--accent-green)" stroke-width="2"></path>
        </svg>
        <div class="flex justify-between text-[8px] text-zinc-600 font-bold mt-1 uppercase tracking-tighter">
            <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span>
        </div>
    `;
}

function renderOperationsMap() {
    const container = document.getElementById('operations-monitor-panel');
    if (!container) return;

    // Ensure the container is positioned relatively for markers
    // Note: The HTML structure provides the background image and title.
    // We only need to append markers.

    OPERATIONS_MAP_DATA.forEach(lote => {
        const markerEl = document.createElement('div');
        markerEl.className = 'absolute group cursor-pointer z-20';
        markerEl.style.top = lote.top + '%';
        markerEl.style.left = lote.left + '%';

        // Pulse effect for 'Pendiente' (Orange) or 'Solicitado' (Blue) could be added, but standard dot is requested.
        // Using similar style to Pilot Map.

        let pulseClass = '';
        if (lote.status === 'Pendiente' || lote.status === 'Solicitado') {
            pulseClass = `shadow-[0_0_15px_rgba(0,0,0,0.5)]`; // Basic shadow, or specific color shadow
            if (lote.color.includes('green')) pulseClass = 'shadow-[0_0_15px_rgba(50,215,75,0.8)]';
            if (lote.color.includes('blue')) pulseClass = 'shadow-[0_0_15px_rgba(50,116,217,0.8)]';
            if (lote.color.includes('orange')) pulseClass = 'shadow-[0_0_15px_rgba(242,153,74,0.8)]';
        }

        markerEl.innerHTML = `
            <div class="size-4 rounded-full ${pulseClass}" style="background-color: ${lote.color}"></div>
            <div class="map-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1c1e23] border border-[var(--border-muted)] p-3 rounded popover-shadow min-w-[160px] z-50">
                <div class="text-[9px] text-zinc-500 uppercase font-bold mb-1 border-b border-zinc-800 pb-1">Detalle del Lote</div>
                <div class="space-y-1">
                    <div class="flex justify-between gap-4"><span class="text-[8px] text-zinc-500 uppercase">Lote</span><span class="text-[10px] font-bold text-white">${lote.name}</span></div>
                    <div class="flex justify-between gap-4"><span class="text-[8px] text-zinc-500 uppercase">Superficie</span><span class="text-[10px] font-bold text-white">${lote.surface}</span></div>
                    <div class="flex justify-between gap-4"><span class="text-[8px] text-zinc-500 uppercase">Tarea</span><span class="text-[10px] font-bold text-white">${lote.task}</span></div>
                    <div class="flex justify-between gap-4"><span class="text-[8px] text-zinc-500 uppercase">Estado</span><span class="text-[10px] font-bold uppercase" style="color: ${lote.color}">${lote.status}</span></div>
                </div>
                <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-[#1c1e23]"></div>
            </div>
        `;
        container.appendChild(markerEl);
    });
}

function renderCropRanking() {
    const container = document.getElementById('crop-ranking-container');
    if (!container) return;

    container.innerHTML = CROP_RANKING_DATA.map(crop => `
        <div class="flex flex-col gap-1.5">
            <div class="flex justify-between items-baseline">
                <span class="text-xs font-bold text-white">${crop.name}</span>
                <span class="text-[10px] font-bold text-zinc-400">${crop.total}</span>
            </div>
            <div class="h-3 w-full bg-zinc-800 rounded-full flex overflow-hidden">
                ${crop.segments.map(seg => `
                    <div class="h-full relative group cursor-pointer" style="width: ${seg.percentage}%; background-color: ${seg.color}">
                         <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1c1e23] border border-[var(--border-muted)] px-2 py-1 rounded shadow-lg text-[10px] font-bold whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span style="color: ${seg.color}">${seg.province}</span> | <span class="text-white">${seg.ha}</span>
                            <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-[#1c1e23]"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="flex gap-2">
                ${crop.segments.map(seg => `
                    <div class="flex items-center gap-1">
                        <div class="size-1.5 rounded-full" style="background-color: ${seg.color}"></div>
                        <span class="text-[10px] text-zinc-500">${seg.province} ${seg.percentage}%</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderNetworkStats() {
    const container = document.getElementById('network-stats-grid');
    if (!container) return;

    container.innerHTML = NETWORK_STATS.map(stat => `
        <div class="grafana-panel p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="size-8 bg-zinc-800/50 rounded flex items-center justify-center text-[${stat.color}] border border-zinc-700/50 relative">
                    <span class="material-symbols-outlined text-lg">${stat.icon}</span>
                    ${stat.hasPulse ? '<span class="absolute top-0 right-0 size-1.5 rounded-full bg-red-500 animate-pulse"></span>' : ''}
                </div>
                <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">${stat.label}</span>
            </div>
            <span class="text-2xl font-black text-white">${stat.value}</span>
        </div>
    `).join('');
}

function renderPilotMap() {
    const container = document.getElementById('pilot-map-panel');
    if (!container) return;

    RED_PILOTOS_DATA.forEach(marker => {
        const markerEl = document.createElement('div');
        markerEl.className = 'absolute group cursor-pointer z-20';
        markerEl.style.top = marker.top + '%';
        markerEl.style.left = marker.left + '%';
        markerEl.innerHTML = `
            <div class="size-6 bg-white border-2 rounded-full flex items-center justify-center shadow-lg" style="border-color: ${marker.color}">
                <span class="material-symbols-outlined text-[14px] text-black font-bold">person</span>
            </div>
            <div class="map-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1c1e23] border border-[var(--border-muted)] p-3 rounded popover-shadow min-w-[180px] z-50">
                <div class="text-[9px] text-zinc-500 uppercase font-bold mb-1 border-b border-zinc-800 pb-1">Ficha del Piloto</div>
                <div class="space-y-1.5">
                    <div><div class="text-[8px] text-zinc-500 uppercase">Nombre</div><div class="text-[11px] font-bold text-white">${marker.name}</div></div>
                    <div><div class="text-[8px] text-zinc-500 uppercase">Tareas realizadas</div><div class="text-[11px] font-bold text-white">${marker.tasks}</div></div>
                    <div><div class="text-[8px] text-zinc-500 uppercase">Drones</div><div class="text-[10px] text-zinc-300">${marker.drones}</div></div>
                </div>
                <div class="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-[#1c1e23]"></div>
            </div>
        `;
        container.appendChild(markerEl);
    });
}

function renderPrices() {
    const container = document.getElementById('prices-grid');
    if (!container) return;

    container.innerHTML = PRICES_DATA.map((item, index) => `
        <div class="flex flex-col ${index < PRICES_DATA.length - 1 ? 'border-r border-zinc-800' : ''}">
            <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">${item.name}</span>
            <div class="flex items-baseline gap-1">
                <span class="text-3xl font-black" style="color: ${item.color}">${item.price}</span>
                <span class="text-[10px] font-bold text-zinc-400">USD/ha</span>
            </div>
        </div>
    `).join('');
}

function renderDroneRanking() {
    const container = document.getElementById('drone-ranking-list');
    if (!container) return;

    container.innerHTML = DRONE_RANKING.map(cat => `
        <div>
            <div class="flex items-center justify-between mb-3 border-l-2 pl-2" style="border-color: ${cat.color}">
                <span class="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">${cat.category}</span>
                <div class="flex items-center gap-3">
                    ${cat.legend.map(l => `
                        <div class="flex items-center gap-1.5">
                            <div class="size-1.5 rounded-full" style="background-color: ${l.Color}"></div>
                            <span class="text-[8px] font-bold text-zinc-400">${l.Label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="space-y-3">
                ${cat.drones.map(drone => `
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between text-[10px] font-medium">
                            <span class="text-zinc-200">${drone.name}</span>
                            <span class="text-[var(--accent-green)] font-bold">${drone.hours} hs</span>
                        </div>
                        <div class="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                            ${drone.segments.map(seg => `
                                <div class="h-full" style="width: ${seg.w}%; background-color: ${seg.c}"></div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderRequestDetails() {
    const container = document.getElementById('request-details-list');
    if (!container) return;

    container.innerHTML = REQUEST_DETAILS.map(cat => `
        <div class="bg-[#1c1e23] p-3 rounded-sm border-l-2" style="border-color: ${cat.color.startsWith('var') ? cat.color : ''}" class="${!cat.color.startsWith('var') ? 'border-' + cat.color : ''}">
            <span class="text-[10px] font-bold uppercase tracking-tighter mb-2 block" style="color: ${cat.color.startsWith('var') ? cat.color : ''}" class="${!cat.color.startsWith('var') ? 'text-' + cat.color : ''}">${cat.title}</span>
            <div class="space-y-2">
                ${cat.items.map(item => `
                    <div class="flex items-center justify-between text-xs">
                        ${item.icon ? `
                        <div class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-sm text-zinc-500">${item.icon}</span>
                            <span class="text-zinc-300">${item.label}</span>
                        </div>` : `<span class="text-zinc-300">${item.label}</span>`}
                        <span class="font-black">${item.count}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderAuditTable() {
    const tbody = document.getElementById('audit-table-body');
    if (!tbody) return;

    tbody.innerHTML = AUDIT_DATA.map(row => `
        <tr class="hover:bg-zinc-800/40 transition-colors">
            <td class="px-6 py-4 font-semibold text-zinc-200 text-xs">${row.establishment}</td>
            <td class="px-6 py-4 text-zinc-300 text-xs">${row.client}</td>
            <td class="px-6 py-4 text-zinc-300 text-xs">${row.surface}</td>
            <td class="px-6 py-4 text-zinc-300 text-xs">${row.task}</td>
            <td class="px-6 py-4 text-zinc-300 text-xs">${row.pilot}</td>
            <td class="px-6 py-4">
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border" style="background-color: ${row.statusColor}1A; color: ${row.statusColor}; border-color: ${row.statusColor}33;">
                    <div class="size-1.5 rounded-full" style="background-color: ${row.statusColor}"></div> ${row.status}
                </div>
            </td>
            <td class="px-6 py-4 text-zinc-400 text-xs">${row.date}</td>
            <td class="px-6 py-4 text-zinc-400 text-xs">${row.flight}</td>
        </tr>
    `).join('');
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    renderImpactChart();
    renderSavingsChart();
    renderOperationsMap();
    renderCropRanking(); // New Render Function
    renderNetworkStats();
    renderPilotMap();
    renderPrices();
    renderDroneRanking();
    renderRequestDetails();
    renderAuditTable();
});
