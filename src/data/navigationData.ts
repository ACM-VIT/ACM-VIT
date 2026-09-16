export interface NavigationCard {
  title: string;
  description: string;
  href: string;
  image?: string;
  accent?: string;
  all?: boolean;
}

export const navigationPanels: Record<string, NavigationCard[]> = {
  about: [
    { title: "ACM-VIT", description: "Our chapter's mission and culture", href: "#about-acmvit", image: "/about/about-acmvit.webp" },
    { title: "VIT University", description: "One of India's leading technical universities", href: "#about-vit", image: "/about/about-vit.webp" },
    { title: "ACM Global", description: "The world's largest computing society", href: "#about-acm", image: "/about/about-acm.webp" },
  ],
  domains: [
    { title: "Tech", description: "App development, web, FOSS and DevOps", href: "#domains", image: "/Cassette_Tech.webp", accent: "#9B51E0" },
    { title: "Competitive Coding", description: "Algorithms, problem solving and contests", href: "#domains", image: "/Cassette_cc.webp", accent: "#42CD9D" },
    { title: "Design", description: "UI/UX, motion graphics, video and 3D", href: "#domains", image: "/Cassette_Design.webp", accent: "#FF0054" },
    { title: "Research", description: "AI/ML, security, blockchain and quantum", href: "#domains", image: "/Cassette_Research.webp", accent: "#135DE2" },
    { title: "Management", description: "Operations, outreach and coordination", href: "#domains", image: "/Cassette_Management.webp", accent: "#008080" },
    { title: "Explore all domains", description: "", href: "#domains", all: true },
  ],
  events: [
    { title: "Code2Create", description: "Our national-level flagship hackathon", href: "#events", image: "/events/c2c-cassette.webp" },
    { title: "Cryptic Hunt", description: "A cipher-cracking scavenger hunt across VIT", href: "#events", image: "/events/cryptic-hunt-cassette.webp" },
    { title: "inspiHer", description: "Celebrating women in technology", href: "#events", image: "/events/inspiher-cassette.webp" },
    { title: "Forktober", description: "A month-long open-source contribution drive", href: "#events", image: "/events/forktober-cassette.webp" },
    { title: "The Neural Hack", description: "A deep dive into artificial intelligence", href: "#events", image: "/events/neural-hack-cassette.webp" },
    { title: "All events", description: "", href: "#events", all: true },
  ],
  projects: [
    { title: "Conclave", description: "A real-time meetings platform built from scratch", href: "https://conclave.acmvit.in", image: "/projects/cassettes/projects-cassettes-conclave.svg" },
    { title: "ExamCooker", description: "An exam preparation hub for VIT students", href: "https://examcooker.acmvit.in", image: "/projects/items/1/cassetteSrc.webp" },
    { title: "ACMOne", description: "One workspace for the entire ACM-VIT team", href: "https://acmone.acmvit.in", image: "/projects/items/0/cassetteSrc.webp" },
    { title: "CLI RPG", description: "An immersive terminal-based role-playing game", href: "https://cli-rpg.acmvit.in", image: "/projects/items/2/cassetteSrc.webp" },
    { title: "UniPool", description: "Campus carpooling made simple", href: "https://unipool.acmvit.in", image: "/projects/items/3/cassetteSrc.webp" },
    { title: "Localhost", description: "A VS Code-inspired selections experience", href: "https://localhost.acmvit.in", image: "/projects/items/4/cassetteSrc.webp" },
    { title: "See the project showcase", description: "", href: "#projects", all: true },
  ],
  "acm-w": [
    { title: "Our Mission", description: "Equal access and opportunity in computing", href: "#acm-w", image: "/acmw-logo.webp" },
    { title: "ACM-W Community", description: "Stories, mentorship and inclusive initiatives", href: "#acm-w-content", image: "/acmwmotto.webp" },
    { title: "Showcase", description: "Highlights from ACM-W at VIT", href: "#acm-w-bento", image: "/acmw-bento.webp" },
  ],
  blogs: [
    { title: "The Cryptic Hunt 2024", description: "Hashnode · event retrospective", href: "https://blog.acmvit.in/the-cryptic-hunt-2024-blog", image: "/blogs/chfailure-blog.webp" },
    { title: "How Do Computers See Us?", description: "Hashnode · computer vision", href: "https://blog.acmvit.in/how-do-computers-see-us", image: "/blogs/computervision-blog.webp" },
    { title: "The Story Behind ExamCooker", description: "Hashnode · product story", href: "https://blog.acmvit.in/the-chefs-secrets-the-story-behind-examcooker", image: "/blogs/examcooker-blog.webp" },
    { title: "Git Happens", description: "Hashnode · open source", href: "https://blog.acmvit.in/git-happens", image: "/blogs/githappens-blog.webp" },
    { title: "Self-Improving AI", description: "Hashnode · artificial intelligence", href: "https://blog.acmvit.in/self-improving-ai", image: "/blogs/placeholder.webp" },
    { title: "DeFi 101", description: "Hashnode · decentralised finance", href: "https://blog.acmvit.in/defi-101", image: "/blogs/defi-blog.webp" },
    { title: "All blogs", description: "", href: "https://blog.acmvit.in", all: true },
  ],
  partners: [
    { title: "GitHub", description: "Developer platform partner", href: "https://github.com", image: "/github-icon.webp" },
    { title: "Slack", description: "Team collaboration partner", href: "https://slack.com", image: "/partners/5.webp" },
    { title: "Devfolio", description: "Hackathon community partner", href: "https://devfolio.co", image: "/partners/6.webp" },
    { title: "Wolfram Language", description: "Computational technology partner", href: "https://www.wolfram.com/language/", image: "/partners/8.webp" },
    { title: "DigitalOcean", description: "Cloud infrastructure partner", href: "https://www.digitalocean.com", image: "/partners/11.webp" },
    { title: "JetBrains", description: "Developer tools partner", href: "https://www.jetbrains.com", image: "/partners/14.webp" },
    { title: "All partners", description: "", href: "#partners", all: true },
  ],
  contact: [
    { title: "Contact Us", description: "Send a message to the ACM-VIT team", href: "#contact", image: "/MacBookScreen.webp" },
    { title: "Email", description: "hello@acmvit.in", href: "mailto:hello@acmvit.in", image: "/footer/pixel-heart.webp" },
    { title: "Instagram", description: "Follow events, launches and chapter life", href: "https://www.instagram.com/acmvit", image: "/footer/Instagram.webp" },
    { title: "LinkedIn", description: "Connect with the ACM-VIT network", href: "https://www.linkedin.com/company/acmvit", image: "/footer/Linkedin.webp" },
    { title: "Find Us", description: "VIT Vellore, Tamil Nadu", href: "https://w3w.co/static.grips.limelight", image: "/footer/VIT-Map.webp" },
    { title: "Open the contact section", description: "", href: "#contact", all: true },
  ],
  community: [
    { title: "Outreach", description: "Beyond The Norm workshops for schools", href: "#community-outreach", image: "/outreacch/outreach-event.webp" },
    { title: "SDG Initiative", description: "Digital learning for rural communities", href: "#community-sdg", image: "/outreacch/beyond-norm-logo.webp" },
    { title: "International Award", description: "Outstanding School Service recognition", href: "#community-award", image: "/acm-celeb.webp" },
    { title: "Code of Conduct", description: "The principles and values that guide us", href: "#community-conduct", image: "/acm-logo-black.webp" },
    { title: "Distinguished Speakers", description: "Conversations with leaders in computing", href: "#community-speaker", image: "/community/peter-robinson.webp" },
    { title: "Explore our community work", description: "", href: "#community", all: true },
  ],
  team: [
    { title: "Prakhar Joshi", description: "Chairperson", href: "https://www.linkedin.com/in/prakharjoshi23/", image: "/board/items/1/imageUrl.webp" },
    { title: "Rohit Sakamuri", description: "Vice Chair", href: "https://www.linkedin.com/in/rohit-sakamuri-563878215", image: "/board/items/2/imageUrl.webp" },
    { title: "Drashti Shukla", description: "Secretary", href: "https://www.linkedin.com/in/drashtishukla/", image: "/board/items/3/imageUrl.webp" },
    { title: "Shaurya Garg", description: "Co-Secretary", href: "https://www.linkedin.com/in/shauryagarg11/", image: "/board/items/4/imageUrl.webp" },
    { title: "Ishaan Samdani", description: "Technical Director", href: "https://linkedin.com/in/ishaaans", image: "/board/items/5/imageUrl.webp" },
    { title: "Rishit Shivam", description: "Research Lead", href: "https://www.linkedin.com/in/rishitshivam/", image: "/board/items/6/imageUrl.webp" },
    { title: "Meet the full team", description: "", href: "#team", all: true },
  ],
};

export const moreNavigationItems = [
  { label: "Blogs", href: "#blogs", panel: "blogs" },
  { label: "Partners", href: "#partners", panel: "partners" },
  { label: "Contact Us", href: "#contact", panel: "contact" },
  { label: "Community", href: "#community", panel: "community" },
  { label: "Team", href: "#team", panel: "team" },
];
