import React, { useState } from 'react';
import { ArticleDocument, AISuggestion } from './types';
import { INITIAL_ARTICLE, INITIAL_AI_SUGGESTIONS } from './data';
import SanityCMS from './components/SanityCMS';
import PublicDiscovery from './components/PublicDiscovery';
import { ANNOTATIONS, AnnotationData } from './data/annotations';
import { 
  Sparkles, 
  Tv, 
  HelpCircle, 
  Layers, 
  ArrowRight, 
  BookOpen, 
  Laptop, 
  Smartphone, 
  Monitor,
  Volume2,
  ChevronDown,
  ChevronUp,
  X,
  RefreshCw,
  Library,
  Database,
  FileText,
  Bookmark,
  Share2,
  GitBranch,
  ShieldAlert,
  Sliders,
  CheckCircle,
  HelpCircle as InfoIcon
} from 'lucide-react';

export default function App() {
  const [article, setArticle] = useState<ArticleDocument>(INITIAL_ARTICLE);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>(INITIAL_AI_SUGGESTIONS);
  
  // Layout and mode controls
  const [viewMode, setViewMode] = useState<'split' | 'cms' | 'public'>('split');
  const [showPitchScript, setShowPitchScript] = useState<boolean>(true);
  const [currentPitchStep, setCurrentPitchStep] = useState<number>(1);

  // New Research & Case Study States
  const [isResearchMode, setIsResearchMode] = useState<boolean>(false);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>('annot-hero-title');
  const [hoveredAnnotationId, setHoveredAnnotationId] = useState<string | null>(null);
  const [provenanceFilter, setProvenanceFilter] = useState<string>('all');

  // Simulation: When AI Assist triggers summarization inside Sanity Studio
  const handleTriggerAISummarize = (mode: 'teaser' | 'card' | 'social') => {
    if (mode === 'teaser') {
      const generatedTeaser = "In the tempestuous, volcanic summer of 1816, eighteen-year-old Mary Wollstonecraft Godwin joined Lord Byron, Percy Shelley, and John Polidori in a historic ghost story contest near Lake Geneva. Inspired by the spark of Luigi Galvani's electrical experiments, she envisioned a pale student of unhallowed arts kneeling beside a cobbled-together creation. This dream became Frankenstein—the world's inaugural work of true science fiction. Today, the British Library preserves her original handwritten draft under shelfmark Add MS 60032. This digital gateway showcases how structured manuscript curation powers multiple classrooms, author indexes, and thematic hubs.";
      setArticle(prev => ({
        ...prev,
        shortTeaser: generatedTeaser,
        lastSaved: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }));
    } else if (mode === 'card') {
      const generatedCard = "Discover how eighteen-year-old Mary Shelley combined early scientific breakthroughs in electricity and chemistry with traditional gothic dread during the stormy summer of 1816, creating Frankenstein—the world's first true science fiction masterpiece.";
      setArticle(prev => ({
        ...prev,
        ultraShortCard: generatedCard,
        lastSaved: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }));
    } else if (mode === 'social') {
      const generatedSocial = "⚡ Did Luigi Galvani's twitching frogs spark the world's first sci-fi masterpiece? At just 18, Mary Shelley began drafting Frankenstein near Lake Geneva. ⛈️ In our new digital exhibit, explore her original handwritten notebooks (Add MS 60032) with Percy Shelley's edits visible in dark ink! 👇";
      setArticle(prev => ({
        ...prev,
        socialPromoCopy: generatedSocial,
        lastSaved: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }));
    }
  };

  // Simulating reset to clean pre-pitch state
  const handleResetPrototype = () => {
    setArticle(INITIAL_ARTICLE);
    setSuggestions(INITIAL_AI_SUGGESTIONS);
    setCurrentPitchStep(1);
  };

  // Structured pitch script beats
  const pitchSteps = [
    {
      step: 1,
      title: "Beat 1: The Headless Hub & Real-time Sync",
      instruction: "Explain how Sanity stores references, not static copies. On the Left, change the Title or select 'AI Suggest Teaser'. Observe how the changes immediately flow to the Right panel!",
      highlights: "Left: Editorial Inputs ➔ Right: Multi-Format renders"
    },
    {
      step: 2,
      title: "Beat 2: AI Assistance — Human in Control",
      instruction: "Under the 'AI Assistant Hub' on the Left sidebar, accept the suggestion 'Ethics in Technology'. It instantly adds 'Ethics in Technology' into the themes, making the article appear in scientific-ethics queries!",
      highlights: "Left: Suggestion Queue ➔ Right: Article Themes & Landing Indexes"
    },
    {
      step: 3,
      title: "Beat 3: Universal Viewer (IIIF compliance)",
      instruction: "Scroll down the Right Panel to Chapter Five. Toggle between Folio 11 (Mary's original manuscript) and Folio 12. Zoom in to view high-definition annotations in the hands of Mary and Percy Shelley.",
      highlights: "Right: Universal Viewer Embed ➔ Folio Transcription Hud"
    },
    {
      step: 4,
      title: "Beat 4: Curiosity Navigation (No Dead Ends)",
      instruction: "In the public portal, navigate between tabs 4, 5, 6 and 7. Illustrate how collection items provide authenticity, and stories provide interpretive context, looping users back to continue exploring.",
      highlights: "Right: Classroom Landing Pages, Biographies, and Thematic Gateways"
    }
  ];

  const selectedAnnotation = ANNOTATIONS.find(a => a.id === selectedAnnotationId);

  // Helper colors for provenance types
  const getProvenanceBadgeStyle = (type: string) => {
    switch (type) {
      case 'academic': return { bg: 'bg-amber-950/40 text-amber-300 border-amber-800/50', border: 'border-amber-500', hoverGlow: 'glow-academic' };
      case 'iiif': return { bg: 'bg-teal-950/40 text-teal-300 border-teal-800/50', border: 'border-teal-500', hoverGlow: 'glow-iiif' };
      case 'ai-draft': return { bg: 'bg-rose-950/40 text-rose-300 border-rose-800/50', border: 'border-rose-500', hoverGlow: 'glow-ai-draft' };
      case 'taxonomy': return { bg: 'bg-indigo-950/40 text-indigo-300 border-indigo-800/50', border: 'border-indigo-500', hoverGlow: 'glow-taxonomy' };
      case 'educational': return { bg: 'bg-pink-950/40 text-pink-300 border-pink-800/50', border: 'border-pink-500', hoverGlow: 'glow-educational' };
      case 'metadata': return { bg: 'bg-blue-950/40 text-blue-300 border-blue-800/50', border: 'border-blue-500', hoverGlow: 'glow-metadata' };
      case 'transcript': return { bg: 'bg-purple-950/40 text-purple-300 border-purple-800/50', border: 'border-purple-500', hoverGlow: 'glow-transcript' };
      default: return { bg: 'bg-slate-950/40 text-slate-300 border-slate-800/50', border: 'border-slate-500', hoverGlow: 'glow-academic' };
    }
  };

  const filteredAnnotations = provenanceFilter === 'all' 
    ? ANNOTATIONS 
    : ANNOTATIONS.filter(a => a.provenanceType === provenanceFilter);

  return (
    <div id="presentation-viewport" className="h-screen w-screen flex flex-col bg-[#FDFCF8] text-[#1C1A17] overflow-hidden">
      
      {/* Top Banner: Prototype Launcher & Layout Selection */}
      <header className="h-14 bg-[#F5F2EB] border-b border-[#BF2026]/30 px-4 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#BF2026] rounded">
            <Library className="w-5 h-5 text-[#FDFCF8]" />
          </div>
          <div>
            <h1 className="text-sm font-serif font-bold text-[#1C1A17] tracking-tight">British Library Discovery Engine</h1>
            <p className="text-xs text-gray-700 font-mono">Future Web Programme • Interactive Pitch Prototype</p>
          </div>
        </div>

        {/* View Layout Controls */}
        <div className="flex items-center gap-4">
          <div className="flex bg-[#EAE6DB] rounded-lg p-0.5 border border-[#E5E2D9]">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'split' ? 'bg-[#BF2026] text-white shadow-sm font-serif font-semibold' : 'text-gray-700 hover:text-gray-950'
              }`}
              title="Compare CMS and Public Web Views simultaneously"
            >
              <Tv className="w-3.5 h-3.5" />
              Simultaneous (Dual View)
            </button>
            <button
              onClick={() => setViewMode('cms')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'cms' ? 'bg-[#BF2026] text-white shadow-sm font-serif font-semibold' : 'text-gray-700 hover:text-gray-950'
              }`}
              title="Focus solely on Sanity CMS Studio interface"
            >
              <Laptop className="w-3.5 h-3.5" />
              Sanity Editor Only
            </button>
            <button
              onClick={() => setViewMode('public')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'public' ? 'bg-[#BF2026] text-white shadow-sm font-serif font-semibold' : 'text-gray-700 hover:text-gray-950'
              }`}
              title="Focus solely on Public Discover Gateway interface"
            >
              <Smartphone className="w-3.5 h-3.5" />
              Public Portal Only
            </button>
          </div>

          <div className="h-5 w-[1px] bg-[#E5E2D9]"></div>

          {/* Presentation vs Research Mode Toggle (PROTOTYPE CASE STUDY) */}
          <div className="flex bg-[#EAE6DB] rounded-lg p-0.5 border border-[#E5E2D9]">
            <button
              onClick={() => {
                setIsResearchMode(false);
                setViewMode('split');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
                !isResearchMode ? 'bg-[#002D56] text-white shadow-md font-serif font-semibold' : 'text-gray-700 hover:text-gray-950'
              }`}
              title="Prisitine public experience with pitch guide"
            >
              Presentation Mode
            </button>
            <button
              onClick={() => {
                setIsResearchMode(true);
                setViewMode('split'); // Best viewed in split screen to trace relationships
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
                isResearchMode ? 'bg-red-800 text-white shadow-md font-serif font-semibold' : 'text-gray-700 hover:text-gray-950'
              }`}
              title="Interactive design case study mode tracing schema, provenance, and research"
            >
              Research Mode 🔍
            </button>
          </div>

          <div className="h-5 w-[1px] bg-[#E5E2D9]"></div>

          {/* Reset / Pitch script toggle */}
          <button
            onClick={() => setShowPitchScript(s => !s)}
            className={`text-xs px-3 py-1.5 rounded font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
              showPitchScript 
                ? 'bg-[#002D56]/10 text-[#002D56] border-[#002D56]/20 hover:bg-[#002D56]/15' 
                : 'bg-transparent text-gray-500 border-[#E5E2D9] hover:text-[#1C1A17]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {showPitchScript ? 'Hide Pitch Script' : 'Show Pitch Script'}
          </button>

          <button
            onClick={handleResetPrototype}
            className="text-xs px-2.5 py-1.5 rounded font-mono text-gray-600 hover:text-[#1C1A17] border border-[#E5E2D9] hover:border-gray-400 bg-transparent cursor-pointer transition-colors"
            title="Reset dataset to default pre-seeded state for another presentation run"
          >
            Reset Demo
          </button>
        </div>
      </header>

      {/* Slide Down Presentation Prompter */}
      {showPitchScript && (
        <div className="bg-[#FAF6EC] border-b border-[#E5E2D9] p-3 flex-shrink-0 z-10 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3 items-start flex-1">
              <div className="bg-[#BF2026]/10 text-[#BF2026] border border-[#BF2026]/20 font-mono text-xs px-2.5 py-1 rounded font-bold uppercase mt-0.5">
                {isResearchMode ? 'CASE STUDY METRICS ENABLED' : `PITCH STEP ${currentPitchStep} OF 4`}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-serif font-bold text-[#1C1A17] flex items-center gap-1.5">
                  <span>{isResearchMode ? 'Design Annotations Active: Click any floating red indicator or sidebar card to trace UX decisions.' : pitchSteps[currentPitchStep - 1].title}</span>
                </h4>
                <p className="text-xs text-gray-700 leading-normal">
                  {isResearchMode 
                    ? 'This interactive layout overlays user research findings, content provenance, and content models to demonstrate how technical and editorial requirements match the British Library Web Roadmap.' 
                    : pitchSteps[currentPitchStep - 1].instruction}
                </p>
                <div className="text-xs text-[#BF2026] font-mono uppercase tracking-wide font-semibold">
                  {isResearchMode ? 'Active Mode: Research, Content Provenance & Content Model Tracing' : `Demo Checklist: ${pitchSteps[currentPitchStep - 1].highlights}`}
                </div>
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="flex gap-2 items-center flex-shrink-0 border-l border-[#E5E2D9] pl-4">
              {!isResearchMode && (
                <>
                  <button
                    disabled={currentPitchStep === 1}
                    onClick={() => setCurrentPitchStep(p => Math.max(p - 1, 1))}
                    className="p-1.5 rounded bg-[#EAE6DB] hover:bg-[#DFDBCF] disabled:opacity-40 text-[#1C1A17] cursor-pointer animate-none"
                  >
                    ◀
                  </button>
                  <button
                    disabled={currentPitchStep === 4}
                    onClick={() => setCurrentPitchStep(p => Math.min(p + 1, 4))}
                    className="p-1.5 rounded bg-[#EAE6DB] hover:bg-[#DFDBCF] disabled:opacity-40 text-[#1C1A17] cursor-pointer animate-none"
                  >
                    ▶
                  </button>
                  <div className="h-4 w-[1px] bg-[#E5E2D9] mx-1"></div>
                </>
              )}
              <button 
                onClick={() => setShowPitchScript(false)}
                className="text-xs text-gray-500 hover:text-[#BF2026]"
                title="Dismiss Pitch Companion"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Frame */}
      <main className="flex-1 flex overflow-hidden bg-[#FDFCF8]">
        
        {/* PANEL 1: SANITY EDITOR EXPERIENCE */}
        {(viewMode === 'split' || viewMode === 'cms') && (
          <div className={`${viewMode === 'split' ? (isResearchMode ? 'w-[35%]' : 'w-1/2') : 'w-full'} h-full flex flex-col transition-all duration-300`}>
            <SanityCMS
              article={article}
              onChangeArticle={setArticle}
              suggestions={suggestions}
              onChangeSuggestions={setSuggestions}
              onTriggerAISummarize={handleTriggerAISummarize}
              isResearchMode={isResearchMode}
              selectedAnnotationId={selectedAnnotationId}
              hoveredAnnotationId={hoveredAnnotationId}
              onSelectAnnotation={setSelectedAnnotationId}
              onHoverAnnotation={setHoveredAnnotationId}
            />
          </div>
        )}

        {/* PANEL 2: PUBLIC EXPERIENCE WEBSITE */}
        {(viewMode === 'split' || viewMode === 'public') && (
          <div className={`${viewMode === 'split' ? (isResearchMode ? 'w-[40%]' : 'w-1/2') : 'w-full'} h-full flex flex-col transition-all duration-300`}>
            <PublicDiscovery
              article={article}
              onNavigateToTab={(tabId) => {
                // Navigate tab if needed
              }}
              isResearchMode={isResearchMode}
              selectedAnnotationId={selectedAnnotationId}
              hoveredAnnotationId={hoveredAnnotationId}
              onSelectAnnotation={setSelectedAnnotationId}
              onHoverAnnotation={setHoveredAnnotationId}
            />
          </div>
        )}

        {/* PANEL 3: RESEARCH & ARCHITECTURE CONSOLE */}
        {isResearchMode && (
          <div className="w-[25%] h-full flex flex-col bg-[#0b0f19] text-slate-100 border-l border-slate-800 flex-shrink-0 z-30 font-sans shadow-2xl overflow-hidden transition-all duration-300">
            {/* Sidebar header */}
            <div className="p-4 bg-[#111827] border-b border-slate-800 flex-shrink-0 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-red-500 font-bold font-mono text-xs uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Research overlay
                </div>
                <button
                  onClick={() => setIsResearchMode(false)}
                  className="text-slate-400 hover:text-white"
                  title="Close Case Study Console"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-sm font-serif font-bold text-white tracking-tight">UX & Architecture Rationale</h3>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Tracing user research, content models, and roadmap objectives. Hover over or click cards.
              </p>
            </div>

            {/* Provenance Filter Pills */}
            <div className="px-3.5 py-2.5 bg-[#0f172a] border-b border-slate-800 flex-shrink-0 flex items-center gap-1.5 overflow-x-auto">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">Filter:</span>
              <select
                value={provenanceFilter}
                onChange={(e) => setProvenanceFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-xs rounded text-slate-200 px-1.5 py-0.5 focus:outline-none focus:border-red-500 font-mono"
              >
                <option value="all">All Provenances</option>
                <option value="academic">Scholarly Copy</option>
                <option value="iiif">IIIF Assets</option>
                <option value="ai-draft">AI Drafts</option>
                <option value="taxonomy">Taxonomies</option>
                <option value="educational">Educational</option>
                <option value="metadata">Catalog Meta</option>
              </select>
            </div>

            {/* Scrollable Annotation List */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 scrollbar-thin">
              {filteredAnnotations.map((annot) => {
                const isSelected = selectedAnnotationId === annot.id;
                const isHovered = hoveredAnnotationId === annot.id;
                const colors = getProvenanceBadgeStyle(annot.provenanceType);
                
                return (
                  <div
                    key={annot.id}
                    onClick={() => setSelectedAnnotationId(annot.id)}
                    onMouseEnter={() => setHoveredAnnotationId(annot.id)}
                    onMouseLeave={() => setHoveredAnnotationId(null)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected 
                        ? `bg-slate-800 border-red-500/80 shadow-md ring-1 ring-red-500/30` 
                        : isHovered 
                          ? 'bg-slate-900 border-slate-700 shadow-sm'
                          : 'bg-[#111827]/60 border-slate-800/80 hover:bg-[#111827]'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h4 className="font-serif font-bold text-sm text-slate-100 leading-tight">
                        {annot.title}
                      </h4>
                      <span className={`text-xs font-mono font-semibold uppercase px-2 py-0.5 rounded border shrink-0 ${colors.bg}`}>
                        {annot.provenanceType}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {annot.whyExists}
                    </p>

                    {isSelected && (
                      <div className="mt-3.5 pt-3.5 border-t border-slate-800 space-y-3 text-xs leading-relaxed animate-fadeIn">
                        
                        <div>
                          <span className="text-xs font-mono font-bold uppercase text-red-400 block mb-0.5">1. User Need Addressed</span>
                          <p className="text-slate-200 font-sans">{annot.userNeed}</p>
                        </div>

                        <div>
                          <span className="text-xs font-mono font-bold uppercase text-amber-400 block mb-0.5">2. Research Finding</span>
                          <p className="text-slate-200 font-sans bg-amber-950/20 border-l border-amber-600/50 pl-2 py-0.5">{annot.researchFinding}</p>
                        </div>

                        <div>
                          <span className="text-xs font-mono font-bold uppercase text-teal-400 block mb-0.5">3. Roadmap & Brief Support</span>
                          <p className="text-slate-200 font-sans">{annot.roadmapSupport}</p>
                        </div>

                        <div>
                          <span className="text-xs font-mono font-bold uppercase text-indigo-400 block mb-0.5">4. Why this is preferable</span>
                          <p className="text-slate-200 font-sans">{annot.whyPreferable}</p>
                        </div>

                        <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 space-y-1.5">
                          <span className="text-xs font-mono font-bold uppercase text-slate-300 block">Content Provenance & Model</span>
                          <div className="text-xs font-mono space-y-1 text-slate-300">
                            <div>
                              <strong className="text-slate-200">Provenance:</strong> {annot.provenanceLabel}
                            </div>
                            <div className="text-xs leading-relaxed text-slate-400 mt-0.5">
                              {annot.provenanceDetail}
                            </div>
                            <div className="mt-1.5 pt-1.5 border-t border-slate-800">
                              <strong className="text-indigo-300">Sanity Field:</strong> <code className="text-indigo-200 bg-indigo-950/40 px-1 py-0.5 rounded text-xs">{annot.sanityField}</code>
                            </div>
                            <div>
                              <strong className="text-blue-300">BL Metadata:</strong> <span className="text-slate-300">{annot.blMetadata}</span>
                            </div>
                            {annot.provenanceType === 'ai-draft' && (
                              <div className="mt-1.5 text-rose-300 text-xs leading-relaxed bg-rose-950/20 p-1.5 rounded border border-rose-900/30">
                                <strong>AI Decision Explainer:</strong> Gemini model executes structured summarization drafts on context vectors with 94% alignment confidence, mapping schemas before human editor finalization.
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick architectural footer */}
            <div className="p-3 bg-[#0d1222] border-t border-slate-900 text-xs text-slate-400 font-mono leading-relaxed">
              <p className="font-bold text-slate-300 mb-0.5">Model-View-Controller Integrity</p>
              By decoupling structured schemas from public templates, the British Library satisfies diverse multi-channel goals from a single headless source.
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

