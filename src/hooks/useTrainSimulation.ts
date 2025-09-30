import { useState, useEffect, useCallback } from 'react';
import { Train, Track, AIDecision, Conflict, SimulationScenario } from '../types';
import { mockAIDecisions, mockConflicts } from '../data/mockData';
import { delhiGhaziabadTracks, delhiGhaziabadTrains } from '../data/delhiGhaziabadData';

interface SimulationState {
  trains: Train[];
  tracks: Track[];
  aiDecisions: AIDecision[];
  conflicts: Conflict[];
  isRunning: boolean;
  aiActive: boolean;
  manualOverride: boolean;
  activeScenario?: SimulationScenario;
}

export const useTrainSimulation = () => {
  const [state, setState] = useState<SimulationState>({
    trains: delhiGhaziabadTrains,
    tracks: delhiGhaziabadTracks,
    aiDecisions: mockAIDecisions,
    conflicts: mockConflicts,
    isRunning: true,
    aiActive: true,
    manualOverride: false,
    activeScenario: undefined
  });

  // Simulate train movement
  const updateTrainPositions = useCallback(() => {
    setState(prev => ({
      ...prev,
      trains: prev.trains.map(train => {
        let newProgress = train.currentPosition.progress + (train.speed / 10000);
        
        // Wrap around when reaching end of track
        if (newProgress >= 1) {
          newProgress = 0;
        }
        
        // Add some random variation to simulate real conditions
        const speedVariation = (Math.random() - 0.5) * 10;
        const newSpeed = Math.max(20, Math.min(150, train.speed + speedVariation));
        
        return {
          ...train,
          currentPosition: {
            ...train.currentPosition,
            progress: newProgress
          },
          speed: newSpeed
        };
      })
    }));
  }, []);

  // Generate new AI decisions periodically
  const generateAIDecisions = useCallback(() => {
    if (!state.aiActive) return;

    const shouldGenerate = Math.random() < 0.3; // 30% chance every interval
    if (!shouldGenerate) return;

    const newDecision: AIDecision = {
      id: `AI${Date.now()}`,
      timestamp: new Date(),
      type: ['routing', 'conflict_resolution', 'priority', 'delay_mitigation'][
        Math.floor(Math.random() * 4)
      ] as AIDecision['type'],
      description: [
        'Optimize routing for improved flow',
        'Resolve platform conflict at major junction',
        'Prioritize express service over freight',
        'Implement delay mitigation strategy'
      ][Math.floor(Math.random() * 4)],
      confidence: 0.7 + Math.random() * 0.3,
      affectedTrains: state.trains.slice(0, Math.floor(Math.random() * 3) + 1).map(t => t.id),
      reasoning: 'AI analysis suggests optimal solution based on current traffic patterns',
      status: 'pending',
      impact: {
        delayReduction: Math.floor(Math.random() * 20),
        energySaving: Math.floor(Math.random() * 15),
        conflictsResolved: Math.floor(Math.random() * 3)
      }
    };

    setState(prev => ({
      ...prev,
      aiDecisions: [newDecision, ...prev.aiDecisions].slice(0, 10)
    }));
  }, [state.aiActive, state.trains]);

  // Simulation loop
  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      updateTrainPositions();
      generateAIDecisions();
    }, 2000);

    return () => clearInterval(interval);
  }, [state.isRunning, updateTrainPositions, generateAIDecisions]);

  // Control functions
  const toggleAI = useCallback(() => {
    setState(prev => ({ ...prev, aiActive: !prev.aiActive }));
  }, []);

  const emergencyStop = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isRunning: false,
      manualOverride: true,
      trains: prev.trains.map(train => ({ ...train, speed: 0 }))
    }));
  }, []);

  const resetSimulation = useCallback(() => {
    setState({
      trains: delhiGhaziabadTrains,
      tracks: delhiGhaziabadTracks,
      aiDecisions: [],
      conflicts: mockConflicts,
      isRunning: true,
      aiActive: true,
      manualOverride: false
    });
  }, []);

  const acceptAIDecision = useCallback((decisionId: string) => {
    setState(prev => ({
      ...prev,
      aiDecisions: prev.aiDecisions.map(decision =>
        decision.id === decisionId 
          ? { ...decision, status: 'accepted' }
          : decision
      )
    }));
  }, []);

  const rejectAIDecision = useCallback((decisionId: string) => {
    setState(prev => ({
      ...prev,
      aiDecisions: prev.aiDecisions.map(decision =>
        decision.id === decisionId 
          ? { ...decision, status: 'rejected' }
          : decision
      )
    }));
  }, []);

  const modifyAIDecision = useCallback((decisionId: string) => {
    setState(prev => ({
      ...prev,
      aiDecisions: prev.aiDecisions.map(decision =>
        decision.id === decisionId 
          ? { ...decision, status: 'modified' }
          : decision
      )
    }));
  }, []);

  const runScenario = useCallback((scenario: SimulationScenario) => {
    setState(prev => ({
      ...prev,
      activeScenario: scenario,
      trains: prev.trains.map(train => {
        // Apply scenario effects to trains
        if (scenario.parameters.affectedTracks.includes(train.currentPosition.trackId)) {
          return {
            ...train,
            speed: Math.max(10, train.speed * scenario.parameters.delayFactor),
            status: scenario.parameters.delayFactor < 0.5 ? 'delayed' : train.status,
            delay: scenario.parameters.delayFactor < 0.5 ? train.delay + 15 : train.delay
          };
        }
        return train;
      }),
      tracks: prev.tracks.map(track => {
        if (scenario.parameters.affectedTracks.includes(track.id)) {
          return {
            ...track,
            occupancy: scenario.parameters.delayFactor === 0.0 ? true : track.occupancy,
            speedLimit: Math.max(20, track.speedLimit * scenario.parameters.delayFactor)
          };
        }
        return track;
      })
    }));
  }, []);

  const stopScenario = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeScenario: undefined,
      trains: delhiGhaziabadTrains,
      tracks: delhiGhaziabadTracks
    }));
  }, []);

  const resolveConflict = useCallback((conflictId: string) => {
    setState(prev => ({
      ...prev,
      conflicts: prev.conflicts.filter(conflict => conflict.id !== conflictId)
    }));
  }, []);

  return {
    ...state,
    toggleAI,
    emergencyStop,
    resetSimulation,
    acceptAIDecision,
    rejectAIDecision,
    modifyAIDecision,
    resolveConflict,
    runScenario,
    stopScenario
  };
};