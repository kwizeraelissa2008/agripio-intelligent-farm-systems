import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Search, Filter, Plus, Star, MapPin, Package, CheckCircle, Clock, XCircle, MessageCircle, Eye, TrendingUp } from 'lucide-react';

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
}

const mockListings: Listing[] = [
  { id: '1', type: 'listing', crop: 'Maize (Corn)', quantity: '2,000 kg', price: 'RWF 350/kg', location: 'Musanze, Rwanda', seller: 'Jean Paul U.', verified: true, status: 'approved', description: 'Fresh maize, harvested this week. Grade A quality. Can arrange transport.', posted: '2h ago', category: 'Cereals', score: 94 },
  { id: '2', type: 'listing', crop: 'Cherry Tomatoes', quantity: '500 kg', price: 'RWF 900/kg', location: 'Nyabihu, Rwanda', seller: 'Marie C.', verified: true, status: 'approved', description: 'Organic cherry tomatoes. Pesticide-free. Perfect for restaurants.', posted: '5h ago', category: 'Vegetables', score: 88 },
  { id: '3', type: 'listing', crop: 'Avocado Hass', quantity: '1,200 kg', price: 'RWF 450/kg', location: 'Rubavu, Rwanda', seller: 'Pierre M.', verified: false, status: 'pending', description: 'Export quality Hass avocados. Ripe in 1 week.', posted: '1d ago', category: 'Fruits', score: 76 },
  { id: '4', type: 'listing', crop: 'Irish Potatoes', quantity: '5,000 kg', price: 'RWF 180/kg', location: 'Burera, Rwanda', seller: 'Agnes N.', verified: true, status: 'approved', description: 'Excellent size and uniformity. Good for industrial processing.', posted: '2d ago', category: 'Tubers', score: 91 },
  { id: '5', type: 'listing', crop: 'Dry Beans', quantity: '800 kg', price: 'RWF 1,100/kg', location: 'Ruhango, Rwanda', seller: 'Emmanuel K.', verified: true, status: 'approved', description: 'Red kidney beans. Sun dried. Protein-rich quality.', posted: '3d ago', category: 'Legumes', score: 85 },
];

const mockRequests: Listing[] = [
  { id: '6', type: 'request', crop: 'Maize', quantity: '10,000 kg', price: 'RWF 340/kg', location: 'Kigali, Rwanda', seller: 'Rwanda Breweries Ltd', verified: true, status: 'approved', description: 'Seeking consistent maize supply for brewing. Long-term contract available.', posted: '1h ago', category: 'Cereals', score: 97 },
  { id: '7', type: 'request', crop: 'Fresh Tomatoes', quantity: '2,000 kg/week', price: 'RWF 850/kg', location: 'Kigali, Rwanda', seller: 'Hotel des Mille Collines', verified: true, status: 'approved', description: 'Weekly tomato supply needed for hotel restaurant. Premium prices.', posted: '3h ago', category: 'Vegetables', score: 92 },
];

const categories = ['All', 'Cereals', 'Vegetables', 'Fruits', 'Tubers', 'Legumes'];

const statusConfig: Record<Status, { icon: any; label: string; color: string }> = {
  approved: { icon: CheckCircle, label: 'Approved', color: 'hsl(145 100% 39%)' },
  pending: { icon: Clock, label: 'Pending Review', color: 'hsl(45 100% 51%)' },
  rejected: { icon: XCircle, label: 'Rejected', color: 'hsl(0 100% 66%)' },
};

export default function Marketplace() {
  const [tab, setTab] = useState<Tab>('listings');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const data = tab === 'listings' ? mockListings : mockRequests;
  const filtered = data.filter(l => 
    (selectedCategory === 'All' || l.category === selectedCategory) &&
    (l.crop.toLowerCase().includes(search.toLowerCase()) || l.seller.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Connect with buyers, sellers & cooperatives</p>
          </div>
          <button className="btn-emerald flex items-center gap-2 self-start">
            <Plus className="w-4 h-4" /> Create Listing
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Active Listings', value: '1,240', icon: Package, color: 'hsl(145 100% 39%)' },
            { label: 'Open Requests', value: '380', icon: TrendingUp, color: 'hsl(43 96% 56%)' },
            { label: 'Verified Sellers', value: '892', icon: CheckCircle, color: 'hsl(200 90% 50%)' },
            { label: 'Avg Match Score', value: '87%', icon: Star, color: 'hsl(45 100% 51%)' },
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
              style={tab === 'listings' ? { background: 'hsl(145 100% 39%)', color: 'hsl(0 0% 4%)' } : { color: 'hsl(120 10% 55%)' }}>
              📦 Listings
            </button>
            <button onClick={() => setTab('requests')} className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={tab === 'requests' ? { background: 'hsl(145 100% 39%)', color: 'hsl(0 0% 4%)' } : { color: 'hsl(120 10% 55%)' }}>
              🔍 Requests
            </button>
          </div>

          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search crops, sellers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(120 20% 96%)' }} />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
                style={selectedCategory === cat 
                  ? { background: 'hsl(145 100% 39% / 0.2)', color: 'hsl(145 100% 39%)', border: '1px solid hsl(145 100% 39% / 0.4)' }
                  : { background: 'hsl(0 0% 8%)', color: 'hsl(120 10% 55%)', border: '1px solid hsl(0 0% 13%)' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Listings grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(listing => {
            const st = statusConfig[listing.status];
            return (
              <div key={listing.id} className="glass-card p-5 cursor-pointer" onClick={() => setSelectedListing(listing)}>
                {/* Top */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-base">{listing.crop}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{listing.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="tag" style={{ background: st.color + '20', color: st.color, fontSize: '10px', padding: '2px 6px' }}>
                      {st.label}
                    </span>
                    <span className="tag">{listing.category}</span>
                  </div>
                </div>

                {/* Price & Qty */}
                <div className="flex gap-4 mb-3">
                  <div>
                    <span className="text-xs text-muted-foreground">Price</span>
                    <div className="font-bold" style={{ color: 'hsl(145 100% 39%)' }}>{listing.price}</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Quantity</span>
                    <div className="font-semibold text-sm">{listing.quantity}</div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{listing.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'hsl(145 100% 39% / 0.2)', color: 'hsl(145 100% 39%)' }}>
                      {listing.seller.charAt(0)}
                    </div>
                    <span className="text-xs">{listing.seller}</span>
                    {listing.verified && <CheckCircle className="w-3 h-3" style={{ color: 'hsl(145 100% 39%)' }} />}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" style={{ color: 'hsl(43 96% 56%)' }} />
                      <span className="text-xs" style={{ color: 'hsl(43 96% 56%)' }}>{listing.score}</span>
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
            <div className="glass-card p-6 max-w-md w-full animate-slide-up" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{selectedListing.crop}</h2>
                <button onClick={() => setSelectedListing(null)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex gap-6">
                  <div><span className="text-muted-foreground">Price</span><div className="font-bold text-lg" style={{ color: 'hsl(145 100% 39%)' }}>{selectedListing.price}</div></div>
                  <div><span className="text-muted-foreground">Quantity</span><div className="font-semibold">{selectedListing.quantity}</div></div>
                </div>
                <div><span className="text-muted-foreground">Location</span><div>{selectedListing.location}</div></div>
                <div><span className="text-muted-foreground">Description</span><div className="text-foreground/80 mt-1">{selectedListing.description}</div></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'hsl(145 100% 39% / 0.2)', color: 'hsl(145 100% 39%)' }}>
                    {selectedListing.seller.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{selectedListing.seller}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      {selectedListing.verified && <><CheckCircle className="w-3 h-3" style={{ color: 'hsl(145 100% 39%)' }} /> Verified Seller</>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="btn-emerald flex-1 flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Contact Seller
                </button>
                <button className="btn-emerald-outline px-4 flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Watch
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
