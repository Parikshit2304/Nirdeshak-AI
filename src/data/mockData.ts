import { Train, Track, Station, AIDecision, Conflict } from '../types';

export const mockTrains: Train[] = [
  {
    id: 'T001',
    name: 'Rajdhani Express',
    type: 'superfast',
    priority: 1,
    currentPosition: { trackId: 'main1', progress: 0.3 },
    speed: 120,
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
    name: 'Goods Special',
    type: 'freight',
    priority: 5,
    currentPosition: { trackId: 'loop1', progress: 0.7 },
    speed: 45,
    destination: 'Kanpur',
    origin: 'Allahabad',
    status: 'delayed',
    delay: 15,
    eta: '16:45',
    scheduledArrival: '16:30',
    capacity: 2000,
    occupancy: 95
  },
  {
    id: 'T003',
    name: 'Mail Express',
    type: 'mail',
    priority: 2,
    currentPosition: { trackId: 'main2', progress: 0.5 },
    speed: 90,
    destination: 'Chennai Central',
    origin: 'Howrah',
    status: 'early',
    delay: -5,
    eta: '18:25',
    scheduledArrival: '18:30',
    capacity: 1500,
    occupancy: 72
  },
  {
    id: 'T004',
    name: 'Local Passenger',
    type: 'passenger',
    priority: 4,
    currentPosition: { trackId: 'siding1', progress: 0.1 },
    speed: 60,
    destination: 'Lucknow',
    origin: 'Varanasi',
    status: 'delayed',
    delay: 8,
    eta: '12:08',
    scheduledArrival: '12:00',
    capacity: 800,
    occupancy: 60
  }
];

export const mockTracks: Track[] = [
  {
    id: 'main1',
    name: 'Main Line UP',
    type: 'main',
    startPoint: { x: 50, y: 300 },
    endPoint: { x: 850, y: 200 },
    stations: [],
    signals: [],
    occupancy: true,
    direction: 'up',
    speedLimit: 130
  },
  {
    id: 'main2',
    name: 'Main Line DOWN',
    type: 'main',
    startPoint: { x: 850, y: 250 },
    endPoint: { x: 50, y: 350 },
    stations: [],
    signals: [],
    occupancy: true,
    direction: 'down',
    speedLimit: 130
  },
  {
    id: 'loop1',
    name: 'Loop Line',
    type: 'loop',
    startPoint: { x: 200, y: 400 },
    endPoint: { x: 600, y: 450 },
    stations: [],
    signals: [],
    occupancy: true,
    direction: 'bidirectional',
    speedLimit: 75
  },
  {
    id: 'siding1',
    name: 'Goods Siding',
    type: 'siding',
    startPoint: { x: 400, y: 500 },
    endPoint: { x: 700, y: 520 },
    stations: [],
    signals: [],
    occupancy: true,
    direction: 'bidirectional',
    speedLimit: 50
  }
];

export const mockStations: Station[] = [
  {
    id: 'S001',
    name: 'Junction Station',
    position: { x: 400, y: 300 },
    platforms: [
      { id: 'P1', number: '1', occupied: false },
      { id: 'P2', number: '2', occupied: true, trainId: 'T001' },
      { id: 'P3', number: '3', occupied: false }
    ],
    type: 'junction'
  },
  {
    id: 'S002',
    name: 'Wayside Station',
    position: { x: 600, y: 250 },
    platforms: [
      { id: 'P4', number: '1', occupied: false },
      { id: 'P5', number: '2', occupied: false }
    ],
    type: 'halt'
  }
];

export const mockAIDecisions: AIDecision[] = [
  {
    id: 'AI001',
    timestamp: new Date(),
    type: 'conflict_resolution',
    description: 'Hold T002 at Junction Station for 5 minutes to allow T001 priority passage',
    confidence: 0.92,
    affectedTrains: ['T001', 'T002'],
    reasoning: 'Rajdhani Express has higher priority and minimal delay impact',
    status: 'pending',
    impact: {
      delayReduction: 12,
      energySaving: 8,
      conflictsResolved: 1
    }
  },
  {
    id: 'AI002',
    timestamp: new Date(Date.now() - 300000),
    type: 'routing',
    description: 'Route T004 via Loop Line to avoid congestion on Main Line',
    confidence: 0.87,
    affectedTrains: ['T004'],
    reasoning: 'Main line congestion detected, loop line available with minimal delay',
    status: 'accepted',
    impact: {
      delayReduction: 7,
      energySaving: 12,
      conflictsResolved: 2
    }
  }
];

export const mockConflicts: Conflict[] = [
  {
    id: 'C001',
    type: 'crossing',
    involvedTrains: ['T001', 'T003'],
    location: 'Junction Station',
    severity: 'medium',
    timeToConflict: 8,
    suggestedResolution: 'Hold T003 for 3 minutes'
  },
  {
    id: 'C002',
    type: 'platform',
    involvedTrains: ['T002', 'T004'],
    location: 'Wayside Station Platform 2',
    severity: 'high',
    timeToConflict: 12,
    suggestedResolution: 'Divert T004 to Platform 1'
  }
];