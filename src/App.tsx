import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train as Train2, Cpu, Clock, AlertTriangle, Activity } from 'lucide-react';
import TrackCanvas from './components/TrackVisualization/TrackCanvas';
import AIDecisionCard from './components/AIDecisionCard/AIDecisionCard';
import TrainStatusPanel from './components/TrainStatus/TrainStatusPanel';
import ConflictAlert from './components/ConflictAlert/ConflictAlert';
import ControlPanel from './components/ControlPanel/ControlPanel';
import SimulationPanel from './components/SimulationPanel/SimulationPanel';
import { useTrainSimulation } from './hooks/useTrainSimulation';
import { delhiGhaziabadStations, delhiGhaziabadSignals } from './data/delhiGhaziabadData';

function App() {
  const [selectedTrain, setSelectedTrain] = useState<string>();
  const [currentTime] = useState(new Date());
  
  const {
    trains,
    tracks,
    aiDecisions,
    conflicts,
    isRunning,
    aiActive,
    manualOverride,
    activeScenario,
    toggleAI,
    emergencyStop,
    resetSimulation,
    acceptAIDecision,
    rejectAIDecision,
    modifyAIDecision,
    resolveConflict,
    runScenario,
    stopScenario
  } = useTrainSimulation();

  const pendingDecisions = aiDecisions.filter(d => d.status === 'pending');

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="bg-black border-b border-gray-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Train2 className="w-6 h-6 text-green-400" />
              <div>
                <h1 className="text-xl font-bold text-green-400">NIRDESHAK</h1>
                <p className="text-xs text-gray-400">AI POWERED RAILWAY TRAFFIC CONTROLLER</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="font-mono text-green-400">{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Cpu className="w-3 h-3 text-green-400" />
                <span className={aiActive ? 'text-green-400' : 'text-red-400'}>
                  AI {aiActive ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              {activeScenario && (
                <div className="flex items-center space-x-1">
                  <Activity className="w-3 h-3 text-yellow-400" />
                  <span className="text-yellow-400">SIMULATION: {activeScenario.name.toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-900 border border-green-400 rounded px-3 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-bold">SYSTEM OPERATIONAL</span>
            </div>
            {conflicts.length > 0 && (
              <div className="flex items-center space-x-2 bg-red-900 border border-red-400 rounded px-3 py-1">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                <span className="text-xs text-red-400 font-bold">{conflicts.length} CONFLICTS</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-black border-r border-gray-800 flex flex-col">
          <div className="flex-1 p-4 overflow-hidden">
            <TrainStatusPanel
              trains={trains}
              selectedTrain={selectedTrain}
              onTrainSelect={setSelectedTrain}
            />
          </div>
          <div className="p-4 border-t border-gray-800">
            <ControlPanel
              isAIActive={aiActive}
              onToggleAI={toggleAI}
              onEmergencyStop={emergencyStop}
              onReset={resetSimulation}
              onSettings={() => {}}
              aiProcessingActive={isRunning}
              manualOverrideActive={manualOverride}
            />
          </div>
        </div>

        {/* Center - Track Visualization */}
        <div className="flex-1 relative bg-black overflow-hidden">
          <div className="absolute inset-0 p-4">
            <TrackCanvas
              tracks={tracks}
              trains={trains}
              stations={delhiGhaziabadStations}
              signals={delhiGhaziabadSignals}
              width={window.innerWidth - 320 - 400}
              height={window.innerHeight - 120}
            />
          </div>

          {/* AI Decision Cards Overlay - Positioned to not block map */}
          <div className="absolute bottom-4 left-4 space-y-2 z-10 max-w-xs">
            <AnimatePresence>
              {pendingDecisions.slice(0, 2).map((decision, index) => (
                <motion.div
                  key={decision.id}
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: index * 5 
                  }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AIDecisionCard
                    decision={decision}
                    onAccept={acceptAIDecision}
                    onReject={rejectAIDecision}
                    onModify={modifyAIDecision}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Emergency Overlay */}
          {manualOverride && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-red-900/20 backdrop-blur-sm flex items-center justify-center z-20"
            >
              <div className="bg-black border-2 border-red-400 rounded-lg p-8 text-center font-mono">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-400 mb-2">EMERGENCY STOP ACTIVE</h2>
                <p className="text-red-300 mb-4">MANUAL OVERRIDE ENGAGED - ALL AI OPERATIONS SUSPENDED</p>
                <button
                  onClick={resetSimulation}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  RESET SYSTEM
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-black border-l border-gray-800 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Simulation Panel */}
            <div className="p-4 border-b border-gray-800">
              <SimulationPanel
                onRunScenario={runScenario}
                onStopScenario={stopScenario}
                activeScenario={activeScenario}
              />
            </div>
            
            {/* Conflict Alerts */}
            <div className="flex-1 p-4 overflow-y-auto">
              <ConflictAlert
                conflicts={conflicts}
                onResolve={resolveConflict}
              />
            </div>
            
            {/* Recent AI Decisions */}
            <div className="border-t border-gray-800 p-4 max-h-48 overflow-y-auto">
              <h3 className="text-green-400 font-bold text-sm mb-3 font-mono">RECENT DECISIONS</h3>
              <div className="space-y-2">
                {aiDecisions.slice(0, 5).map(decision => (
                  <div
                    key={decision.id}
                    className="p-2 bg-gray-900 border border-gray-700 rounded text-xs font-mono"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-green-400 uppercase">
                        {decision.type.replace('_', ' ')}
                      </span>
                      <span className={`px-1 py-0.5 rounded text-xs font-bold ${
                        decision.status === 'accepted' ? 'bg-green-700 text-green-200' :
                        decision.status === 'rejected' ? 'bg-red-700 text-red-200' :
                        decision.status === 'modified' ? 'bg-yellow-700 text-yellow-200' :
                        'bg-gray-600 text-gray-200'
                      }`}>
                        {decision.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-300 truncate">{decision.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;