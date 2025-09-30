import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, MapPin, Shield } from 'lucide-react';
import { Conflict } from '../../types';

interface ConflictAlertProps {
  conflicts: Conflict[];
  onResolve: (conflictId: string) => void;
}

const ConflictAlert: React.FC<ConflictAlertProps> = ({ conflicts, onResolve }) => {
  const getSeverityColor = (severity: Conflict['severity']) => {
    switch (severity) {
      case 'critical': return 'border-red-400 bg-red-900/20 text-red-400';
      case 'high': return 'border-orange-400 bg-orange-900/20 text-orange-400';
      case 'medium': return 'border-yellow-400 bg-yellow-900/20 text-yellow-400';
      case 'low': return 'border-green-400 bg-green-900/20 text-green-400';
      default: return 'border-gray-400 bg-gray-900/20 text-gray-400';
    }
  };

  if (conflicts.length === 0) {
    return (
      <div className="bg-black border border-gray-800 rounded-lg p-4">
        <h3 className="text-green-400 font-bold text-sm mb-2 flex items-center font-mono">
          <Shield className="w-4 h-4 mr-2" />
          CONFLICT MONITOR
        </h3>
        <div className="text-center py-4">
          <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-green-400 text-xs font-mono">ALL CLEAR</p>
          <p className="text-gray-400 text-xs font-mono">NO ACTIVE CONFLICTS</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-4">
      <h3 className="text-red-400 font-bold text-sm mb-4 flex items-center font-mono">
        <AlertTriangle className="w-4 h-4 mr-2" />
        ACTIVE CONFLICTS ({conflicts.length})
      </h3>
      
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {conflicts.map(conflict => (
          <motion.div
            key={conflict.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-3 rounded border ${getSeverityColor(conflict.severity)} font-mono`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3 h-3" />
                <span className="text-xs font-bold uppercase">
                  {conflict.severity} {conflict.type.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <Clock className="w-3 h-3" />
                <span>{conflict.timeToConflict}m</span>
              </div>
            </div>
            
            {/* Location */}
            <div className="flex items-center space-x-1 text-xs mb-2">
              <MapPin className="w-3 h-3" />
              <span>{conflict.location}</span>
            </div>
            
            {/* Involved Trains */}
            <div className="flex flex-wrap gap-1 mb-3">
              {conflict.involvedTrains.map(trainId => (
                <span
                  key={trainId}
                  className="px-2 py-1 bg-gray-800 border border-gray-600 text-xs text-white rounded font-mono"
                >
                  {trainId}
                </span>
              ))}
            </div>
            
            {/* Suggested Resolution */}
            <div className="bg-gray-900 border border-gray-700 p-2 rounded text-xs mb-3">
              <span className="text-gray-400 font-bold">SUGGESTED: </span>
              <span className="text-white">{conflict.suggestedResolution}</span>
            </div>
            
            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onResolve(conflict.id)}
              className="w-full bg-green-600 hover:bg-green-700 text-black text-xs font-bold py-2 px-3 rounded transition-colors font-mono"
            >
              IMPLEMENT RESOLUTION
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConflictAlert;