import React, { useState } from 'react';
import { ArticleDocument, AISuggestion, IIIFCollectionItem } from '../types';
import { 
  Sparkles, 
  FileText, 
  Link, 
  Tag, 
  Search, 
  CheckCircle, 
  Check, 
  X, 
  HelpCircle, 
  Save, 
  Eye, 
  Plus, 
  Layers, 
  AlertTriangle,
  Info,
  Sliders,
  RotateCcw
} from 'lucide-react';

interface SanityCMSProps {
  article: ArticleDocument;
  onChangeArticle: (updated: ArticleDocument) => void;
  suggestions: AISuggestion[];
  onChangeSuggestions: (updated: AISuggestion[]) => void;
  onTriggerAISummarize: (mode: 'teaser' | 'card' | 'social') => void;
  isResearchMode?: boolean;
  selectedAnnotationId?: string | null;
  hoveredAnnotationId?: string | null;
  onSelectAnnotation?: (id: string) => void;
  onHoverAnnotation?: (id: string | null) => void;
}

export default function SanityCMS({
  article,
  onChangeArticle,
  suggestions,
  onChangeSuggestions,
  onTriggerAISummarize,
  isResearchMode,
  selectedAnnotationId,
  hoveredAnnotationId,
  onSelectAnnotation,
  onHoverAnnotation
}: SanityCMSProps) {
  const [activeTab, setActiveTab] = useState<'editorial' | 'iiif' | 'relations' | 'seo'>('editorial');
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<string | null>(null);
  const [showIiifDialog, setShowIiifDialog] = useState<boolean>(false);
  const [selectedIiifInsertItem, setSelectedIiifInsertItem] = useState<string>('add-ms-60032');

  // Hotspots & highlights helper inside Sanity Studio
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
      if (id === 'annot-hero-title') return 'glow-academic ring-1 ring-amber-500';
      if (id === 'annot-iiif-viewer') return 'glow-iiif ring-1 ring-teal-500';
      if (id === 'annot-ai-teaser') return 'glow-ai-draft ring-1 ring-rose-500';
      if (id === 'annot-thematic-taxonomy') return 'glow-taxonomy ring-1 ring-indigo-500';
      if (id === 'annot-teaching-resources') return 'glow-educational ring-2 ring-pink-500';
      if (id === 'annot-author-reference') return 'glow-academic ring-1 ring-amber-500';
      if (id === 'annot-sponsor-metadata') return 'glow-academic ring-1 ring-amber-500';
    }
    return '';
  };

  const updateField = (field: keyof ArticleDocument, value: any) => {
    onChangeArticle({
      ...article,
      [field]: value,
      lastSaved: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  };

  const updateSEOField = (field: string, value: any) => {
    onChangeArticle({
      ...article,
      seo: {
        ...article.seo,
        [field]: value
      },
      lastSaved: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  };

  const handleAcceptSuggestion = (sug: AISuggestion) => {
    // Modify suggestion status
    const updatedSug = suggestions.map(s => s.id === sug.id ? { ...s, status: 'accepted' as const } : s);
    onChangeSuggestions(updatedSug);

    // Apply suggestion to actual document
    if (sug.type === 'theme') {
      if (!article.themes.includes(sug.value)) {
        updateField('themes', [...article.themes, sug.value]);
      }
    } else if (sug.type === 'tag') {
      // Add to first teaching resource curriculum tags as demo
      if (article.teachingResources.length > 0) {
        const updatedResources = [...article.teachingResources];
        if (!updatedResources[0].curriculumTags.includes(sug.value)) {
          updatedResources[0] = {
            ...updatedResources[0],
            curriculumTags: [...updatedResources[0].curriculumTags, sug.value]
          };
          updateField('teachingResources', updatedResources);
        }
      }
    } else if (sug.type === 'keyword') {
      const keywordsArray = sug.value.split(', ').map(k => k.trim());
      const merged = Array.from(new Set([...article.seo.keywords, ...keywordsArray]));
      updateSEOField('keywords', merged);
    } else if (sug.type === 'manuscript') {
      // Add a mock new manuscript representation to the collection items list
      const newItem: IIIFCollectionItem = {
        id: 'ashley-ms-5021',
        title: sug.value,
        shelfmark: 'BL Ashley MS 5021',
        date: 'August 1816',
        imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600',
        manifestUrl: 'https://api.bl.uk/metadata/iiif/presentation/ashley-ms-5021',
        description: 'Linked via AI vector suggestion. Original correspondence referring to atmospheric storms around Geneva during Mary Shelley\'s drafting period.'
      };
      if (!article.collectionItems.some(item => item.id === newItem.id)) {
        updateField('collectionItems', [...article.collectionItems, newItem]);
      }
    }
  };

  const handleRejectSuggestion = (sugId: string) => {
    const updatedSug = suggestions.map(s => s.id === sugId ? { ...s, status: 'rejected' as const } : s);
    onChangeSuggestions(updatedSug);
  };

  const handleResetSuggestions = () => {
    const reset = suggestions.map(s => ({ ...s, status: 'pending' as const }));
    onChangeSuggestions(reset);
  };

  const triggerAISummaryAction = (mode: 'teaser' | 'card' | 'social') => {
    setIsAiLoading(mode);
    setTimeout(() => {
      onTriggerAISummarize(mode);
      setIsAiLoading(null);
    }, 850);
  };

  // Missing Metadata checks
  const missingMetaList = [];
  if (!article.seo.metaDescription) missingMetaList.push('SEO Meta Description');
  if (article.themes.length < 5) missingMetaList.push('Target Themes (at least 5 recommended)');
  if (!article.collectionItems.some(i => i.id === 'ashley-ms-5021')) missingMetaList.push('Secondary Manuscripts linked');

  return (
    <div id="sanity-cms-root" className="h-full flex flex-col bg-[#FDFCF8] text-[#1C1A17] font-sans overflow-hidden border-r border-[#E5E2D9]">
      
      {/* CMS Header */}
      <div className="px-5 py-3.5 bg-[#F5F2EB] border-b border-[#E5E2D9] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#BF2026] text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-widest font-mono shadow-sm">
            SANITY
          </div>
          <div className="h-4 w-[1px] bg-[#E5E2D9]"></div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-gray-500">document:</span>
            <span className="font-serif font-semibold text-[#1C1A17] text-xs tracking-tight">frank_shelley_essay.js</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Synced
          </div>
          <span className="text-[11px] text-gray-500 font-mono">Saved {article.lastSaved}</span>
        </div>
      </div>

      {/* Editor Body Split: Fields & AI Assist */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Hand: Schema fields & form inputs */}
        <div className="flex-1 flex flex-col overflow-y-auto p-5 space-y-6 bg-[#FDFCF8]">
          
          {/* Document Type Indicator / Status Bar */}
          <div className="bg-[#FAF6EC] border border-[#E5E2D9] rounded-lg p-3.5 flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-mono text-[#BF2026] font-semibold">Schema Template</div>
              <h2 className="text-sm font-serif font-bold text-[#1C1A17]">Interpretive Content Article</h2>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => updateField('publishStatus', article.publishStatus === 'published' ? 'draft' : 'published')}
                className={`text-xs px-3 py-1.5 rounded font-serif font-semibold cursor-pointer transition-colors shadow-sm ${
                  article.publishStatus === 'published' 
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white' 
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {article.publishStatus === 'published' ? 'Published (Live)' : 'Draft Mode'}
              </button>
            </div>
          </div>

          {/* CMS Sub-navigation Tabs */}
          <div className="flex border-b border-[#E5E2D9]">
            <button
              onClick={() => setActiveTab('editorial')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-serif font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'editorial' ? 'border-[#BF2026] text-[#BF2026]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Editorial Copy
            </button>
            <button
              onClick={() => setActiveTab('iiif')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-serif font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'iiif' ? 'border-[#BF2026] text-[#BF2026]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              IIIF Manifest Blocks ({article.collectionItems.length})
            </button>
            <button
              onClick={() => setActiveTab('relations')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-serif font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'relations' ? 'border-[#BF2026] text-[#BF2026]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              Taxonomy & Curriculum
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-serif font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'seo' ? 'border-[#BF2026] text-[#BF2026]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Sponsor & SEO
            </button>
          </div>

          {/* TAB 1: EDITORIAL COPY */}
          {activeTab === 'editorial' && (
            <div className="space-y-5 text-[#1C1A17]">
              
              {/* Title & Standfirst */}
              <div className={`grid grid-cols-1 gap-4 p-2 rounded-lg border border-transparent transition-all ${getGlowClass('annot-hero-title')}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-semibold">
                      Academic Content • Manually Authored
                    </span>
                    {isResearchMode && (
                      <span className="text-xs font-mono text-slate-400">
                        Field: article.title
                      </span>
                    )}
                  </div>
                  {renderHotspot('annot-hero-title')}
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-600 mb-1.5 uppercase">Title (H1)</label>
                  <input
                    type="text"
                    value={article.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded px-3 py-2 text-sm text-[#1C1A17] focus:outline-none focus:border-[#BF2026] font-serif font-bold"
                    placeholder="Article Title"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-mono text-gray-600 mb-1.5 uppercase">Standfirst (Editorial Abstract)</label>
                  <textarea
                    rows={2}
                    value={article.standfirst}
                    onChange={(e) => updateField('standfirst', e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded px-3 py-2 text-xs text-[#2E2A25] focus:outline-none focus:border-[#BF2026] leading-relaxed font-serif"
                    placeholder="Short narrative introduction..."
                  />
                </div>
              </div>

              {/* Contributor */}
              <div className="bg-[#FAF6EC] border border-[#E5E2D9] rounded p-3">
                <label className="block text-xs font-mono text-gray-600 mb-2 uppercase">Author/Contributor Reference</label>
                <div className="flex items-center gap-3">
                  <img 
                    src={article.contributor.avatarUrl} 
                    alt={article.contributor.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#E5E2D9]"
                  />
                  <div>
                    <div className="text-xs font-serif font-bold text-[#1C1A17]">{article.contributor.name}</div>
                    <div className="text-xs text-gray-600">{article.contributor.role}</div>
                  </div>
                </div>
              </div>

              {/* Portable Text Editor Representation */}
              <div className={`p-2 rounded-lg border border-transparent transition-all ${getGlowClass('annot-iiif-viewer')}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase bg-teal-50 text-teal-800 border border-teal-200 px-1.5 py-0.5 rounded font-semibold">
                      Rich Portable Text • Scholar Draft + Linked IIIF Reference
                    </span>
                    {isResearchMode && (
                      <span className="text-xs font-mono text-slate-400">
                        Field: article.longFormHtml
                      </span>
                    )}
                  </div>
                  {renderHotspot('annot-iiif-viewer')}
                </div>
                <div className="border border-[#E5E2D9] rounded overflow-hidden">
                  {/* Rich Text Editor Formatting Bar */}
                  <div className="bg-[#F5F2EB] px-3 py-1.5 border-b border-[#E5E2D9] flex items-center justify-between text-xs text-gray-600">
                    <div className="flex gap-2.5 font-bold font-mono">
                      <span className="hover:text-[#1C1A17] cursor-pointer select-none">H1</span>
                      <span className="hover:text-[#1C1A17] cursor-pointer select-none">H2</span>
                      <span className="hover:text-[#1C1A17] cursor-pointer select-none">H3</span>
                      <span className="hover:text-[#1C1A17] cursor-pointer select-none">B</span>
                      <span className="hover:text-[#1C1A17] cursor-pointer select-none">I</span>
                      <span className="hover:text-[#1C1A17] cursor-pointer select-none">” Blockquote</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowIiifDialog(true)}
                        className="flex items-center gap-1.5 text-white bg-[#BF2026] hover:bg-red-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors shadow-sm"
                        title="Add IIIF custom object block seamlessly in Portable Text"
                      >
                        <Plus className="w-3 h-3" /> Insert IIIF Block
                      </button>
                      <div className="flex items-center gap-1.5 text-[#BF2026] bg-[#BF2026]/10 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                        <Link className="w-3 h-3" /> Inline IIIF Block Inserted
                      </div>
                    </div>
                  </div>
                  <textarea
                    rows={12}
                    value={article.longFormHtml}
                    onChange={(e) => updateField('longFormHtml', e.target.value)}
                    className="w-full bg-white px-4 py-3 text-xs font-mono text-gray-800 focus:outline-none leading-relaxed resize-y"
                  />
                </div>

                {/* Inline IIIF Schema Insertion Wizard */}
                {showIiifDialog && (
                  <div className="mt-3 bg-[#FAF6EC] border-2 border-[#BF2026]/20 rounded-lg p-4 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2">
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-[#BF2026]" />
                        <h4 className="text-xs font-serif font-bold text-gray-900">Sanity Studio • IIIF Block Schema Wizard</h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowIiifDialog(false)}
                        className="text-gray-400 hover:text-gray-900 font-bold text-xs"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-600 leading-relaxed font-sans">
                      Instead of pasting raw codeblocks, Sanity editors add a custom <strong>iiifViewer object block</strong> inside the Portable Text editor array.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Select Manuscript Reference</label>
                        <select
                          value={selectedIiifInsertItem}
                          onChange={(e) => setSelectedIiifInsertItem(e.target.value)}
                          className="w-full bg-white border border-[#E5E2D9] rounded px-2.5 py-1.5 text-xs text-gray-800 font-sans focus:outline-none focus:border-[#BF2026]"
                        >
                          {article.collectionItems.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.title} ({item.shelfmark})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Interactive insert button */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            // Insert the tag into longFormHtml
                            const tag = `\n<div class="iiif-placeholder-inline" data-item-id="${selectedIiifInsertItem}"></div>\n`;
                            updateField('longFormHtml', article.longFormHtml + tag);
                            setShowIiifDialog(false);
                          }}
                          className="bg-[#BF2026] hover:bg-red-800 text-white font-mono text-[10px] font-bold px-3.5 py-2 rounded transition-all cursor-pointer shadow-sm"
                        >
                          ✓ Insert into Body Copy
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowIiifDialog(false)}
                          className="bg-transparent hover:bg-gray-100 text-gray-600 font-mono text-[10px] px-3.5 py-2 rounded transition-all cursor-pointer border border-[#E5E2D9]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                    {/* Educational Explanation: HOW WOULD THIS BE DONE IN SANITY? */}
                    <div className="bg-[#FAF6EC] border border-[#E5E2D9] rounded p-3 space-y-2">
                      <div className="text-[10px] font-mono font-bold text-[#BF2026] uppercase">
                        How would this be done in Sanity CMS?
                      </div>
                      <p className="text-[10.5px] text-gray-600 leading-relaxed">
                        In real-world Sanity development, you define this as an <strong>object type</strong> in your rich text schema (<code className="font-mono bg-white px-1 py-0.2 rounded text-[9.5px]">blockContent.js</code>). The editor receives a visual component button, and Sanity serializes it as a structured JSON object.
                      </p>
                      <div className="bg-white border border-[#E5E2D9] p-2.5 rounded text-[9px] font-mono text-gray-700 overflow-x-auto whitespace-pre leading-relaxed max-h-40 scrollbar-thin">
{`// Sanity Schema definition (blockContent.js)
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}, ...],
      lists: [...]
    },
    // Seamless IIIF block integration within Editorial Body!
    {
      title: 'IIIF Universal Viewer',
      name: 'iiifViewer',
      type: 'object',
      icon: EyeIcon,
      fields: [
        {
          name: 'manifest',
          title: 'Linked Manuscript',
          type: 'reference',
          to: [{type: 'manuscript'}]
        }
      ]
    }
  ]
}`}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* The Three Output Multi-Channels (Sanity Core Concept Showcase) */}
              <div className="border-t border-[#E5E2D9] pt-5 space-y-4">
                <div>
                  <h3 className="text-xs font-mono uppercase text-[#BF2026] tracking-wider flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#BF2026]" />
                    Headless Single Source of Truth Outputs
                  </h3>
                  <p className="text-xs text-gray-700 mt-1">
                    Sanity stores these formats as structured fields. We demonstrate how AI assists with the alternative lengths, ensuring human editorial approval.
                  </p>
                </div>

                {/* TEASER (120 words) */}
                <div className={`bg-[#FAF6EC] border border-[#E5E2D9] rounded p-3.5 transition-all ${getGlowClass('annot-ai-teaser')}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-rose-50 text-rose-800 border border-rose-200 font-mono text-xs px-2 py-0.5 rounded font-semibold">
                        AI Suggested Draft • Awaiting Editorial Approval
                      </span>
                      {isResearchMode && (
                        <span className="text-xs font-mono text-slate-400">
                          Field: article.shortTeaser
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {renderHotspot('annot-ai-teaser')}
                      <button
                        onClick={() => triggerAISummaryAction('teaser')}
                        disabled={isAiLoading !== null}
                        className="flex items-center gap-1 text-xs font-mono font-bold bg-[#002D56]/10 hover:bg-[#002D56] text-[#002D56] hover:text-white px-2 py-1 rounded transition-colors cursor-pointer"
                      >
                        {isAiLoading === 'teaser' ? (
                          <span className="animate-spin mr-1">⌛</span>
                        ) : (
                          <Sparkles className="w-3 h-3 text-amber-500" />
                        )}
                        AI Suggest Teaser
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    value={article.shortTeaser}
                    onChange={(e) => updateField('shortTeaser', e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded px-2.5 py-1.5 text-xs text-[#1C1A17] focus:outline-none focus:border-[#BF2026] leading-relaxed"
                  />
                </div>

                {/* ULTRA-SHORT DISCOVERY CARD (40 words) */}
                <div className={`bg-[#FAF6EC] border border-[#E5E2D9] rounded p-3.5 transition-all ${getGlowClass('annot-ai-teaser')}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-rose-50 text-rose-800 border border-rose-200 font-mono text-xs px-2 py-0.5 rounded font-semibold">
                        AI Suggested Draft • Awaiting Editorial Approval
                      </span>
                      {isResearchMode && (
                        <span className="text-xs font-mono text-slate-400">
                          Field: article.ultraShortCard
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => triggerAISummaryAction('card')}
                      disabled={isAiLoading !== null}
                      className="flex items-center gap-1 text-xs font-mono font-bold bg-[#BF2026]/10 hover:bg-[#BF2026] text-[#BF2026] hover:text-white px-2 py-1 rounded transition-colors cursor-pointer"
                    >
                      {isAiLoading === 'card' ? (
                        <span className="animate-spin mr-1">⌛</span>
                      ) : (
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      )}
                      AI Suggest Card
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={article.ultraShortCard}
                    onChange={(e) => updateField('ultraShortCard', e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded px-2.5 py-1.5 text-xs text-[#1C1A17] focus:outline-none focus:border-[#BF2026] leading-relaxed"
                  />
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: IIIF MANIFEST BLOCKS */}
          {activeTab === 'iiif' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase text-gray-600">Linked Collection Items (IIIF Manifests)</h3>
                  <button 
                    onClick={() => {
                      alert("In a production system, this opens Sanity's Digital Asset Selector, querying the British Library's internal IIIF catalogue via API.");
                    }}
                    className="flex items-center gap-1 text-[11px] bg-[#002D56]/10 hover:bg-[#002D56] text-[#002D56] hover:text-white px-2.5 py-1 rounded transition-colors font-serif font-semibold cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Link IIIF Manifest
                  </button>
                </div>
                <p className="text-[11px] text-gray-600 mt-1">
                  Instead of uploading static JPG files, Sanity securely stores references to the British Library IIIF Presentation endpoints. The UI renders high-definition viewers dynamically.
                </p>
              </div>

              <div className="space-y-3">
                {article.collectionItems.map((item, index) => (
                  <div key={item.id} className="bg-[#FAF6EC] border border-[#E5E2D9] rounded p-3 flex gap-3">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-16 h-16 rounded object-cover border border-[#E5E2D9] bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-serif font-bold text-[#1C1A17] truncate">{item.title}</h4>
                        <span className="text-[9px] font-mono bg-[#BF2026]/10 text-[#BF2026] px-1.5 py-0.5 rounded border border-[#BF2026]/15 font-semibold">
                          IIIF Manifest
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">{item.shelfmark}</p>
                      
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] font-mono text-gray-500">manifest:</span>
                        <span className="text-[9px] font-mono text-[#002D56] truncate max-w-xs font-semibold">{item.manifestUrl}</span>
                      </div>

                      {editingItemIndex === index ? (
                        <div className="mt-2.5 pt-2 border-t border-[#E5E2D9] space-y-2">
                          <textarea
                            rows={2}
                            value={item.description}
                            onChange={(e) => {
                              const updatedItems = [...article.collectionItems];
                              updatedItems[index].description = e.target.value;
                              updateField('collectionItems', updatedItems);
                            }}
                            className="w-full bg-white border border-[#E5E2D9] rounded p-1.5 text-[10px] text-gray-800 focus:outline-none focus:border-[#BF2026]"
                          />
                          <button
                            onClick={() => setEditingItemIndex(null)}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white text-[9px] px-2.5 py-1 rounded cursor-pointer font-semibold"
                          >
                            Save Description
                          </button>
                        </div>
                      ) : (
                        <div className="mt-2 flex gap-3">
                          <button 
                            onClick={() => setEditingItemIndex(index)}
                            className="text-[10px] text-gray-500 hover:text-gray-900"
                          >
                            Edit metadata
                          </button>
                          <button 
                            onClick={() => {
                              const filtered = article.collectionItems.filter((_, i) => i !== index);
                              updateField('collectionItems', filtered);
                            }}
                            className="text-[10px] text-[#BF2026] hover:text-[#BF2026]/80 font-semibold"
                          >
                            Unlink Item
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RELATIONSHIPS */}
          {activeTab === 'relations' && (
            <div className="space-y-5">
              
              {/* Themes Tags */}
              <div className={`p-2 rounded-lg border border-transparent transition-all ${getGlowClass('annot-thematic-taxonomy')}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-indigo-50 text-indigo-800 border border-indigo-200 px-1.5 py-0.2 rounded font-semibold">
                      Thematic Taxonomy • Managed Taxonomy Term
                    </span>
                    {isResearchMode && (
                      <span className="text-[9px] font-mono text-slate-400">
                        Field: article.themes
                      </span>
                    )}
                  </div>
                  {renderHotspot('annot-thematic-taxonomy')}
                </div>
                <label className="block text-xs font-mono text-gray-600 mb-1.5 uppercase">Associated Themes (Taxonomy)</label>
                <div className="flex flex-wrap gap-1.5 bg-[#FAF6EC] border border-[#E5E2D9] p-2.5 rounded min-h-[44px]">
                  {article.themes.map((theme) => (
                    <span 
                      key={theme} 
                      className="inline-flex items-center gap-1 bg-white text-[#1C1A17] border border-[#E5E2D9] rounded px-2.5 py-0.5 text-[10px] font-serif font-semibold"
                    >
                      {theme}
                      <button 
                        onClick={() => updateField('themes', article.themes.filter(t => t !== theme))}
                        className="text-gray-400 hover:text-[#BF2026] cursor-pointer"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                  <button 
                    onClick={() => {
                      const newT = prompt("Add Custom Theme:");
                      if (newT) updateField('themes', [...article.themes, newT]);
                    }}
                    className="inline-flex items-center gap-1 bg-[#BF2026]/10 text-[#BF2026] border border-[#BF2026]/20 hover:bg-[#BF2026] hover:text-white rounded px-2 py-0.5 text-[10px] cursor-pointer transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5" /> Add
                  </button>
                </div>
              </div>

              {/* Related Authors */}
              <div className={`p-2 rounded-lg border border-transparent transition-all ${getGlowClass('annot-author-reference')}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-semibold">
                      Author Reference • Relational Reference
                    </span>
                    {isResearchMode && (
                      <span className="text-[9px] font-mono text-slate-400">
                        Field: article.relatedAuthors
                      </span>
                    )}
                  </div>
                  {renderHotspot('annot-author-reference')}
                </div>
                <label className="block text-xs font-mono text-gray-600 mb-1.5 uppercase">Related Authors (Linked Schema References)</label>
                <div className="flex flex-wrap gap-1.5 bg-[#FAF6EC] border border-[#E5E2D9] p-2.5 rounded">
                  {article.relatedAuthors.map((author) => (
                    <span 
                      key={author} 
                      className="inline-flex items-center gap-1 bg-white text-[#1C1A17] border border-[#E5E2D9] rounded px-2.5 py-0.5 text-[10px] font-serif font-semibold"
                    >
                      {author}
                      <button 
                        onClick={() => updateField('relatedAuthors', article.relatedAuthors.filter(a => a !== author))}
                        className="text-gray-400 hover:text-[#BF2026] cursor-pointer"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                  <button 
                    onClick={() => {
                      const newA = prompt("Link Author Schema Document:");
                      if (newA) updateField('relatedAuthors', [...article.relatedAuthors, newA]);
                    }}
                    className="inline-flex items-center gap-1 bg-[#BF2026]/10 text-[#BF2026] border border-[#BF2026]/20 hover:bg-[#BF2026] hover:text-white rounded px-2 py-0.5 text-[10px] cursor-pointer transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5" /> Add Reference
                  </button>
                </div>
              </div>

              {/* Teaching Resources */}
              <div className={`p-2 rounded-lg border border-transparent transition-all ${getGlowClass('annot-teaching-resources')}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-pink-50 text-pink-800 border border-pink-200 px-1.5 py-0.2 rounded font-semibold">
                      Curriculum Packs • Educational Content
                    </span>
                    {isResearchMode && (
                      <span className="text-[9px] font-mono text-slate-400">
                        Field: article.teachingResources
                      </span>
                    )}
                  </div>
                  {renderHotspot('annot-teaching-resources')}
                </div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-mono text-gray-600 uppercase">Linked Curriculum Packs (Learning Resources)</label>
                  <button 
                    onClick={() => {
                      const title = prompt("Enter Resource Title:");
                      if (title) {
                        const newR = {
                          id: `res-${Date.now()}`,
                          title,
                          level: "GCSE / A-Level",
                          curriculumTags: ["English Lit"],
                          description: "Custom uploaded instructional lesson plan.",
                          downloadUrl: "#"
                        };
                        updateField('teachingResources', [...article.teachingResources, newR]);
                      }
                    }}
                    className="text-[10px] text-[#002D56] font-bold hover:underline"
                  >
                    + Add Pack
                  </button>
                </div>
                <div className="space-y-2">
                  {article.teachingResources.map((resource, idx) => (
                    <div key={resource.id} className="bg-[#FAF6EC] border border-[#E5E2D9] rounded p-3 text-xs">
                      <div className="flex justify-between font-serif font-bold text-[#1C1A17] mb-1">
                        <span>{resource.title}</span>
                        <span className="text-[9px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-bold">
                          {resource.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 font-serif leading-relaxed">{resource.description}</p>
                      
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {resource.curriculumTags.map((tag) => (
                          <span key={tag} className="bg-white border border-[#E5E2D9] text-[#2E2A25] text-[9px] px-1.5 py-0.2 rounded font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SPONSOR & SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              
              {/* Sponsor Information */}
              <div className={`p-2 rounded-lg border border-transparent transition-all ${getGlowClass('annot-sponsor-metadata')}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-semibold">
                      Sponsor Metadata • Editorially Curated
                    </span>
                    {isResearchMode && (
                      <span className="text-[9px] font-mono text-slate-400">
                        Field: article.sponsor
                      </span>
                    )}
                  </div>
                  {renderHotspot('annot-sponsor-metadata')}
                </div>
                <div className="bg-[#FAF6EC] border border-[#E5E2D9] p-3.5 rounded">
                  <h3 className="text-xs font-serif font-bold text-[#1C1A17] mb-3 border-b border-[#E5E2D9] pb-1.5">Sponsor / Funding Credit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-600 mb-1 uppercase">Sponsor Name</label>
                    <input
                      type="text"
                      value={article.sponsor.name}
                      onChange={(e) => updateField('sponsor', { ...article.sponsor, name: e.target.value })}
                      className="w-full bg-white border border-[#E5E2D9] rounded px-2.5 py-1 text-xs text-[#1C1A17] focus:outline-none focus:border-[#BF2026]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-600 mb-1 uppercase">Sponsor Logo URL</label>
                    <input
                      type="text"
                      value={article.sponsor.logoUrl}
                      onChange={(e) => updateField('sponsor', { ...article.sponsor, logoUrl: e.target.value })}
                      className="w-full bg-white border border-[#E5E2D9] rounded px-2.5 py-1 text-xs text-[#1C1A17] focus:outline-none font-mono focus:border-[#BF2026]"
                    />
                  </div>
                </div>
              </div>
              </div>

              {/* SEO Configurations */}
              <div className="bg-[#FAF6EC] border border-[#E5E2D9] p-3.5 rounded space-y-3.5">
                <h3 className="text-xs font-serif font-bold text-[#1C1A17] border-b border-[#E5E2D9] pb-1.5">SEO & Metadata Index</h3>
                
                <div>
                  <label className="block text-[10px] font-mono text-gray-600 mb-1 uppercase">Meta Title Tag</label>
                  <input
                    type="text"
                    value={article.seo.metaTitle}
                    onChange={(e) => updateSEOField('metaTitle', e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded px-2.5 py-1 text-xs text-[#1C1A17] focus:outline-none focus:border-[#BF2026]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-600 mb-1 uppercase">Meta Description (Max 160 chars)</label>
                  <textarea
                    rows={2.5}
                    value={article.seo.metaDescription}
                    onChange={(e) => updateSEOField('metaDescription', e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:border-[#BF2026] leading-normal font-serif"
                    maxLength={160}
                  />
                  <div className="text-right text-[9px] text-gray-500 font-mono mt-0.5">
                    {article.seo.metaDescription.length}/160 characters
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-600 mb-1 uppercase">Meta Keywords (Indexed Search terms)</label>
                  <div className="flex flex-wrap gap-1 bg-white p-2 rounded border border-[#E5E2D9]">
                    {article.seo.keywords.map((key) => (
                      <span key={key} className="bg-[#FAF6EC] text-[#002D56] text-[9px] border border-[#002D56]/15 px-1.5 py-0.5 rounded font-mono font-semibold">
                        {key}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social media promotion field */}
                <div className="bg-rose-50/20 border border-rose-200/50 p-3 rounded space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-mono text-gray-600 uppercase font-bold">Social Media Promo Copy (Headless Outbox Field)</label>
                    <button
                      type="button"
                      onClick={() => triggerAISummaryAction('social')}
                      disabled={isAiLoading !== null}
                      className="flex items-center gap-1 text-[9px] font-mono font-bold bg-[#002D56]/10 hover:bg-[#002D56] text-[#002D56] hover:text-white px-2 py-0.5 rounded transition-colors cursor-pointer"
                    >
                      {isAiLoading === 'social' ? (
                        <span className="animate-spin mr-1">⌛</span>
                      ) : (
                        <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                      )}
                      AI Suggest Social Post
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={article.socialPromoCopy || ''}
                    onChange={(e) => updateField('socialPromoCopy', e.target.value)}
                    className="w-full bg-white border border-[#E5E2D9] rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#BF2026] leading-relaxed"
                    placeholder="Write a promotional social media post..."
                  />
                  <div className="text-[9px] text-gray-500 font-mono flex justify-between">
                    <span>Field: article.socialPromoCopy</span>
                    <span>{article.socialPromoCopy?.length || 0} characters</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Right Hand Sidebar: AI Copilot & Taxonomy suggestions */}
        <div className="w-[340px] border-l border-[#E5E2D9] bg-[#F5F2EB] flex flex-col overflow-y-auto p-4 space-y-4">
          
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#BF2026] animate-pulse" />
              <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#1C1A17]">AI Assistant Hub</h3>
            </div>
            <div className="text-[10px] font-mono text-[#BF2026] bg-[#BF2026]/10 border border-[#BF2026]/20 px-1.5 py-0.5 rounded font-bold">
              Human In Control
            </div>
          </div>

          {/* AI Metrics block */}
          <div className="bg-white border border-[#E5E2D9] rounded p-3 space-y-2.5">
            <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Document Quality Metrics</h4>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 font-serif">Readability (Flesch-Kincaid):</span>
                <span className="font-mono font-bold text-emerald-700">Scholarly (Grade 12)</span>
              </div>
              <div className="w-full bg-[#EAE6DB] h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[85%]"></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 font-serif">Curriculum Mapping Level:</span>
                <span className="font-mono font-bold text-[#002D56]">Highly Aligned</span>
              </div>
              <div className="w-full bg-[#EAE6DB] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#002D56] h-full w-[94%]"></div>
              </div>
            </div>

            {/* Missing Metadata Scanner */}
            <div className="mt-2.5 pt-2 border-t border-[#E5E2D9]">
              <div className="flex items-center gap-1 text-[11px] font-mono text-amber-700">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="font-semibold">{missingMetaList.length > 0 ? `${missingMetaList.length} Quality Warnings` : 'Perfect Schema Compliance!'}</span>
              </div>
              {missingMetaList.length > 0 && (
                <ul className="text-[9px] text-gray-500 mt-1 list-disc list-inside space-y-0.5 font-serif">
                  {missingMetaList.map((warn, i) => <li key={i}>{warn}</li>)}
                </ul>
              )}
            </div>
          </div>

          {/* SUGGESTION QUEUE */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">
                Related Content Suggestions ({suggestions.filter(s => s.status === 'pending').length})
              </h4>
              {suggestions.some(s => s.status !== 'pending') && (
                <button 
                  onClick={handleResetSuggestions}
                  className="text-[9px] font-mono text-gray-500 hover:text-[#1C1A17] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Reset Queue
                </button>
              )}
            </div>

            <div className="space-y-3">
              {suggestions.map((sug) => {
                if (sug.status !== 'pending') return null;

                // Color mappings based on suggestion type
                const colorMap = {
                  theme: { bg: 'bg-teal-50 text-teal-800 border-teal-200/50', label: 'Theme Tag' },
                  tag: { bg: 'bg-indigo-50 text-indigo-800 border-indigo-200/50', label: 'Curriculum' },
                  manuscript: { bg: 'bg-rose-50 text-rose-800 border-rose-200/50', label: 'Manuscript Reference' },
                  keyword: { bg: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200/50', label: 'SEO Keywords' },
                  resource: { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/50', label: 'Learning Resource' }
                }[sug.type];

                return (
                  <div key={sug.id} className="bg-white border border-[#E5E2D9] hover:border-[#BF2026]/40 rounded p-3 space-y-2 transition-colors shadow-sm">
                    <div className="flex justify-between items-start">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${colorMap.bg} font-semibold`}>
                        {colorMap.label}
                      </span>
                      <span className="text-[10px] font-mono text-amber-800 bg-amber-50 border border-amber-200/50 px-1.5 py-0.2 rounded font-bold">
                        {Math.round(sug.confidence * 100)}% Match
                      </span>
                    </div>

                    <p className="text-xs font-serif font-bold text-[#1C1A17] leading-tight">
                      {sug.value}
                    </p>

                    <p className="text-[10px] text-gray-600 font-serif leading-normal">
                      {sug.reason}
                    </p>

                    {/* Editor Decides Buttons */}
                    <div className="flex gap-2 pt-1.5 border-t border-[#E5E2D9]">
                      <button
                        onClick={() => handleAcceptSuggestion(sug)}
                        className="flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded text-[10px] font-serif font-bold bg-[#002D56] text-white hover:bg-[#BF2026] transition-all cursor-pointer"
                        title="Accept suggestion and merge into appropriate Sanity fields."
                      >
                        <Check className="w-3 h-3" /> Accept
                      </button>
                      <button
                        onClick={() => handleRejectSuggestion(sug.id)}
                        className="flex items-center justify-center py-1 px-2.5 rounded text-[10px] font-serif font-bold bg-[#EAE6DB] text-[#1C1A17] hover:bg-gray-300 transition-all cursor-pointer"
                        title="Dismiss recommendation from queue."
                      >
                        <X className="w-3 h-3" /> Dismiss
                      </button>
                    </div>
                  </div>
                );
              })}

              {suggestions.every(s => s.status !== 'pending') && (
                <div className="text-center py-6 bg-white rounded border border-dashed border-[#E5E2D9]">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs text-[#1C1A17] font-serif font-bold">All Suggestions Evaluated!</p>
                  <p className="text-[10px] text-gray-500 mt-1 max-w-[180px] mx-auto font-serif">
                    The editor has evaluated every recommendation in the AI pipeline queue.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* AI Explainer / Footer */}
          <div className="mt-auto pt-4 border-t border-[#E5E2D9] text-[10px] text-gray-600 leading-normal bg-[#FAF6EC] -mx-4 -mb-4 p-4">
            <div className="flex gap-1.5 items-start">
              <Info className="w-3.5 h-3.5 text-[#002D56] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-bold text-[#1C1A17]">One Source of Truth Principle</p>
                <p className="mt-0.5 leading-relaxed font-sans">By utilizing structured references and LLM assisted alignment tools, curators compile information once, allowing it to dynamically flow into the British Library public ecosystems.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
