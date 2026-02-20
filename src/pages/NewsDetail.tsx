// ============================================================
// AGRIPIO — News Detail + AI Impact Advisor Panel
// PATENTABLE: Role-based AI news impact personalization
// COPYRIGHT: Signal-first news detail architecture
// ============================================================

import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import {
  ArrowLeft, ExternalLink, Eye, Clock, ArrowUp, ArrowDown,
  Minus, Leaf, ShoppingBag, TrendingUp, Truck,
  Lightbulb, Share2, Bookmark,
} from 'lucide-react';
import { mockNewsArticles, newsCategories } from '@/lib/newsData';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const { language, user } = useApp();
  const navigate = useNavigate();

  const article = mockNewsArticles.find(a => a.id === id);
  if (!article) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground mb-4">Article not found</p>
          <button className="btn-emerald-outline text-sm py-2 px-6" onClick={() => navigate('/dashboard/news')}>
            Back to News
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const priceIcon = article.aiImpact.priceDirection === 'Up' ? ArrowUp :
    article.aiImpact.priceDirection === 'Down' ? ArrowDown : Minus;
  const priceColor = article.aiImpact.priceDirection === 'Up' ? '145 100% 39%' :
    article.aiImpact.priceDirection === 'Down' ? '0 100% 66%' : '45 100% 51%';
  const riskColor = article.riskLevel === 'High' ? 'alert' : article.riskLevel === 'Medium' ? 'warning' : 'emerald';

  const relatedArticles = mockNewsArticles
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 4);

  const roleAdvice = [
    { role: 'farmer', icon: Leaf, label: language === 'en' ? 'For Farmers' : "Ku Bahinzi", advice: article.aiImpact.farmerAdvice, color: '145 100% 39%' },
    { role: 'buyer', icon: ShoppingBag, label: language === 'en' ? 'For Buyers' : "Ku Baguzi", advice: article.aiImpact.buyerAdvice, color: '200 90% 50%' },
    { role: 'investor', icon: TrendingUp, label: language === 'en' ? 'For Investors' : "Ku Bashoramari", advice: article.aiImpact.investorAdvice, color: '43 96% 56%' },
    { role: 'supplier', icon: Truck, label: language === 'en' ? 'For Suppliers' : "Ku Batanga Ibicuruzwa", advice: article.aiImpact.supplierAdvice, color: '14 24% 50%' },
  ];

  // Highlight user's own role
  const userRole = user?.role || 'farmer';

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto">
        {/* Back */}
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          onClick={() => navigate('/dashboard/news')}>
          <ArrowLeft className="w-4 h-4" />
          {language === 'en' ? 'Back to News' : 'Garuka ku Makuru'}
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Video/Thumbnail */}
            <div className="glass-card overflow-hidden mb-6">
              {article.videoUrl ? (
                <div className="aspect-video">
                  <iframe src={article.videoUrl} className="w-full h-full" allowFullScreen
                    title={article.title} />
                </div>
              ) : (
                <div className="aspect-video relative">
                  <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`tag ${riskColor}`}>{article.riskLevel} Risk</span>
                  {article.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <h1 className="text-xl md:text-2xl font-bold mb-3">{article.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="font-medium" style={{ color: 'hsl(var(--emerald))' }}>{article.source}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(article.publishDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views.toLocaleString()} views</span>
                  <span>{article.region}</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mb-6">
                  <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-emerald-outline text-xs py-2 px-4 flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5" /> {language === 'en' ? 'Read Source' : 'Soma Inkomoko'}
                  </a>
                  <button className="btn-emerald-outline text-xs py-2 px-4 flex items-center gap-2">
                    <Bookmark className="w-3.5 h-3.5" /> {language === 'en' ? 'Save' : 'Bika'}
                  </button>
                  <button className="btn-emerald-outline text-xs py-2 px-4 flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5" /> {language === 'en' ? 'Share' : 'Sangiza'}
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{article.description}</p>

                {/* AI Summary */}
                <div className="p-4 rounded-xl" style={{ background: 'hsl(var(--emerald) / 0.05)', border: '1px solid hsl(var(--emerald) / 0.15)' }}>
                  <h3 className="font-semibold text-sm flex items-center gap-2 mb-2" style={{ color: 'hsl(var(--emerald))' }}>
                    <Lightbulb className="w-4 h-4" /> {language === 'en' ? 'AI Summary' : 'Incamake ya AI'}
                  </h3>
                  <p className="text-sm leading-relaxed">{article.aiSummary}</p>
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  <div className="metric-card text-center">
                    <div className="text-xs text-muted-foreground mb-1">{language === 'en' ? 'Price Direction' : 'Icyerekezo cy\'Igiciro'}</div>
                    <div className="flex items-center justify-center gap-1">
                      {article.aiImpact.priceDirection === 'Up' ? <ArrowUp className="w-5 h-5" style={{ color: `hsl(${priceColor})` }} /> : article.aiImpact.priceDirection === 'Down' ? <ArrowDown className="w-5 h-5" style={{ color: `hsl(${priceColor})` }} /> : <Minus className="w-5 h-5" style={{ color: `hsl(${priceColor})` }} />}
                      <span className="text-lg font-bold" style={{ color: `hsl(${priceColor})` }}>{article.aiImpact.priceDirection}</span>
                    </div>
                  </div>
                  <div className="metric-card text-center">
                    <div className="text-xs text-muted-foreground mb-1">{language === 'en' ? 'Sentiment' : 'Ibyiyumvo'}</div>
                    <span className="text-lg font-bold mono">{(article.sentimentScore * 100).toFixed(0)}%</span>
                  </div>
                  <div className="metric-card text-center">
                    <div className="text-xs text-muted-foreground mb-1">{language === 'en' ? 'Crops Affected' : 'Imyaka Igezweho'}</div>
                    <span className="text-lg font-bold">{article.aiImpact.affectedCrops.length}</span>
                  </div>
                  <div className="metric-card text-center">
                    <div className="text-xs text-muted-foreground mb-1">{language === 'en' ? 'Regions' : 'Intara'}</div>
                    <span className="text-lg font-bold">{article.aiImpact.affectedRegions.length}</span>
                  </div>
                </div>

                {/* Affected crops & regions */}
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-xl" style={{ background: 'hsl(0 0% 6%)' }}>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {language === 'en' ? 'Affected Crops' : 'Imyaka Igezweho'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {article.aiImpact.affectedCrops.map(c => (
                        <span key={c} className="tag emerald">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'hsl(0 0% 6%)' }}>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {language === 'en' ? 'Affected Regions' : 'Intara Zigezweho'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {article.aiImpact.affectedRegions.map(r => (
                        <span key={r} className="tag sky">{r}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Apply to Project button */}
                <button className="btn-emerald w-full mt-6 text-sm py-3 flex items-center justify-center gap-2"
                  onClick={() => navigate('/dashboard/ai-guidance')}>
                  <Leaf className="w-4 h-4" />
                  {language === 'en' ? 'Apply Insight to My Project' : 'Koresha Inama mu Mushinga Wanjye'}
                </button>
              </div>
            </div>

            {/* Related News */}
            {relatedArticles.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  {language === 'en' ? 'Related News' : 'Amakuru Afitanye Isano'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedArticles.map(rel => (
                    <div key={rel.id} className="glass-card overflow-hidden cursor-pointer group"
                      onClick={() => navigate(`/dashboard/news/${rel.id}`)}>
                      <div className="aspect-video overflow-hidden">
                        <img src={rel.thumbnail} alt={rel.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium line-clamp-2 group-hover:text-[hsl(var(--emerald))] transition-colors">
                          {rel.title}
                        </p>
                        <span className="text-xs text-muted-foreground">{rel.source} • {rel.region}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel — AI Impact Advisor */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="glass-card p-5 sticky top-20">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: 'hsl(var(--emerald))' }}>
                🧠 {language === 'en' ? 'AI Impact Advisor' : 'Umujyanama wa AI'}
              </h3>

              <div className="space-y-4">
                {roleAdvice.map(ra => {
                  const isUserRole = ra.role === userRole;
                  return (
                    <div key={ra.role} className="p-4 rounded-xl transition-all"
                      style={{
                        background: isUserRole ? `hsl(${ra.color} / 0.08)` : 'hsl(0 0% 6%)',
                        border: isUserRole ? `1px solid hsl(${ra.color} / 0.3)` : '1px solid transparent',
                      }}>
                      <div className="flex items-center gap-2 mb-2">
                        <ra.icon className="w-4 h-4" style={{ color: `hsl(${ra.color})` }} />
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: `hsl(${ra.color})` }}>
                          {ra.label}
                        </span>
                        {isUserRole && (
                          <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{ background: `hsl(${ra.color} / 0.2)`, color: `hsl(${ra.color})` }}>
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">{ra.advice}</p>
                    </div>
                  );
                })}
              </div>

              {/* Market Impact */}
              <div className="mt-4 p-4 rounded-xl" style={{ background: 'hsl(0 0% 6%)' }}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {language === 'en' ? 'Market Impact' : 'Ingaruka ku Isoko'}
                </h4>
                <p className="text-xs leading-relaxed">{article.aiImpact.marketImpact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
