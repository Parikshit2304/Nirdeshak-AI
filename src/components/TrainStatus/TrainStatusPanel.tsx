import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, Zap, AlertCircle, CheckCircle, Train } from 'lucide-react';
import { Train as TrainType } from '../../types';

interface TrainStatusPanelProps {
  trains: TrainType[];
  selectedTrain?: string;
  onTrainSelect: (trainId: string) => void;
}

const TrainStatusPanel: React.FC<TrainStatusPanelProps> = ({
  trains,
  selectedTrain,
  onTrainSelect
}) => {
  const getStatusIcon = (status: TrainType['status']) => {
    switch (status) {
      case 'on-time': return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'delayed': return <AlertCircle className="w-3 h-3 text-red-400" />;
      case 'early': return <Zap className="w-3 h-3 text-blue-400" />;
      case 'cancelled': return <AlertCircle className="w-3 h-3 text-gray-400" />;
      default: return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTypeColor = (type: TrainType['type']) => {
    switch (type) {
      case 'superfast': return 'bg-red-600';
      case 'express': return 'bg-orange-600';
      case 'mail': return 'bg-purple-600';
      case 'passenger': return 'bg-blue-600';
      case 'freight': return 'bg-green-600';
      case 'vip': return 'bg-yellow-600';
      case 'military': return 'bg-gray-700';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: number) => {
    const colors = [
      'text-red-400', // Priority 1
      'text-orange-400', // Priority 2
      'text-yellow-400', // Priority 3
      'text-blue-400', // Priority 4
      'text-green-400' // Priority 5
    ];
    return colors[priority - 1] || 'text-gray-400';
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg p-4 h-full overflow-hidden">
      <h2 className="text-green-400 font-bold text-sm mb-4 flex items-center font-mono">
        <Train className="w-4 h-4 mr-2" />
        TRAIN STATUS MONITOR
      </h2>
      
      <div className="space-y-2 overflow-y-auto h-[calc(100%-3rem)]">
        {trains.map(train => (
          <motion.div
            key={train.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onTrainSelect(train.id)}
            className={`p-2 rounded border cursor-pointer transition-all font-mono ${
              selectedTrain === train.id
                ? 'border-green-400 bg-gray-900'
                : 'border-gray-700 bg-gray-900 hover:border-gray-600'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getTypeColor(train.type)}`} />
                <span className="font-bold text-white text-xs">{train.id}</span>
                <span className={`text-xs font-bold ${getPriorityColor(train.priority)}`}>
                  P{train.priority}
                </span>
              </div>
              {getStatusIcon(train.status)}
            </div>
            
            {/* Train Name */}
            <div className="text-xs text-gray-300 mb-1 font-semibold">
              {train.name}
            </div>
            
            {/* Route Info */}
            <div className="flex items-center text-xs text-gray-400 mb-2">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="truncate">{train.origin}</span>
              <span className="mx-1">→</span>
              <span className="truncate">{train.destination}</span>
            </div>
            
            {/* Status Row */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-gray-300">{train.eta}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-gray-500" />
                <span className="text-gray-300">{train.speed} km/h</span>
              </div>
            </div>
            
            {/* Delay/Early Info */}
            {train.delay !== 0 && (
              <div className="text-xs mb-2">
                <span className={`font-bold ${
                  train.delay > 0 ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {train.delay > 0 ? `+${train.delay}m DELAYED` : `${Math.abs(train.delay)}m EARLY`}
                </span>
              </div>
            )}
            
            {/* Occupancy Bar */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>OCCUPANCY</span>
                <span>{train.occupancy}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all ${
                    train.occupancy > 90 ? 'bg-red-500' :
                    train.occupancy > 70 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${train.occupancy}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrainStatusPanel;