// ============================================================
// AGRIPIO — YouTube-Styled Agricultural News Intelligence
// PATENTABLE: AI-powered news impact analysis for agriculture
// COPYRIGHT: Signal-first news UI architecture
// ============================================================

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Clock, Eye, AlertTriangle,
  Search, Flame, ArrowUp, ArrowDown, Minus, Play,
} from 'lucide-react';
import {
  mockNewsArticles, newsCategories, globalAgriScore,
  type NewsCategory, type NewsArticle,
} from '@/lib/newsData';

function ScoreGauge({ score, status }: { score: number; status: string }) {
  const color = status === 'Stable' ? 'var(--emerald)' : status === 'Watch' ? 'var(--warning)' : 'var(--alert)';
  const colorHsl = status === 'Stable' ? '145 100% 39%' : status === 'Watch' ? '45 100% 51%' : '0 100% 66%';
  return (
    <div className="glass-card p-6 text-center">
      <div className="text-xs uppercase tracking-widest mb-3" style={{ color: `hsl(${colorHsl})` }}>
        Global Agriculture Intelligence
      </div>
      <div className="relative w-28 h-28 mx-auto mb-3">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(0 0% 12%)" strokeWidth="8" />
          <circle cx="50" cy="50" r="42" fill="none" stroke={`hsl(${colorHsl})`} strokeWidth="8"
            strokeDasharray={`${score * 2.64} 264`} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px hsl(${colorHsl} / 0.5))` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold mono">{score}</span>
          <span className="text-xs" style={{ color: `hsl(${colorHsl})` }}>{status}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 rounded-lg" style={{ background: 'hsl(0 0% 8%)' }}>
          <div className="text-muted-foreground">Climate</div>
          <div className="font-bold">{globalAgriScore.climateInstability}%</div>
        </div>
        <div className="p-2 rounded-lg" style={{ background: 'hsl(0 0% 8%)' }}>
          <div className="text-muted-foreground">Commodity</div>
          <div className="font-bold">{globalAgriScore.commodityVolatility}%</div>
        </div>
        <div className="p-2 rounded-lg" style={{ background: 'hsl(0 0% 8%)' }}>
          <div className="text-muted-foreground">Political</div>
          <div className="font-bold">{globalAgriScore.politicalInstability}%</div>
        </div>
        <div className="p-2 rounded-lg" style={{ background: 'hsl(0 0% 8%)' }}>
          <div className="text-muted-foreground">Fertilizer</div>
          <div className="font-bold">{globalAgriScore.fertilizerSupplyChain}%</div>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ article, onClick }: { article: NewsArticle; onClick: () => void }) {
  const priceIcon = article.aiImpact.priceDirection === 'Up' ? ArrowUp :
    article.aiImpact.priceDirection === 'Down' ? ArrowDown : Minus;
  const priceColor = article.aiImpact.priceDirection === 'Up' ? '145 100% 39%' :
    article.aiImpact.priceDirection === 'Down' ? '0 100% 66%' : '45 100% 51%';
  const riskClass = article.riskLevel === 'High' ? 'alert' : article.riskLevel === 'Medium' ? 'warning' : 'emerald';

  return (
    <div className="glass-card overflow-hidden cursor-pointer group" onClick={onClick}>
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img src={article.thumbnail} alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {article.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--emerald) / 0.9)' }}>
              <Play className="w-6 h-6 ml-1" style={{ color: 'hsl(0 0% 4%)' }} />
            </div>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className={`tag ${riskClass}`}>{article.riskLevel} Risk</span>
        </div>
        <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
          style={{ background: 'hsl(0 0% 0% / 0.7)', color: `hsl(${priceColor})` }}>
          {article.aiImpact.priceDirection === 'Up' ? <ArrowUp className="w-3 h-3" /> : article.aiImpact.priceDirection === 'Down' ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          {article.aiImpact.priceDirection}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[hsl(var(--emerald))] transition-colors">
          {article.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="font-medium">{article.source}</span>
          <span>•</span>
          <span>{article.region}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{(article.views / 1000).toFixed(1)}K views</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{new Date(article.publishDate).toLocaleDateString()}</span>
          </div>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {article.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function News() {
  const { t, language, user } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    let articles = mockNewsArticles;
    if (activeCategory !== 'all') {
      articles = articles.filter(a => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.region.toLowerCase().includes(q)
      );
    }
    return articles.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }, [activeCategory, searchQuery]);

  const trendingArticles = mockNewsArticles
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              🌍 {language === 'en' ? 'Agricultural Intelligence' : 'Ubumenyi bw\'Ubuhinzi'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'en'
                ? 'AI-powered global agriculture news & insights'
                : 'Amakuru y\'ubuhinzi ku isi yose afashijwe na AI'}
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder={language === 'en' ? 'Search news...' : 'Shakisha amakuru...'}
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
              style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(var(--foreground))' }} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar — Categories */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="glass-card p-3 mb-4">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${activeCategory === 'all' ? 'text-[hsl(var(--emerald))]' : 'text-muted-foreground hover:text-foreground'}`}
                style={activeCategory === 'all' ? { background: 'hsl(var(--emerald) / 0.1)' } : {}}>
                📰 {language === 'en' ? 'All News' : 'Amakuru Yose'}
              </button>
              {newsCategories.map(cat => (
                <button key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${activeCategory === cat.id ? 'text-[hsl(var(--emerald))]' : 'text-muted-foreground hover:text-foreground'}`}
                  style={activeCategory === cat.id ? { background: 'hsl(var(--emerald) / 0.1)' } : {}}>
                  {cat.emoji} {language === 'en' ? cat.label : cat.labelRw}
                </button>
              ))}
            </div>

            {/* Global Score */}
            <div className="hidden lg:block">
              <ScoreGauge score={globalAgriScore.score} status={globalAgriScore.status} />
            </div>
          </div>

          {/* Main Grid */}
          <div className="flex-1 min-w-0">
            {/* Category Pills (mobile) */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 lg:hidden scrollbar-hide">
              <button onClick={() => setActiveCategory('all')}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeCategory === 'all' ? 'btn-emerald' : ''}`}
                style={activeCategory !== 'all' ? { background: 'hsl(0 0% 10%)', color: 'hsl(var(--muted-foreground))' } : {}}>
                All
              </button>
              {newsCategories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeCategory === cat.id ? 'btn-emerald' : ''}`}
                  style={activeCategory !== cat.id ? { background: 'hsl(0 0% 10%)', color: 'hsl(var(--muted-foreground))' } : {}}>
                  {cat.emoji} {language === 'en' ? cat.label : cat.labelRw}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <p className="text-muted-foreground">{language === 'en' ? 'No articles found' : 'Nta makuru yabonetse'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredArticles.map(article => (
                  <NewsCard key={article.id} article={article}
                    onClick={() => navigate(`/dashboard/news/${article.id}`)} />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar — Trending */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="glass-card p-4 mb-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4" style={{ color: 'hsl(var(--warning))' }} />
                {language === 'en' ? 'Trending Now' : 'Birazinguka'}
              </h3>
              <div className="space-y-3">
                {trendingArticles.map((article, i) => (
                  <div key={article.id} className="flex gap-3 cursor-pointer group"
                    onClick={() => navigate(`/dashboard/news/${article.id}`)}>
                    <span className="text-2xl font-bold mono" style={{ color: 'hsl(var(--emerald) / 0.3)' }}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium leading-snug line-clamp-2 group-hover:text-[hsl(var(--emerald))] transition-colors">
                        {article.title}
                      </p>
                      <span className="text-xs text-muted-foreground">{article.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Alerts */}
            <div className="glass-card p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" style={{ color: 'hsl(var(--alert))' }} />
                {language === 'en' ? 'Risk Alerts' : 'Imenyesha y\'Ingaruka'}
              </h3>
              <div className="space-y-2">
                {mockNewsArticles.filter(a => a.riskLevel === 'High').map(article => (
                  <div key={article.id} className="p-3 rounded-lg cursor-pointer transition-all hover:border-[hsl(var(--alert))]"
                    onClick={() => navigate(`/dashboard/news/${article.id}`)}
                    style={{ background: 'hsl(0 100% 66% / 0.05)', border: '1px solid hsl(0 100% 66% / 0.15)' }}>
                    <p className="text-xs font-medium line-clamp-2">{article.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="status-dot alert" />
                      <span className="text-xs" style={{ color: 'hsl(var(--alert))' }}>{article.region}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile score */}
            <div className="lg:hidden mt-4">
              <ScoreGauge score={globalAgriScore.score} status={globalAgriScore.status} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
