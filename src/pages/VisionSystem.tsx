import { useState, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Upload, Camera, AlertTriangle, CheckCircle, Loader2, Eye } from 'lucide-react';

const mockResults = [
  { disease: 'Late Blight (Phytophthora infestans)', severity: 'High', confidence: 94, action: 'Apply copper fungicide immediately. Remove infected leaves.', color: 'hsl(0 100% 66%)' },
  { disease: 'Nitrogen Deficiency', severity: 'Medium', confidence: 87, action: 'Apply 30kg/ha urea within 48 hours. Check irrigation.', color: 'hsl(45 100% 51%)' },
  { disease: 'Healthy — No Disease Detected', severity: 'None', confidence: 96, action: 'Crop looks healthy. Continue standard monitoring schedule.', color: 'hsl(145 100% 39%)' },
];

export default function VisionSystem() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockResults[0] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      setImage(e.target?.result as string);
      setResult(null);
      setAnalyzing(true);
      setTimeout(() => {
        setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
        setAnalyzing(false);
      }, 2500);
    };
    reader.readAsDataURL(file);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Vision AI — Disease Detection</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Upload a crop photo for instant AI disease & pest analysis</p>
        </div>

        {/* Upload zone */}
        <div className="glass-card p-8 text-center cursor-pointer border-2 border-dashed transition-all"
          style={{ borderColor: image ? 'hsl(145 100% 39% / 0.4)' : 'hsl(0 0% 20%)' }}
          onClick={() => fileRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {image ? (
            <img src={image} alt="Uploaded crop" className="max-h-64 mx-auto rounded-xl object-contain" />
          ) : (
            <div className="py-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'hsl(145 100% 39% / 0.1)' }}>
                <Upload className="w-8 h-8" style={{ color: 'hsl(145 100% 39%)' }} />
              </div>
              <h3 className="font-semibold mb-2">Drop crop image here</h3>
              <p className="text-sm text-muted-foreground">Supports JPG, PNG, WEBP — Max 10MB</p>
              <div className="flex gap-3 justify-center mt-4">
                <button className="tag emerald cursor-pointer"><Camera className="w-3 h-3 inline mr-1" />Camera</button>
                <button className="tag cursor-pointer">Gallery</button>
                <button className="tag cursor-pointer">Video</button>
              </div>
            </div>
          )}
        </div>

        {analyzing && (
          <div className="glass-card p-6 flex items-center gap-4 animate-fade-in">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'hsl(145 100% 39%)' }} />
            <div>
              <h3 className="font-semibold">Analyzing crop image...</h3>
              <p className="text-sm text-muted-foreground">Running disease detection • nutrient analysis • pest identification</p>
            </div>
          </div>
        )}

        {result && !analyzing && (
          <div className="glass-card p-6 animate-slide-up" style={{ border: `1px solid ${result.color}30` }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{result.disease}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="tag" style={{ background: result.color + '20', color: result.color }}>
                    {result.severity === 'None' ? 'Healthy' : `${result.severity} Severity`}
                  </span>
                  <span className="tag">{result.confidence}% confidence</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: result.color + '20' }}>
                {result.severity === 'None' ? <CheckCircle className="w-6 h-6" style={{ color: result.color }} /> : <AlertTriangle className="w-6 h-6" style={{ color: result.color }} />}
              </div>
            </div>
            <div className="p-3 rounded-xl text-sm" style={{ background: 'hsl(0 0% 8%)' }}>
              <span className="text-muted-foreground text-xs block mb-1">Recommended Action:</span>
              {result.action}
            </div>
            <div className="flex gap-3 mt-4">
              <button className="btn-emerald flex-1 text-sm py-2">Save Report</button>
              <button className="btn-emerald-outline text-sm py-2 px-4" onClick={() => { setImage(null); setResult(null); }}>Scan New</button>
            </div>
          </div>
        )}

        {/* History */}
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Eye className="w-4 h-4" style={{ color: 'hsl(145 100% 39%)' }} /> Recent Scans</h2>
          <div className="space-y-3">
            {[
              { crop: 'Tomato Leaves', result: 'Late Blight', severity: 'High', date: '2 days ago' },
              { crop: 'Maize Stalk', result: 'Stem Borer', severity: 'Medium', date: '5 days ago' },
              { crop: 'Bean Pods', result: 'Healthy', severity: 'None', date: '1 week ago' },
            ].map((scan, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'hsl(0 0% 10%)' }}>
                <div><p className="text-sm font-medium">{scan.crop}</p><p className="text-xs text-muted-foreground">{scan.result}</p></div>
                <div className="flex items-center gap-3">
                  <span className="tag text-xs" style={{ 
                    background: scan.severity === 'None' ? 'hsl(145 100% 39% / 0.15)' : scan.severity === 'High' ? 'hsl(0 100% 66% / 0.15)' : 'hsl(45 100% 51% / 0.15)',
                    color: scan.severity === 'None' ? 'hsl(145 100% 39%)' : scan.severity === 'High' ? 'hsl(0 100% 66%)' : 'hsl(45 100% 51%)'
                  }}>{scan.severity === 'None' ? 'Healthy' : scan.severity}</span>
                  <span className="text-xs text-muted-foreground">{scan.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
