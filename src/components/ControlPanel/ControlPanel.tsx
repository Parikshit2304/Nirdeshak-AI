import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Settings, 
  Zap, 
  AlertTriangle,
  Shield,
  Radio,
  Eye,
  Power
} from 'lucide-react';

interface ControlPanelProps {
  isAIActive: boolean;
  onToggleAI: () => void;
  onEmergencyStop: () => void;
  onReset: () => void;
  onSettings: () => void;
  aiProcessingActive: boolean;
  manualOverrideActive: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isAIActive,
  onToggleAI,
  onEmergencyStop,
  onReset,
  onSettings,
  aiProcessingActive,
  manualOverrideActive
}) => {
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-4">
      <h3 className="text-green-400 font-bold text-sm mb-4 flex items-center font-mono">
        <Settings className="w-4 h-4 mr-2" />
        SYSTEM CONTROL
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {/* AI Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleAI}
          className={`flex items-center justify-center space-x-2 p-3 rounded font-bold transition-all font-mono text-xs ${
            isAIActive 
              ? 'bg-green-600 hover:bg-green-700 text-black border border-green-400' 
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600'
          }`}
        >
          <Power className="w-3 h-3" />
          <span>AI {isAIActive ? 'ON' : 'OFF'}</span>
        </motion.button>

        {/* Emergency Stop */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEmergencyStop}
          className="flex items-center justify-center space-x-2 p-3 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition-all font-mono text-xs border border-red-400"
        >
          <Square className="w-3 h-3" />
          <span>EMERGENCY</span>
        </motion.button>

        {/* Manual Override */}
        <div className={`flex items-center justify-center space-x-2 p-3 rounded font-mono text-xs border ${
          manualOverrideActive 
            ? 'bg-yellow-600 text-black border-yellow-400' 
            : 'bg-gray-800 text-gray-300 border-gray-600'
        }`}>
          <Shield className="w-3 h-3" />
          <span>MANUAL</span>
        </div>

        {/* Reset */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-all font-mono text-xs border border-blue-400"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </motion.button>
      </div>

      {/* Status Indicators */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">AI PROCESSING:</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              aiProcessingActive ? 'bg-green-400 animate-pulse' : 'bg-gray-600'
            }`} />
            <span className="text-xs text-green-400 font-mono">
              {aiProcessingActive ? 'ACTIVE' : 'IDLE'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">SYSTEM STATUS:</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-green-400 font-mono">OPERATIONAL</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">COMMUNICATION:</span>
          <div className="flex items-center space-x-1">
            <Radio className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400 font-mono">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <h4 className="text-green-400 text-xs font-bold mb-2 font-mono">QUICK ACTIONS</h4>
        <div className="grid grid-cols-3 gap-2">
          <button className="p-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-xs text-green-400 transition-colors font-mono">
            <Eye className="w-3 h-3 mx-auto mb-1" />
            VIEW
          </button>
          <button className="p-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-xs text-green-400 transition-colors font-mono">
            <Zap className="w-3 h-3 mx-auto mb-1" />
            OPTIMIZE
          </button>
          <button className="p-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-xs text-green-400 transition-colors font-mono">
            <AlertTriangle className="w-3 h-3 mx-auto mb-1" />
            ALERTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;