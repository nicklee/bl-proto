import { ArticleDocument, AISuggestion, RelatedStory } from './types';

export const INITIAL_ARTICLE: ArticleDocument = {
  title: "Mary Shelley and the Making of Frankenstein",
  standfirst: "How an eighteen-year-old woman in 1816 bridged gothic horror and scientific hubris to create the modern world's first true science fiction masterpiece.",
  contributor: {
    name: "Dr. Fiona Sampson",
    role: "Biographer, Poet & Fellow of the Royal Society of Literature",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    bio: "Dr. Fiona Sampson is an award-winning biographer of Mary Shelley. Her research explores the intersection of Romanticism, female agency, and historical manuscripts at the British Library."
  },
  
  // The Three Formats Powered by the CMS
  longFormHtml: `
    <h3>The Stormy Summer of 1816</h3>
    <p>In the gloomy, rain-swept summer of 1816, a small band of England's most brilliant and scandalous literary minds gathered at the Villa Diodati near Lake Geneva. The year had been dubbed the 'Year Without a Summer'—the consequence of a massive volcanic eruption in Mount Tambora, which cast a shroud of ash across Europe, blocking the sun and triggering relentless storms.</p>
    
    <p>Trapped indoors by the dismal weather, the host, Lord Byron, proposed a challenge to his guests, who included the poet Percy Bysshe Shelley, his eighteen-year-old partner Mary Wollstonecraft Godwin (later Mary Shelley), her step-sister Claire Clairmont, and Byron's personal physician, John Polidori. Each was tasked with writing a ghost story.</p>
    
    <blockquote>"I occupied myself to think of a story—a story to rival those which had excited us to this task. One which would speak to the mysterious fears of our nature and awaken thrilling horror—to make the reader dread to look round, to curdle the blood, and quicken the beatings of the heart."<br/><span class="author">— Mary Shelley, Introduction to the 1831 Edition</span></blockquote>

    <p>For days, Mary suffered from writer's block. However, her nights were filled with intense philosophical conversations between Byron and Percy Shelley. They discussed the latest scientific experiments, including Luigi Galvani's galvanism—the application of electrical currents to animal tissue, which caused dead frog legs to twitch, hinting at a spark of life. Another topic was Erasmus Darwin's speculative theories on reanimation. These ideas coalesced in Mary's mind during a fitful night of waking nightmares.</p>

    <h3>The Spark of Life</h3>
    <p>In the dead of night, Mary experienced a vivid waking dream: <em>"I saw the pale student of unhallowed arts kneeling beside the thing he had put together. I saw the hideous phantasm of a man stretched out, and then, on the working of some powerful engine, show signs of life, and stir with an uneasy, half vital motion."</em> This terrifying vision would become Chapter Five of <em>Frankenstein</em>—the moment Victor Frankenstein infuses the spark of life into his patchwork creature.</p>

    <div class="iiif-placeholder-inline" data-item-id="add-ms-60032"></div>

    <p>The manuscript drafted by Mary Shelley, now preserved in the British Library as <strong>Add MS 60032</strong>, reveals the intense creative process behind the novel. When we examine these fragile sheets, we can see Mary's sweeping, urgent handwriting, accompanied by the darker, more deliberate ink of Percy Shelley, who acted as an editor, suggesting changes, tightening sentences, and encouraging her to expand critical scenes.</p>

    <h3>The Collaborative Draft (Add MS 60032)</h3>
    <p>The British Library's digitised collection holds the crucial notebook draft. For example, on folio 11, where Victor first describes the creature opening its 'dull yellow eye', we can see Percy suggesting the word 'spark' instead of Mary's initial 'light', emphasizing the electrical and galvanising context of the animation. This collaborative relationship has been the subject of intensive academic study. Does Percy's intervention represent helpful editing or patriarchal intrusion? The manuscript itself allows scholars to decide, providing an unvarnished window into the Villa Diodati's creative crucible.</p>

    <h3>Bridges of Two Eras: Gothic and Scientific Hubris</h3>
    <p>Frankenstein is uniquely situated at the crossroads of two major movements. On one hand, it is a quintessential Gothic novel, complete with gloomy castles, desolate arctic landscapes, and an overwhelming sense of dread. On the other hand, it is widely considered the very first work of Science Fiction. Unlike older horror tales that rely on supernatural curses, devils, or ancient ghosts, Victor Frankenstein achieves his miracle entirely through materialist, scientific means: chemistry, electricity, anatomy, and human intellect.</p>

    <p>This shift from supernatural horror to scientific hubris was deeply reflective of the industrial revolution. The early 19th century was an era of dizzying scientific breakthroughs. Davy's chemistry, Volta's batteries, and Herschel's telescope were redrawing the boundaries of what humans could achieve. Mary Shelley's genius was in recognizing that this new-found power brought terrifying moral responsibilities.</p>

    <h3>The Monster's Voice and the Human Condition</h3>
    <p>The core of Shelley's philosophical inquiry lies in the creature's development. Abandoned by his creator, the monster learns to speak, read, and feel by observing a family of cottagers. He reads John Milton's <em>Paradise Lost</em>, Plutarch's <em>Lives</em>, and Goethe's <em>Sorrows of Young Werther</em>. Rather than a mindless brute, Shelley presents us with an articulate, sensitive being who asks the ultimate existential questions: <em>"Who was I? What was I? Whence did I come? What was my destination?"</em></p>

    <p>His eventual descent into violence is not born of inherent evil, but of absolute isolation and societal rejection. When Victor refuses to create a companion for him, the creature warns: <em>"I shall be with you on your wedding night."</em> This psychological depth elevates Frankenstein from a simple horror story into a profound exploration of empathy, parent-child abandonment, and the ethical boundaries of technological creation. Two centuries later, in the age of artificial intelligence, cloning, and gene-editing, Mary Shelley's warning remains as urgent and prophetic as ever.</p>
  `,
  
  shortTeaser: "In the stormy, volcanic summer of 1816, eighteen-year-old Mary Wollstonecraft Godwin took part in a famous ghost story challenge at the Villa Diodati with Lord Byron and Percy Shelley. Her contribution, Frankenstein; or, The Modern Prometheus, would go on to define modern science fiction. Bridging classical gothic dread with the terrifying scientific breakthroughs of early galvanism, electricity, and materialist chemistry, Mary Shelley crafted a prophetic critique of moral responsibility and scientific hubris. By examining her original handwritten drafts preserved in the British Library's Add MS 60032, visitors can witness the collaborative corrections made by her husband, revealing a masterclass in literary composition and creative partnership.",
  
  ultraShortCard: "Explore how eighteen-year-old Mary Shelley combined early scientific breakthroughs in electricity with gothic horror during the stormy summer of 1816, creating Frankenstein—the world's first science fiction masterpiece, preserved in our manuscript archives.",
  
  themes: ["Gothic Literature", "Romanticism", "History of Science", "Female Agency", "Ethics in Technology"],
  relatedAuthors: ["Mary Shelley", "Percy Bysshe Shelley", "Lord Byron", "John Polidori", "Mary Wollstonecraft"],
  sponsor: {
    name: "The Helen Hamlyn Trust",
    logoUrl: "https://www.helenhamlyntrust.org.uk/assets/images/logo.png"
  },
  
  collectionItems: [
    {
      id: "add-ms-60032",
      title: "Draft Manuscript of Frankenstein (Add MS 60032)",
      shelfmark: "British Library Add MS 60032, Vol I",
      date: "1816–1817",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600",
      manifestUrl: "https://api.bl.uk/metadata/iiif/presentation/add-ms-60032",
      description: "Mary Shelley's original draft notebook with heavy annotations and additions in the hand of Percy Bysshe Shelley, illustrating their collaborative editing process. The page shown contains Chapter 5: 'It was on a dreary night of November...'"
    },
    {
      id: "1818-first-edition",
      title: "Frankenstein 1818 First Edition Cover Page",
      shelfmark: "C.115.n.2",
      date: "1818",
      imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600",
      manifestUrl: "https://api.bl.uk/metadata/iiif/presentation/C.115.n.2",
      description: "The three-volume first edition of Frankenstein published anonymously on January 1, 1818. Only 500 copies were printed, and it was dedicated to Mary's father, William Godwin."
    },
    {
      id: "vampyre-polidori",
      title: "Original Draft of Polidori's 'The Vampyre'",
      shelfmark: "Ashley MS 4843",
      date: "1816",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600",
      manifestUrl: "https://api.bl.uk/metadata/iiif/presentation/ashley-ms-4843",
      description: "John Polidori's manuscript draft written during the same rainy summer challenge at Villa Diodati. This short story laid the foundation for the modern aristocratic vampire myth."
    }
  ],
  
  teachingResources: [
    {
      id: "gcse-romantic-gothic",
      title: "Frankenstein in GCSE English: Context & Characterization",
      level: "GCSE / Key Stage 4",
      curriculumTags: ["AQA English Literature", "Edexcel Literature", "Gothic Context"],
      description: "A complete downloadable teacher-pack including primary source worksheets on Mary's manuscript, exploring how Victor's hubris aligns with early 19th-century scientific ethics.",
      downloadUrl: "#"
    },
    {
      id: "a-level-gender-agency",
      title: "Gender, Monstrosity, and Female Agency in Romantic Texts",
      level: "A-Level / Key Stage 5",
      curriculumTags: ["OCR Literature", "Romantic Poetry & Prose", "Feminist Literary Theory"],
      description: "Critical analysis resource connecting Frankenstein with Mary Wollstonecraft's 'A Vindication of the Rights of Woman', featuring high-resolution manuscript comparisons.",
      downloadUrl: "#"
    }
  ],
  
  seo: {
    metaTitle: "Mary Shelley and the Making of Frankenstein | British Library",
    metaDescription: "Step into the stormy summer of 1816 and explore how Mary Shelley crafted Frankenstein. View the original British Library Add MS 60032 manuscripts.",
    keywords: ["Mary Shelley", "Frankenstein Manuscript", "British Library Add MS 60032", "Villa Diodati", "Galvanism in Literature", "Gothic Romanticism"]
  },
  
  publishStatus: "published",
  lastSaved: "Just now",
  socialPromoCopy: "✍️ Did Lord Byron's storms spark the modern world's first sci-fi masterpiece? At just 18, Mary Shelley began drafting Frankenstein. ⛈️ In our new digital exhibit, trace her actual handwritten drafts and see Percy Shelley's dark ink corrections in real-time. Discover the secrets of Add MS 60032. 👇"
};

export const INITIAL_AI_SUGGESTIONS: AISuggestion[] = [
  {
    id: "sug-1",
    type: "theme",
    value: "Ethics in Technology",
    confidence: 0.96,
    status: "pending",
    reason: "Surfaced due to mentions of 'scientific hubris', 'moral responsibilities', 'artificial intelligence', and 'boundaries of creation'."
  },
  {
    id: "sug-2",
    type: "manuscript",
    value: "Letter from Mary Shelley to Shelley (BL Ashley MS 5021)",
    confidence: 0.89,
    status: "pending",
    reason: "Semantic match. The letter was written in August 1816 discussing the storms near Lake Geneva, echoing the environment of Villa Diodati."
  },
  {
    id: "sug-3",
    type: "tag",
    value: "AQA GCSE English: Romanticism",
    confidence: 0.94,
    status: "pending",
    reason: "Curriculum alignment. Combines 'Mary Shelley' with existing KS4 Romantic movement learning guidelines."
  },
  {
    id: "sug-4",
    type: "keyword",
    value: "Galvanism, Villa Diodati, Percy Shelley editing, Mount Tambora, Year Without a Summer",
    confidence: 0.91,
    status: "pending",
    reason: "Extracted high-density semantic terms frequently searched in correlation with Frankenstein's historical origin."
  },
  {
    id: "sug-5",
    type: "resource",
    value: "William Godwin's Letters on Education (BL Add MS 48434)",
    confidence: 0.82,
    status: "pending",
    reason: "Related educational context on parenting and moral guidance, relevant to Victor's abandonment of the creature."
  }
];

export const RELATED_STORIES_POOL: RelatedStory[] = [
  {
    id: "story-1",
    title: "The Vampyre: Birth of the Romantic Bloodsucker",
    author: "Dr. Gregory Buzwell",
    teaser: "How Lord Byron's young doctor John Polidori transformed a campfire fragment into the vampire figure we know today during the Villa Diodati challenge.",
    imageUrl: "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?q=80&w=300",
    readTime: "8 min read",
    theme: "Gothic Literature"
  },
  {
    id: "story-2",
    title: "The Sublime and Beautiful: Romanticism in the Alps",
    author: "Prof. Kathryn Sutherland",
    teaser: "Explore how the rugged, terrifying beauty of the Swiss Alps influenced the literary structures of Mary Shelley and Percy Bysshe Shelley's poetry.",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=300",
    readTime: "12 min read",
    theme: "Romanticism"
  },
  {
    id: "story-3",
    title: "Women in the Shadows: Romantic Female Writers",
    author: "Dr. Fiona Sampson",
    teaser: "Despite the towering fame of Byron and Shelley, women writers of the early 19th century carved out pioneering work in horror and political philosophy.",
    imageUrl: "https://images.unsplash.com/photo-1580130379624-3a069adbffc5?q=80&w=300",
    readTime: "10 min read",
    theme: "Female Agency"
  }
];
