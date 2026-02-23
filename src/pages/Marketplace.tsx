import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Search, Plus, Star, MapPin, Package, CheckCircle, Clock, XCircle, MessageCircle, Eye, TrendingUp, Camera, Upload, Image, X } from 'lucide-react';

type Tab = 'listings' | 'requests';
type Status = 'pending' | 'approved' | 'rejected';

interface Listing {
  id: string;
  type: 'listing' | 'request';
  crop: string;
  quantity: string;
  price: string;
  location: string;
  seller: string;
  verified: boolean;
  status: Status;
  description: string;
  posted: string;
  category: string;
  score: number;
  image: string;
  media?: string[];
}

const mockListings: Listing[] = [
  { id: '1', type: 'listing', crop: 'Maize (Corn)', quantity: '2,000 kg', price: 'RWF 350/kg', location: 'Musanze, Rwanda', seller: 'Jean Paul U.', verified: true, status: 'approved', description: 'Fresh maize, harvested this week. Grade A quality. Can arrange transport within Musanze district.', posted: '2h ago', category: 'Cereals', score: 94, image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=250&fit=crop' },
  { id: '2', type: 'listing', crop: 'Cherry Tomatoes', quantity: '500 kg', price: 'RWF 900/kg', location: 'Nyabihu, Rwanda', seller: 'Marie C.', verified: true, status: 'approved', description: 'Organic cherry tomatoes. Pesticide-free. Perfect for restaurants and fresh markets.', posted: '5h ago', category: 'Vegetables', score: 88, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=250&fit=crop' },
  { id: '3', type: 'listing', crop: 'Avocado Hass', quantity: '1,200 kg', price: 'RWF 450/kg', location: 'Rubavu, Rwanda', seller: 'Pierre M.', verified: false, status: 'pending', description: 'Export quality Hass avocados. Ripe in 1 week. Grown at high altitude for superior taste.', posted: '1d ago', category: 'Fruits', score: 76, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d80f67?w=400&h=250&fit=crop' },
  { id: '4', type: 'listing', crop: 'Irish Potatoes', quantity: '5,000 kg', price: 'RWF 180/kg', location: 'Burera, Rwanda', seller: 'Agnes N.', verified: true, status: 'approved', description: 'Excellent size and uniformity. Good for industrial processing and fresh consumption.', posted: '2d ago', category: 'Tubers', score: 91, image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber75?w=400&h=250&fit=crop' },
  { id: '5', type: 'listing', crop: 'Dry Beans', quantity: '800 kg', price: 'RWF 1,100/kg', location: 'Ruhango, Rwanda', seller: 'Emmanuel K.', verified: true, status: 'approved', description: 'Red kidney beans. Sun dried for 2 weeks. Protein-rich quality suitable for export.', posted: '3d ago', category: 'Legumes', score: 85, image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&h=250&fit=crop' },
];

const mockRequests: Listing[] = [
  { id: '6', type: 'request', crop: 'Maize', quantity: '10,000 kg', price: 'RWF 340/kg', location: 'Kigali, Rwanda', seller: 'Rwanda Breweries Ltd', verified: true, status: 'approved', description: 'Seeking consistent maize supply for brewing. Long-term contract available for reliable farmers.', posted: '1h ago', category: 'Cereals', score: 97, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop' },
  { id: '7', type: 'request', crop: 'Fresh Tomatoes', quantity: '2,000 kg/week', price: 'RWF 850/kg', location: 'Kigali, Rwanda', seller: 'Hotel des Mille Collines', verified: true, status: 'approved', description: 'Weekly tomato supply needed for hotel restaurant. Premium prices for consistent quality.', posted: '3h ago', category: 'Vegetables', score: 92, image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=250&fit=crop' },
];

const categories = ['All', 'Cereals', 'Vegetables', 'Fruits', 'Tubers', 'Legumes'];

const statusConfig: Record<Status, { label: string; color: string }> = {
  approved: { label: 'Approved', color: 'hsl(145 100% 39%)' },
  pending: { label: 'Pending Review', color: 'hsl(45 100% 51%)' },
  rejected: { label: 'Rejected', color: 'hsl(0 100% 66%)' },
};

export default function Marketplace() {
  const [tab, setTab] = useState<Tab>('listings');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'listing' | 'request'>('listing');
  const [formData, setFormData] = useState({ crop: '', quantity: '', price: '', location: '', description: '', category: 'Cereals' });
  const [uploadedMedia, setUploadedMedia] = useState<string[]>([]);

  const data = tab === 'listings' ? mockListings : mockRequests;
  const filtered = data.filter(l =>
    (selectedCategory === 'All' || l.category === selectedCategory) &&
    (l.crop.toLowerCase().includes(search.toLowerCase()) || l.seller.toLowerCase().includes(search.toLowerCase()))
  );

  const handleMediaUpload = () => {
    // Simulates selecting from Media Capture gallery
    const sampleMedia = [
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop',
    ];
    setUploadedMedia(prev => [...prev, sampleMedia[prev.length % sampleMedia.length]]);
  };

  const removeMedia = (index: number) => {
    setUploadedMedia(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">🛒 Marketplace</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Buy, sell & request agricultural products with verified media</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-emerald flex items-center gap-2" onClick={() => { setCreateType('listing'); setShowCreateModal(true); }}>
              <Plus className="w-4 h-4" /> Create Listing
            </button>
            <button className="btn-emerald-outline flex items-center gap-2" onClick={() => { setCreateType('request'); setShowCreateModal(true); }}>
              <Plus className="w-4 h-4" /> Post Request
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Active Listings', value: '1,240', icon: Package, color: 'hsl(var(--emerald))' },
            { label: 'Open Requests', value: '380', icon: TrendingUp, color: 'hsl(var(--warning))' },
            { label: 'Verified Sellers', value: '892', icon: CheckCircle, color: 'hsl(var(--sky))' },
            { label: 'Avg Match Score', value: '87%', icon: Star, color: 'hsl(var(--gold))' },
          ].map(s => (
            <div key={s.label} className="metric-card">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="flex rounded-xl p-1 gap-1" style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 13%)' }}>
            <button onClick={() => setTab('listings')} className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={tab === 'listings' ? { background: 'hsl(var(--emerald))', color: 'hsl(0 0% 4%)' } : { color: 'hsl(var(--muted-foreground))' }}>
              📦 Listings
            </button>
            <button onClick={() => setTab('requests')} className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={tab === 'requests' ? { background: 'hsl(var(--emerald))', color: 'hsl(0 0% 4%)' } : { color: 'hsl(var(--muted-foreground))' }}>
              🔍 Requests
            </button>
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search crops, sellers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
                style={selectedCategory === cat
                  ? { background: 'hsl(var(--emerald) / 0.2)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.4)' }
                  : { background: 'hsl(0 0% 8%)', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(0 0% 13%)' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(listing => {
            const st = statusConfig[listing.status];
            return (
              <div key={listing.id} className="glass-card overflow-hidden cursor-pointer" onClick={() => setSelectedListing(listing)}>
                {/* Product Image */}
                <div className="relative">
                  <img src={listing.image} alt={listing.crop} className="w-full h-44 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop'; }} />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: st.color + 'dd', color: 'hsl(0 0% 4%)' }}>
                      {st.label}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="tag">{listing.category}</span>
                  </div>
                  {listing.type === 'request' && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'hsl(var(--sky) / 0.9)', color: 'hsl(0 0% 4%)' }}>REQUEST</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-base">{listing.crop}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" style={{ color: 'hsl(var(--gold))' }} />
                      <span className="text-xs" style={{ color: 'hsl(var(--gold))' }}>{listing.score}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{listing.location}</span>
                  </div>
                  <div className="flex gap-4 mb-2">
                    <div>
                      <span className="text-xs text-muted-foreground">Price</span>
                      <div className="font-bold text-sm" style={{ color: 'hsl(var(--emerald))' }}>{listing.price}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Qty</span>
                      <div className="font-semibold text-sm">{listing.quantity}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{listing.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'hsl(var(--emerald) / 0.2)', color: 'hsl(var(--emerald))' }}>
                        {listing.seller.charAt(0)}
                      </div>
                      <span className="text-xs">{listing.seller}</span>
                      {listing.verified && <CheckCircle className="w-3 h-3" style={{ color: 'hsl(var(--emerald))' }} />}
                    </div>
                    <span className="text-xs text-muted-foreground">{listing.posted}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No listings found. Try adjusting filters.</p>
          </div>
        )}

        {/* Detail Modal */}
        {selectedListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'hsl(0 0% 0% / 0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSelectedListing(null)}>
            <div className="glass-card max-w-lg w-full animate-slide-up overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <img src={selectedListing.image} alt={selectedListing.crop} className="w-full h-48 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop'; }} />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">{selectedListing.crop}</h2>
                  <button onClick={() => setSelectedListing(null)} className="text-muted-foreground hover:text-foreground">✕</button>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-6">
                    <div><span className="text-muted-foreground">Price</span><div className="font-bold text-lg" style={{ color: 'hsl(var(--emerald))' }}>{selectedListing.price}</div></div>
                    <div><span className="text-muted-foreground">Quantity</span><div className="font-semibold">{selectedListing.quantity}</div></div>
                  </div>
                  <div><span className="text-muted-foreground">Location</span><div>{selectedListing.location}</div></div>
                  <div><span className="text-muted-foreground">Description</span><div className="text-foreground/80 mt-1">{selectedListing.description}</div></div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'hsl(var(--emerald) / 0.2)', color: 'hsl(var(--emerald))' }}>
                      {selectedListing.seller.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{selectedListing.seller}</div>
                      {selectedListing.verified && <div className="text-xs text-muted-foreground flex items-center gap-1"><CheckCircle className="w-3 h-3" style={{ color: 'hsl(var(--emerald))' }} /> Verified Seller</div>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button className="btn-emerald flex-1 flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" /> Contact</button>
                  <button className="btn-emerald-outline px-4 flex items-center gap-2"><Eye className="w-4 h-4" /> Watch</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Listing/Request Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'hsl(0 0% 0% / 0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowCreateModal(false)}>
            <div className="glass-card p-6 max-w-lg w-full animate-slide-up max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold">{createType === 'listing' ? '📦 Create New Listing' : '📋 Post a Request'}</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>

              <div className="space-y-4">
                {/* Form fields */}
                {[
                  { key: 'crop', label: 'Crop / Product Name', placeholder: 'e.g., Fresh Maize' },
                  { key: 'quantity', label: 'Quantity', placeholder: 'e.g., 2,000 kg' },
                  { key: 'price', label: createType === 'listing' ? 'Asking Price' : 'Budget Price', placeholder: 'e.g., RWF 350/kg' },
                  { key: 'location', label: 'Location', placeholder: 'e.g., Musanze, Rwanda' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                    <input
                      value={formData[f.key as keyof typeof formData]}
                      onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Category</label>
                  <div className="flex gap-2 flex-wrap">
                    {categories.filter(c => c !== 'All').map(cat => (
                      <button key={cat} onClick={() => setFormData(p => ({ ...p, category: cat }))}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={formData.category === cat
                          ? { background: 'hsl(var(--emerald) / 0.2)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.4)' }
                          : { background: 'hsl(0 0% 8%)', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(0 0% 13%)' }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                    placeholder="Describe your product or request..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                  />
                </div>

                {/* Media Upload Section */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">📸 Attach Media (from Media Capture)</label>
                  <p className="text-xs text-muted-foreground mb-3">Upload images or videos captured through the Media Capture tool to verify your product quality.</p>

                  {uploadedMedia.length > 0 && (
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {uploadedMedia.map((url, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--border))' }}>
                          <img src={url} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                          <button onClick={() => removeMedia(i)} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: 'hsl(var(--alert))', color: 'white' }}>
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button onClick={handleMediaUpload} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{ background: 'hsl(var(--sky) / 0.15)', color: 'hsl(var(--sky))', border: '1px solid hsl(var(--sky) / 0.3)' }}>
                      <Camera className="w-4 h-4" /> From Media Capture
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{ background: 'hsl(0 0% 8%)', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(0 0% 13%)' }}>
                      <Upload className="w-4 h-4" /> Upload File
                    </button>
                  </div>
                </div>

                <button className="btn-emerald w-full mt-2">
                  {createType === 'listing' ? '📦 Submit Listing for Review' : '📋 Submit Request'}
                </button>
                <p className="text-xs text-center text-muted-foreground">All submissions require Admin approval before becoming public.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
