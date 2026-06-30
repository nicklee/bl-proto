export interface IIIFCollectionItem {
  id: string;
  title: string;
  shelfmark: string;
  date: string;
  imageUrl: string;
  manifestUrl: string;
  description: string;
}

export interface TeachingResource {
  id: string;
  title: string;
  level: string; // e.g., GCSE, A-Level
  curriculumTags: string[];
  description: string;
  downloadUrl: string;
}

export interface RelatedStory {
  id: string;
  title: string;
  author: string;
  teaser: string;
  imageUrl: string;
  readTime: string;
  theme: string;
}

export interface AISuggestion {
  id: string;
  type: 'tag' | 'theme' | 'manuscript' | 'keyword' | 'resource';
  value: string;
  confidence: number; // e.g. 0.94 (94%)
  status: 'pending' | 'accepted' | 'rejected';
  reason: string;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface ArticleDocument {
  // Editorial Content
  title: string;
  standfirst: string;
  contributor: {
    name: string;
    role: string;
    avatarUrl: string;
    bio: string;
  };
  
  // The Three Outputs Powered by the CMS
  longFormHtml: string;       // Approx 1800 words simulation (scrollable rich-text blocks)
  shortTeaser: string;        // 120 words
  ultraShortCard: string;     // 40 words
  
  // Relationships
  themes: string[];           // e.g., ['Gothic', 'Science', 'Creation']
  relatedAuthors: string[];   // e.g., ['Percy Bysshe Shelley', 'Lord Byron']
  sponsor: {
    name: string;
    logoUrl: string;
  };
  
  // IIIF and Collection items (linked)
  collectionItems: IIIFCollectionItem[];
  
  // Learning/Teaching resources
  teachingResources: TeachingResource[];
  
  // SEO Meta
  seo: SEOData;
  
  // Live State
  publishStatus: 'draft' | 'published' | 'syncing';
  lastSaved: string;
  socialPromoCopy?: string;
}
