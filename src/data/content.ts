import type {
  ActivityItem,
  BadgeItem,
  CityChapter,
  CommunityChannel,
  CommunityPost,
  ContributionLog,
  FeatureCard,
  GigOpportunity,
  GrowthStage,
  PricingPlan,
  RitualCard,
  RitualEvent,
  StatItem,
  TweetCard,
  MemberProfile,
} from '../types';

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Community', path: '/community' },
  { label: 'Casting & Opportunity', path: '/casting' },
  { label: 'Rituals', path: '/rituals' },
  { label: 'Members', path: '/members' },
  { label: 'Profile', path: '/profile' },
];

export const heroStats: StatItem[] = [
  { label: 'Artists', value: '1,200+' },
  { label: 'Cities', value: '6' },
  { label: 'Art Forms', value: '15+' },
  { label: 'Gigs Posted', value: '400+' },
];

export const ritualCards: RitualCard[] = [
  {
    frequency: 'Every Monday',
    title: 'Casting Board Update',
    description: 'New paid and collaborative opportunities. Prime members get 48-hour early access before anyone else.',
  },
  {
    frequency: 'Every Thursday',
    title: 'Baba ki Baatein',
    description: 'Live voice session. Real conversations about art, life, and the industry. No agenda. Just tribe.',
  },
  {
    frequency: 'Every Saturday',
    title: 'Spotlight Saturday',
    description: "One artist. Their story. Shared across the Tribe and ATFA's platforms. Your turn will come.",
  },
];

export const tweets: TweetCard[] = [
  {
    author: 'Rajeev RC',
    handle: '@RajeevRC_X',
    avatar: 'R',
    content: '"Theatre gave me everything — discipline, empathy, a voice. But nobody tells you how to survive as a theatre artist in India. There\'s no roadmap. You\'re just... alone with your art."',
    footer: '💬 Add your tweet text here',
  },
  {
    author: 'Rajeev RC',
    handle: '@RajeevRC_X',
    avatar: 'R',
    content: '"The performing arts community in India desperately needs infrastructure. Not just stages — but mentorship, income pathways, and most importantly, each other."',
    footer: '💬 Add your tweet text here',
  },
];

export const featureCards: FeatureCard[] = [
  {
    icon: '🎭',
    title: 'Identity over vanity',
    description: 'Profiles built on art form, city, journey stage — no follower counts.',
  },
  {
    icon: '💼',
    title: 'Real opportunities',
    description: 'Casting board with paid gigs, brand activations, and ATFA project referrals.',
  },
  {
    icon: '🎓',
    title: 'Mentorship ladders',
    description: 'Monthly group sessions for Prime. Quarterly 1-on-1 coaching for Privilege.',
  },
  {
    icon: '🏆',
    title: 'Gamified growth',
    description: 'Earn XP, unlock badges, climb from Learner to Tribe Leader through real contributions.',
  },
  {
    icon: '🌍',
    title: 'City chapters',
    description: 'Vadodara, Ahmedabad, Surat, Mumbai, Delhi, Bengaluru — and growing globally.',
  },
  {
    icon: '🚀',
    title: 'ATFA promotion',
    description: "Prime and Privilege members get promoted across ATFA's platforms and networks.",
  },
];

export const cityChapters: CityChapter[] = [
  { name: 'Vadodara', status: 'Active · Anchor', tone: 'active' },
  { name: 'Ahmedabad', status: 'Q2 2026', tone: 'active' },
  { name: 'Surat', status: 'Q3 2026', tone: 'active' },
  { name: 'Mumbai', status: 'Coming soon', tone: 'soon' },
  { name: 'Delhi', status: 'Coming soon', tone: 'soon' },
  { name: 'Bengaluru', status: 'Coming soon', tone: 'soon' },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    tier: 'Free',
    price: '₹0',
    cadence: 'forever',
    description: "Browse everything. When you're ready, join.",
    highlights: ['View community feed', 'Browse casting board', 'See all rituals & events'],
    badge: 'Free',
    flavor: 'muted',
    buttonText: 'Browse freely',
  },
  {
    name: 'School Student',
    tier: 'Student',
    price: '₹999',
    cadence: 'year',
    description: 'For school students exploring performing arts. Valid student ID required.',
    highlights: ['Full community access', 'Join Baba ki Baatein', 'Spotlight Saturday access', 'City chapter membership', 'Apply for student gigs'],
    badge: 'School Student',
    flavor: 'success',
    buttonText: 'Join as Student',
  },
  {
    name: 'Community',
    tier: 'Community',
    price: '₹999',
    cadence: 'year',
    description: 'Belong to the Tribe. Community, events, casting board, city chapter.',
    highlights: ['Post in community feed', 'Join Baba ki Baatein', 'Spotlight Saturday', 'City chapter access', 'Apply for gigs (standard)'],
    badge: 'Community',
    flavor: 'primary',
    buttonText: 'Join Community',
  },
  {
    name: 'Prime',
    tier: 'Prime',
    price: '₹1,999',
    cadence: 'year',
    description: 'Grow and be seen. Early access, ATFA promotion, matched collabs.',
    highlights: ['Everything in Community', '48hr early casting access', 'ATFA platform promotion', 'Matched collaborations', 'Mentor group feedback', 'Performance slots'],
    badge: 'Most Popular',
    flavor: 'gold',
    buttonText: 'Join Prime',
  },
  {
    name: 'Privilege',
    tier: 'Privilege',
    price: '₹6,999',
    cadence: '6 months',
    description: 'Your career, accelerated. ATFA referrals, coaching, VIP access.',
    highlights: ['Everything in Prime', 'Direct ATFA referrals', 'Weekly skill sessions', 'Quarterly 1-on-1 coaching', 'Stage booking support', 'Exclusive merch kit'],
    badge: 'Privilege',
    flavor: 'gold',
    buttonText: 'Join Privilege',
  },
  {
    name: 'Artiverse Special',
    tier: 'Event',
    price: '₹499',
    cadence: 'first 3 months',
    description: 'Attending an Artiverse event? Exclusive for event attendees only. Scan QR at venue.',
    highlights: ['Community tier for 3 months', 'Instant Discord + WhatsApp onboarding', 'City chapter activated'],
    badge: 'Artiverse Special',
    flavor: 'success',
    buttonText: 'Claim Artiverse Offer',
  },
];

export const communityChannels: CommunityChannel[] = [
  { title: 'welcome', selected: true },
  { title: 'rules & values', selected: false },
  { title: 'introduction', selected: false },
  { title: 'general', selected: false, tierLabel: 'Join', locked: true },
  { title: 'tribe-talk', selected: false, tierLabel: 'Join', locked: true },
  { title: 'creative-corner', selected: false, tierLabel: 'Join', locked: true },
  { title: 'announcement', selected: false, tierLabel: 'Join', locked: true },
  { title: 'collaboration', selected: false, tierLabel: 'Prime', locked: true },
  { title: 'opportunities', selected: false, tierLabel: 'Prime', locked: true },
  { title: 'mentors', selected: false, tierLabel: 'Prime', locked: true },
  { title: 'daily-activity', selected: false, tierLabel: 'Privilege', locked: true },
  { title: 'tribe-sessions', selected: false, tierLabel: 'Privilege', locked: true },
  { title: 'privilege-meets', selected: false, tierLabel: 'Privilege', locked: true },
];

export const communityPosts: CommunityPost[] = [
  {
    author: 'Riya Sharma',
    avatar: 'https://i.pravatar.cc/150?img=47',
    role: 'Theatre Actor · Mumbai · Tribe Leader',
    membership: 'Privilege',
    city: 'Mumbai',
    content: "Just wrapped my 3rd mentorship session this month. Watching emerging artists find their stage confidence is the most fulfilling part of this journey. This Tribe is real. 🙏",
    likes: 42,
  },
  {
    author: 'Karan Dev',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'Bharatanatyam · Bangalore · Contributor',
    membership: 'Prime',
    city: 'Bangalore',
    content: 'Looking for a vocalist and tabla player for a cross-disciplinary performance in Bangalore next month. This is why I joined the Tribe — where else do you find collaborators who understand the art?',
    likes: 28,
  },
  {
    author: 'Meera Joshi',
    avatar: 'https://i.pravatar.cc/150?img=31',
    role: 'Folk Art · Rajasthan · Learner',
    membership: 'Community',
    city: 'Rajasthan',
    content: "Joined last week. Nobody asks how many followers I have here. It's about the art. About belonging. Thank you all. 🙏",
    likes: 67,
  },
  {
    author: 'Vivek Anand',
    avatar: 'https://i.pravatar.cc/150?img=59',
    role: 'Film Direction · Delhi',
    membership: 'Prime',
    city: 'Delhi',
    content: 'Exciting paid project posted in collaboration channel — looking for a choreographer and 2 lead performers for a 3-day brand shoot in Mumbai. Budget confirmed. Apply before Thursday for early access...',
    likes: 0,
    locked: true,
  },
];

export const gigOpportunities: GigOpportunity[] = [
  {
    icon: '🎭',
    title: 'Lead Actor — Short Film "Antar"',
    meta: 'Aniradichita Theatre & Films · Vadodara · Posted Mon, Apr 14',
    tags: ['Theatre', 'Film', 'Paid'],
    tierTag: 'Community+',
    actionLabel: 'Apply',
    disabled: true,
  },
  {
    icon: '🎵',
    title: 'Live Vocalist — Brand Event',
    meta: 'Aarachitt Agency · Mumbai · Posted Mon, Apr 14',
    tags: ['Music', 'Corporate', 'Paid ₹8,000'],
    tierTag: 'Prime 48hr',
    actionLabel: 'Apply',
    disabled: true,
  },
  {
    icon: '💃',
    title: 'Choreographer — Cross-Disciplinary Performance',
    meta: 'Karan Dev (Tribe Member) · Bangalore · Posted Today',
    tags: ['Dance', 'Collaboration'],
    tierTag: 'Community+',
    actionLabel: 'Apply',
    disabled: true,
  },
  {
    icon: '🎤',
    title: 'Performer — CSR Campaign (Pravartan)',
    meta: 'ATFA · Multiple cities · This week',
    tags: ['Performance', 'CSR', 'Paid'],
    tierTag: 'Privilege Referral',
    actionLabel: 'Apply',
    disabled: true,
  },
];

export const ritualEvents: RitualEvent[] = [
  {
    day: '14',
    month: 'Apr',
    title: 'Baba ki Baatein',
    meta: 'Every Thursday · Live Voice · 8:30 PM IST',
    tags: ['Weekly ritual'],
    statusTag: 'Community+',
    cta: 'Join',
    highlighted: true,
  },
  {
    day: '19',
    month: 'Apr',
    title: 'Spotlight Saturday',
    meta: 'Every Saturday · Artist Feature · All platforms',
    tags: ['Weekly ritual'],
    statusTag: 'Community+',
    cta: 'Nominate',
    highlighted: true,
  },
  {
    day: '26',
    month: 'Apr',
    title: 'Prime Mentor Group Session',
    meta: 'Monthly · 60 mins · Online',
    tags: [],
    statusTag: 'Prime & above',
    cta: 'Join',
  },
  {
    day: '3',
    month: 'May',
    title: 'Privilege Member Meet — Vadodara',
    meta: 'Quarterly in-person · Venue TBA',
    tags: [],
    statusTag: 'Privilege only',
    cta: 'RSVP',
  },
  {
    day: 'TBA',
    month: 'Jun',
    title: 'Artiverse Vadodara — Anchor Edition',
    meta: 'Live arts event · ₹499 TTT on-ramp on the night',
    tags: ['Artiverse', 'Open to all'],
    cta: 'Register',
    highlighted: true,
  },
];

export const memberProfiles: MemberProfile[] = [
  {
    name: 'Riya Sharma',
    role: 'Theatre · Mumbai',
    membership: 'Privilege',
    tags: ['Theatre', 'Mentor'],
    image: 'https://i.pravatar.cc/150?img=47',
    coverGradient: 'from-[#8B2E08] via-[#E8653A] to-[#E8653A]',
  },
  {
    name: 'Karan Dev',
    role: 'Bharatanatyam · Bangalore',
    membership: 'Prime',
    tags: ['Dance', 'Collab'],
    image: 'https://i.pravatar.cc/150?img=12',
    coverGradient: 'from-[#1a4a2e] via-[#22c55e] to-[#22c55e]',
  },
  {
    name: 'Meera Joshi',
    role: 'Folk Art · Rajasthan',
    membership: 'Community',
    tags: ['Folk', 'Visual'],
    image: 'https://i.pravatar.cc/150?img=31',
    coverGradient: 'from-[#4a3a00] via-[#D4A017] to-[#D4A017]',
  },
  {
    name: 'Vivek Anand',
    role: 'Film Direction · Delhi',
    membership: 'Prime',
    tags: ['Film', 'Direction'],
    image: 'https://i.pravatar.cc/150?img=59',
    coverGradient: 'from-[#2a0a4a] via-[#7C3AED] to-[#7C3AED]',
  },
  {
    name: 'Sneha Pillai',
    role: 'Carnatic Vocals · Chennai',
    membership: 'Privilege',
    tags: ['Music', 'Mentor'],
    image: 'https://i.pravatar.cc/150?img=44',
    coverGradient: 'from-[#0a2a4a] via-[#378ADD] to-[#378ADD]',
  },
  {
    name: 'Aditya Roy',
    role: 'Stand-up · Pune',
    membership: 'Community',
    tags: ['Comedy', 'Writing'],
    image: 'https://i.pravatar.cc/150?img=25',
    coverGradient: 'from-[#4a0a2a] via-[#D4537E] to-[#D4537E]',
  },
];

export const profileBadges: BadgeItem[] = [
  { icon: '🎭', label: 'Stage Veteran', earned: true },
  { icon: '🔥', label: '14-Day Streak', earned: true },
  { icon: '🤝', label: 'Collaborator', earned: true },
  { icon: '🎓', label: 'Mentor', earned: true },
  { icon: '🌍', label: 'City Leader', earned: false },
  { icon: '💰', label: 'Gig Pro', earned: false },
  { icon: '🏆', label: 'Tribe Legend', earned: false },
  { icon: '🌟', label: 'Spotlight Star', earned: false },
];

export const activityFeed: ActivityItem[] = [
  { icon: '🎭', description: 'Led theatre workshop — 18 participants', points: '+150 XP', tone: 'brand' },
  { icon: '🎓', description: 'Mentorship session with Meera Joshi', points: '+100 XP', tone: 'purple' },
  { icon: '🤝', description: 'Collaborated on cross-disciplinary show', points: '+120 XP', tone: 'green' },
  { icon: '📝', description: 'Posted in Creative Corner', points: '+20 XP', tone: 'gold' },
  { icon: '🔥', description: 'Attended Baba ki Baatein', points: '+50 XP', tone: 'brand' },
];

export const growthStages: GrowthStage[] = [
  { from: 'Learner', to: 'Contributor', progress: 100, complete: true },
  { from: 'Contributor', to: 'Mentor', progress: 100, complete: true },
  { from: 'Mentor', to: 'Tribe Leader', progress: 78, complete: false },
];

export const contributionLogs: ContributionLog[] = [
  { icon: '🎭', label: 'Led community theatre workshop', date: 'Apr 10' },
  { icon: '🎓', label: 'Mentorship — Meera Joshi', date: 'Apr 7' },
  { icon: '🤝', label: 'Cross-disciplinary collaboration', date: 'Mar 28' },
  { icon: '🏆', label: 'Earned Tribe Leader recognition', date: 'Mar 15' },
  { icon: '💼', label: 'Gig earned — ATFA Brand Film', date: 'Mar 2' },
];
