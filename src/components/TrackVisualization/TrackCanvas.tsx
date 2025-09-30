import React, { useEffect, useRef, useState } from 'react';
import { Track, Train, Station, Signal } from '../../types';

interface TrackCanvasProps {
  tracks: Track[];
  trains: Train[];
  stations: Station[];
  signals?: Signal[];
  width: number;
  height: number;
}

const TrackCanvas: React.FC<TrackCanvasProps> = ({ 
  tracks, 
  trains, 
  stations, 
  signals = [],
  width, 
  height 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredElement, setHoveredElement] = useState<{type: string, id: string, x: number, y: number} | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const getTrackColor = (track: Track) => {
    if (track.occupancy) {
      return '#ff3333'; // Bright red for occupied
    }
    
    switch (track.type) {
      case 'main': return '#00ff41'; // Bright green for main lines
      case 'loop': return '#ffaa00'; // Orange for loops
      case 'siding': return '#0099ff'; // Blue for sidings
      case 'yard': return '#ff6600'; // Orange-red for yard tracks
      default: return '#666666';
    }
  };

  const getSignalColor = (aspect: Signal['aspect']) => {
    switch (aspect) {
      case 'green': return '#00ff41';
      case 'yellow': return '#ffff00';
      case 'red': return '#ff3333';
      case 'double_yellow': return '#ffaa00';
      default: return '#666666';
    }
  };

  const getTrainColor = (train: Train) => {
    switch (train.type) {
      case 'superfast': return '#ff1744';
      case 'express': return '#ff9800';
      case 'mail': return '#9c27b0';
      case 'passenger': return '#2196f3';
      case 'freight': return '#4caf50';
      case 'vip': return '#ffc107';
      case 'military': return '#795548';
      default: return '#607d8b';
    }
  };

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    // Pure black background for NX/VDU style
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    
    // Subtle grid pattern in dark gray
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 0.5;
    
    // Grid lines every 50 pixels
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawTracks = (ctx: CanvasRenderingContext2D) => {
    tracks.forEach(track => {
      const color = getTrackColor(track);
      
      // Track shadow for depth
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(track.startPoint.x, track.startPoint.y);
      ctx.lineTo(track.endPoint.x, track.endPoint.y);
      ctx.stroke();
      
      // Main track line
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(track.startPoint.x, track.startPoint.y);
      ctx.lineTo(track.endPoint.x, track.endPoint.y);
      ctx.stroke();
      
      // Track center line for main tracks
      if (track.type === 'main') {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(track.startPoint.x, track.startPoint.y);
        ctx.lineTo(track.endPoint.x, track.endPoint.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      // Loop tracks with dashed pattern
      if (track.type === 'loop') {
        ctx.setLineDash([15, 5]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(track.startPoint.x, track.startPoint.y);
        ctx.lineTo(track.endPoint.x, track.endPoint.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  };

  const drawSignals = (ctx: CanvasRenderingContext2D) => {
    signals.forEach(signal => {
      const { x, y } = signal.position;
      
      // Signal post
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y - 15);
      ctx.lineTo(x, y + 15);
      ctx.stroke();

      // Signal head
      ctx.fillStyle = '#222222';
      ctx.strokeStyle = '#666666';
      ctx.lineWidth = 1;
      
      if (signal.aspect === 'double_yellow') {
        ctx.fillRect(x - 6, y - 6, 4, 4);
        ctx.strokeRect(x - 6, y - 6, 4, 4);
        ctx.fillRect(x + 2, y - 6, 4, 4);
        ctx.strokeRect(x + 2, y - 6, 4, 4);
        
        ctx.fillStyle = getSignalColor(signal.aspect);
        ctx.fillRect(x - 5, y - 5, 2, 2);
        ctx.fillRect(x + 3, y - 5, 2, 2);
      } else {
        ctx.fillRect(x - 4, y - 6, 8, 4);
        ctx.strokeRect(x - 4, y - 6, 8, 4);
        
        ctx.fillStyle = getSignalColor(signal.aspect);
        ctx.fillRect(x - 3, y - 5, 6, 2);
      }

      // Signal ID (smaller, less intrusive)
      ctx.fillStyle = '#888888';
      ctx.font = '7px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(signal.id, x, y + 25);
    });
  };

  const drawStations = (ctx: CanvasRenderingContext2D) => {
    stations.forEach(station => {
      const { x, y } = station.position;
      
      // Station building - more compact design
      ctx.fillStyle = '#1a1a1a';
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 2;
      
      const stationWidth = 100;
      const stationHeight = 30;
      const buildingX = x - stationWidth / 2;
      const buildingY = y - stationHeight / 2;
      
      ctx.fillRect(buildingX, buildingY, stationWidth, stationHeight);
      ctx.strokeRect(buildingX, buildingY, stationWidth, stationHeight);

      // Station name - cleaner typography
      ctx.fillStyle = '#00ff41';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(station.name, x, y - 40);
      
      // Platform indicators - more compact
      const occupiedPlatforms = station.platforms.filter(p => p.occupied).length;
      const totalPlatforms = station.platforms.length;
      
      // Platform status bar
      ctx.fillStyle = '#333333';
      ctx.fillRect(buildingX, buildingY + stationHeight + 5, stationWidth, 8);
      
      if (occupiedPlatforms > 0) {
        const occupancyWidth = (occupiedPlatforms / totalPlatforms) * stationWidth;
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(buildingX, buildingY + stationHeight + 5, occupancyWidth, 8);
      }
      
      // Platform count
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px monospace';
      ctx.fillText(`${occupiedPlatforms}/${totalPlatforms}`, x, buildingY + stationHeight + 20);

      // Station type indicator
      let typeColor = '#00ff41';
      if (station.type === 'junction') typeColor = '#ffaa00';
      else if (station.type === 'terminal') typeColor = '#ff3333';
      
      ctx.fillStyle = typeColor;
      ctx.beginPath();
      ctx.arc(x + stationWidth/2 - 8, y - stationHeight/2 + 8, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const drawTrains = (ctx: CanvasRenderingContext2D) => {
    trains.forEach(train => {
      const track = tracks.find(t => t.id === train.currentPosition.trackId);
      if (!track) return;

      const progress = train.currentPosition.progress;
      const x = track.startPoint.x + (track.endPoint.x - track.startPoint.x) * progress;
      const y = track.startPoint.y + (track.endPoint.y - track.startPoint.y) * progress;

      // Train body - more rectangular, VDU style
      ctx.fillStyle = getTrainColor(train);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      
      const trainWidth = 24;
      const trainHeight = 8;
      
      ctx.fillRect(x - trainWidth/2, y - trainHeight/2, trainWidth, trainHeight);
      ctx.strokeRect(x - trainWidth/2, y - trainHeight/2, trainWidth, trainHeight);
      
      // Train ID - smaller, cleaner
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(train.id, x, y + 15);
      
      // Priority indicator
      const priorityColors = ['#ff0000', '#ff4500', '#ffa500', '#ffff00', '#90ee90'];
      ctx.fillStyle = priorityColors[train.priority - 1] || '#cccccc';
      ctx.beginPath();
      ctx.arc(x + trainWidth/2 - 3, y - trainHeight/2 + 3, 2, 0, 2 * Math.PI);
      ctx.fill();
      
      // Speed indicator for moving trains
      if (train.speed > 0) {
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(x - trainWidth/2 - 8 - i*3, y - 2 + i);
          ctx.lineTo(x - trainWidth/2 - 5 - i*3, y + 2 + i);
          ctx.stroke();
        }
      }
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setMousePos({ x, y });

    // Check for hover over trains
    let foundHover = false;
    trains.forEach(train => {
      const track = tracks.find(t => t.id === train.currentPosition.trackId);
      if (!track) return;

      const progress = train.currentPosition.progress;
      const trainX = track.startPoint.x + (track.endPoint.x - track.startPoint.x) * progress;
      const trainY = track.startPoint.y + (track.endPoint.y - track.startPoint.y) * progress;

      if (Math.abs(x - trainX) < 15 && Math.abs(y - trainY) < 8) {
        setHoveredElement({ type: 'train', id: train.id, x: trainX, y: trainY });
        foundHover = true;
      }
    });

    // Check for hover over stations
    if (!foundHover) {
      stations.forEach(station => {
        if (Math.abs(x - station.position.x) < 50 && Math.abs(y - station.position.y) < 20) {
          setHoveredElement({ type: 'station', id: station.id, x: station.position.x, y: station.position.y });
          foundHover = true;
        }
      });
    }

    if (!foundHover) {
      setHoveredElement(null);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and draw
    drawBackground(ctx);
    drawTracks(ctx);
    drawSignals(ctx);
    drawStations(ctx);
    drawTrains(ctx);

  }, [tracks, trains, stations, signals, width, height]);

  const getHoveredInfo = () => {
    if (!hoveredElement) return null;

    if (hoveredElement.type === 'train') {
      const train = trains.find(t => t.id === hoveredElement.id);
      if (!train) return null;
      
      return (
        <div className="bg-black border border-green-400 text-green-400 p-2 rounded text-xs font-mono">
          <div className="font-bold">{train.name}</div>
          <div>ID: {train.id}</div>
          <div>Speed: {train.speed} km/h</div>
          <div>Status: {train.status}</div>
          <div>ETA: {train.eta}</div>
        </div>
      );
    }

    if (hoveredElement.type === 'station') {
      const station = stations.find(s => s.id === hoveredElement.id);
      if (!station) return null;
      
      return (
        <div className="bg-black border border-green-400 text-green-400 p-2 rounded text-xs font-mono">
          <div className="font-bold">{station.name}</div>
          <div>Type: {station.type}</div>
          <div>Platforms: {station.platforms.length}</div>
          <div>Occupied: {station.platforms.filter(p => p.occupied).length}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative bg-black">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-800 bg-black cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredElement(null)}
      />
      
      {/* Minimal hover tooltip */}
      {hoveredElement && (
        <div 
          className="absolute pointer-events-none z-10"
          style={{ 
            left: mousePos.x + 10, 
            top: mousePos.y - 10,
            transform: mousePos.x > width - 150 ? 'translateX(-100%)' : 'none'
          }}
        >
          {getHoveredInfo()}
        </div>
      )}
    </div>
  );
};

export default TrackCanvas;