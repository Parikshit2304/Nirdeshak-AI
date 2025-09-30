import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  CloudRain, 
  AlertTriangle, 
  Wrench,
  Activity,
  Settings
} from 'lucide-react';
import { SimulationScenario } from '../../types';

interface SimulationPanelProps {
  onRunScenario: (scenario: SimulationScenario) => void;
  onStopScenario: () => void;
  activeScenario?: SimulationScenario;
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({
  onRunScenario,
  onStopScenario,
  activeScenario
}) => {
  const [selectedScenario, setSelectedScenario] = useState<string>('');

  const scenarios: SimulationScenario[] = [
    {
      id: 'weather-fog',
      name: 'Dense Fog',
      description: 'Heavy fog reduces visibility, trains run at reduced speed',
      type: 'weather',
      parameters: {
        duration: 30,
        affectedTracks: ['main-up-1', 'main-up-2', 'main-down-1'],
        severity: 'high',
        delayFactor: 0.6
      },
      active: false
    },
    {
      id: 'breakdown-engine',
      name: 'Engine Failure',
      description: 'Express train engine failure blocks main line',
      type: 'breakdown',
      parameters: {
        duration: 45,
        affectedTracks: ['main-up-1'],
        severity: 'critical',
        delayFactor: 0.0
      },
      active: false
    },
    {
      id: 'congestion-peak',
      name: 'Peak Hour Rush',
      description: 'High passenger volume causes platform congestion',
      type: 'congestion',
      parameters: {
        duration: 60,
        affectedTracks: ['od-pf-1', 'od-pf-2', 'gzb-pf-1'],
        severity: 'medium',
        delayFactor: 0.8
      },
      active: false
    },
    {
      id: 'emergency-vip',
      name: 'VIP Movement',
      description: 'Emergency VIP train requires priority routing',
      type: 'emergency',
      parameters: {
        duration: 20,
        affectedTracks: ['main-up-1', 'main-up-2'],
        severity: 'high',
        delayFactor: 0.9
      },
      active: false
    },
    {
      id: 'maintenance-track',
      name: 'Track Maintenance',
      description: 'Scheduled maintenance blocks one main line',
      type: 'maintenance',
      parameters: {
        duration: 120,
        affectedTracks: ['main-down-2'],
        severity: 'medium',
        delayFactor: 0.0
      },
      active: false
    }
  ];

  const getScenarioIcon = (type: SimulationScenario['type']) => {
    switch (type) {
      case 'weather': return <CloudRain className="w-4 h-4" />;
      case 'breakdown': return <AlertTriangle className="w-4 h-4" />;
      case 'congestion': return <Activity className="w-4 h-4" />;
      case 'emergency': return <Zap className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 border-red-400';
      case 'high': return 'text-orange-400 border-orange-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'low': return 'text-green-400 border-green-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const handleRunScenario = () => {
    const scenario = scenarios.find(s => s.id === selectedScenario);
    if (scenario) {
      onRunScenario({ ...scenario, active: true });
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-4">
      <h3 className="text-green-400 font-bold text-sm mb-4 flex items-center font-mono">
        <Activity className="w-4 h-4 mr-2" />
        SIMULATION & STRESS TEST
      </h3>
      
      {/* Active Scenario Display */}
      {activeScenario && (
        <div className="mb-4 p-3 bg-gray-900 border border-red-400 rounded">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {getScenarioIcon(activeScenario.type)}
              <span className="text-red-400 font-bold text-xs font-mono">
                ACTIVE: {activeScenario.name}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStopScenario}
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-mono"
            >
              STOP
            </motion.button>
          </div>
          <p className="text-gray-300 text-xs">{activeScenario.description}</p>
          <div className="mt-2 text-xs text-gray-400 font-mono">
            Duration: {activeScenario.parameters.duration}m | 
            Severity: {activeScenario.parameters.severity.toUpperCase()}
          </div>
        </div>
      )}

      {/* Scenario Selection */}
      {!activeScenario && (
        <>
          <div className="mb-4">
            <label className="block text-green-400 text-xs font-mono mb-2">
              SELECT SCENARIO:
            </label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="w-full bg-black border border-gray-600 text-green-400 p-2 rounded text-xs font-mono focus:border-green-400 focus:outline-none"
            >
              <option value="">-- Select Scenario --</option>
              {scenarios.map(scenario => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name} ({scenario.type.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Scenario Details */}
          {selectedScenario && (
            <div className="mb-4 p-3 bg-gray-900 border border-gray-600 rounded">
              {(() => {
                const scenario = scenarios.find(s => s.id === selectedScenario);
                if (!scenario) return null;
                
                return (
                  <>
                    <div className="flex items-center space-x-2 mb-2">
                      {getScenarioIcon(scenario.type)}
                      <span className="text-white font-bold text-xs font-mono">
                        {scenario.name}
                      </span>
                      <span className={`px-2 py-1 border rounded text-xs font-mono ${getSeverityColor(scenario.parameters.severity)}`}>
                        {scenario.parameters.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs mb-2">{scenario.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white ml-1">{scenario.parameters.duration}m</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Tracks:</span>
                        <span className="text-white ml-1">{scenario.parameters.affectedTracks.length}</span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRunScenario}
              disabled={!selectedScenario}
              className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded text-xs font-mono font-bold transition-colors ${
                selectedScenario 
                  ? 'bg-green-600 hover:bg-green-700 text-black' 
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Play className="w-3 h-3" />
              <span>RUN TEST</span>
            </motion.button>
          </div>
        </>
      )}

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <h4 className="text-green-400 text-xs font-mono font-bold mb-2">SYSTEM STATUS</h4>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="bg-gray-900 p-2 rounded">
            <div className="text-gray-400">AI DECISIONS</div>
            <div className="text-green-400 font-bold">127</div>
          </div>
          <div className="bg-gray-900 p-2 rounded">
            <div className="text-gray-400">ACCURACY</div>
            <div className="text-green-400 font-bold">94.2%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPanel;