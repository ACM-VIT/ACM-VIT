// Roster for the /team page. The current board (latest year) is sourced
// live from the Keystatic `board` singleton in team.astro; every other year
// here is a static historical roster with real photos under public/board/<year>/.

export const teamYears = [2026, 2025, 2024, 2023, 2022] as const;

export interface TeamDivisionDef {
  key: string;
  label: string;
  accent: string;
}

export const boardDivision: TeamDivisionDef = {
  key: "board",
  label: "Board",
  accent: "#F95F4A",
};

export interface TeamMember {
  title: string;
  fullName: string;
  position: string;
  imageUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
  googleScholarUrl?: string;
  isW?: boolean;
}

const member = (
  fullName: string,
  position: string,
  slug: string,
  year: number,
  isW = false,
): TeamMember => ({
  title: "",
  fullName,
  position,
  imageUrl: `/board/${year}/${slug}.webp`,
  isW,
});

export const board2025: TeamMember[] = [
  member("Manan Shah", "Chairperson", "manan-shah", 2025),
  member("Kairav Sheth", "Vice Chairperson", "kairav-sheth", 2025),
  member("Sunny Gogoi", "Secretary", "sunny-gogoi", 2025),
  member("Eshita Chokhani", "Co-Secretary", "eshita-chokhani", 2025),
  member("Yasha Pacholee", "Research Lead", "yasha-pacholee", 2025),
  member("Tanush Golwala", "Technical Director", "tanush-golwala", 2025),
  member("Supratim Ghose", "Projects Lead", "supratim-ghose", 2025),
  member("Garv Jain", "Developer Relations", "garv-jain", 2025),
  member("Yash Raj Singh", "Design Lead", "yash-raj-singh", 2025),
  member("Srija Puvvada", "Creative Lead", "srija-puvvada", 2025),
  member("Harshitaa Kashyap", "ACM-W Chairperson", "harshitaa-kashyap", 2025, true),
  member("Aastik Narang", "ACM-W Vice Chairperson", "aastik-narang", 2025, true),
  member("Shambhavi Paygude", "ACM-W Secretary", "shambhavi-paygude", 2025, true),
];

export const board2024: TeamMember[] = [
  member("Manav Muthanna", "Chairperson", "manav-muthanna", 2024),
  member("Anand Rajaram", "Vice Chairperson", "anand-rajaram", 2024),
  member("Shambhavi Sinha", "Secretary", "shambhavi-sinha", 2024),
  member("Saharsh Bhansali", "Research Lead", "saharsh-bhansali", 2024),
  member("Rohan Khatua", "Tech Lead", "rohan-khatua", 2024),
  member("Sarthak Gupta", "Project Lead", "sarthak-gupta", 2024),
  member("Vidit Kothari", "Developer Relations Lead", "vidit-kothari", 2024),
  member("Ritaank Gunjesh", "Design Lead", "ritaank-gunjesh", 2024),
  member("Ojal Binoj Koshy", "Content Lead", "ojal-binoj-koshy", 2024),
  member("Hari R. Kartha", "Internal Lead", "hari-r-kartha", 2024),
  member("Anshuman Gupta", "ACM-W Chairperson", "anshuman-gupta", 2024, true),
  member("Devanshi Tripathi", "ACM-W Vice Chairperson", "devanshi-tripathi", 2024, true),
  member("Aryan Chaudhary", "ACM-W Secretary", "aryan-chaudhary", 2024, true),
];

export const board2023: TeamMember[] = [
  member("Harsh Avinash", "Chairperson", "harsh-avinash", 2023),
  member("Aryan Khubchandani", "Vice Chairperson", "aryan-khubchandani", 2023),
  member("Sumona Sud", "Secretary", "sumona-sud", 2023),
  member("Chirayu Sharma", "Co-Secretary", "chirayu-sharma", 2023),
  member("Aryaman Kolhe", "Research & Competitive Head", "aryaman-kolhe", 2023),
  member("Gagan Malvi", "Technical Head", "gagan-malvi", 2023),
  member("Swarup Kharul", "Projects Head", "swarup-kharul", 2023),
  member("Jeet Kaushik", "Design Head", "jeet-kaushik", 2023),
  member("Dhriti Kharangra", "Creative Head", "dhriti-khangrara", 2023),
  member("Pramika Garg", "Finance Head", "pramika-garg", 2023),
  member("Ananya Grover", "Chairperson (ACM-W)", "ananya-grover", 2023, true),
  member("Aishwarya Manjunath", "Vice Chairperson (ACM-W)", "aishwarya-manjunath", 2023, true),
  member("Vaishnavi Mangnale", "Secretary (ACM-W)", "vaishnavi-mangnale", 2023, true),
];

export const board2022: TeamMember[] = [
  member("Rishabh Keshan", "Chairperson", "rishabh-keshan", 2022),
  member("Ishi Yadav", "General Secretary", "ishi-yadav", 2022),
  member("Vinamra Khoria", "Research Lead", "vinamra-khoria", 2022),
  member("Yash Kumar Verma", "Technical Director", "yash-kumar-verma", 2022),
  member("Rohan Arora", "Design Lead", "rohan-arora", 2022),
  member("Diya Pal", "Managing Director", "diya-pal", 2022),
  member("Shreyas Khan", "Webmaster", "shreyas-khan", 2022),
  member("Hemanth Krishna", "App Lead", "hemanth-krishna", 2022),
  member("Ansh Sharma", "Competitive Lead", "ansh-sharma", 2022),
  member("Deepankar Jain", "Treasurer", "deepankar-jain", 2022),
  member("Amit Krishna A", "App Projects Guide", "amit-krishna-a", 2022),
  member("Anmol Bhardwaj", "Design Projects Guide", "anmol-bhardwaj", 2022),
  member("Aryan Vats", "Research Projects Guide", "aryan-vats", 2022),
  member("Sarthak Bhardwaj", "Competitive Guide", "sarthak-bhardwaj", 2022),
  member("Rishav Jain", "Operations Head", "rishav-jain", 2022),
  member("Anusha Verma Chandraju", "Chairperson (ACM-W)", "anusha-verma-chandraju", 2022, true),
  member("Aritri Basu", "General Secretary (ACM-W)", "aritri-basu", 2022, true),
];

// Keyed by the same start-year labels used in `teamYears`. The current year
// (2026) is intentionally absent here - it's read live from board.json.
export const historicalBoards: Record<number, TeamMember[]> = {
  2025: board2025,
  2024: board2024,
  2023: board2023,
  2022: board2022,
};
