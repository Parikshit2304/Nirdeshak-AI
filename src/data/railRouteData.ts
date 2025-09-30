import { Track, Train, Station, Signal } from '../types';

// Complex track layout inspired by Rail Route
export const railRouteTracks: Track[] = [
  // Main horizontal lines
  { id: 'main-h1', name: 'Main Line 1', type: 'main', startPoint: { x: 50, y: 150 }, endPoint: { x: 1200, y: 150 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 160 },
  { id: 'main-h2', name: 'Main Line 2', type: 'main', startPoint: { x: 50, y: 180 }, endPoint: { x: 1200, y: 180 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 160 },
  { id: 'main-h3', name: 'Main Line 3', type: 'main', startPoint: { x: 50, y: 210 }, endPoint: { x: 1200, y: 210 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 160 },
  { id: 'main-h4', name: 'Main Line 4', type: 'main', startPoint: { x: 50, y: 240 }, endPoint: { x: 1200, y: 240 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 160 },
  
  // Secondary horizontal lines
  { id: 'sec-h1', name: 'Secondary 1', type: 'main', startPoint: { x: 200, y: 300 }, endPoint: { x: 1000, y: 300 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 120 },
  { id: 'sec-h2', name: 'Secondary 2', type: 'main', startPoint: { x: 200, y: 330 }, endPoint: { x: 1000, y: 330 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 120 },
  { id: 'sec-h3', name: 'Secondary 3', type: 'main', startPoint: { x: 200, y: 360 }, endPoint: { x: 1000, y: 360 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 120 },
  
  // Loop lines
  { id: 'loop-1', name: 'Loop 1', type: 'loop', startPoint: { x: 300, y: 400 }, endPoint: { x: 700, y: 400 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 80 },
  { id: 'loop-2', name: 'Loop 2', type: 'loop', startPoint: { x: 350, y: 430 }, endPoint: { x: 650, y: 430 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 80 },
  
  // Vertical connections
  { id: 'vert-1', name: 'Junction 1', type: 'main', startPoint: { x: 300, y: 150 }, endPoint: { x: 300, y: 400 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 60 },
  { id: 'vert-2', name: 'Junction 2', type: 'main', startPoint: { x: 500, y: 150 }, endPoint: { x: 500, y: 430 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 60 },
  { id: 'vert-3', name: 'Junction 3', type: 'main', startPoint: { x: 700, y: 150 }, endPoint: { x: 700, y: 400 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 60 },
  { id: 'vert-4', name: 'Junction 4', type: 'main', startPoint: { x: 900, y: 150 }, endPoint: { x: 900, y: 360 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 60 },
  
  // Diagonal connections
  { id: 'diag-1', name: 'Crossover 1', type: 'main', startPoint: { x: 400, y: 150 }, endPoint: { x: 450, y: 300 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 40 },
  { id: 'diag-2', name: 'Crossover 2', type: 'main', startPoint: { x: 600, y: 180 }, endPoint: { x: 550, y: 330 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 40 },
  { id: 'diag-3', name: 'Crossover 3', type: 'main', startPoint: { x: 800, y: 210 }, endPoint: { x: 750, y: 360 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 40 },
  
  // Yard tracks
  { id: 'yard-1', name: 'Yard Track 1', type: 'yard', startPoint: { x: 100, y: 500 }, endPoint: { x: 400, y: 500 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 30 },
  { id: 'yard-2', name: 'Yard Track 2', type: 'yard', startPoint: { x: 100, y: 530 }, endPoint: { x: 400, y: 530 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 30 },
  { id: 'yard-3', name: 'Yard Track 3', type: 'yard', startPoint: { x: 100, y: 560 }, endPoint: { x: 400, y: 560 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 30 },
  
  // Siding tracks
  { id: 'siding-1', name: 'Goods Siding 1', type: 'siding', startPoint: { x: 800, y: 500 }, endPoint: { x: 1100, y: 500 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 25 },
  { id: 'siding-2', name: 'Goods Siding 2', type: 'siding', startPoint: { x: 800, y: 530 }, endPoint: { x: 1100, y: 530 }, stations: [], signals: [], occupancy: false, direction: 'bidirectional', speedLimit: 25 },
];

export const railRouteStations: Station[] = [
  {
    id: 'central-junction',
    name: 'Central Junction',
    position: { x: 500, y: 250 },
    platforms: [
      { id: 'P1', number: '1', occupied: true, trainId: 'T001' },
      { id: 'P2', number: '2', occupied: false },
      { id: 'P3', number: '3', occupied: false },
      { id: 'P4', number: '4', occupied: true, trainId: 'T003' }
    ],
    type: 'junction'
  },
  {
    id: 'west-station',
    name: 'West Station',
    position: { x: 200, y: 200 },
    platforms: [
      { id: 'P5', number: '1', occupied: false },
      { id: 'P6', number: '2', occupied: false }
    ],
    type: 'terminal'
  },
  {
    id: 'east-station',
    name: 'East Station',
    position: { x: 800, y: 200 },
    platforms: [
      { id: 'P7', number: '1', occupied: false },
      { id: 'P8', number: '2', occupied: true, trainId: 'T002' }
    ],
    type: 'terminal'
  },
  {
    id: 'goods-yard',
    name: 'Goods Yard',
    position: { x: 250, y: 530 },
    platforms: [
      { id: 'Y1', number: 'Y1', occupied: true, trainId: 'T004' },
      { id: 'Y2', number: 'Y2', occupied: false },
      { id: 'Y3', number: 'Y3', occupied: false }
    ],
    type: 'yard'
  }
];

export const railRouteSignals: Signal[] = [
  // Main line signals
  { id: 'SIG001', position: { x: 280, y: 140 }, aspect: 'green', type: 'home' },
  { id: 'SIG002', position: { x: 320, y: 140 }, aspect: 'yellow', type: 'distant' },
  { id: 'SIG003', position: { x: 480, y: 140 }, aspect: 'green', type: 'home' },
  { id: 'SIG004', position: { x: 520, y: 140 }, aspect: 'red', type: 'home' },
  { id: 'SIG005', position: { x: 680, y: 140 }, aspect: 'double_yellow', type: 'distant' },
  { id: 'SIG006', position: { x: 720, y: 140 }, aspect: 'green', type: 'home' },
  
  // Junction signals
  { id: 'SIG007', position: { x: 290, y: 200 }, aspect: 'red', type: 'home' },
  { id: 'SIG008', position: { x: 310, y: 200 }, aspect: 'green', type: 'home' },
  { id: 'SIG009', position: { x: 490, y: 280 }, aspect: 'yellow', type: 'distant' },
  { id: 'SIG010', position: { x: 510, y: 280 }, aspect: 'green', type: 'home' },
  
  // Yard signals
  { id: 'SIG011', position: { x: 90, y: 490 }, aspect: 'green', type: 'shunt' },
  { id: 'SIG012', position: { x: 410, y: 490 }, aspect: 'red', type: 'shunt' },
];

export const railRouteTrains: Train[] = [
  {
    id: 'T001',
    name: 'Rajdhani Express',
    type: 'superfast',
    priority: 1,
    currentPosition: { trackId: 'main-h1', progress: 0.25 },
    speed: 130,
    destination: 'New Delhi',
    origin: 'Mumbai Central',
    status: 'on-time',
    delay: 0,
    eta: '14:30',
    scheduledArrival: '14:30',
    capacity: 1200,
    occupancy: 85
  },
  {
    id: 'T002',
    name: 'Shatabdi Express',
    type: 'express',
    priority: 2,
    currentPosition: { trackId: 'main-h2', progress: 0.65 },
    speed: 110,
    destination: 'Bhopal',
    origin: 'New Delhi',
    status: 'early',
    delay: -3,
    eta: '16:27',
    scheduledArrival: '16:30',
    capacity: 1000,
    occupancy: 78
  },
  {
    id: 'T003',
    name: 'Mail Express',
    type: 'mail',
    priority: 3,
    currentPosition: { trackId: 'sec-h2', progress: 0.4 },
    speed: 85,
    destination: 'Chennai',
    origin: 'Kolkata',
    status: 'delayed',
    delay: 12,
    eta: '18:42',
    scheduledArrival: '18:30',
    capacity: 1500,
    occupancy: 92
  },
  {
    id: 'T004',
    name: 'Goods Special',
    type: 'freight',
    priority: 5,
    currentPosition: { trackId: 'yard-1', progress: 0.8 },
    speed: 35,
    destination: 'Kanpur Goods',
    origin: 'Allahabad Yard',
    status: 'on-time',
    delay: 0,
    eta: '20:15',
    scheduledArrival: '20:15',
    capacity: 2500,
    occupancy: 88
  },
  {
    id: 'T005',
    name: 'Passenger Local',
    type: 'passenger',
    priority: 4,
    currentPosition: { trackId: 'loop-1', progress: 0.6 },
    speed: 65,
    destination: 'Lucknow',
    origin: 'Varanasi',
    status: 'delayed',
    delay: 5,
    eta: '15:35',
    scheduledArrival: '15:30',
    capacity: 800,
    occupancy: 95
  },
  {
    id: 'T006',
    name: 'VIP Special',
    type: 'vip',
    priority: 1,
    currentPosition: { trackId: 'main-h3', progress: 0.15 },
    speed: 120,
    destination: 'Agra Cantt',
    origin: 'New Delhi',
    status: 'on-time',
    delay: 0,
    eta: '17:00',
    scheduledArrival: '17:00',
    capacity: 200,
    occupancy: 45
  }
];