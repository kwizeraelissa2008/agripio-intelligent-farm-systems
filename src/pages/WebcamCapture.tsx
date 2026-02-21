// ============================================================
// AGRIPIO — Integrated Webcam Capture System
// Uses Browser MediaDevices API — NO AI Vision
// Captures images & short videos for soil/crop reports
// ============================================================

import { useState, useRef, useCallback, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Camera, Video, Square, Download, Trash2, Image, Clock, CheckCircle } from 'lucide-react';

interface CapturedMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  timestamp: Date;
  label: string;
  attachedTo: string;
}

const attachOptions = [
  'Soil Test Report',
  'Crop Issue Report',
  'Marketplace Listing',
  'Funding Request',
  'General Documentation',
];

export default function WebcamCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [captures, setCaptures] = useState<CapturedMedia[]>([]);
  const [selectedAttach, setSelectedAttach] = useState(attachOptions[0]);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setCameraActive(true);
    } catch (err) {
      console.error('Camera access denied:', err);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
    setCameraActive(false);
    setRecording(false);
  }, [stream]);

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    const url = canvas.toDataURL('image/jpeg', 0.9);
    setCaptures(prev => [{
      id: Date.now().toString(),
      type: 'image',
      url,
      timestamp: new Date(),
      label: selectedAttach,
      attachedTo: selectedAttach,
    }, ...prev]);
  }, [selectedAttach]);

  const startRecording = useCallback(() => {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setCaptures(prev => [{
        id: Date.now().toString(),
        type: 'video',
        url,
        timestamp: new Date(),
        label: selectedAttach,
        attachedTo: selectedAttach,
      }, ...prev]);
    };
    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecording(true);
    setRecordTime(0);
  }, [stream, selectedAttach]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    setRecordTime(0);
  }, []);

  // Recording timer (max 30s)
  useEffect(() => {
    if (!recording) return;
    const interval = setInterval(() => {
      setRecordTime(prev => {
        if (prev >= 30) { stopRecording(); return 0; }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [recording, stopRecording]);

  const deleteCapture = (id: string) => {
    setCaptures(prev => prev.filter(c => c.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">📷 Media Capture</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Capture images & short videos for soil reports, crop documentation & marketplace listings
          </p>
        </div>

        {/* Camera View */}
        <div className="glass-card overflow-hidden">
          {cameraActive ? (
            <div className="relative">
              <video ref={videoRef} autoPlay playsInline muted className="w-full aspect-video object-cover bg-black" />
              <canvas ref={canvasRef} className="hidden" />

              {/* Recording indicator */}
              {recording && (
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: 'hsl(0 100% 50% / 0.8)', color: 'white' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  <span className="text-sm font-mono font-bold">REC {recordTime}s / 30s</span>
                </div>
              )}

              {/* Controls */}
              <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-center gap-4"
                style={{ background: 'linear-gradient(transparent, hsl(0 0% 0% / 0.8))' }}>
                <button onClick={captureImage} disabled={recording}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'hsl(var(--emerald))', opacity: recording ? 0.3 : 1 }}>
                  <Camera className="w-6 h-6" style={{ color: 'hsl(0 0% 4%)' }} />
                </button>

                {recording ? (
                  <button onClick={stopRecording}
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'hsl(0 100% 50%)', border: '3px solid white' }}>
                    <Square className="w-5 h-5" style={{ color: 'white' }} />
                  </button>
                ) : (
                  <button onClick={startRecording}
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'hsl(0 100% 50%)', border: '3px solid white' }}>
                    <Video className="w-6 h-6" style={{ color: 'white' }} />
                  </button>
                )}

                <button onClick={stopCamera}
                  className="px-4 py-2 rounded-xl text-sm font-medium"
                  style={{ background: 'hsl(0 0% 20%)', color: 'white' }}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'hsl(var(--emerald) / 0.1)' }}>
                <Camera className="w-10 h-10" style={{ color: 'hsl(var(--emerald))' }} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Open Camera</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                Capture photos or record short videos (max 30 seconds) for your agricultural reports
              </p>

              {/* Attach to */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {attachOptions.map(opt => (
                  <button key={opt} onClick={() => setSelectedAttach(opt)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={selectedAttach === opt
                      ? { background: 'hsl(var(--emerald) / 0.2)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.4)' }
                      : { background: 'hsl(0 0% 8%)', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(0 0% 13%)' }}>
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <button className="btn-emerald flex items-center gap-2" onClick={startCamera}>
                  <Camera className="w-4 h-4" /> Open Camera
                </button>
                <button className="btn-emerald-outline flex items-center gap-2"
                  onClick={() => { setFacingMode(f => f === 'user' ? 'environment' : 'user'); }}>
                  🔄 Flip Camera
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Captured Media Gallery */}
        {captures.length > 0 && (
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Image className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
              Captured Media ({captures.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {captures.map(cap => (
                <div key={cap.id} className="rounded-xl overflow-hidden"
                  style={{ background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}>
                  {cap.type === 'image' ? (
                    <img src={cap.url} alt="Capture" className="w-full aspect-video object-cover" />
                  ) : (
                    <video src={cap.url} controls className="w-full aspect-video object-cover" />
                  )}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="tag emerald text-xs">
                        {cap.type === 'image' ? '📸 Photo' : '🎬 Video'}
                      </span>
                      <button onClick={() => deleteCapture(cap.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <CheckCircle className="w-3 h-3" style={{ color: 'hsl(var(--emerald))' }} />
                      <span>{cap.attachedTo}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{cap.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
