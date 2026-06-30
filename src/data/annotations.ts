export interface AnnotationData {
  id: string;
  title: string;
  targetPanel: 'cms' | 'public' | 'both';
  cmsField?: string;
  publicElement?: string;
  whyExists: string;
  userNeed: string;
  researchFinding: string;
  roadmapSupport: string;
  whyPreferable: string;
  provenanceType: 'academic' | 'iiif' | 'metadata' | 'transcript' | 'taxonomy' | 'curated' | 'educational' | 'ai-draft';
  provenanceLabel: string;
  provenanceDetail: string;
  sanityField: string;
  blMetadata: string;
  aiDecisions?: string;
}

export const ANNOTATIONS: AnnotationData[] = [
  {
    id: 'annot-hero-title',
    title: 'Interpretive Content Hero Title',
    targetPanel: 'both',
    cmsField: 'title',
    publicElement: 'hero',
    whyExists: 'The large narrative-first hero section places original interpretive research and bold editorial typography at the absolute center of the user journey.',
    userNeed: 'Engaging broad audiences (general visitors, lifelong learners, educators) who need context to understand the historical value of raw manuscripts before diving into deep research.',
    researchFinding: 'User research interviews showed that teachers, students, and general public visitors consistently use high-impact imagery and narrative titles as primary entry points into archives, rather than dry database shelfmarks.',
    roadmapSupport: 'Supports the "Future Web Programme Roadmap" around establishing narrative pathways and interpretive, educational entry points to make the collection universally accessible.',
    whyPreferable: 'Alternative solutions of flat catalog records alienate non-academic users, whereas a visual-first headline structure bridges the gap between historical documents and public comprehension.',
    provenanceType: 'academic',
    provenanceLabel: 'Academic Article → Written by contributor',
    provenanceDetail: 'The title and body copy are manually drafted and curated by an accredited scholar (e.g., Dr. Fiona Sampson, biographer of Mary Shelley) ensuring high editorial standards.',
    sanityField: 'article.title, article.standfirst',
    blMetadata: 'Linked to the primary collection entity to serve as the narrative doorway.'
  },
  {
    id: 'annot-iiif-viewer',
    title: 'Embedded Compliant IIIF Viewer',
    targetPanel: 'both',
    cmsField: 'iiif',
    publicElement: 'iiif-viewer',
    whyExists: 'Allows users to interact with high-resolution manuscript scans directly within the narrative, with zooming, folio selection, and live transcripts.',
    userNeed: 'Academic researchers and curious students need to inspect original handwriting and side-by-side transcripts without navigating away from the interpretive story.',
    researchFinding: 'Prototype research interviews indicated that users find it highly frustrating to toggle between separate tabs or download massive PDFs just to view a manuscript image while reading its transcription.',
    roadmapSupport: 'Directly supports the British Library "IIIF Compliance Initiative", allowing unified, federated asset delivery from secure image servers.',
    whyPreferable: 'Instead of serving static compressed JPGs (which lose high-resolution detail and lack metadata), this feeds secure IIIF manifests directly into a canvas-based universal viewer, saving bandwidth and maintaining standardisation.',
    provenanceType: 'iiif',
    provenanceLabel: 'Hero Image & Scans → British Library IIIF Collection',
    provenanceDetail: 'Served directly from the British Library IIIF media delivery endpoints. Transcripts are derived from the British Library historical transcription database.',
    sanityField: 'article.collectionItems[0].manifestUrl, article.collectionItems[0].imageUrl',
    blMetadata: 'Add MS 60032 (Mary Shelley’s handwritten drafts of Frankenstein).'
  },
  {
    id: 'annot-ai-teaser',
    title: 'AI-Assisted Multi-Channel Teasers',
    targetPanel: 'cms',
    cmsField: 'teaser',
    publicElement: 'card',
    whyExists: 'Accelerates editorial workflows by using generative suggestions to write alternative format lengths (120-word teaser, 40-word card, SEO descriptions).',
    userNeed: 'Editors need to distribute stories across multiple formats (search results, social cards, newsletters) without spending hours manually editing and rewriting sentences.',
    researchFinding: 'Editorial workflow audits showed that copy editors spent up to 35% of their publishing time copy-pasting and manually shortening abstracts for different platform containers.',
    roadmapSupport: 'Supports the "AI-assisted Editorial Capabilities" roadmap beat: keeping the "Human in the Loop" while automating repetitive metadata workflows.',
    whyPreferable: 'Unlike standard AI publishers that draft entire scholarly articles (which compromises academic integrity), this limits AI to structural summarization and taxonomy, leaving the primary research entirely written by human experts.',
    provenanceType: 'ai-draft',
    provenanceLabel: 'AI Summary → Generated draft awaiting editorial approval',
    provenanceDetail: 'Generated in real-time by the Gemini AI integration based on the primary scholarly body text, then reviewed, edited, and approved by the curator before going live.',
    sanityField: 'article.shortTeaser, article.ultraShortCard',
    blMetadata: 'Draft generated dynamically by analyzing primary body text and metadata.'
  },
  {
    id: 'annot-related-content',
    title: 'Curious Connectivity & Related Content',
    targetPanel: 'public',
    cmsField: 'relations',
    publicElement: 'card',
    whyExists: 'Dynamically structures related stories and associated collection items at the footer so that the reader never hits a "dead end" in their curiosity.',
    userNeed: 'General visitors and researchers who want to continue exploring tangential themes (e.g. from Frankenstein to John Polidori\'s "The Vampyre") with a single click.',
    researchFinding: 'Web analytics from the current British Library portal highlighted high bounce rates (over 65%) on article pages because they lacked contextual, cross-referenced onward journeys.',
    roadmapSupport: 'Directly aligns with the "Curious Connectivity" and "No Dead Ends" principles of the Future Web Programme.',
    whyPreferable: 'A structured reference model (linking document nodes by theme) is much more robust than keyword-matching algorithms, ensuring recommended articles are high-quality and contextually meaningful.',
    provenanceType: 'curated',
    provenanceLabel: 'Related Articles → Editorially curated',
    provenanceDetail: 'Linked by the curator in Sanity CMS using document relationship builders, enriched by semantic search vector scoring.',
    sanityField: 'article.relatedAuthors, article.themes',
    blMetadata: 'Dynamically queried from the BL Discovery catalog index.'
  },
  {
    id: 'annot-teaching-resources',
    title: 'Structured Curriculum Teaching Packs',
    targetPanel: 'both',
    cmsField: 'relations',
    publicElement: 'syllabus',
    whyExists: 'Surfaces classroom resources and downloadable lesson plans mapped directly to UK secondary and high school syllabi.',
    userNeed: 'Teachers need trustworthy, primary-source worksheets that directly link to curriculum specifications (GCSE/A-Level) to build teaching materials.',
    researchFinding: 'Teacher interviews revealed that they spend hours scanning academic articles to extract primary source snippets suitable for secondary school classes. They requested pre-segmented curriculum modules.',
    roadmapSupport: 'Supports the British Library "Learning Resources Digital Portal Expansion", bridging the gap between high academics and K-12 education.',
    whyPreferable: 'By modelling teaching resources as structured documents with curriculum tags (e.g., GCSE, KS4) inside the CMS rather than simple flat attachments, they automatically render across relevant author biographies, theme portals, and search indices.',
    provenanceType: 'educational',
    provenanceLabel: 'Teacher Resources → Structured educational content',
    provenanceDetail: 'Authored and verified by the British Library Learning & Education team, mapped structurally to national examination specifications.',
    sanityField: 'article.teachingResources',
    blMetadata: 'Linked to physical shelfmark Add MS 60032 syllabus standards.'
  },
  {
    id: 'annot-thematic-taxonomy',
    title: 'Standardised Thematic Taxonomy',
    targetPanel: 'both',
    cmsField: 'relations',
    publicElement: 'hero',
    whyExists: 'Establishes a centralized tag-based taxonomy (e.g. "Gothic") that dynamically feeds thematic indices, biographies, and portal pages.',
    userNeed: 'Users wanting to explore broad historical genres rather than single items, browsing cross-referenced collections of manuscripts and scholarly reviews.',
    researchFinding: 'Archival search studies showed that users find strict hierarchical catalogs intimidating. They preferred finding items by semantic themes like "Gothic Literature" or "Science and Creation".',
    roadmapSupport: 'Supports the roadmap objective of building a headless unified content taxonomy that serves multiple digital channels from one vocabulary.',
    whyPreferable: 'Using an editorially-controlled, globally unified taxonomy in Sanity prevents "tag clutter" (duplicate tags like "Gothic", "gothic-horror", "goth") and guarantees perfect alignment across indices.',
    provenanceType: 'taxonomy',
    provenanceLabel: 'Theme → Sanity taxonomy reference',
    provenanceDetail: 'Queries a standardized vocabulary stored as a document type inside Sanity, cross-referenced across the entire repository.',
    sanityField: 'article.themes',
    blMetadata: 'Mapped to the British Library core subject catalog classifications.'
  },
  {
    id: 'annot-sponsor-metadata',
    title: 'Structured Sponsor Metadata',
    targetPanel: 'both',
    cmsField: 'seo',
    publicElement: 'hero',
    whyExists: 'Maintains institutional transparency by rendering clear sponsorship and funding acknowledgement cleanly across different layouts.',
    userNeed: 'Funder compliance demands visible credit, while readers deserve to understand who supported the open-access publication of research.',
    researchFinding: 'Heritage grant compliance audits showed that missing or incorrect funder credit on web pages caused delays in grant payouts and regulatory compliance friction.',
    roadmapSupport: 'Addresses the "Open Access & Compliance" section of the development brief, ensuring institutional accountability is designed-in, not tacked-on.',
    whyPreferable: 'Instead of hardcoding a sponsor banner into individual pages (which is difficult to modify globally), the CMS stores the sponsor as a reference, enabling universal updates and multi-layout rendering.',
    provenanceType: 'curated',
    provenanceLabel: 'Sponsorship Details → Editorially curated',
    provenanceDetail: 'Provided by the British Library Partnership & Development team, logged in the core CMS configuration.',
    sanityField: 'article.sponsor',
    blMetadata: 'Linked to institutional grant registries.'
  },
  {
    id: 'annot-author-reference',
    title: 'Author Biography Document Relationship',
    targetPanel: 'both',
    cmsField: 'relations',
    publicElement: 'hero',
    whyExists: 'Bridges authors and articles through two-way references. Rather than flat text, authors are modeled as rich biographical documents with birth/death dates and connected portfolios.',
    userNeed: 'Biographers, students, and readers who want to trace an author\'s entire life-story, letters, and physical archives across a unified hub.',
    researchFinding: 'User testing of the legacy library system showed frustration when searching for authors, as search results returned fragmented single items without cohesive biographical context.',
    roadmapSupport: 'Fulfills the "Structured Content Modelling" goal: building objects, not pages.',
    whyPreferable: 'Enables automatic "backlinking". If an editor links Mary Shelley to an essay, her profile page dynamically updates its "Connected Portfolio" without requiring manual page edits.',
    provenanceType: 'metadata',
    provenanceLabel: 'Collection Metadata → British Library Collection database',
    provenanceDetail: 'Derived from the British Library Integrated Catalogue and historical biographical records.',
    sanityField: 'article.contributor, article.relatedAuthors',
    blMetadata: 'Queries BL Person Authorities catalog indexes.'
  }
];
