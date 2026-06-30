import React, { useState } from 'react';
import { ArticleDocument, IIIFCollectionItem, RelatedStory } from '../types';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  GraduationCap, 
  User, 
  Compass, 
  Calendar, 
  Clock, 
  Download, 
  ChevronRight, 
  Eye, 
  ZoomIn, 
  Info, 
  Maximize2, 
  FileText, 
  Heart, 
  Share2,
  ExternalLink,
  ArrowLeftRight
} from 'lucide-react';
import { RELATED_STORIES_POOL } from '../data';

interface PublicDiscoveryProps {
  article: ArticleDocument;
  onNavigateToTab: (tabId: string) => void;
  isResearchMode?: boolean;
  selectedAnnotationId?: string | null;
  hoveredAnnotationId?: string | null;
  onSelectAnnotation?: (id: string) => void;
  onHoverAnnotation?: (id: string | null) => void;
}

export default function PublicDiscovery({ 
  article, 
  onNavigateToTab,
  isResearchMode,
  selectedAnnotationId,
  hoveredAnnotationId,
  onSelectAnnotation,
  onHoverAnnotation
}: PublicDiscoveryProps) {
  // Navigation tabs for the 7 experiences requested
  const [activeTab, setActiveTab] = useState<string>('article_page');
  const [selectedFolio, setSelectedFolio] = useState<'folio_11' | 'folio_12'>('folio_11');
  const [iiifZoom, setIiifZoom] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('Frankenstein manuscript');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('x');

  // Hotspot and visual highlights helpers
  const renderHotspot = (id: string) => {
    if (!isResearchMode) return null;
    const isSelected = selectedAnnotationId === id;
    const isHovered = hoveredAnnotationId === id;
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelectAnnotation?.(id);
        }}
        onMouseEnter={() => onHoverAnnotation?.(id)}
        onMouseLeave={() => onHoverAnnotation?.(null)}
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold text-white transition-all cursor-pointer hotspot-pulse shrink-0 ${
          isSelected 
            ? 'bg-red-600 scale-125 z-10' 
            : isHovered 
              ? 'bg-red-500 scale-110 z-10' 
              : 'bg-red-700/80 hover:bg-red-600'
        }`}
        title="View UX & Architecture design annotation"
      >
        Why
      </button>
    );
  };

  const getGlowClass = (id: string) => {
    if (!isResearchMode) return '';
    const isSelected = selectedAnnotationId === id;
    const isHovered = hoveredAnnotationId === id;
    if (isSelected || isHovered) {
      if (id === 'annot-hero-title') return 'glow-academic ring-2 ring-amber-500';
      if (id === 'annot-iiif-viewer') return 'glow-iiif ring-2 ring-teal-500';
      if (id === 'annot-ai-teaser') return 'glow-ai-draft ring-2 ring-rose-500';
      if (id === 'annot-thematic-taxonomy') return 'glow-taxonomy ring-1 ring-indigo-500';
      if (id === 'annot-teaching-resources') return 'glow-educational ring-2 ring-pink-500';
      if (id === 'annot-author-reference') return 'glow-academic ring-1 ring-amber-500';
      if (id === 'annot-sponsor-metadata') return 'glow-academic ring-1 ring-amber-500';
      if (id === 'annot-related-content') return 'glow-taxonomy ring-1 ring-indigo-500';
    }
    return '';
  };
  
  // Backlink and simulation clicks
  const navigateToExperience = (expKey: string) => {
    setActiveTab(expKey);
  };

  // Helper to generate reading time
  const calculateReadingTime = (text: string) => {
    const wpm = 225;
    const words = text.split(/\s+/).length;
    return `${Math.ceil(words / wpm)} min read`;
  };

  // Folio Images
  const folioImages = {
    folio_11: {
      url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800",
      transcript: "[Mary's hand]: It was on a dreary night of November, that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of [Percy's hand: spark of being] into the lifeless thing that lay at my feet.",
      folNo: "Add MS 60032, f. 11v"
    },
    folio_12: {
      url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800",
      transcript: "[Mary's hand]: His limbs were in proportion, and I had selected his features as beautiful. Beautiful! Great God! His yellow skin scarcely covered the work of muscles and arteries beneath; his hair was of a lustrous black, and flowing...",
      folNo: "Add MS 60032, f. 12r"
    }
  };

  return (
    <div id="public-portal-root" className="h-full flex flex-col bg-[#fbf9f4] text-[#1c1a17] font-sans overflow-hidden">
      
      {/* Dynamic Simulator Navigation Bar */}
      <div className="bg-white text-[#1c1a17] px-6 py-3 flex items-center justify-between border-b border-[#eae6db] flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          <span className="font-serif font-bold text-xs tracking-wider uppercase">British Library public gateway</span>
        </div>
        <div className="text-[10px] bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded font-mono flex items-center gap-1">
          <ArrowLeftRight className="w-3 h-3" /> Live CMS Linked View
        </div>
      </div>

      {/* Experience Tab Selector (Presentation Hub) */}
      <div className="bg-[#FAF9F6] border-b border-[#eae6db] px-6 py-0 flex flex-wrap gap-4 items-center overflow-x-auto flex-shrink-0">
        {[
          { id: 'article_page', label: 'Rich Article Page', icon: BookOpen },
          { id: 'teaser_card', label: 'Teaser Card', icon: FileText },
          { id: 'search_result', label: 'Search Snippet', icon: Search },
          { id: 'learning_page', label: 'Learning Hub', icon: GraduationCap },
          { id: 'author_page', label: 'Author Profile', icon: User },
          { id: 'theme_page', label: 'Gothic Hub', icon: Compass },
          { id: 'collection_item', label: 'Manuscript Page', icon: Eye },
          { id: 'short_form', label: 'Social Short Form', icon: Share2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 py-3 border-b-2 text-xs font-medium tracking-tight cursor-pointer transition-all ${
                active 
                  ? 'border-red-800 text-red-800 font-bold' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5 opacity-70" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto">
        
        {/* EXPERIENCE 1: RICH ARTICLE PAGE */}
        {activeTab === 'article_page' && (
          <article className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-10 selection:bg-red-100">
            
            {/* Sponsor Strip */}
            {article.sponsor.name && (
              <div className={`border-t border-b border-[#eae6db] py-2 px-1 flex items-center justify-between text-[11px] font-mono text-gray-600 transition-all ${getGlowClass('annot-sponsor-metadata')}`}>
                <span className="flex items-center gap-2">
                  <span>discoveries in gothic romanticism</span>
                  {isResearchMode && (
                    <span className="text-[8px] bg-amber-50 text-amber-800 border border-amber-200 px-1 py-0.2 rounded font-bold">
                      Provenance: Sponsor Meta
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-2">
                  <span>Supported by <strong className="text-gray-900 font-semibold">{article.sponsor.name}</strong></span>
                  {renderHotspot('annot-sponsor-metadata')}
                </span>
              </div>
            )}

            {/* Title & Standfirst */}
            <header className={`space-y-4 p-3 rounded-lg border border-transparent transition-all ${getGlowClass('annot-hero-title')} ${getGlowClass('annot-thematic-taxonomy')}`}>
              <div className="flex justify-between items-start">
                <div className="flex gap-2 items-center flex-wrap">
                  {article.themes.slice(0, 2).map(theme => (
                    <span 
                      key={theme} 
                      onClick={() => navigateToExperience('theme_page')}
                      className="text-xs uppercase font-mono font-bold tracking-wider text-red-800 bg-red-50 hover:bg-red-100 border border-red-200/50 px-2.5 py-1 rounded cursor-pointer transition-all"
                    >
                      {theme}
                    </span>
                  ))}
                  {isResearchMode && (
                    <span className="text-xs bg-indigo-50 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded font-bold font-mono">
                      Taxonomy Map
                    </span>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  {renderHotspot('annot-thematic-taxonomy')}
                  {renderHotspot('annot-hero-title')}
                </div>
              </div>
              
              <h1 className="font-serif text-3xl md:text-5xl leading-tight font-medium tracking-tight text-[#1c1a17]">
                {article.title || "Untitled Article"}
              </h1>
              
              <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed border-l-2 border-red-800 pl-4 py-1">
                {article.standfirst || "No standfirst provided."}
              </p>
              
              {isResearchMode && (
                <div className="text-xs font-mono text-amber-800 bg-amber-50/40 p-2 rounded border border-amber-200/60 leading-normal">
                  <strong>Content Provenance:</strong> Academic Research Article manually compiled by Dr. Eleanor Vance.
                </div>
              )}
            </header>

            {/* Contributor Row */}
            <div className={`flex items-center gap-4 py-4 border-b border-[#eae6db] transition-all ${getGlowClass('annot-author-reference')}`}>
              <img 
                src={article.contributor.avatarUrl} 
                alt={article.contributor.name}
                onClick={() => navigateToExperience('author_page')}
                className="w-10 h-10 rounded-full object-cover shadow-sm cursor-pointer hover:opacity-90 shrink-0"
              />
              <div className="text-xs flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Contributor</div>
                  {isResearchMode && (
                    <span className="text-[8px] text-amber-800 bg-amber-50 border border-amber-100 px-1.5 py-0.2 rounded font-mono">
                      Contributor Profile (Schema Reference)
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span 
                    onClick={() => navigateToExperience('author_page')}
                    className="font-serif font-bold text-sm text-[#1c1a17] hover:text-red-800 cursor-pointer"
                  >
                    {article.contributor.name}
                  </span>
                  <span className="text-gray-500 text-[11px]">— {article.contributor.role}</span>
                </div>
              </div>
              {renderHotspot('annot-author-reference')}
            </div>

            {/* Standalone Reading details */}
            <div className="flex items-center gap-6 text-xs text-gray-500 font-mono pt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {calculateReadingTime(article.longFormHtml)}
              </span>
              <span>Published June 30, 2026</span>
              <span className="ml-auto flex items-center gap-3">
                <button className="hover:text-red-800 flex items-center gap-1 cursor-pointer"><Heart className="w-3.5 h-3.5" /> Save</button>
                <button className="hover:text-red-800 flex items-center gap-1 cursor-pointer"><Share2 className="w-3.5 h-3.5" /> Share</button>
              </span>
            </div>

            {/* Rich Editorial Body */}
            <div className="prose prose-stone max-w-none font-serif text-gray-800 leading-relaxed text-base space-y-6">
              
              {/* Parse the HTML manually into elegant React components to render the IIIF dynamic viewer right inside! */}
              {article.longFormHtml.includes('<p>') ? (
                // Split standard html into blocks for parsing
                article.longFormHtml.split('<h3>').map((section, idx) => {
                  if (idx === 0) {
                    return (
                      <div 
                        key={idx} 
                        dangerouslySetInnerHTML={{ __html: section }} 
                        className="space-y-4"
                      />
                    );
                  }
                  
                  const splitSec = section.split('</h3>');
                  const heading = splitSec[0];
                  let rest = splitSec[1] || '';

                  // Check if there is a IIIF placeholder token in this section
                  const hasIiifPlaceholder = rest.includes('<div class="iiif-placeholder-inline"');
                  
                  if (hasIiifPlaceholder) {
                    const parts = rest.split(/<div class="iiif-placeholder-inline"[^>]*><\/div>/);
                    return (
                      <div key={idx} className="space-y-4 mt-8">
                        <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1c1a17] border-b border-[#eae6db] pb-1.5">{heading}</h3>
                        <div dangerouslySetInnerHTML={{ __html: parts[0] }} className="space-y-4" />
                        
                        {/* INTERACTIVE COMPLIANT IIIF UNIVERSAL VIEWER EMBED */}
                        <div className={`my-8 bg-[#1c1a17] rounded-xl overflow-hidden border-2 border-[#eae6db] shadow-lg transition-all ${getGlowClass('annot-iiif-viewer')}`}>
                          
                          {/* Viewer Top Bar */}
                          <div className="px-4 py-2.5 bg-[#2a2622] flex items-center justify-between text-[11px] font-mono text-gray-300 border-b border-[#3c3732]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                              <span className="text-white font-bold">Universal Viewer v4.0 (IIIF compliant)</span>
                              {isResearchMode && (
                                <span className="text-[8px] bg-teal-950 text-teal-300 border border-teal-800 px-1 py-0.2 rounded font-bold font-mono">
                                  Provenance: British Library IIIF Asset Scan
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {renderHotspot('annot-iiif-viewer')}
                              <span className="bg-[#1c1a17] text-gray-400 px-1.5 py-0.5 rounded">
                                {folioImages[selectedFolio].folNo}
                              </span>
                            </div>
                          </div>

                          {/* Canvas Workspace */}
                          <div className="relative h-96 flex items-center justify-center overflow-hidden bg-[#0c0d10]">
                            <img 
                              src={folioImages[selectedFolio].url} 
                              alt="Manuscript"
                              className="max-h-full max-w-full object-contain transition-transform duration-300 bg-[#0c0d10]"
                              style={{ transform: `scale(${iiifZoom})` }}
                            />

                            {/* Viewer HUD overlay */}
                            <div className="absolute bottom-3 left-3 bg-[#1c1a17]/90 text-white rounded p-2 text-[10px] font-mono space-y-1.5 max-w-xs border border-gray-800">
                              <p className="font-bold text-red-400">IIIF Transcription Spark:</p>
                              <p className="text-gray-300 leading-snug">{folioImages[selectedFolio].transcript}</p>
                            </div>

                            {/* Viewer Controls */}
                            <div className="absolute right-3 top-3 flex flex-col gap-2">
                              <button 
                                onClick={() => setIiifZoom(z => Math.min(z + 0.25, 2.5))}
                                className="bg-[#2a2622] hover:bg-[#3c3732] text-white p-2 rounded shadow-md border border-[#3c3732] cursor-pointer"
                                title="Zoom In"
                              >
                                <ZoomIn className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setIiifZoom(1)}
                                className="bg-[#2a2622] hover:bg-[#3c3732] text-white p-2 rounded shadow-md border border-[#3c3732] cursor-pointer"
                                title="Reset Zoom"
                              >
                                <Maximize2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => navigateToExperience('collection_item')}
                                className="bg-red-800 hover:bg-red-900 text-white p-2 rounded shadow-md cursor-pointer"
                                title="Inspect Metadata and Shelfmark"
                              >
                                <Info className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Viewer Footer (Folio Switcher) */}
                          <div className="p-3 bg-[#2a2622] border-t border-[#3c3732] flex items-center justify-between text-xs text-gray-300">
                            <span>Manifest Source: <code className="text-xs text-gray-300">api.bl.uk/.../add-ms-60032</code></span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedFolio('folio_11')}
                                className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${
                                  selectedFolio === 'folio_11' ? 'bg-red-800 text-white' : 'bg-[#1c1a17] text-gray-400 hover:text-white'
                                }`}
                              >
                                Folio 11 (The Eye)
                              </button>
                              <button
                                onClick={() => setSelectedFolio('folio_12')}
                                className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${
                                  selectedFolio === 'folio_12' ? 'bg-red-800 text-white' : 'bg-[#1c1a17] text-gray-400 hover:text-white'
                                }`}
                              >
                                Folio 12 (The Skin)
                              </button>
                            </div>
                          </div>

                        </div>

                        <div dangerouslySetInnerHTML={{ __html: parts[1] }} className="space-y-4" />
                      </div>
                    );
                  }

                  return (
                    <div key={idx} className="space-y-4 mt-8">
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1c1a17] border-b border-[#eae6db] pb-1.5">{heading}</h3>
                      <div dangerouslySetInnerHTML={{ __html: rest }} className="space-y-4" />
                    </div>
                  );
                })
              ) : (
                <div dangerouslySetInnerHTML={{ __html: article.longFormHtml }} />
              )}

            </div>

            {/* CURRICULUM TEACHING PACKAGE DOWNLOADS (AUTHENTICITY & VALUE) */}
            {article.teachingResources.length > 0 && (
              <div className={`bg-[#f0ede1] border border-[#d3cebe] rounded-xl p-5 md:p-6 space-y-4 mt-12 transition-all ${getGlowClass('annot-teaching-resources')}`}>
                <div className="flex items-center justify-between">
                  {isResearchMode && (
                    <span className="text-xs bg-pink-50 text-pink-800 border border-pink-200 px-1.5 py-0.5 rounded font-bold font-mono">
                      Structured Content: article.teachingResources Mapping
                    </span>
                  )}
                  {renderHotspot('annot-teaching-resources')}
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-8 h-8 text-red-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1c1a17]">
                      Curriculum Learning Packs & Teaching Guides
                    </h3>
                    <p className="text-xs text-gray-700 mt-1">
                      Secondary source exercises mapping Mary Shelley's drafts directly to UK national curricula.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.teachingResources.map(resource => (
                    <div key={resource.id} className="bg-white border border-[#eae6db] rounded-lg p-4 flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold font-mono text-red-800 bg-red-50 px-1.5 py-0.5 rounded">
                            {resource.level}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-gray-900 leading-tight">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-gray-700 mt-2 line-clamp-2 leading-relaxed">
                          {resource.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {resource.curriculumTags.map(tag => (
                            <span key={tag} className="text-xs font-mono text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button 
                          onClick={() => alert("Simulating PDF download of lesson plans and high-res manuscripts worksheets...")}
                          className="text-xs font-mono font-bold text-red-800 hover:text-red-950 flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RELATED MANUSCRIPTS PORTFOLIO */}
            <div className="space-y-4 pt-8 border-t border-[#eae6db]">
              <h3 className="font-serif font-bold text-xl text-[#1c1a17]">
                Archival Evidence: Digitised Manuscripts linked in this Story
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {article.collectionItems.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => navigateToExperience('collection_item')}
                    className="group bg-white border border-[#eae6db] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="h-28 overflow-hidden bg-gray-100 relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/80 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                        {item.date}
                      </span>
                    </div>
                    <div className="p-3 text-xs">
                      <h4 className="font-serif font-bold text-gray-900 line-clamp-1 group-hover:text-red-800">
                        {item.title}
                      </h4>
                      <p className="text-[10px] font-mono text-gray-500 mt-1">{item.shelfmark}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CURIOUS CONNECTIVITY: RELATED STORIES SECTION (NO DEAD ENDS) */}
            <div className={`space-y-4 pt-10 border-t border-[#eae6db] transition-all ${getGlowClass('annot-related-content')}`}>
              <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-xl text-[#1c1a17]">
                    Related Interpretive Stories
                  </h3>
                  {isResearchMode && (
                    <span className="text-[8px] bg-indigo-50 text-indigo-800 border border-indigo-200 px-1 py-0.2 rounded font-bold font-mono">
                      Model Connection (Semantic Relational Map)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {renderHotspot('annot-related-content')}
                  <span className="text-xs font-mono text-gray-500">Curator recommendations</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RELATED_STORIES_POOL.map((story) => (
                  <div 
                    key={story.id} 
                    className="bg-[#fcfbf9] border border-[#e4dfd3] rounded-lg p-3.5 space-y-2 hover:border-red-800 transition-colors"
                  >
                    <div className="flex justify-between text-[9px] font-mono text-gray-500">
                      <span>{story.theme}</span>
                      <span>{story.readTime}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#1c1a17] line-clamp-1">
                      {story.title}
                    </h4>
                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                      {story.teaser}
                    </p>
                    <div className="text-[10px] text-red-800 font-bold flex items-center gap-1 font-mono pt-1">
                      Read Story <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* END OF ARTICLE PATHWAY (NO DEAD END GUARANTEE) */}
            <div className="bg-[#1c1a17] text-[#eadeca] rounded-xl p-6 md:p-8 space-y-5 text-center">
              <h3 className="font-serif text-xl md:text-2xl text-white">
                What would you like to discover next?
              </h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                We've mapped this archival story into three distinct curriculum sectors and author biographies. Explore physical evidence, digital transcripts, or educational assets.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button 
                  onClick={() => navigateToExperience('learning_page')}
                  className="bg-red-800 hover:bg-red-900 text-white font-mono text-xs px-4 py-2.5 rounded-full cursor-pointer transition-colors"
                >
                  Explore Romanticism Curriculum
                </button>
                <button 
                  onClick={() => navigateToExperience('author_page')}
                  className="bg-[#3c3732] hover:bg-[#4e4842] text-white font-mono text-xs px-4 py-2.5 rounded-full cursor-pointer transition-colors"
                >
                  View Mary Shelley's Connected Bio
                </button>
                <button 
                  onClick={() => navigateToExperience('theme_page')}
                  className="bg-transparent hover:bg-white/10 text-white border border-[#4e4842] font-mono text-xs px-4 py-2.5 rounded-full cursor-pointer transition-colors"
                >
                  Browse 'Gothic' Archive Theme
                </button>
              </div>
            </div>

          </article>
        )}

        {/* EXPERIENCE 2: STORY TEASER CARD */}
        {activeTab === 'teaser_card' && (
          <div className="p-8 max-w-xl mx-auto space-y-6">
            <div className="text-xs text-gray-500 font-mono flex justify-between items-center">
              <span>Render Preview: Homepage Feature / Category List Card</span>
              {renderHotspot('annot-ai-teaser')}
            </div>
            
            <div className={`bg-white border border-[#eae6db] rounded-xl overflow-hidden shadow-md group transition-all ${getGlowClass('annot-ai-teaser')}`}>
              <div className="relative h-64 bg-gray-100">
                <img 
                  src={article.collectionItems[0]?.imageUrl || "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800"} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="bg-red-800 text-white text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                    {article.themes[0] || 'Gothic'}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-3.5">
                <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                  <span>Story Teaser Output</span>
                  <span>{calculateReadingTime(article.longFormHtml)}</span>
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 group-hover:text-red-800 transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {article.shortTeaser}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-mono">
                    By {article.contributor.name}
                  </span>
                  <button 
                    onClick={() => setActiveTab('article_page')}
                    className="text-xs font-mono font-bold text-red-800 hover:text-[#1c1a17] flex items-center gap-1 cursor-pointer"
                  >
                    Read Full Story <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#f0ece1] rounded-lg p-4 border border-[#e4dfd3] text-xs leading-relaxed text-gray-700">
              <p><strong>Core Concept Checklist:</strong> The teaser content shown in this card represents the <strong>120-word</strong> alternative output stored within Sanity. If the editor alters the teaser in the CMS Studio, this card will dynamically update instantly without requiring manual reformatting.</p>
            </div>
          </div>
        )}

        {/* EXPERIENCE 3: SEARCH RESULT */}
        {activeTab === 'search_result' && (
          <div className="p-8 max-w-2xl mx-auto space-y-6">
            <div className="text-xs text-gray-500 font-mono flex justify-between items-center">
              <span>Render Preview: British Library Search Index Snippet</span>
              {renderHotspot('annot-ai-teaser')}
            </div>

            {/* Custom Search Box */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-[#d0cbd0] rounded-lg px-4 py-2.5 pl-11 text-sm text-[#1c1a17] focus:outline-none focus:border-red-800 font-mono shadow-sm"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            </div>

            <div className="bg-white border border-[#eae6db] rounded-lg p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-2 items-center text-[10px] font-mono text-gray-500">
                <span>https://www.bl.uk/discover/frank-shelley</span>
                <span>•</span>
                <span className="text-red-800 font-bold uppercase">Interpretive Content Article</span>
              </div>

              <h3 className="font-serif text-lg font-bold text-blue-900 hover:underline cursor-pointer" onClick={() => setActiveTab('article_page')}>
                {article.title}
              </h3>

              {/* Dynamic search snippet highlighting */}
              <p className="text-xs text-gray-600 leading-relaxed font-serif">
                ...explore how <mark className="bg-yellow-100 font-bold text-gray-900">eighteen-year-old</mark> Mary Shelley combined early scientific breakthroughs in <mark className="bg-yellow-100 font-bold text-gray-900">electricity</mark> with gothic horror during the stormy summer of 1816, creating <mark className="bg-yellow-100 font-bold text-gray-900">Frankenstein</mark>—the world's first science fiction masterpiece, preserved in our manuscript archives...
              </p>

              <div className="flex items-center gap-2 pt-2.5 border-t border-gray-100">
                <span className="text-[10px] font-mono text-gray-400">Highlighted Topics:</span>
                {article.themes.slice(0, 3).map((theme) => (
                  <span key={theme} className="bg-gray-100 text-gray-600 text-[9px] px-2 py-0.5 rounded font-mono">
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#f0ece1] rounded-lg p-4 border border-[#e4dfd3] text-xs leading-relaxed text-gray-700">
              <p><strong>Core Concept Checklist:</strong> Search engines benefit from structured JSON-LD schemes powered by the single source of truth. The snippet displays the <strong>40-word</strong> Discovery Card string optimized with embedded taxonomy matches, yielding highly relevant search engine indexing.</p>
            </div>
          </div>
        )}

        {/* EXPERIENCE 4: LEARNING HUB LANDING PAGE */}
        {activeTab === 'learning_page' && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
            
            {/* Landing page header */}
            <div className="text-center space-y-2 border-b border-[#eae6db] pb-6">
              <span className="text-xs font-mono uppercase text-red-800 font-bold">digital classroom portal</span>
              <h2 className="font-serif text-3xl font-bold text-[#1c1a17]">British Library Learning Resources</h2>
              <p className="text-xs text-gray-600 max-w-md mx-auto">
                Connecting schools with primary source documents, analytical essays, and complete lesson packages.
              </p>
            </div>

            {/* Simulated Section 1: GCSE English Literature */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-red-900 border-l-4 border-red-800 pl-3">
                Appears automatically within: GCSE English Literature
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Our article learning package */}
                <div className="bg-white border-2 border-red-800/20 rounded-xl p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-start text-xs font-mono text-gray-500">
                    <span>KS4 / GCSE Course Package</span>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Active Syllabus</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-gray-900">
                    {article.teachingResources[0]?.title || "GCSE Frankenstein Pack"}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-serif">
                    {article.teachingResources[0]?.description}
                  </p>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-gray-500">
                      Primary Source: BL Add MS 60032
                    </span>
                    <button 
                      onClick={() => alert("Simulating teacher resource downloads...")}
                      className="text-red-800 font-bold font-mono hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Pack
                    </button>
                  </div>
                </div>

                {/* Companion lesson package */}
                <div className="bg-white border border-[#eae6db] rounded-xl p-5 shadow-sm space-y-3 opacity-80">
                  <div className="flex justify-between items-start text-xs font-mono text-gray-500">
                    <span>KS4 / GCSE Course Package</span>
                    <span className="text-gray-500">Related Literature</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-gray-900">
                    Gothic Foundations: Jekyll & Hyde and Dr. Frankenstein
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-serif">
                    Worksheets and essay guides comparing Victor Frankenstein's scientific hubris with Dr. Jekyll's psychological dualities.
                  </p>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-gray-500">
                      Primary Source: Stevenson MSS
                    </span>
                    <button className="text-red-800 font-bold font-mono hover:underline flex items-center gap-1 cursor-pointer"><Download className="w-3.5 h-3.5" /> Download Pack</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Female Authors */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-xl font-bold text-red-900 border-l-4 border-red-800 pl-3">
                Appears automatically within: Female Authors of the 19th Century
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Feminist text packaging */}
                <div className="bg-white border border-[#eae6db] rounded-xl p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-start text-xs font-mono text-gray-500">
                    <span>KS5 / A-Level Syllabus Pack</span>
                    <span className="text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">Feminist Theory</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-gray-900">
                    {article.teachingResources[1]?.title || "Gender, Monstrosity, and Female Agency"}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-serif">
                    {article.teachingResources[1]?.description}
                  </p>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-gray-500">
                      Primary Source: Mary Wollstonecraft original pamphlets
                    </span>
                    <button className="text-red-800 font-bold font-mono hover:underline flex items-center gap-1 cursor-pointer"><Download className="w-3.5 h-3.5" /> Download Pack</button>
                  </div>
                </div>

                {/* Another companion */}
                <div className="bg-white border border-[#eae6db] rounded-xl p-5 shadow-sm space-y-3 opacity-80">
                  <div className="flex justify-between items-start text-xs font-mono text-gray-500">
                    <span>A-Level Context Guide</span>
                    <span className="text-gray-500">Biographical studies</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-gray-900">
                    Mary Wollstonecraft and Mary Shelley: Mother and Daughter
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-serif">
                    Exploring how Wollstonecraft's educational treatises informed the moral structure and creatures' growth inside Frankenstein.
                  </p>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-gray-500">
                      BL Godwin Papers
                    </span>
                    <button className="text-red-800 font-bold font-mono hover:underline flex items-center gap-1 cursor-pointer"><Download className="w-3.5 h-3.5" /> Download Pack</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f0ece1] rounded-lg p-4 border border-[#e4dfd3] text-xs leading-relaxed text-gray-700">
              <p><strong>Curator Insights:</strong> Notice how our newly edited article "Mary Shelley and the Making of Frankenstein" has dynamically injected its specific <strong>GCSE context worksheet</strong> and curriculum references directly into these educational indices. There is no separate school micro-site database; Sanity's relationship model connects them instantly.</p>
            </div>

          </div>
        )}

        {/* EXPERIENCE 5: AUTHOR PAGE */}
        {activeTab === 'author_page' && (
          <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
            
            {/* Bio Info card */}
            <div className="bg-white border border-[#eae6db] rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1580130379624-3a069adbffc5?q=80&w=300" 
                alt="Mary Shelley Portrait"
                className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover border border-[#e4dfd3]"
              />
              <div className="space-y-3 text-center md:text-left flex-1">
                <span className="text-xs font-mono uppercase text-red-800 font-bold">British Library Historical Author Profile</span>
                <h2 className="font-serif text-3xl font-bold text-[#1c1a17]">Mary Wollstonecraft Shelley</h2>
                <p className="text-xs text-gray-500 font-mono">Lived: 1797 – 1851</p>
                <p className="text-xs text-gray-600 font-serif leading-relaxed">
                  Mary Shelley was an English novelist, short story writer, dramatist, essayist, biographer, and travel writer, best known for her Gothic novel Frankenstein. She was married to the Romantic poet and philosopher Percy Bysshe Shelley.
                </p>
              </div>
            </div>

            {/* Automatically linked sections */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-gray-900 border-b border-[#eae6db] pb-2">
                Interpretive Content & Scholarly Studies on this Author
              </h3>
              
              {/* Dynamic Backlink */}
              <div className="bg-white border-2 border-red-800/10 rounded-lg p-5 flex justify-between items-center shadow-sm">
                <div className="space-y-1 max-w-xl">
                  <span className="text-[10px] font-mono uppercase text-red-800">Featured Study</span>
                  <h4 className="font-serif font-bold text-base text-gray-900 hover:text-red-800 cursor-pointer" onClick={() => setActiveTab('article_page')}>
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-serif">
                    {article.standfirst}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('article_page')}
                  className="bg-[#f0ece1] hover:bg-red-800 hover:text-white p-2.5 rounded-full transition-all cursor-pointer ml-4"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Other mock links */}
              <div className="bg-[#fcfbf9] border border-[#e4dfd3] rounded-lg p-4 opacity-70 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-gray-500">Related Essay</span>
                  <h4 className="font-serif font-bold text-sm text-gray-800">
                    Sisters of the Craft: Mary Shelley and Claire Clairmont
                  </h4>
                  <p className="text-[11px] text-gray-500 font-serif line-clamp-1">
                    An inquiry into the correspondence, diaries, and rivalries of the Wollstonecraft daughters during their Swiss expeditions.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

            </div>

          </div>
        )}

        {/* EXPERIENCE 6: THEME PAGE */}
        {activeTab === 'theme_page' && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
            
            {/* Theme header banner */}
            <div className="bg-[#1c1a17] text-[#eadeca] rounded-xl p-8 space-y-3.5 relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 h-full w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1508849789987-4e5333c12b78?q=80&w=400" 
                  alt="Gothic Motif background"
                  className="object-cover h-full w-full"
                />
              </div>
              
              <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-widest">archival thematic index</span>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-bold">Gothic Literature & Gothicism</h2>
              <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
                From ruined abbey ruins to existential decay: trace the cultural, psychological, and biological evolution of terror across the British Library's rarest archival manuscripts.
              </p>
            </div>

            {/* Grid of Dynamic Content Aggregation */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-[#eae6db] pb-2">
                Stories and Manuscripts Automatically Aggregated under 'Gothic'
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dynamically powered card from Sanity */}
                <div className="bg-white border-2 border-red-800/15 rounded-xl p-5 shadow-sm space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-gray-500">
                      <span>Article Page</span>
                      <span>By {article.contributor.name}</span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-gray-900 hover:text-red-800 cursor-pointer mt-1" onClick={() => setActiveTab('article_page')}>
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-serif line-clamp-3 mt-2">
                      {article.shortTeaser}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-gray-400">BL Catalog Add MS 60032</span>
                    <button onClick={() => setActiveTab('article_page')} className="text-xs font-mono text-red-800 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                      Read Essay <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Another story on Gothic */}
                <div className="bg-white border border-[#eae6db] rounded-xl p-5 shadow-sm space-y-2 flex flex-col justify-between opacity-80">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-gray-500">
                      <span>Article Page</span>
                      <span>By Dr. Gregory Buzwell</span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-gray-900 mt-1">
                      The Vampyre: Birth of the Romantic Bloodsucker
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-serif line-clamp-3 mt-2">
                      Before Dracula, there was John Polidori's aristocratic monster. Trace the manuscript draft written during the same Swiss stormy weekend in 1816.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-gray-400">BL Catalog Ashley MS 4843</span>
                    <button className="text-xs font-mono text-red-800 font-bold hover:underline flex items-center gap-1 cursor-pointer">Read Essay <ChevronRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* EXPERIENCE 7: COLLECTION ITEM PAGE */}
        {activeTab === 'collection_item' && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
            
            <div className="text-xs text-gray-500 font-mono">
              Render Preview: Digitised Manuscript Archive Record View
            </div>

            {/* Main Item Metadata layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Left Column: IIIF image placeholder rendering */}
              <div className="space-y-4">
                <div className="bg-[#1c1a17] rounded-xl overflow-hidden border border-[#eae6db] shadow-md">
                  <img 
                    src={article.collectionItems[0]?.imageUrl || "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800"} 
                    alt="Manuscript"
                    className="w-full h-auto object-cover max-h-96"
                  />
                  <div className="p-3 bg-[#2a2622] text-center text-[10px] font-mono text-gray-300">
                    Archival Digitisation Scan (IIIF Server)
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedFolio('folio_11');
                    setActiveTab('article_page');
                  }}
                  className="w-full bg-[#1c1a17] hover:bg-red-800 text-white font-mono text-xs py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Maximize2 className="w-4 h-4" /> Open in Interactive IIIF Viewer
                </button>
              </div>

              {/* Right Column: Catalog Metadata Details */}
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono uppercase text-red-800 font-bold">british library digitized catalog record</span>
                  <h2 className="font-serif text-2xl font-bold text-gray-900 leading-tight">
                    {article.collectionItems[0]?.title || "Draft Manuscript of Frankenstein"}
                  </h2>
                </div>

                <div className="border-t border-b border-[#eae6db] py-3.5 space-y-2.5 text-xs">
                  <div className="grid grid-cols-3">
                    <span className="font-mono text-gray-500 uppercase">Shelfmark</span>
                    <span className="col-span-2 font-mono font-bold text-gray-900">{article.collectionItems[0]?.shelfmark}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-mono text-gray-500 uppercase">Origin Date</span>
                    <span className="col-span-2 font-serif text-gray-800">{article.collectionItems[0]?.date}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-mono text-gray-500 uppercase">Collection Type</span>
                    <span className="col-span-2 font-serif text-gray-800">Additional Manuscripts Department</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-mono text-gray-500 uppercase">Language</span>
                    <span className="col-span-2 font-serif text-gray-800">English</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-sm text-[#1c1a17]">Description</h3>
                  <p className="text-xs text-gray-700 leading-relaxed font-serif">
                    {article.collectionItems[0]?.description || "No description provided."}
                  </p>
                </div>

                {/* Backlink showcasing how the object links back into stories! */}
                <div className="bg-[#f0ece1] border border-[#d3cebe] p-4 rounded-lg space-y-3">
                  <h4 className="font-serif font-bold text-xs text-red-800 uppercase tracking-wide">
                    This manuscript appears in the following Stories:
                  </h4>
                  
                  <div className="bg-white border border-[#eae6db] rounded p-3 flex justify-between items-center shadow-sm">
                    <div className="space-y-0.5">
                      <h5 className="font-serif font-bold text-xs text-gray-900 hover:text-red-800 cursor-pointer" onClick={() => setActiveTab('article_page')}>
                        {article.title}
                      </h5>
                      <p className="text-[10px] text-gray-500">By Dr. Fiona Sampson • 10 min read</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('article_page')}
                      className="text-[10px] font-mono text-red-800 font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      Read <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* EXPERIENCE 8: SOCIAL SHORT FORM PROMO */}
        {activeTab === 'short_form' && (
          <div className="max-w-xl mx-auto px-6 py-10 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Experience 8: Social Media Promotion (Multi-Channel)</span>
                {renderHotspot('annot-ai-teaser')}
              </div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 leading-tight">
                Headless Social Media Promo View
              </h2>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                This experience demonstrates how the headless CMS supplies a cut-down, social-optimized summary (<code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-[11px]">article.socialPromoCopy</code>) to external social feed pipelines, avoiding manual duplicate drafting. Click-through actions trigger a direct transition back to the main British Library gateway.
              </p>
            </div>

            {/* Platform Selector */}
            <div className="flex bg-[#f0ece1] p-1 rounded-lg border border-[#dbd7cb] justify-between text-xs font-medium">
              {[
                { key: 'x', label: '𝕏 (Twitter) Post' },
                { key: 'threads', label: 'Threads Layout' },
                { key: 'bluesky', label: 'Bluesky Card' }
              ].map((platform) => (
                <button
                  key={platform.key}
                  type="button"
                  onClick={() => setSelectedPlatform(platform.key)}
                  className={`flex-1 text-center py-2 rounded-md transition-all cursor-pointer ${
                    selectedPlatform === platform.key 
                      ? 'bg-white text-gray-950 shadow-sm font-bold' 
                      : 'text-gray-600 hover:text-gray-950'
                  }`}
                >
                  {platform.label}
                </button>
              ))}
            </div>

            {/* Social Post Visualisation */}
            <div className="bg-white border border-[#eae6db] rounded-2xl shadow-md overflow-hidden p-5 space-y-4">
              
              {/* Header profile info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1c1a17] text-[#eadeca] font-serif font-bold flex items-center justify-center text-sm shadow-inner shrink-0">
                  BL
                </div>
                <div className="text-xs flex-1">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                    British Library Digital
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8px] font-bold">✓</span>
                  </div>
                  <div className="text-gray-500 font-mono">@britishlibrary • Just now</div>
                </div>
                <button type="button" className="text-xs font-mono font-bold text-red-800 border border-red-800/20 hover:bg-red-50 px-3 py-1 rounded-full cursor-pointer transition-all">
                  Follow
                </button>
              </div>

              {/* Post Copy (The headless field!) */}
              <p className="text-sm text-gray-800 font-sans leading-relaxed whitespace-pre-line">
                {article.socialPromoCopy || "Did Lord Byron's storms spark the modern world's first sci-fi masterpiece? At just 18, Mary Shelley began drafting Frankenstein. Discover her handwritten notes."}
              </p>

              {/* Media Card with Click-Through */}
              <div 
                onClick={() => setActiveTab('article_page')}
                className="border border-gray-150 rounded-xl overflow-hidden hover:border-red-800/40 transition-all cursor-pointer group shadow-sm bg-gray-50/50"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={article.collectionItems[0]?.imageUrl || "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800"} 
                    alt="Social Media Preview" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 animate-pulse"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-3">
                    <span className="text-xs bg-red-800 text-white px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-semibold">
                      bl.uk/manuscripts
                    </span>
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <div className="text-xs font-mono font-bold text-red-800 uppercase tracking-wider">
                    EXCLUSIVELY DIGITISED AT THE BRITISH LIBRARY
                  </div>
                  <h4 className="font-serif font-bold text-sm text-gray-900 group-hover:text-red-800 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-600 font-sans line-clamp-2 leading-normal">
                    {article.standfirst}
                  </p>
                </div>
                
                {/* Find Out More Prominent Row */}
                <div className="px-3 py-2 bg-red-50/50 border-t border-gray-100 group-hover:bg-red-50 transition-colors flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold text-red-800">
                    👉 Click to examine the original notebook
                  </span>
                  <span className="text-xs font-mono text-red-800 font-bold flex items-center gap-0.5">
                    Find out more <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Likes, comments, shares bar */}
              <div className="flex justify-between items-center text-gray-500 text-xs pt-2 border-t border-gray-150">
                <span className="flex items-center gap-1 hover:text-red-800 transition-colors cursor-pointer">
                  💬 42
                </span>
                <span className="flex items-center gap-1 hover:text-red-800 transition-colors cursor-pointer">
                  🔁 128
                </span>
                <span className="flex items-center gap-1 text-red-800 font-semibold cursor-pointer">
                  ❤️ 1.2K
                </span>
                <span className="flex items-center gap-1 hover:text-red-800 transition-colors cursor-pointer">
                  📊 24.5K
                </span>
              </div>

            </div>

            {/* Educational Provenance Tag */}
            <div className="bg-red-50/40 border border-red-100 rounded-xl p-4 text-xs space-y-1">
              <div className="font-mono font-bold text-red-800 uppercase text-xs tracking-wide">
                Headless Distribution Blueprint
              </div>
              <p className="text-gray-600 leading-relaxed font-sans">
                By publishing in a single structured schema, this promotion copy flows automatically to social pipelines, mobile push notifications, and email newsletters. Try editing the "Social Promo Copy" field under the "Sponsor & SEO" tab in the editor to see this card live-update!
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
