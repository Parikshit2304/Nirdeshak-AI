export interface Train {
  id: string;
  name: string;
  type: 'express' | 'passenger' | 'freight' | 'superfast' | 'mail' | 'vip' | 'military';
  priority: number;
  currentPosition: {
    trackId: string;
    progress: number; // 0-1
  };
  speed: number; // km/h
  destination: string;
  origin: string;
  status: 'on-time' | 'delayed' | 'early' | 'cancelled';
  delay: number; // minutes
  eta: string;
  scheduledArrival: string;
  capacity: number;
  occupancy: number;
}

export interface Track {
  id: string;
  name: string;
  type: 'main' | 'loop' | 'siding' | 'yard';
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  stations: Station[];
  signals: Signal[];
  occupancy: boolean;
  direction: 'bidirectional' | 'up' | 'down';
  speedLimit: number;
}

export interface Station {
  id: string;
  name: string;
  position: { x: number; y: number };
  platforms: Platform[];
  type: 'junction' | 'terminal' | 'halt' | 'crossing';
}

export interface Platform {
  id: string;
  number: string;
  occupied: boolean;
  trainId?: string;
}

export interface Signal {
  id: string;
  position: { x: number; y: number };
  aspect: 'green' | 'yellow' | 'red' | 'double_yellow';
  type: 'home' | 'distant' | 'shunt';
}

export interface AIDecision {
  id: string;
  timestamp: Date;
  type: 'routing' | 'priority' | 'conflict_resolution' | 'delay_mitigation';
  description: string;
  confidence: number;
  affectedTrains: string[];
  reasoning: string;
  status: 'pending' | 'accepted' | 'rejected' | 'modified';
  impact: {
    delayReduction: number;
    energySaving: number;
    conflictsResolved: number;
  };
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  type: 'weather' | 'breakdown' | 'congestion' | 'emergency' | 'maintenance';
  parameters: {
    duration: number; // minutes
    affectedTracks: string[];
    severity: 'low' | 'medium' | 'high' | 'critical';
    delayFactor: number;
  };
  active: boolean;
}

export interface Conflict {
  id: string;
  type: 'crossing' | 'platform' | 'track_occupation' | 'signal';
  involvedTrains: string[];
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timeToConflict: number; // minutes
  suggestedResolution: string;
}