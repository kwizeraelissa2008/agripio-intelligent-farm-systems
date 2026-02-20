// ============================================================
// AGRIPIO — Global Agricultural News Intelligence Data Layer
// PATENTABLE: AI-powered agricultural news impact analysis
// COPYRIGHT: Signal-first news architecture design
// ============================================================

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string;
  videoUrl: string | null;
  thumbnail: string;
  category: NewsCategory;
  region: string;
  publishDate: string;
  tags: string[];
  views: number;
  sentimentScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  aiSummary: string;
  aiImpact: AIImpactAnalysis;
}

export interface AIImpactAnalysis {
  affectedCrops: string[];
  affectedRegions: string[];
  marketImpact: string;
  priceDirection: 'Up' | 'Down' | 'Stable';
  farmerAdvice: string;
  buyerAdvice: string;
  investorAdvice: string;
  supplierAdvice: string;
}

export type NewsCategory = 'trending' | 'climate' | 'market' | 'technology' | 'policy' | 'africa' | 'global';

export const newsCategories: { id: NewsCategory; label: string; labelRw: string; emoji: string }[] = [
  { id: 'trending', label: 'Trending', labelRw: 'Birazinguka', emoji: '🔥' },
  { id: 'climate', label: 'Climate', labelRw: 'Ikirere', emoji: '🌦' },
  { id: 'market', label: 'Market', labelRw: 'Isoko', emoji: '📈' },
  { id: 'technology', label: 'Technology', labelRw: 'Ikoranabuhanga', emoji: '🤖' },
  { id: 'policy', label: 'Policy', labelRw: 'Amategeko', emoji: '📜' },
  { id: 'africa', label: 'Africa Focus', labelRw: 'Afurika', emoji: '🌍' },
  { id: 'global', label: 'Global', labelRw: 'Isi Yose', emoji: '🌐' },
];

export const globalAgriScore = {
  score: 72,
  status: 'Watch' as 'Stable' | 'Watch' | 'Disruption',
  climateInstability: 45,
  commodityVolatility: 62,
  politicalInstability: 28,
  fertilizerSupplyChain: 55,
};

export const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'East Africa Faces Severe Drought — Maize Production at Risk',
    description: 'Prolonged dry spells across Kenya, Uganda, and Tanzania threaten maize yields. Experts warn of potential food crisis if rains do not arrive by March.',
    source: 'Reuters Agriculture',
    sourceUrl: 'https://reuters.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=340&fit=crop',
    category: 'climate',
    region: 'East Africa',
    publishDate: '2026-02-19',
    tags: ['Drought', 'Maize', 'Food Security'],
    views: 12400,
    sentimentScore: 0.28,
    riskLevel: 'High',
    aiSummary: 'Severe drought conditions across East Africa are threatening maize production. Farmers should delay planting and consider drought-resistant varieties. Market prices likely to surge 20-30%.',
    aiImpact: {
      affectedCrops: ['Maize', 'Beans', 'Sorghum'],
      affectedRegions: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda'],
      marketImpact: 'Maize prices expected to increase 20-30% within 6 weeks',
      priceDirection: 'Up',
      farmerAdvice: 'Delay planting by 2-3 weeks. Switch to drought-resistant varieties like DTMA. Reduce irrigation zones.',
      buyerAdvice: 'Secure supply contracts now before prices spike. Consider alternative grain sources.',
      investorAdvice: 'Drought-resilient agriculture projects present strong ROI. Storage infrastructure investment recommended.',
      supplierAdvice: 'Stock drought-resistant seeds and water-saving irrigation equipment. Demand will surge.',
    },
  },
  {
    id: '2',
    title: 'Rwanda Launches $50M Smart Agriculture Initiative',
    description: 'Government partners with tech companies to deploy IoT sensors and AI-driven advisory systems across 100,000 farms by 2027.',
    source: 'The New Times Rwanda',
    sourceUrl: 'https://newtimes.co.rw',
    videoUrl: null,
    thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=340&fit=crop',
    category: 'africa',
    region: 'Rwanda',
    publishDate: '2026-02-18',
    tags: ['Rwanda', 'Smart Agriculture', 'IoT', 'Government'],
    views: 8900,
    sentimentScore: 0.89,
    riskLevel: 'Low',
    aiSummary: 'Rwanda is investing heavily in agricultural technology. This creates opportunities for tech-enabled farmers and positions Rwanda as an agritech hub in Africa.',
    aiImpact: {
      affectedCrops: ['All crops'],
      affectedRegions: ['Rwanda'],
      marketImpact: 'Long-term positive impact on agricultural productivity and market access',
      priceDirection: 'Stable',
      farmerAdvice: 'Register for the government smart agriculture program. Adopt IoT devices for soil monitoring.',
      buyerAdvice: 'Rwandan produce quality will improve. Build long-term supply relationships now.',
      investorAdvice: 'Strong government backing reduces risk. Consider agritech investments in Rwanda.',
      supplierAdvice: 'IoT devices and smart farming tools demand will increase significantly.',
    },
  },
  {
    id: '3',
    title: 'Global Fertilizer Prices Drop 15% as Supply Chains Normalize',
    description: 'After two years of elevated prices, global fertilizer costs are declining as production ramps up in multiple regions.',
    source: 'Bloomberg Commodities',
    sourceUrl: 'https://bloomberg.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=340&fit=crop',
    category: 'market',
    region: 'Global',
    publishDate: '2026-02-17',
    tags: ['Fertilizer', 'Commodity Prices', 'Supply Chain'],
    views: 15200,
    sentimentScore: 0.75,
    riskLevel: 'Low',
    aiSummary: 'Fertilizer prices declining globally. Farmers can optimize input costs. Best time to bulk purchase NPK compounds for the upcoming season.',
    aiImpact: {
      affectedCrops: ['All crops'],
      affectedRegions: ['Global'],
      marketImpact: 'Input costs decreasing, potential for higher profit margins',
      priceDirection: 'Down',
      farmerAdvice: 'Lock in fertilizer purchases now at lower prices. Consider bulk buying for the season.',
      buyerAdvice: 'Lower input costs may translate to more competitive produce pricing.',
      investorAdvice: 'Farm profitability improving due to lower input costs. Good entry point.',
      supplierAdvice: 'Adjust pricing strategy. Volume sales opportunity as farmers increase purchases.',
    },
  },
  {
    id: '4',
    title: 'AI-Powered Crop Disease Detection Achieves 97% Accuracy',
    description: 'New deep learning models trained on 2M+ images can identify 50 crop diseases from smartphone photos in under 3 seconds.',
    source: 'Nature Agriculture',
    sourceUrl: 'https://nature.com',
    videoUrl: null,
    thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=340&fit=crop',
    category: 'technology',
    region: 'Global',
    publishDate: '2026-02-16',
    tags: ['AI', 'Disease Detection', 'Innovation'],
    views: 22100,
    sentimentScore: 0.92,
    riskLevel: 'Low',
    aiSummary: 'Breakthrough in AI crop disease detection. Smartphone-based systems can now diagnose diseases instantly. This technology is being integrated into platforms like AgriPio.',
    aiImpact: {
      affectedCrops: ['Tomatoes', 'Potatoes', 'Rice', 'Wheat', 'Cassava'],
      affectedRegions: ['Global'],
      marketImpact: 'Reduced crop losses will stabilize supply and moderate price spikes',
      priceDirection: 'Stable',
      farmerAdvice: 'Use smartphone apps for regular crop scanning. Early detection saves up to 40% of yield.',
      buyerAdvice: 'Quality assurance improving. Expect more consistent produce quality.',
      investorAdvice: 'Agritech AI companies are showing strong growth. Disease detection is a key investment area.',
      supplierAdvice: 'Bundle disease management products with AI diagnostic services.',
    },
  },
  {
    id: '5',
    title: 'EU Implements New Organic Certification Standards for African Imports',
    description: 'Stricter organic certification requirements may impact smallholder access to European markets starting Q3 2026.',
    source: 'FAO',
    sourceUrl: 'https://fao.org',
    videoUrl: null,
    thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=340&fit=crop',
    category: 'policy',
    region: 'Europe / Africa',
    publishDate: '2026-02-15',
    tags: ['Policy', 'Organic', 'Trade', 'EU'],
    views: 6700,
    sentimentScore: 0.42,
    riskLevel: 'Medium',
    aiSummary: 'New EU organic standards require additional documentation and testing. Smallholder cooperatives need to prepare for compliance costs. Market access at risk for non-compliant producers.',
    aiImpact: {
      affectedCrops: ['Coffee', 'Tea', 'Avocado', 'Cocoa'],
      affectedRegions: ['East Africa', 'West Africa'],
      marketImpact: 'Short-term disruption for African organic exporters; long-term market premium for compliant farms',
      priceDirection: 'Up',
      farmerAdvice: 'Start organic certification process now. Join cooperatives for shared compliance costs.',
      buyerAdvice: 'Organic premium produce prices may increase. Secure certified supply chains early.',
      investorAdvice: 'Organic certification infrastructure is an emerging investment opportunity.',
      supplierAdvice: 'Organic inputs and testing kits demand increasing. Position as compliance partner.',
    },
  },
  {
    id: '6',
    title: 'Coffee Prices Hit 5-Year High Amid Brazilian Supply Concerns',
    description: 'Arabica coffee futures surge as Brazil faces frost damage in key growing regions. East African exporters may benefit.',
    source: 'Bloomberg',
    sourceUrl: 'https://bloomberg.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=340&fit=crop',
    category: 'trending',
    region: 'Global',
    publishDate: '2026-02-20',
    tags: ['Coffee', 'Price Surge', 'Brazil', 'Export'],
    views: 31500,
    sentimentScore: 0.65,
    riskLevel: 'Medium',
    aiSummary: 'Coffee prices surging due to Brazilian frost. East African coffee farmers have a major export opportunity. Quality premium coffees especially in demand.',
    aiImpact: {
      affectedCrops: ['Coffee'],
      affectedRegions: ['Brazil', 'Rwanda', 'Ethiopia', 'Kenya', 'Colombia'],
      marketImpact: 'Coffee prices up 35% — East African producers can capture premium pricing',
      priceDirection: 'Up',
      farmerAdvice: 'Prioritize coffee harvest quality. This is the best selling window in 5 years. Negotiate bulk contracts.',
      buyerAdvice: 'Prices elevated. Consider East African specialty coffee as alternative to Brazilian supply.',
      investorAdvice: 'Coffee sector showing strong returns. East African coffee farms are undervalued.',
      supplierAdvice: 'Coffee processing equipment and packaging materials demand increasing.',
    },
  },
  {
    id: '7',
    title: 'Precision Irrigation Reduces Water Usage by 40% in Pilot Study',
    description: 'IoT-controlled drip irrigation systems show dramatic water savings while maintaining crop yields in semi-arid conditions.',
    source: 'World Bank',
    sourceUrl: 'https://worldbank.org',
    videoUrl: null,
    thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=340&fit=crop',
    category: 'technology',
    region: 'Sub-Saharan Africa',
    publishDate: '2026-02-14',
    tags: ['Irrigation', 'Water', 'IoT', 'Sustainability'],
    views: 9800,
    sentimentScore: 0.88,
    riskLevel: 'Low',
    aiSummary: 'Precision irrigation technology proving highly effective. IoT-controlled systems can save 40% water while maintaining yields. Cost-effective for farms over 2 hectares.',
    aiImpact: {
      affectedCrops: ['Vegetables', 'Rice', 'Maize'],
      affectedRegions: ['Sub-Saharan Africa', 'South Asia'],
      marketImpact: 'Water-efficient farms will have competitive cost advantage',
      priceDirection: 'Stable',
      farmerAdvice: 'Consider IoT drip irrigation for water savings. ROI within 2 seasons for farms >2ha.',
      buyerAdvice: 'Sustainably-grown produce commanding premium. Source from precision-irrigated farms.',
      investorAdvice: 'Irrigation technology has proven ROI. Strong growth market in Africa.',
      supplierAdvice: 'IoT irrigation components are high-demand items. Partner with technology providers.',
    },
  },
  {
    id: '8',
    title: 'Climate-Smart Agriculture Can Feed 10 Billion by 2050, Report Says',
    description: 'A landmark UN report outlines how combining traditional knowledge with modern technology can sustainably scale food production.',
    source: 'United Nations',
    sourceUrl: 'https://un.org',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=340&fit=crop',
    category: 'global',
    region: 'Global',
    publishDate: '2026-02-13',
    tags: ['UN', 'Climate', 'Food Security', 'Sustainability'],
    views: 18600,
    sentimentScore: 0.78,
    riskLevel: 'Low',
    aiSummary: 'UN report validates climate-smart agriculture approaches. Technology-enabled farming is the path to global food security. Investment in agricultural innovation is critical.',
    aiImpact: {
      affectedCrops: ['All crops'],
      affectedRegions: ['Global'],
      marketImpact: 'Long-term shift toward sustainable farming practices accelerating',
      priceDirection: 'Stable',
      farmerAdvice: 'Adopt climate-smart practices: cover cropping, mulching, precision farming. Future-proof your operation.',
      buyerAdvice: 'Sustainability certifications becoming mandatory. Build supply chains with climate-smart farms.',
      investorAdvice: 'Climate-smart agriculture is the defining investment theme of the decade.',
      supplierAdvice: 'Position products around sustainability. Eco-friendly inputs will dominate the market.',
    },
  },
];
