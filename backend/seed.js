const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./models/Destination');
const Blog = require('./models/Blog');

dotenv.config();

const destinationData = [
  {
    name: 'Kyoto, Japan',
    shortName: 'Japan',
    tagText: 'Temples & Tradition',
    img: '/japan.png',
    country: 'Japan',
    description: 'Kyoto, once the capital of Japan, is a city of breathtaking temples, tranquil zen gardens, and traditional wooden townhouses. Step into a world where ancient culture meets modern Japan.',
    bestTime: 'March – May & Oct – Nov',
    avgCost: '$120 / day',
    language: 'Japanese',
    currency: 'Japanese Yen (JPY)',
    visa: 'Free on Arrival (most passports)',
    mustSee: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji (Golden Pavilion)', 'Gion District', 'Nishiki Market'],
    food: ['Ramen', 'Sushi', 'Kaiseki (multi-course)', 'Matcha sweets', 'Takoyaki'],
    funFact: 'Kyoto has over 1,600 Buddhist temples and 400 Shinto shrines — making it one of the best-preserved historical cities in the world.',
    safety: '★★★★★',
  },
  {
    name: 'Sri Lanka',
    shortName: 'Sri Lanka',
    tagText: 'Tropics & Heritage',
    img: '/sri_lanka.png',
    country: 'Sri Lanka',
    description: 'Sri Lanka, the "Pearl of the Indian Ocean", is a tropical island of lush jungles, ancient ruins, stunning beaches, and friendly people. A compact country with an enormous amount to discover.',
    bestTime: 'December – March',
    avgCost: '$60 / day',
    language: 'Sinhala / Tamil',
    currency: 'Sri Lankan Rupee (LKR)',
    visa: 'eVisa Required',
    mustSee: ['Sigiriya Rock Fortress', 'Temple of the Tooth', 'Yala National Park', "Ella's Nine Arch Bridge", 'Mirissa Beach'],
    food: ['Rice & Curry', 'Hoppers (Appa)', 'Kottu Roti', 'Fresh Seafood', 'Ceylon Tea'],
    funFact: 'Sri Lanka is home to 8 UNESCO World Heritage Sites and has over 250 species of birds — a paradise for nature lovers!',
    safety: '★★★★☆',
  },
  {
    name: 'Maldives',
    shortName: 'Maldives',
    tagText: 'Beach Paradise',
    img: '/maldives.png',
    country: 'Maldives',
    description: 'The Maldives is a stunning archipelago of over 1,000 coral islands set in the turquoise Indian Ocean. Famous for its crystal-clear waters, vibrant coral reefs, and luxurious overwater bungalows.',
    bestTime: 'November – April (Dry Season)',
    avgCost: '$350 / day',
    language: 'Dhivehi',
    currency: 'Maldivian Rufiyaa (MVR)',
    visa: 'Free on Arrival',
    mustSee: ['Baa Atoll Biosphere Reserve', 'Underwater Restaurant', 'Male City', 'Vaadhoo Island', 'Banana Reef Diving'],
    food: ['Mas Huni (tuna & coconut)', 'Garudhiya (fish broth)', 'Fresh Lobster', 'Tropical Fruits', 'Hedhikaa'],
    funFact: 'The Maldives is the lowest-lying country on Earth, with an average elevation of just 1.5 meters above sea level!',
    safety: '★★★★☆',
  },
  {
    name: 'Sydney, Australia',
    shortName: 'Australia',
    tagText: 'Iconic Landmarks',
    img: '/australia.png',
    country: 'Australia',
    description: "Sydney is Australia's largest and most iconic city, offering a stunning harbor, world-famous landmarks, golden beaches, and a vibrant multicultural food scene.",
    bestTime: 'September – November',
    avgCost: '$160 / day',
    language: 'English',
    currency: 'Australian Dollar (AUD)',
    visa: 'eVisa Required',
    mustSee: ['Sydney Opera House', 'Harbour Bridge Climb', 'Bondi Beach', 'Blue Mountains', 'Taronga Zoo'],
    food: ['Meat Pie', 'Tim Tams', 'Barramundi Fish', 'Pavlova', 'Flat White Coffee'],
    funFact: 'The Sydney Opera House took 14 years to build (1959–1973) and is now visited by over 8 million people annually.',
    safety: '★★★★☆',
  },
  {
    name: 'Paris, France',
    shortName: 'France',
    tagText: 'Art & Romance',
    img: '/france.png',
    country: 'France',
    description: "Paris, the \"City of Light\", is one of the world's most romantic and culturally rich capitals. From the iconic Eiffel Tower to world-class cuisine and fashion, Paris is a timeless destination.",
    bestTime: 'April – June (Spring)',
    avgCost: '$180 / day',
    language: 'French',
    currency: 'Euro (EUR)',
    visa: 'Schengen Visa Required',
    mustSee: ['Eiffel Tower', 'The Louvre Museum', 'Notre-Dame Cathedral', 'Montmartre', 'Palace of Versailles'],
    food: ['Croissants', 'French Onion Soup', 'Crêpes', 'Macarons', 'Coq au Vin'],
    funFact: "The Louvre in Paris is the world's largest and most visited art museum, housing over 380,000 objects including the Mona Lisa.",
    safety: '★★★★☆',
  }
];

const blogData = [
  {
    title: "Backpacking Europe on a Budget",
    excerpt: "Discover the charming cobblestone streets and historic cities of Europe without breaking the bank.",
    content: "Traveling through Europe doesn't have to drain your savings. By planning ahead and choosing the right destinations, you can experience the magic of the continent on a backpacker's budget.\n\nStart your journey in Eastern Europe. Cities like Prague, Budapest, and Krakow offer incredible history, stunning architecture, and vibrant nightlife at a fraction of the cost of Paris or London. Opt for free walking tours to get acquainted with the city, and eat where the locals eat—street food and small local taverns are your best friends.\n\nTransportation is another area where you can save big. Utilize regional trains or budget bus lines. If you book in advance, overnight buses can double as accommodation, saving you even more. Remember, the true essence of travel is about the experiences you collect, not the luxury you purchase.",
    date: "May 10, 2026",
    readTime: "7 min read",
    img: "/blog_europe_1779548884016.png",
    category: "Guides"
  },
  {
    title: "Top 10 Pristine Tropical Beaches",
    excerpt: "From hidden coves to famous white-sand shores, here are the world's most breathtaking beaches to visit this summer.",
    content: "There is nothing quite like the feeling of warm white sand between your toes and the sound of gentle waves crashing on the shore. From hidden gems to world-renowned coastlines, these pristine tropical beaches are perfect for your next summer getaway.\n\nFirst on our list is El Nido, Palawan in the Philippines. Known for its towering limestone cliffs and crystal-clear lagoons, it's a paradise for island-hopping and snorkeling. Not far behind is the secluded Navagio Beach in Greece, accessible only by boat, offering breathtaking views and the famous shipwreck.\n\nWhen packing for your tropical adventure, don't forget reef-safe sunscreen. Protecting the beautiful coral reefs is just as important as enjoying them. Whether you're sipping a coconut in Bali or lounging on the soft sands of the Maldives, these beaches will give you memories that last a lifetime.",
    date: "May 18, 2026",
    readTime: "5 min read",
    img: "/blog_beach_1779548901665.png",
    category: "Inspiration"
  },
  {
    title: "A Foodie's Guide to Tuscany",
    excerpt: "Indulge in authentic Italian pasta, rich wines, and rustic trattorias with our ultimate culinary guide to Italy.",
    content: "Tuscany is a region that speaks to the soul, and more importantly, to the stomach. Known for its rolling hills, olive groves, and vineyards, the culinary landscape of Tuscany is deeply rooted in peasant traditions—creating dishes that are hearty, flavorful, and incredibly satisfying.\n\nBegin your culinary tour in Florence with a massive Bistecca alla Fiorentina, a thick-cut T-bone steak grilled to perfection over wood coals. Pair it with a robust Chianti Classico. For a more rustic experience, venture into the countryside to a local 'agriturismo' where you can learn to make fresh pici pasta by hand.\n\nNo meal in Tuscany is complete without dessert. Treat yourself to cantucci (almond biscuits) dipped in Vin Santo, a sweet dessert wine. The secret to Tuscan food is simplicity and the high quality of local ingredients. Buon appetito!",
    date: "May 22, 2026",
    readTime: "6 min read",
    img: "/blog_food_1779548918286.png",
    category: "Food & Culture"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Destination.deleteMany({});
    await Blog.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    await Destination.insertMany(destinationData);
    console.log(`📍 Inserted ${destinationData.length} destinations`);

    await Blog.insertMany(blogData);
    console.log(`📝 Inserted ${blogData.length} blog posts`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
