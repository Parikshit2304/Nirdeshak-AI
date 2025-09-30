import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Clock, Zap, TrendingDown, Edit3 } from 'lucide-react';
import { AIDecision } from '../../types';

interface AIDecisionCardProps {
  decision: AIDecision;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onModify: (id: string) => void;
}

const AIDecisionCard: React.FC<AIDecisionCardProps> = ({
  decision,
  onAccept,
  onReject,
  onModify
}) => {
  const getTypeIcon = (type: AIDecision['type']) => {
    switch (type) {
      case 'conflict_resolution': return <AlertTriangle className="w-4 h-4" />;
      case 'routing': return <TrendingDown className="w-4 h-4" />;
      case 'priority': return <Clock className="w-4 h-4" />;
      case 'delay_mitigation': return <Zap className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: AIDecision['type']) => {
    switch (type) {
      case 'conflict_resolution': return 'text-red-400 border-red-400';
      case 'routing': return 'text-blue-400 border-blue-400';
      case 'priority': return 'text-yellow-400 border-yellow-400';
      case 'delay_mitigation': return 'text-green-400 border-green-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="bg-black border-2 border-green-400 rounded p-3 shadow-2xl max-w-xs font-mono"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`${getTypeColor(decision.type).split(' ')[0]}`}>
            {getTypeIcon(decision.type)}
          </div>
          <div>
            <h3 className="text-xs font-bold text-green-400 uppercase">
              {decision.type.replace('_', ' ')}
            </h3>
            <p className="text-xs text-gray-400">
              {decision.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-bold ${getConfidenceColor(decision.confidence)}`}>
            {Math.round(decision.confidence * 100)}%
          </div>
          <div className="text-xs text-gray-400">CONF</div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <p className="text-xs text-white mb-2">{decision.description}</p>
        <p className="text-xs text-gray-400 italic">{decision.reasoning}</p>
      </div>

      {/* Affected Trains */}
      <div className="mb-3">
        <div className="text-xs text-gray-400 mb-1">AFFECTED TRAINS:</div>
        <div className="flex flex-wrap gap-1">
          {decision.affectedTrains.map(trainId => (
            <span
              key={trainId}
              className="px-2 py-1 bg-gray-800 border border-gray-600 text-xs text-green-400 rounded font-mono"
            >
              {trainId}
            </span>
          ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-3 gap-1 mb-3 text-center">
        <div className="bg-gray-900 border border-gray-700 rounded p-1">
          <div className="text-xs text-green-400 font-bold">
            -{decision.impact.delayReduction}m
          </div>
          <div className="text-xs text-gray-400">DELAY</div>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded p-1">
          <div className="text-xs text-blue-400 font-bold">
            {decision.impact.energySaving}%
          </div>
          <div className="text-xs text-gray-400">ENERGY</div>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded p-1">
          <div className="text-xs text-yellow-400 font-bold">
            {decision.impact.conflictsResolved}
          </div>
          <div className="text-xs text-gray-400">CONFLICTS</div>
        </div>
      </div>

      {/* Action Buttons */}
      {decision.status === 'pending' && (
        <div className="flex space-x-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAccept(decision.id)}
            className="flex-1 flex items-center justify-center space-x-1 bg-green-600 hover:bg-green-700 text-black text-xs font-bold py-2 px-2 rounded transition-colors"
          >
            <CheckCircle className="w-3 h-3" />
            <span>ACCEPT</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onModify(decision.id)}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black text-xs font-bold py-2 px-2 rounded transition-colors flex items-center justify-center"
          >
            <Edit3 className="w-3 h-3" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onReject(decision.id)}
            className="flex-1 flex items-center justify-center space-x-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-2 rounded transition-colors"
          >
            <XCircle className="w-3 h-3" />
            <span>REJECT</span>
          </motion.button>
        </div>
      )}

      {/* Status Badge */}
      {decision.status !== 'pending' && (
        <div className="mt-2">
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold font-mono ${
            decision.status === 'accepted' 
              ? 'bg-green-800 text-green-200 border border-green-600'
              : decision.status === 'rejected'
              ? 'bg-red-800 text-red-200 border border-red-600'
              : 'bg-yellow-800 text-yellow-200 border border-yellow-600'
          }`}>
            {decision.status.toUpperCase()}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default AIDecisionCard;