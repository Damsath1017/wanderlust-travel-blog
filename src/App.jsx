import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
import './index.css';

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px', verticalAlign: 'text-bottom' }}>
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '4px', verticalAlign: 'middle'}}><polyline points="6 9 12 15 18 9"></polyline></svg>
);

// Fallback data — used when backend is not running
const fallbackDestinations = [
  {
    name: 'Kyoto, Japan', shortName: 'Japan', tagText: 'Temples & Tradition', img: '/japan.png', country: 'Japan',
    description: 'Kyoto, once the capital of Japan, is a city of breathtaking temples, tranquil zen gardens, and traditional wooden townhouses. Step into a world where ancient culture meets modern Japan.',
    bestTime: 'March – May & Oct – Nov', avgCost: '$120 / day', language: 'Japanese', currency: 'Japanese Yen (JPY)', visa: 'Free on Arrival (most passports)',
    mustSee: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji (Golden Pavilion)', 'Gion District', 'Nishiki Market'],
    food: ['Ramen', 'Sushi', 'Kaiseki (multi-course)', 'Matcha sweets', 'Takoyaki'],
    funFact: 'Kyoto has over 1,600 Buddhist temples and 400 Shinto shrines — making it one of the best-preserved historical cities in the world.', safety: '★★★★★',
  },
  {
    name: 'Sri Lanka', shortName: 'Sri Lanka', tagText: 'Tropics & Heritage', img: '/sri_lanka.png', country: 'Sri Lanka',
    description: 'Sri Lanka, the "Pearl of the Indian Ocean", is a tropical island of lush jungles, ancient ruins, stunning beaches, and friendly people. A compact country with an enormous amount to discover.',
    bestTime: 'December – March', avgCost: '$60 / day', language: 'Sinhala / Tamil', currency: 'Sri Lankan Rupee (LKR)', visa: 'eVisa Required',
    mustSee: ['Sigiriya Rock Fortress', 'Temple of the Tooth', 'Yala National Park', "Ella's Nine Arch Bridge", 'Mirissa Beach'],
    food: ['Rice & Curry', 'Hoppers (Appa)', 'Kottu Roti', 'Fresh Seafood', 'Ceylon Tea'],
    funFact: 'Sri Lanka is home to 8 UNESCO World Heritage Sites and has over 250 species of birds — a paradise for nature lovers!', safety: '★★★★☆',
  },
  {
    name: 'Maldives', shortName: 'Maldives', tagText: 'Beach Paradise', img: '/maldives.png', country: 'Maldives',
    description: 'The Maldives is a stunning archipelago of over 1,000 coral islands set in the turquoise Indian Ocean. Famous for its crystal-clear waters, vibrant coral reefs, and luxurious overwater bungalows.',
    bestTime: 'November – April (Dry Season)', avgCost: '$350 / day', language: 'Dhivehi', currency: 'Maldivian Rufiyaa (MVR)', visa: 'Free on Arrival',
    mustSee: ['Baa Atoll Biosphere Reserve', 'Underwater Restaurant', 'Male City', 'Vaadhoo Island', 'Banana Reef Diving'],
    food: ['Mas Huni (tuna & coconut)', 'Garudhiya (fish broth)', 'Fresh Lobster', 'Tropical Fruits', 'Hedhikaa'],
    funFact: 'The Maldives is the lowest-lying country on Earth, with an average elevation of just 1.5 meters above sea level!', safety: '★★★★☆',
  },
  {
    name: 'Sydney, Australia', shortName: 'Australia', tagText: 'Iconic Landmarks', img: '/australia.png', country: 'Australia',
    description: "Sydney is Australia's largest and most iconic city, offering a stunning harbor, world-famous landmarks, golden beaches, and a vibrant multicultural food scene.",
    bestTime: 'September – November', avgCost: '$160 / day', language: 'English', currency: 'Australian Dollar (AUD)', visa: 'eVisa Required',
    mustSee: ['Sydney Opera House', 'Harbour Bridge Climb', 'Bondi Beach', 'Blue Mountains', 'Taronga Zoo'],
    food: ['Meat Pie', 'Tim Tams', 'Barramundi Fish', 'Pavlova', 'Flat White Coffee'],
    funFact: 'The Sydney Opera House took 14 years to build (1959–1973) and is now visited by over 8 million people annually.', safety: '★★★★☆',
  },
  {
    name: 'Paris, France', shortName: 'France', tagText: 'Art & Romance', img: '/france.png', country: 'France',
    description: "Paris, the \"City of Light\", is one of the world's most romantic and culturally rich capitals. From the iconic Eiffel Tower to world-class cuisine and fashion, Paris is a timeless destination.",
    bestTime: 'April – June (Spring)', avgCost: '$180 / day', language: 'French', currency: 'Euro (EUR)', visa: 'Schengen Visa Required',
    mustSee: ['Eiffel Tower', 'The Louvre Museum', 'Notre-Dame Cathedral', 'Montmartre', 'Palace of Versailles'],
    food: ['Croissants', 'French Onion Soup', 'Crêpes', 'Macarons', 'Coq au Vin'],
    funFact: "The Louvre in Paris is the world's largest and most visited art museum, housing over 380,000 objects including the Mona Lisa.", safety: '★★★★☆',
  }
];

const fallbackBlogs = [
  {
    title: "Backpacking Europe on a Budget",
    excerpt: "Discover the charming cobblestone streets and historic cities of Europe without breaking the bank.",
    content: "Traveling through Europe doesn't have to drain your savings. By planning ahead and choosing the right destinations, you can experience the magic of the continent on a backpacker's budget.\n\nStart your journey in Eastern Europe. Cities like Prague, Budapest, and Krakow offer incredible history, stunning architecture, and vibrant nightlife at a fraction of the cost of Paris or London. Opt for free walking tours to get acquainted with the city, and eat where the locals eat—street food and small local taverns are your best friends.\n\nTransportation is another area where you can save big. Utilize regional trains or budget bus lines. If you book in advance, overnight buses can double as accommodation, saving you even more. Remember, the true essence of travel is about the experiences you collect, not the luxury you purchase.",
    date: "May 10, 2026", readTime: "7 min read", img: "/blog_europe_1779548884016.png", category: "Guides"
  },
  {
    title: "Top 10 Pristine Tropical Beaches",
    excerpt: "From hidden coves to famous white-sand shores, here are the world's most breathtaking beaches to visit this summer.",
    content: "There is nothing quite like the feeling of warm white sand between your toes and the sound of gentle waves crashing on the shore. From hidden gems to world-renowned coastlines, these pristine tropical beaches are perfect for your next summer getaway.\n\nFirst on our list is El Nido, Palawan in the Philippines. Known for its towering limestone cliffs and crystal-clear lagoons, it's a paradise for island-hopping and snorkeling. Not far behind is the secluded Navagio Beach in Greece, accessible only by boat, offering breathtaking views and the famous shipwreck.\n\nWhen packing for your tropical adventure, don't forget reef-safe sunscreen. Protecting the beautiful coral reefs is just as important as enjoying them. Whether you're sipping a coconut in Bali or lounging on the soft sands of the Maldives, these beaches will give you memories that last a lifetime.",
    date: "May 18, 2026", readTime: "5 min read", img: "/blog_beach_1779548901665.png", category: "Inspiration"
  },
  {
    title: "A Foodie's Guide to Tuscany",
    excerpt: "Indulge in authentic Italian pasta, rich wines, and rustic trattorias with our ultimate culinary guide to Italy.",
    content: "Tuscany is a region that speaks to the soul, and more importantly, to the stomach. Known for its rolling hills, olive groves, and vineyards, the culinary landscape of Tuscany is deeply rooted in peasant traditions—creating dishes that are hearty, flavorful, and incredibly satisfying.\n\nBegin your culinary tour in Florence with a massive Bistecca alla Fiorentina, a thick-cut T-bone steak grilled to perfection over wood coals. Pair it with a robust Chianti Classico. For a more rustic experience, venture into the countryside to a local 'agriturismo' where you can learn to make fresh pici pasta by hand.\n\nNo meal in Tuscany is complete without dessert. Treat yourself to cantucci (almond biscuits) dipped in Vin Santo, a sweet dessert wine. The secret to Tuscan food is simplicity and the high quality of local ingredients. Buon appetito!",
    date: "May 22, 2026", readTime: "6 min read", img: "/blog_food_1779548918286.png", category: "Food & Culture"
  }
];

// Destination Detail Modal
const DestinationModal = ({ dest, onClose }) => {
  if (!dest) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-hero" style={{ backgroundImage: `url(${dest.img})` }}>
          <div className="modal-hero-overlay">
            <span className="modal-country-tag">{dest.country}</span>
            <h2 className="modal-title">{dest.name}</h2>
            <p className="modal-tag-text"><LocationIcon style={{color: 'var(--accent-gold)'}} /> {dest.tagText}</p>
          </div>
        </div>
        <div className="modal-body">
          <p className="modal-description">{dest.description}</p>

          <div className="modal-stats-grid">
            <div className="modal-stat"><span className="modal-stat-label">Best Time</span><span className="modal-stat-value">{dest.bestTime}</span></div>
            <div className="modal-stat"><span className="modal-stat-label">Avg. Cost</span><span className="modal-stat-value">{dest.avgCost}</span></div>
            <div className="modal-stat"><span className="modal-stat-label">Language</span><span className="modal-stat-value">{dest.language}</span></div>
            <div className="modal-stat"><span className="modal-stat-label">Currency</span><span className="modal-stat-value">{dest.currency}</span></div>
            <div className="modal-stat"><span className="modal-stat-label">Visa</span><span className="modal-stat-value">{dest.visa}</span></div>
            <div className="modal-stat"><span className="modal-stat-label">Safety</span><span className="modal-stat-value stars">{dest.safety}</span></div>
          </div>

          <div className="modal-sections">
            <div className="modal-section">
              <h4 className="modal-section-title">🗺️ Must-See Places</h4>
              <ul className="modal-list">
                {dest.mustSee.map((place, i) => <li key={i}>{place}</li>)}
              </ul>
            </div>
            <div className="modal-section">
              <h4 className="modal-section-title">🍽️ Local Food to Try</h4>
              <ul className="modal-list">
                {dest.food.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div className="modal-funfact">
            <span className="funfact-icon">💡</span>
            <p><strong>Fun Fact:</strong> {dest.funFact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogIntroModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <div className="modal-hero" style={{backgroundImage: `url('/blog_intro_bg.png')`}}>
          <div className="modal-hero-overlay"></div>
          <h2 className="modal-title">Our Story</h2>
        </div>
        <div className="modal-body">
          <h3 style={{marginBottom: '1rem', color: 'var(--accent-gold)'}}>More Than Just Travel. It's a Lifestyle.</h3>
          <p style={{marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-main)'}}>
            Welcome to Wanderlust, where we believe that every journey changes you. 
            Whether you're a budget backpacker or a luxury seeker, our mission is to inspire you to step out of your comfort zone, explore hidden gems, and experience the world authentically.
          </p>
          <p style={{marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-main)'}}>
            We started this blog to share our passion for discovering the unknown. We bring you curated guides, tested tips, and raw stories from all corners of the globe. Travel is not just about the places you go; it's about the people you meet and the memories you create.
          </p>
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <button className="btn btn-primary" onClick={onClose}>Join the Journey</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPostModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <div className="modal-hero" style={{backgroundImage: `url('${post.img}')`}}>
          <div className="modal-hero-overlay"></div>
          <div className="modal-category-tag" style={{position: 'absolute', top: '20px', left: '20px', background: 'var(--accent-gold)', color: 'var(--bg-darker)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', zIndex: '2'}}>{post.category}</div>
          <h2 className="modal-title">{post.title}</h2>
        </div>
        <div className="modal-body">
          <div className="blog-meta" style={{display: 'flex', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem'}}>
            <span>{post.date}</span>
            <span style={{color: 'var(--accent-gold)'}}>•</span>
            <span>{post.readTime}</span>
          </div>
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-main)'}}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [selectedDest, setSelectedDest] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBlogIntroOpen, setIsBlogIntroOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [destinationData, setDestinationData] = useState(fallbackDestinations);
  const [blogPosts, setBlogPosts] = useState(fallbackBlogs);
  const [formMessage, setFormMessage] = useState('');

  // Fetch destinations and blogs from backend API
  useEffect(() => {
    fetch(`${API_URL}/destinations`)
      .then(res => res.json())
      .then(data => setDestinationData(data))
      .catch(err => console.error('Error fetching destinations:', err));

    fetch(`${API_URL}/blogs`)
      .then(res => res.json())
      .then(data => setBlogPosts(data))
      .catch(err => console.error('Error fetching blogs:', err));
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery('');
  };

  // Handle newsletter form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      fullName: form.fullName.value,
      idNumber: form.idNumber.value,
      contactNumber: form.contactNumber.value,
      email: form.email.value,
    };
    try {
      const res = await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setFormMessage('✅ ' + result.message);
        form.reset();
      } else {
        setFormMessage('⚠️ ' + result.message);
      }
    } catch (error) {
      setFormMessage('❌ Server error. Please try again later.');
    }
    setTimeout(() => setFormMessage(''), 5000);
  };

  const filteredDestinations = destinationData.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      {/* Destination Detail Modal */}
      <DestinationModal dest={selectedDest} onClose={() => setSelectedDest(null)} />
      <BlogIntroModal isOpen={isBlogIntroOpen} onClose={() => setIsBlogIntroOpen(false)} />
      <BlogPostModal post={selectedBlogPost} onClose={() => setSelectedBlogPost(null)} />

      {/* Hero Wrapper containing Navbar and Hero Content */}
      <div className="hero-wrapper">
        {/* Requirement: 5 hyperlinks in navigation */}
        <nav className="navbar">
          <div className="nav-brand">
            <svg className="plane-icon" width="28" height="28" viewBox="0 0 24 24" fill="var(--accent-gold)" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
            </svg>
            <span className="brand-text">Wander<span className="gold-text">lust</span></span>
          </div>
          <ul className="nav-links">
            <li><a href="#destinations">Destinations <ChevronDownIcon /></a></li>
            <li><a href="#tips">Travel Tips</a></li>
            <li><a href="#stats">Stats</a></li>
            <li><a href="#journey">Journey</a></li>
            <li><a href="#resources">Resources</a></li>
          </ul>
          <div className="nav-actions">
            <div className="search-container">
              {isSearchOpen && (
                <div className="search-dropdown">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                    <div className="search-results">
                      {filteredDestinations.length > 0 ? (
                        filteredDestinations.map((dest, i) => (
                          <div
                            key={i}
                            className="search-result-item"
                            onClick={() => {
                              setSelectedDest(dest);
                              toggleSearch();
                            }}
                          >
                            <span className="search-result-name">{dest.name}</span>
                            <span className="search-result-country">{dest.country}</span>
                          </div>
                        ))
                      ) : (
                        <div className="search-result-none">No destinations found</div>
                      )}
                    </div>
                  )}
                </div>
              )}
              <button className="icon-btn" aria-label="Search" onClick={toggleSearch}><SearchIcon /></button>
            </div>
            <button className="btn btn-primary btn-sm sign-in-btn">Sign In</button>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-content">
            <p className="hero-eyebrow"><span className="line"></span> YOUR WORLD AWAITS</p>
            <h1 className="hero-title">Explore Every <br/><span className="gold-text">Corner of</span> Earth</h1>
            <p className="hero-desc">
              From ancient temples to tropical beaches — curated travel guides, tips, and stories for the modern explorer.
            </p>
            <div className="hero-buttons">
              <a href="#destinations" className="btn btn-primary btn-lg"><span style={{marginRight: '8px'}}><LocationIcon style={{color: 'var(--bg-darker)'}}/></span> Browse Destinations</a>
            </div>
          </div>
        </section>
      </div>

      <main>
        <section id="destinations" className="section container top-dest-section">
          <div className="section-header top-destinations-header">
            <div>
              <p className="section-eyebrow"><span className="line"></span> TOP DESTINATIONS</p>
              <h2 className="section-title">Where will you go next?</h2>
            </div>
            <a href="#all-destinations" className="view-all-link">View All Destinations &rarr;</a>
          </div>
          
          {/* Requirement: 5 images */}
          <div className="destinations-grid top-destinations-grid">
            {destinationData.map((dest, index) => (
              <div key={index} className="top-dest-card" onClick={() => setSelectedDest(dest)} title={`Explore ${dest.name}`}>
                <img src={dest.img} alt={dest.name} />
                <div className="top-dest-overlay">
                  <h3 className="top-dest-name">{dest.shortName}</h3>
                  <button className="round-arrow-btn">&rarr;</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="tips" className="section container">
          <div className="section-header">
            <h2 className="section-title">Essential Travel Tips</h2>
            <p className="section-subtitle">Pack smart, stay safe, and make the most of every journey.</p>
          </div>
          
          <div className="tips-container">
            {/* Requirement: 1 Ordered or Unordered List (Ordered) */}
            <ol className="tips-list">
              <li className="tip-item">
                <h4 className="tip-title">Book flights 6-8 weeks early</h4>
                <p className="tip-desc">Prices are statistically lowest in this window for most routes.</p>
              </li>
              <li className="tip-item">
                <h4 className="tip-title">Always get travel insurance</h4>
                <p className="tip-desc">Medical emergencies abroad can cost tens of thousands.</p>
              </li>
              <li className="tip-item">
                <h4 className="tip-title">Learn 10 phrases in the local language</h4>
                <p className="tip-desc">Hello, thank you, excuse me — locals appreciate the effort.</p>
              </li>
              <li className="tip-item">
                <h4 className="tip-title">Carry a power bank</h4>
                <p className="tip-desc">Dead phones mean no maps, no translations, no bookings.</p>
              </li>
            </ol>

            {/* Requirement: Unordered List (Checklist) */}
            <div className="checklist-card">
              <h3 className="checklist-title">Packing Checklist</h3>
              <ul className="checklist">
                <li><span className="checklist-checkbox">✓</span> Passport + copies (digital &amp; physical)</li>
                <li><span className="checklist-checkbox">✓</span> Adapter for destination sockets</li>
                <li><span className="checklist-checkbox">✓</span> Travel-size first-aid kit</li>
                <li><span className="checklist-checkbox">✓</span> Offline maps downloaded</li>
                <li><span className="checklist-checkbox">✓</span> Lightweight rain jacket</li>
              </ul>
              <p className="checklist-footer">Tip: lay everything out first, then cut it in half. You'll still have too much.</p>
            </div>
          </div>
        </section>

        <section id="blogs" className="section container">
          <div className="section-header">
            <p className="section-eyebrow"><span className="line"></span> LATEST STORIES</p>
            <h2 className="section-title">Travel Inspiration</h2>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}>
              <p className="section-subtitle">Read our latest articles, guides, and stories from around the globe.</p>
              <button className="btn btn-outline" onClick={() => setIsBlogIntroOpen(true)}>Our Story</button>
            </div>
          </div>
          <div className="blogs-grid">
            {blogPosts.map((post, i) => (
              <article key={i} className="blog-card">
                <div className="blog-img-wrapper">
                  <img src={post.img} alt={post.title} />
                  <span className="blog-category">{post.category}</span>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span>{post.date}</span>
                    <span className="dot">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <a href="#" className="blog-read-more" onClick={(e) => { e.preventDefault(); setSelectedBlogPost(post); }}>Read full article &rarr;</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="stats" className="section container">
          <div className="section-header">
            <p className="hero-subtitle" style={{marginBottom: '0.5rem', color: 'var(--accent-gold)'}}>Data &amp; Facts</p>
            <h2 className="section-title">Destination Overview</h2>
            <p className="section-subtitle">Key travel statistics for popular destinations around the world.</p>
          </div>

          {/* Requirement: 1 Table with data */}
          <div className="stats-table-wrapper">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Best Season</th>
                  <th>Avg. Cost / Day</th>
                  <th>Visa Required</th>
                  <th>Safety Rating</th>
                  <th>Language</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><LocationIcon /> Kyoto, Japan</td>
                  <td>March – May</td>
                  <td>$120</td>
                  <td><span className="badge badge-green">Free on Arrival</span></td>
                  <td className="stars">★★★★★</td>
                  <td>Japanese</td>
                </tr>
                <tr>
                  <td><LocationIcon /> Sri Lanka</td>
                  <td>Dec – March</td>
                  <td>$60</td>
                  <td><span className="badge badge-yellow">eVisa Required</span></td>
                  <td className="stars">★★★★☆</td>
                  <td>Sinhala / Tamil</td>
                </tr>
                <tr>
                  <td><LocationIcon /> Maldives</td>
                  <td>Nov – April</td>
                  <td>$350</td>
                  <td><span className="badge badge-green">Free on Arrival</span></td>
                  <td className="stars">★★★★☆</td>
                  <td>Dhivehi</td>
                </tr>
                <tr>
                  <td><LocationIcon /> Sydney, Australia</td>
                  <td>Sept – Nov</td>
                  <td>$160</td>
                  <td><span className="badge badge-yellow">eVisa Required</span></td>
                  <td className="stars">★★★★☆</td>
                  <td>English</td>
                </tr>
                <tr>
                  <td><LocationIcon /> Paris, France</td>
                  <td>April – June</td>
                  <td>$180</td>
                  <td><span className="badge badge-red">Schengen Visa</span></td>
                  <td className="stars">★★★★☆</td>
                  <td>French</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="resources" className="section container">
          <div className="section-header resources-header">
            <p className="hero-subtitle" style={{marginBottom: '0.5rem', color: 'var(--accent-gold)'}}>Useful Resources</p>
            <h2 className="section-title">Helpful <strong>Links</strong></h2>
            <p className="section-subtitle">A collection of trusted tools for planning your next adventure.</p>
          </div>
          <div className="resources-grid">

            <a href="https://www.skyscanner.net" target="_blank" rel="noopener noreferrer" className="resource-card">
              <div className="rc-top">
                <div className="rc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"/></svg>
                </div>
                <span className="rc-badge">Flights</span>
              </div>
              <h3>Skyscanner</h3>
              <p>Find the best flight deals across hundreds of airlines.</p>
              <span className="rc-visit">Visit Site &nbsp;→</span>
            </a>

            <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer" className="resource-card">
              <div className="rc-top">
                <div className="rc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14V8h2v6H7zm4 0V6h2v8h-2zm4 0V4h2v10h-2zM3 18h18V2H3v16zm0 2c-1.1 0-2-.9-2-2V2C1 .9 1.9 0 3 0h18c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H3zm0 2h18v2H3v-2z"/></svg>
                </div>
                <span className="rc-badge">Hotels</span>
              </div>
              <h3>Booking.com</h3>
              <p>Book hotels and accommodations worldwide.</p>
              <span className="rc-visit">Visit Site &nbsp;→</span>
            </a>

            <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer" className="resource-card">
              <div className="rc-top">
                <div className="rc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <span className="rc-badge">Reviews</span>
              </div>
              <h3>Tripadvisor</h3>
              <p>Read reviews and discover the best activities.</p>
              <span className="rc-visit">Visit Site &nbsp;→</span>
            </a>

            <a href="https://www.iatatravelcentre.com" target="_blank" rel="noopener noreferrer" className="resource-card">
              <div className="rc-top">
                <div className="rc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </div>
                <span className="rc-badge">Travel Info</span>
              </div>
              <h3>IATA Travel Centre</h3>
              <p>Check passport, visa, and health requirements.</p>
              <span className="rc-visit">Visit Site &nbsp;→</span>
            </a>

            <a href="https://www.xe.com" target="_blank" rel="noopener noreferrer" className="resource-card">
              <div className="rc-top">
                <div className="rc-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                </div>
                <span className="rc-badge">Currency</span>
              </div>
              <h3>XE Currency</h3>
              <p>Live exchange rates and currency converter.</p>
              <span className="rc-visit">Visit Site &nbsp;→</span>
            </a>

          </div>
        </section>

        <section id="newsletter" className="section container">
          <div className="newsletter-card split-layout">
            <div className="newsletter-image">
              <img src="/newsletter_bg.png" alt="Travel Community" />
            </div>
            <div className="newsletter-content">
              <p className="section-eyebrow"><span className="line"></span> STAY CONNECTED</p>
              <h2 className="section-title">Join Our Travel Community</h2>
              <p className="section-subtitle newsletter-subtitle">
                Join us to get exclusive travel guides, flight deals, and packing tips delivered straight to your inbox.
              </p>
              <form className="newsletter-form-extended" onSubmit={handleSubscribe}>
                <div className="form-group">
                  <input type="text" name="fullName" placeholder="Full Name" required className="newsletter-input" />
                </div>
                <div className="form-group">
                  <input type="text" name="idNumber" placeholder="ID Number" required className="newsletter-input" />
                </div>
                <div className="form-group">
                  <input type="tel" name="contactNumber" placeholder="Contact Number" required className="newsletter-input" />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email Address" required className="newsletter-input" />
                </div>
                <button type="submit" className="btn btn-primary newsletter-btn" style={{marginTop: '1rem'}}>Join Now</button>
              </form>
              {formMessage && <p className="form-message" style={{marginTop: '1rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(232,195,104,0.1)', color: 'var(--accent-gold)', textAlign: 'center', fontWeight: '600'}}>{formMessage}</p>}
              <p className="newsletter-disclaimer">We respect your privacy. No spam, ever.</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="footer">
        <div className="footer-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"/></svg>
        </div>
        <p className="footer-quote">Smart planning makes every journey unforgettable.</p>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Wanderlust Travel Blog. Designed for the Modern Explorer.</p>
      </footer>
    </div>
  );
}

export default App;
