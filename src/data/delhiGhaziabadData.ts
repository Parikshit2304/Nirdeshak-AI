import { Track, Train, Station, Signal } from '../types';

// Delhi-Ghaziabad Railway Section Layout
export const delhiGhaziabadTracks: Track[] = [
  // Main Delhi-Ghaziabad Line (UP)
  { id: 'main-up-1', name: 'Main UP 1', type: 'main', startPoint: { x: 100, y: 200 }, endPoint: { x: 1100, y: 200 }, stations: [], signals: [], occupancy: false, direction: 'up', speedLimit: 110 },
  { id: 'main-up-2', name: 'Main UP 2', type: 'main', startPoint: { x: 100, y: 230 }, endPoint: { x: 1100, y: 230 }, stations: [], signals: [], occupancy: true, direction: 'up', speedLimit: 110 },
  
  // Main Delhi-Ghaziabad Line (DOWN)
  { id: 'main-down-1', name: 'Main DOWN 1', type: 'main', startPoint: { x: 1100, y: 270 }, endPoint: { x: 100, y: 270 }, stations: [], signals: [], occupancy: true, direction: 'down', speedLimit: 110 },
  { id: 'main-down-2', name: 'Main DOWN 2', type: 'main', startPoint: { x: 1100, y: 300 }, endPoint: { x: 100, y: 300 }, stations: [], signals: [], occupancy: false, direction: 'down', speedLimit: 110 },
  
  // Loop Line (New Delhi - Nizamuddin - Anand Vihar)
  { id: 'loop-nd-nzm', name: 'ND-NZM Loop', type: 'loop', startPoint: { x: 200, y: 350 }, endPoint: { x: 500, y: 380 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 80 },
  { id: 'loop-nzm-anvt', name: 'NZM-ANVT Loop', type: 'loop', startPoint: { x: 500, y: 380 }, endPoint: { x: 800, y: 350 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 80 },
  { id: 'loop-anvt-sb', name: 'ANVT-SB Loop', type: 'loop', startPoint: { x: 800, y: 350 }, endPoint: { x: 900, y: 320 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 80 },
  
  // Crossovers and Connections
  { id: 'cross-od-nd', name: 'OD-ND Crossover', type: 'main', startPoint: { x: 200, y: 200 }, endPoint: { x: 200, y: 350 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 50 },
  { id: 'cross-sb-anvt', name: 'SB-ANVT Crossover', type: 'main', startPoint: { x: 800, y: 230 }, endPoint: { x: 800, y: 350 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 50 },
  { id: 'cross-gzb-sb', name: 'GZB-SB Connection', type: 'main', startPoint: { x: 900, y: 200 }, endPoint: { x: 900, y: 320 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 60 },
  
  // Platform Lines at Major Stations
  { id: 'od-pf-1', name: 'OD Platform 1', type: 'main', startPoint: { x: 150, y: 180 }, endPoint: { x: 250, y: 180 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 30 },
  { id: 'od-pf-2', name: 'OD Platform 2', type: 'main', startPoint: { x: 150, y: 320 }, endPoint: { x: 250, y: 320 }, stations: [], signals: [], occupancy: true, direction: 'bidirectional', speedLimit: 30 },
  
  { id: 'sdr-pf-1', name: 'SDR Platform 1', type: 'main', startPoint: { x: 350, y: 180 }, endPoint: { x: 450, y: 180 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 30 },
  { id: 'sdr-pf-2', name: 'SDR Platform 2', type: 'main', startPoint: { x: 350, y: 320 }, endPoint: { x: 450, y: 320 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 30 },
  
  { id: 'sb-pf-1', name: 'SB Platform 1', type: 'main', startPoint: { x: 750, y: 180 }, endPoint: { x: 850, y: 180 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 30 },
  { id: 'sb-pf-2', name: 'SB Platform 2', type: 'main', startPoint: { x: 750, y: 320 }, endPoint: { x: 850, y: 320 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 30 },
  
  { id: 'gzb-pf-1', name: 'GZB Platform 1', type: 'main', startPoint: { x: 1050, y: 180 }, endPoint: { x: 1150, y: 180 }, stations: [], signals: [], occupancy: true, direction: 'bidirectional', speedLimit: 30 },
  { id: 'gzb-pf-2', name: 'GZB Platform 2', type: 'main', startPoint: { x: 1050, y: 320 }, endPoint: { x: 1150, y: 320 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 30 },
  
  // Goods Sidings
  { id: 'od-goods', name: 'OD Goods Siding', type: 'siding', startPoint: { x: 150, y: 400 }, endPoint: { x: 280, y: 420 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 25 },
  { id: 'gzb-goods', name: 'GZB Goods Yard', type: 'yard', startPoint: { x: 1000, y: 400 }, endPoint: { x: 1200, y: 430 }, stations: [], signals: [], occupancy: true, direction: 'bidirectional', speedLimit: 20 },
];

export const delhiGhaziabadStations: Station[] = [
  {
    id: 'old-delhi',
    name: 'Old Delhi (DLI)',
    position: { x: 200, y: 250 },
    platforms: [
      { id: 'OD-P1', number: '1', occupied: false },
      { id: 'OD-P2', number: '2', occupied: true, trainId: 'T001' },
      { id: 'OD-P3', number: '3', occupied: false },
      { id: 'OD-P4', number: '4', occupied: false },
      { id: 'OD-P5', number: '5', occupied: false },
      { id: 'OD-P6', number: '6', occupied: false }
    ],
    type: 'junction'
  },
  {
    id: 'new-delhi',
    name: 'New Delhi (NDLS)',
    position: { x: 200, y: 380 },
    platforms: [
      { id: 'ND-P1', number: '1', occupied: false },
      { id: 'ND-P2', number: '2', occupied: false },
      { id: 'ND-P3', number: '3', occupied: true, trainId: 'T005' },
      { id: 'ND-P4', number: '4', occupied: false },
      { id: 'ND-P5', number: '5', occupied: false },
      { id: 'ND-P6', number: '6', occupied: false },
      { id: 'ND-P7', number: '7', occupied: false },
      { id: 'ND-P8', number: '8', occupied: false },
      { id: 'ND-P9', number: '9', occupied: false },
      { id: 'ND-P10', number: '10', occupied: false }
    ],
    type: 'terminal'
  },
  {
    id: 'shahdara',
    name: 'Shahdara (SDR)',
    position: { x: 400, y: 250 },
    platforms: [
      { id: 'SDR-P1', number: '1', occupied: false },
      { id: 'SDR-P2', number: '2', occupied: false },
      { id: 'SDR-P3', number: '3', occupied: false },
      { id: 'SDR-P4', number: '4', occupied: false }
    ],
    type: 'junction'
  },
  {
    id: 'nizamuddin',
    name: 'Hazrat Nizamuddin (NZM)',
    position: { x: 500, y: 400 },
    platforms: [
      { id: 'NZM-P1', number: '1', occupied: false },
      { id: 'NZM-P2', number: '2', occupied: true, trainId: 'T006' },
      { id: 'NZM-P3', number: '3', occupied: false },
      { id: 'NZM-P4', number: '4', occupied: false },
      { id: 'NZM-P5', number: '5', occupied: false },
      { id: 'NZM-P6', number: '6', occupied: false }
    ],
    type: 'terminal'
  },
  {
    id: 'sahibabad',
    name: 'Sahibabad (SB)',
    position: { x: 800, y: 250 },
    platforms: [
      { id: 'SB-P1', number: '1', occupied: false },
      { id: 'SB-P2', number: '2', occupied: false },
      { id: 'SB-P3', number: '3', occupied: true, trainId: 'T003' },
      { id: 'SB-P4', number: '4', occupied: false }
    ],
    type: 'junction'
  },
  {
    id: 'anand-vihar',
    name: 'Anand Vihar (ANVT)',
    position: { x: 800, y: 380 },
    platforms: [
      { id: 'ANVT-P1', number: '1', occupied: false },
      { id: 'ANVT-P2', number: '2', occupied: false },
      { id: 'ANVT-P3', number: '3', occupied: false },
      { id: 'ANVT-P4', number: '4', occupied: false },
      { id: 'ANVT-P5', number: '5', occupied: false },
      { id: 'ANVT-P6', number: '6', occupied: false }
    ],
    type: 'terminal'
  },
  {
    id: 'ghaziabad',
    name: 'Ghaziabad (GZB)',
    position: { x: 1100, y: 250 },
    platforms: [
      { id: 'GZB-P1', number: '1', occupied: true, trainId: 'T002' },
      { id: 'GZB-P2', number: '2', occupied: false },
      { id: 'GZB-P3', number: '3', occupied: false },
      { id: 'GZB-P4', number: '4', occupied: false },
      { id: 'GZB-P5', number: '5', occupied: false },
      { id: 'GZB-P6', number: '6', occupied: false }
    ],
    type: 'junction'
  }
];

export const delhiGhaziabadSignals: Signal[] = [
  // Old Delhi Junction Signals
  { id: 'OD-001', position: { x: 180, y: 190 }, aspect: 'green', type: 'home' },
  { id: 'OD-002', position: { x: 220, y: 190 }, aspect: 'yellow', type: 'distant' },
  { id: 'OD-003', position: { x: 180, y: 310 }, aspect: 'red', type: 'home' },
  { id: 'OD-004', position: { x: 220, y: 310 }, aspect: 'green', type: 'home' },
  
  // Shahdara Junction Signals
  { id: 'SDR-001', position: { x: 380, y: 190 }, aspect: 'green', type: 'home' },
  { id: 'SDR-002', position: { x: 420, y: 190 }, aspect: 'green', type: 'distant' },
  { id: 'SDR-003', position: { x: 380, y: 310 }, aspect: 'yellow', type: 'home' },
  { id: 'SDR-004', position: { x: 420, y: 310 }, aspect: 'green', type: 'home' },
  
  // Sahibabad Junction Signals
  { id: 'SB-001', position: { x: 780, y: 190 }, aspect: 'red', type: 'home' },
  { id: 'SB-002', position: { x: 820, y: 190 }, aspect: 'yellow', type: 'distant' },
  { id: 'SB-003', position: { x: 780, y: 310 }, aspect: 'green', type: 'home' },
  { id: 'SB-004', position: { x: 820, y: 310 }, aspect: 'green', type: 'home' },
  
  // Ghaziabad Terminal Signals
  { id: 'GZB-001', position: { x: 1080, y: 190 }, aspect: 'red', type: 'home' },
  { id: 'GZB-002', position: { x: 1120, y: 190 }, aspect: 'red', type: 'shunt' },
  { id: 'GZB-003', position: { x: 1080, y: 310 }, aspect: 'green', type: 'home' },
  { id: 'GZB-004', position: { x: 1120, y: 310 }, aspect: 'yellow', type: 'distant' },
  
  // Loop Line Signals
  { id: 'ND-L01', position: { x: 220, y: 370 }, aspect: 'green', type: 'home' },
  { id: 'NZM-L01', position: { x: 480, y: 390 }, aspect: 'double_yellow', type: 'distant' },
  { id: 'ANVT-L01', position: { x: 780, y: 370 }, aspect: 'green', type: 'home' },
  
  // Crossover Signals
  { id: 'X-001', position: { x: 190, y: 275 }, aspect: 'yellow', type: 'shunt' },
  { id: 'X-002', position: { x: 790, y: 275 }, aspect: 'green', type: 'shunt' },
  { id: 'X-003', position: { x: 890, y: 275 }, aspect: 'red', type: 'shunt' },
];

export const delhiGhaziabadTrains: Train[] = [
  {
    id: 'T001',
    name: 'Shatabdi Express',
    type: 'superfast',
    priority: 1,
    currentPosition: { trackId: 'main-up-2', progress: 0.15 },
    speed: 110,
    destination: 'Ghaziabad',
    origin: 'New Delhi',
    status: 'on-time',
    delay: 0,
    eta: '08:45',
    scheduledArrival: '08:45',
    capacity: 1200,
    occupancy: 85
  },
  {
    id: 'T002',
    name: 'Meerut Express',
    type: 'express',
    priority: 2,
    currentPosition: { trackId: 'gzb-pf-1', progress: 0.5 },
    speed: 0,
    destination: 'Old Delhi',
    origin: 'Meerut City',
    status: 'delayed',
    delay: 8,
    eta: '09:23',
    scheduledArrival: '09:15',
    capacity: 1500,
    occupancy: 92
  },
  {
    id: 'T003',
    name: 'Passenger Local',
    type: 'passenger',
    priority: 4,
    currentPosition: { trackId: 'sb-pf-2', progress: 0.3 },
    speed: 0,
    destination: 'Old Delhi',
    origin: 'Ghaziabad',
    status: 'on-time',
    delay: 0,
    eta: '09:10',
    scheduledArrival: '09:10',
    capacity: 1800,
    occupancy: 95
  },
  {
    id: 'T004',
    name: 'Goods Special',
    type: 'freight',
    priority: 5,
    currentPosition: { trackId: 'gzb-goods', progress: 0.7 },
    speed: 0,
    destination: 'Old Delhi Goods',
    origin: 'Ghaziabad Yard',
    status: 'on-time',
    delay: 0,
    eta: '11:30',
    scheduledArrival: '11:30',
    capacity: 2000,
    occupancy: 88
  },
  {
    id: 'T005',
    name: 'Rajdhani Express',
    type: 'superfast',
    priority: 1,
    currentPosition: { trackId: 'loop-nd-nzm', progress: 0.4 },
    speed: 80,
    destination: 'Nizamuddin',
    origin: 'New Delhi',
    status: 'early',
    delay: -2,
    eta: '08:28',
    scheduledArrival: '08:30',
    capacity: 1000,
    occupancy: 78
  },
  {
    id: 'T006',
    name: 'Duronto Express',
    type: 'superfast',
    priority: 1,
    currentPosition: { trackId: 'main-down-1', progress: 0.75 },
    speed: 105,
    destination: 'New Delhi',
    origin: 'Ghaziabad',
    status: 'on-time',
    delay: 0,
    eta: '10:15',
    scheduledArrival: '10:15',
    capacity: 1100,
    occupancy: 82
  }
];