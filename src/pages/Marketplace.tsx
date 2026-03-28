import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Search, Plus, Star, MapPin, Package, CheckCircle, Clock, MessageCircle, Eye, Camera, Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type Tab = 'listings' | 'my';

interface Listing {
  id: string;
  user_id: string;
  type: string;
  crop: string;
  quantity: string;
  price: string;
  location: string | null;
  description: string | null;
  category: string | null;
  status: string | null;
  image_url: string | null;
  created_at: string;
}

const categories = ['All', 'Cereals', 'Vegetables', 'Fruits', 'Tubers', 'Legumes'];

export default function Marketplace() {
  const { t, language } = useApp();
  const { user, profile } = useAuth();
  const [tab, setTab] = useState<Tab>('listings');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [form, setForm] = useState({ crop: '', quantity: '', price: '', location: '', description: '', category: 'Cereals' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchListings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('marketplace_listings')
      .select('*')
      .order('created_at', { ascending: false });
    setListings((data as Listing[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchListings(); }, []);

  const filtered = listings.filter(l => {
    if (tab === 'my') return l.user_id === user?.id;
    return l.status === 'approved' || l.user_id === user?.id;
  }).filter(l =>
    (selectedCategory === 'All' || l.category === selectedCategory) &&
    (l.crop.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreate = async () => {
    if (!form.crop || !form.quantity || !form.price || !user) return;
    setCreating(true);

    let imageUrl = null;
    if (imageFile) {
      const ext = imageFile.name.split('.').pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { data: uploadData } = await supabase.storage.from('marketplace').upload(path, imageFile);
      if (uploadData) {
        const { data: urlData } = supabase.storage.from('marketplace').getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }
    }

    const { error } = await supabase.from('marketplace_listings').insert({
      user_id: user.id,
      crop: form.crop,
      quantity: form.quantity,
      price: form.price,
      location: form.location || profile?.location_name || null,
      description: form.description,
      category: form.category,
      image_url: imageUrl,
      status: 'approved', // auto-approve for now
    } as any);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(language === 'rw' ? 'Igicuruzwa cyashyizweho!' : 'Listing created!');
      setForm({ crop: '', quantity: '', price: '', location: '', description: '', category: 'Cereals' });
      setImageFile(null);
      setShowCreate(false);
      fetchListings();
    }
    setCreating(false);
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl text-sm outline-none bg-secondary border border-border';

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-24">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">🛒 {t('marketplace')}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {language === 'rw' ? 'Gura, gurgisha ibicuruzwa by\'ubuhinzi' : 'Buy & sell agricultural products'}
            </p>
          </div>
          <button className="btn-emerald flex items-center gap-2" onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4" /> {language === 'rw' ? 'Shyiraho Igicuruzwa' : 'Create Listing'}
          </button>
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="flex rounded-xl p-1 gap-1 bg-secondary border border-border">
            <button onClick={() => setTab('listings')} className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={tab === 'listings' ? { background: 'hsl(var(--emerald))', color: 'hsl(var(--primary-foreground))' } : {}}>
              📦 {language === 'rw' ? 'Ibicuruzwa' : 'All Listings'}
            </button>
            <button onClick={() => setTab('my')} className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={tab === 'my' ? { background: 'hsl(var(--emerald))', color: 'hsl(var(--primary-foreground))' } : {}}>
              👤 {language === 'rw' ? 'Ibyanjye' : 'My Listings'}
            </button>
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={language === 'rw' ? 'Shakisha...' : 'Search crops...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none bg-secondary border border-border" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
                style={selectedCategory === cat
                  ? { background: 'hsl(var(--emerald) / 0.2)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.4)' }
                  : { background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="text-center py-16"><Loader2 className="w-8 h-8 mx-auto animate-spin text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>{language === 'rw' ? 'Nta bicuruzwa bibonetse. Shyiraho igicuruzwa!' : 'No listings found. Create one!'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(l => (
              <div key={l.id} className="glass-card overflow-hidden cursor-pointer" onClick={() => setSelectedListing(l)}>
                {l.image_url ? (
                  <img src={l.image_url} alt={l.crop} className="w-full h-44 object-cover" />
                ) : (
                  <div className="w-full h-44 bg-secondary flex items-center justify-center">
                    <Package className="w-12 h-12 text-muted-foreground opacity-30" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-base">{l.crop}</h3>
                    <span className="tag emerald text-xs">{l.status}</span>
                  </div>
                  {l.location && (
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{l.location}</span>
                    </div>
                  )}
                  <div className="flex gap-4 mb-2">
                    <div>
                      <span className="text-xs text-muted-foreground">{language === 'rw' ? 'Igiciro' : 'Price'}</span>
                      <div className="font-bold text-sm" style={{ color: 'hsl(var(--emerald))' }}>{l.price}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{language === 'rw' ? 'Ingano' : 'Qty'}</span>
                      <div className="font-semibold text-sm">{l.quantity}</div>
                    </div>
                  </div>
                  {l.description && <p className="text-xs text-muted-foreground line-clamp-2">{l.description}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <span className="tag">{l.category}</span>
                    <span className="text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'hsl(0 0% 0% / 0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSelectedListing(null)}>
            <div className="glass-card max-w-lg w-full animate-slide-up overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              {selectedListing.image_url && (
                <img src={selectedListing.image_url} alt={selectedListing.crop} className="w-full h-48 object-cover" />
              )}
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
                  {selectedListing.location && <div><span className="text-muted-foreground">Location</span><div>{selectedListing.location}</div></div>}
                  {selectedListing.description && <div><span className="text-muted-foreground">Description</span><div className="text-foreground/80">{selectedListing.description}</div></div>}
                </div>
                <div className="flex gap-3 mt-6">
                  <button className="btn-emerald flex-1 flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" /> Contact</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Modal */}
        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'hsl(0 0% 0% / 0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowCreate(false)}>
            <div className="glass-card p-6 max-w-lg w-full animate-slide-up max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold">📦 {language === 'rw' ? 'Shyiraho Igicuruzwa' : 'Create New Listing'}</h2>
                <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'crop', label: language === 'rw' ? 'Igihingwa' : 'Crop Name', placeholder: 'e.g., Fresh Maize' },
                  { key: 'quantity', label: language === 'rw' ? 'Ingano' : 'Quantity', placeholder: 'e.g., 2,000 kg' },
                  { key: 'price', label: language === 'rw' ? 'Igiciro' : 'Price', placeholder: 'e.g., RWF 350/kg' },
                  { key: 'location', label: language === 'rw' ? 'Aho biherereye' : 'Location', placeholder: 'e.g., Musanze, Rwanda' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                    <input value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder} className={inputCls} />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{language === 'rw' ? 'Ibyiciro' : 'Category'}</label>
                  <div className="flex gap-2 flex-wrap">
                    {categories.filter(c => c !== 'All').map(cat => (
                      <button key={cat} onClick={() => setForm(p => ({ ...p, category: cat }))}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={form.category === cat
                          ? { background: 'hsl(var(--emerald) / 0.2)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.4)' }
                          : { background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{language === 'rw' ? 'Ibisobanuro' : 'Description'}</label>
                  <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder={language === 'rw' ? 'Sobanura igicuruzwa cyawe...' : 'Describe your product...'} rows={3} className={inputCls + ' resize-none'} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">📸 {language === 'rw' ? 'Ifoto' : 'Product Image'}</label>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                  <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary border border-border">
                    <Camera className="w-4 h-4" />
                    {imageFile ? `📎 ${imageFile.name.slice(0, 25)}...` : (language === 'rw' ? 'Hitamo ifoto' : 'Choose image')}
                  </button>
                </div>
                <button onClick={handleCreate} disabled={creating || !form.crop || !form.quantity || !form.price}
                  className="btn-emerald w-full flex items-center justify-center gap-2">
                  {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                  📦 {language === 'rw' ? 'Emeza' : 'Submit Listing'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
