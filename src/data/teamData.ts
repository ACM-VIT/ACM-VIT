export interface TeamMember {
  title?: string;
  fullName: string;
  position: string;
  imageUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  googleScholarUrl?: string;
  isW?: boolean;
}

export interface TeamYear {
  year: number;
  label?: string;
  members: TeamMember[];
}

export const CURRENT_BOARD_YEAR = 2026;

export const pastBoards: TeamYear[] = [
  {
    "year": 2025,
    "members": [
      {
        "fullName": "Manan Shah",
        "position": "Chairperson",
        "imageUrl": "/board/2025/manan-shah.webp"
      },
      {
        "fullName": "Kairav Sheth",
        "position": "Vice Chairperson",
        "imageUrl": "/board/2025/kairav-sheth.webp"
      },
      {
        "fullName": "Sunny Gogoi",
        "position": "Secretary",
        "imageUrl": "/board/2025/sunny-gogoi.webp"
      },
      {
        "fullName": "Eshita Chokhani",
        "position": "Co-Secretary",
        "imageUrl": "/board/2025/eshita-chokhani.webp"
      },
      {
        "fullName": "Yasha Pacholee",
        "position": "Research Lead",
        "imageUrl": "/board/2025/yasha-pacholee.webp"
      },
      {
        "fullName": "Tanush Golwala",
        "position": "Technical Director",
        "imageUrl": "/board/2025/tanush-golwala.webp"
      },
      {
        "fullName": "Supratim Ghose",
        "position": "Projects Lead",
        "imageUrl": "/board/2025/supratim-ghose.webp"
      },
      {
        "fullName": "Garv Jain",
        "position": "Developer Relations",
        "imageUrl": "/board/2025/garv-jain.webp"
      },
      {
        "fullName": "Yash Raj Singh",
        "position": "Design Lead",
        "imageUrl": "/board/2025/yash-raj-singh.webp"
      },
      {
        "fullName": "Srija Puvvada",
        "position": "Creative Lead",
        "imageUrl": "/board/2025/srija-puvvada.webp"
      },
      {
        "fullName": "Harshitaa Kashyap",
        "position": "ACM-W Chairperson",
        "imageUrl": "/board/2025/harshitaa-kashyap.webp",
        "isW": true
      },
      {
        "fullName": "Aastik Narang",
        "position": "ACM-W Vice Chairperson",
        "imageUrl": "/board/2025/aastik-narang.webp",
        "isW": true
      },
      {
        "fullName": "Shambhavi Paygude",
        "position": "ACM-W Secretary",
        "imageUrl": "/board/2025/shambhavi-paygude.webp",
        "isW": true
      }
    ]
  },
  {
    "year": 2024,
    "members": [
      {
        "fullName": "Manav Muthanna",
        "position": "Chairperson",
        "imageUrl": "/board/2024/manav-muthanna.webp"
      },
      {
        "fullName": "Anand Rajaram",
        "position": "Vice Chairperson",
        "imageUrl": "/board/2024/anand-rajaram.webp"
      },
      {
        "fullName": "Shambhavi Sinha",
        "position": "Secretary",
        "imageUrl": "/board/2024/shambhavi-sinha.webp"
      },
      {
        "fullName": "Saharsh Bhansali",
        "position": "Research Lead",
        "imageUrl": "/board/2024/saharsh-bhansali.webp"
      },
      {
        "fullName": "Rohan Khatua",
        "position": "Tech Lead",
        "imageUrl": "/board/2024/rohan-khatua.webp"
      },
      {
        "fullName": "Sarthak Gupta",
        "position": "Project Lead",
        "imageUrl": "/board/2024/sarthak-gupta.webp"
      },
      {
        "fullName": "Vidit Kothari",
        "position": "Developer Relations Lead",
        "imageUrl": "/board/2024/vidit-kothari.webp"
      },
      {
        "fullName": "Ritaank Gunjesh",
        "position": "Design Lead",
        "imageUrl": "/board/2024/ritaank-gunjesh.webp"
      },
      {
        "fullName": "Ojal Binoj Koshy",
        "position": "Content Lead",
        "imageUrl": "/board/2024/ojal-binoj-koshy.webp"
      },
      {
        "fullName": "Hari R. Kartha",
        "position": "Internal Lead",
        "imageUrl": "/board/2024/hari-r-kartha.webp"
      },
      {
        "fullName": "Anshuman Gupta",
        "position": "ACM-W Chairperson",
        "imageUrl": "/board/2024/anshuman-gupta.webp",
        "isW": true
      },
      {
        "fullName": "Devanshi Tripathi",
        "position": "ACM-W Vice Chairperson",
        "imageUrl": "/board/2024/devanshi-tripathi.webp",
        "isW": true
      },
      {
        "fullName": "Aryan Chaudhary",
        "position": "ACM-W Secretary",
        "imageUrl": "/board/2024/aryan-chaudhary.webp",
        "isW": true
      }
    ]
  },
  {
    "year": 2023,
    "members": [
      {
        "fullName": "Harsh Avinash",
        "position": "Chairperson",
        "imageUrl": "/board/2023/harsh-avinash.webp"
      },
      {
        "fullName": "Aryan Khubchandani",
        "position": "Vice Chairperson",
        "imageUrl": "/board/2023/aryan-khubchandani.webp"
      },
      {
        "fullName": "Sumona Sud",
        "position": "Secretary",
        "imageUrl": "/board/2023/sumona-sud.webp"
      },
      {
        "fullName": "Chirayu Sharma",
        "position": "Co-Secretary",
        "imageUrl": "/board/2023/chirayu-sharma.webp"
      },
      {
        "fullName": "Aryaman Kolhe",
        "position": "Research & Competitive Head",
        "imageUrl": "/board/2023/aryaman-kolhe.webp"
      },
      {
        "fullName": "Gagan Malvi",
        "position": "Technical Head",
        "imageUrl": "/board/2023/gagan-malvi.webp"
      },
      {
        "fullName": "Swarup Kharul",
        "position": "Projects Head",
        "imageUrl": "/board/2023/swarup-kharul.webp"
      },
      {
        "fullName": "Jeet Kaushik",
        "position": "Design Head",
        "imageUrl": "/board/2023/jeet-kaushik.webp"
      },
      {
        "fullName": "Dhriti Kharangra",
        "position": "Creative Head",
        "imageUrl": "/board/2023/dhriti-khangrara.webp"
      },
      {
        "fullName": "Pramika Garg",
        "position": "Finance Head",
        "imageUrl": "/board/2023/pramika-garg.webp"
      },
      {
        "fullName": "Ananya Grover",
        "position": "Chairperson (ACM-W)",
        "imageUrl": "/board/2023/ananya-grover.webp",
        "isW": true
      },
      {
        "fullName": "Aishwarya Manjunath",
        "position": "Vice Chairperson (ACM-W)",
        "imageUrl": "/board/2023/aishwarya-manjunath.webp",
        "isW": true
      },
      {
        "fullName": "Vaishnavi Mangnale",
        "position": "Secretary (ACM-W)",
        "imageUrl": "/board/2023/vaishnavi-mangnale.webp",
        "isW": true
      }
    ]
  },
  {
    "year": 2022,
    "members": [
      {
        "fullName": "Rishabh Keshan",
        "position": "Chairperson",
        "imageUrl": "/board/2022/rishabh-keshan.webp"
      },
      {
        "fullName": "Ishi Yadav",
        "position": "General Secretary",
        "imageUrl": "/board/2022/ishi-yadav.webp"
      },
      {
        "fullName": "Vinamra Khoria",
        "position": "Research Lead",
        "imageUrl": "/board/2022/vinamra-khoria.webp"
      },
      {
        "fullName": "Yash Kumar Verma",
        "position": "Technical Director",
        "imageUrl": "/board/2022/yash-kumar-verma.webp"
      },
      {
        "fullName": "Rohan Arora",
        "position": "Design Lead",
        "imageUrl": "/board/2022/rohan-arora.webp"
      },
      {
        "fullName": "Diya Pal",
        "position": "Managing Director",
        "imageUrl": "/board/2022/diya-pal.webp"
      },
      {
        "fullName": "Shreyas Khan",
        "position": "Webmaster",
        "imageUrl": "/board/2022/shreyas-khan.webp"
      },
      {
        "fullName": "Hemanth Krishna",
        "position": "App Lead",
        "imageUrl": "/board/2022/hemanth-krishna.webp"
      },
      {
        "fullName": "Ansh Sharma",
        "position": "Competitive Lead",
        "imageUrl": "/board/2022/ansh-sharma.webp"
      },
      {
        "fullName": "Deepankar Jain",
        "position": "Treasurer",
        "imageUrl": "/board/2022/deepankar-jain.webp"
      },
      {
        "fullName": "Amit Krishna A",
        "position": "App Projects Guide",
        "imageUrl": "/board/2022/amit-krishna-a.webp"
      },
      {
        "fullName": "Anmol Bhardwaj",
        "position": "Design Projects Guide",
        "imageUrl": "/board/2022/anmol-bhardwaj.webp"
      },
      {
        "fullName": "Aryan Vats",
        "position": "Research Projects Guide",
        "imageUrl": "/board/2022/aryan-vats.webp"
      },
      {
        "fullName": "Sarthak Bhardwaj",
        "position": "Competitive Guide",
        "imageUrl": "/board/2022/sarthak-bhardwaj.webp"
      },
      {
        "fullName": "Rishav Jain",
        "position": "Operations Head",
        "imageUrl": "/board/2022/rishav-jain.webp"
      },
      {
        "fullName": "Anusha Verma Chandraju",
        "position": "Chairperson (ACM-W)",
        "imageUrl": "/board/2022/anusha-verma-chandraju.webp",
        "isW": true
      },
      {
        "fullName": "Aritri Basu",
        "position": "General Secretary (ACM-W)",
        "imageUrl": "/board/2022/aritri-basu.webp",
        "isW": true
      }
    ]
  },
  {
    "year": 2021,
    "members": [
      {
        "fullName": "Sarthak Gupta",
        "position": "President",
        "imageUrl": "/board/2021/sarthak-gupta.webp"
      },
      {
        "fullName": "Hrishita Chakrabarti",
        "position": "Managing Director",
        "imageUrl": "/board/2021/hrishita-chakrabarti.webp"
      },
      {
        "fullName": "Eesha Shetty",
        "position": "Technical Director",
        "imageUrl": "/board/2021/eesha-shetty.webp"
      },
      {
        "fullName": "Anjali Roy",
        "position": "General Secretary",
        "imageUrl": "/board/2021/anjali-roy.webp"
      },
      {
        "fullName": "Dhruv Roy",
        "position": "Treasurer",
        "imageUrl": "/board/2021/dhruv-roy.webp"
      },
      {
        "fullName": "Kashish Mittal",
        "position": "Web-Master",
        "imageUrl": "/board/2021/kashish-mittal.webp"
      },
      {
        "fullName": "Devansh Mehta",
        "position": "App Lead",
        "imageUrl": "/board/2021/devansh-mehta.webp"
      },
      {
        "fullName": "Shovin Kakaraddi",
        "position": "UI/UX Lead",
        "imageUrl": "/board/2021/shovin-kakaraddi.webp"
      },
      {
        "fullName": "Iishi Patel",
        "position": "Research Lead",
        "imageUrl": "/board/2021/iishi-patel.webp"
      },
      {
        "fullName": "Nimit Jain",
        "position": "Competitive Lead",
        "imageUrl": "/board/2021/nimit-jain.webp"
      },
      {
        "fullName": "Garima Bothra",
        "position": "App Projects Guide",
        "imageUrl": "/board/2021/garima-bothra.webp"
      },
      {
        "fullName": "Elio Jordan Lopes",
        "position": "Web Projects Guide",
        "imageUrl": "/board/2021/elio-jordan-lopes.webp"
      },
      {
        "fullName": "Siddharth Nahar",
        "position": "Competitive Guide",
        "imageUrl": "/board/2021/siddharth-nahar.webp"
      },
      {
        "fullName": "Sriya Reddi",
        "position": "Operations Head",
        "imageUrl": "/board/2021/sriya-reddi.webp"
      },
      {
        "fullName": "Jerelyn Preeja",
        "position": "ACM-W Lead",
        "imageUrl": "/board/2021/jerelyn-preeja.webp",
        "isW": true
      }
    ]
  },
  {
    "year": 2020,
    "label": "2019-2020",
    "members": [
      {
        "fullName": "Kartik Soni",
        "position": "Chair",
        "imageUrl": "/board/2020/kartik-soni.webp"
      },
      {
        "fullName": "Nimisha Bhatia",
        "position": "Managing Director",
        "imageUrl": "/board/2020/nimisha-bhatia.webp"
      },
      {
        "fullName": "Shubham Awasthi",
        "position": "Technical Director",
        "imageUrl": "/board/2020/shubham-awasthi.webp"
      },
      {
        "fullName": "Fiza Rasool",
        "position": "General Secretary",
        "imageUrl": "/board/2020/fiza-rasool.webp"
      },
      {
        "fullName": "Aditya Srivastava",
        "position": "Web-Master",
        "imageUrl": "/board/2020/aditya-srivastava.webp"
      },
      {
        "fullName": "Sarthak Dandotiya",
        "position": "UI/UX Lead",
        "imageUrl": "/board/2020/sarthak-dandotiya.webp"
      },
      {
        "fullName": "Svetansu Singh",
        "position": "Treasurer",
        "imageUrl": "/board/2020/svetansu-singh.webp"
      },
      {
        "fullName": "Sparsh Srivastava",
        "position": "App Lead",
        "imageUrl": "/board/2020/sparsh-srivastava.webp"
      },
      {
        "fullName": "Subhaditya Mukherjee",
        "position": "Research Lead",
        "imageUrl": "/board/2020/subhaditya-mukherjee.webp"
      },
      {
        "fullName": "Rajat Gupta",
        "position": "Competitive Lead",
        "imageUrl": "/board/2020/rajat-gupta.webp"
      },
      {
        "fullName": "Madhur Dixit",
        "position": "Research Projects Guide",
        "imageUrl": "/board/2020/madhur-dixit.webp"
      },
      {
        "fullName": "Shrey Sindher",
        "position": "App Projects Guide",
        "imageUrl": "/board/2020/shrey-sindher.webp"
      },
      {
        "fullName": "Shivank Sahai",
        "position": "Web Projects Guide",
        "imageUrl": "/board/2020/shivank-sahai.webp"
      },
      {
        "fullName": "Bhumij Gupta",
        "position": "Creative Head",
        "imageUrl": "/board/2020/bhumij-gupta.webp"
      }
    ]
  },
  {
    "year": 2019,
    "label": "2018-2019",
    "members": [
      {
        "fullName": "Suchita Mehta",
        "position": "Chair",
        "imageUrl": "/board/2019/suchita-mehta.webp"
      },
      {
        "fullName": "Navin Agarwalla",
        "position": "Co-Vice Chair (Management)",
        "imageUrl": "/board/2019/navin-agarwalla.webp"
      },
      {
        "fullName": "Akshit Grover",
        "position": "Co-Vice Chair (Technical)",
        "imageUrl": "/board/2019/akshit-grover.webp"
      },
      {
        "fullName": "Ankit Prasad",
        "position": "Secretary (Internal Affairs)",
        "imageUrl": "/board/2019/ankit-prasad.webp"
      },
      {
        "fullName": "Akash Tushar",
        "position": "Secretary (External Affairs)",
        "imageUrl": "/board/2019/akash-tushar.webp"
      },
      {
        "fullName": "Deep Baldha",
        "position": "Competitive Programming Lead",
        "imageUrl": "/board/2019/deep-baldha.webp"
      },
      {
        "fullName": "Prateek Singh",
        "position": "Web Master",
        "imageUrl": "/board/2019/prateek-singh.webp"
      },
      {
        "fullName": "Pravigya Pariyar",
        "position": "R&D Lead",
        "imageUrl": "/board/2019/pravigya-pariyar.webp"
      },
      {
        "fullName": "Anant Mishra",
        "position": "DevOps Lead",
        "imageUrl": "/board/2019/anant-mishra.webp"
      },
      {
        "fullName": "Mufaddal Ibrahimjee",
        "position": "App Dev Lead",
        "imageUrl": "/board/2019/mufaddal-ibrahimjee.webp"
      },
      {
        "fullName": "Sanya Taneja",
        "position": "Outreach Head",
        "imageUrl": "/board/2019/sanya-taneja.webp"
      },
      {
        "fullName": "Tanmay Jain",
        "position": "UI/UX Lead",
        "imageUrl": "/board/2019/tanmay-jain.webp"
      },
      {
        "fullName": "Shyamli Singh",
        "position": "Program Lead",
        "imageUrl": "/board/2019/shyamli-singh.webp"
      },
      {
        "fullName": "Mudit Agarwal",
        "position": "Treasurer",
        "imageUrl": "/board/2019/mudit-agarwal.webp"
      },
      {
        "fullName": "Arnav Saxena",
        "position": "Operations Head (ACM)",
        "imageUrl": "/board/2019/arnav-saxena.webp"
      },
      {
        "fullName": "Kumar Shaswat",
        "position": "Creative Head",
        "imageUrl": "/board/2019/kumar-shaswat.webp"
      },
      {
        "fullName": "Sasya Reddi",
        "position": "ACM-W Lead",
        "imageUrl": "/board/2019/sasya-reddi.webp",
        "isW": true
      },
      {
        "fullName": "Ankita Ghosh",
        "position": "Operations Head (ACM-W)",
        "imageUrl": "/board/2019/ankita-ghosh.webp",
        "isW": true
      }
    ]
  },
  {
    "year": 2018,
    "label": "2017-2018",
    "members": [
      {
        "fullName": "Abhitej Singh",
        "position": "President",
        "imageUrl": "/board/2018/abhitej-singh.webp"
      },
      {
        "fullName": "Hardika Goyal",
        "position": "Managing Director",
        "imageUrl": "/board/2018/hardika-goyal.webp"
      },
      {
        "fullName": "Sourish Banerjee",
        "position": "Technical Director",
        "imageUrl": "/board/2018/sourish-banerjee.webp"
      },
      {
        "fullName": "Harshit Kedia",
        "position": "Associate Technical Head",
        "imageUrl": "/board/2018/harshit-kedia.webp"
      },
      {
        "fullName": "Shivam",
        "position": "Public Relations",
        "imageUrl": "/board/2018/shivam.webp"
      },
      {
        "fullName": "Anmol",
        "position": "Marketing Head",
        "imageUrl": "/board/2018/anmol.webp"
      },
      {
        "fullName": "Rishabh",
        "position": "Operations Head",
        "imageUrl": "/board/2018/rishabh.webp"
      },
      {
        "fullName": "Yash Shah",
        "position": "Research and ICPC Head",
        "imageUrl": "/board/2018/yash-shah.webp"
      },
      {
        "fullName": "Vinit Bodhwani",
        "position": "Associate Research Lead",
        "imageUrl": "/board/2018/vinit-bodhwani.webp"
      },
      {
        "fullName": "Vibhore Gupta",
        "position": "Finance Head",
        "imageUrl": "/board/2018/vibhore-gupta.webp"
      }
    ]
  },
  {
    "year": 2017,
    "label": "2016-2017",
    "members": [
      {
        "fullName": "Abhinav Das",
        "position": "President"
      },
      {
        "fullName": "Pranay Gupta",
        "position": "Vice President"
      },
      {
        "fullName": "Mugdha Pandya",
        "position": "General Secretary"
      },
      {
        "fullName": "Ashwini Purohit",
        "position": "Technical Head"
      },
      {
        "fullName": "Rishi Raj",
        "position": "Deputy Technical Head"
      },
      {
        "fullName": "Tanish Noah",
        "position": "Treasurer"
      },
      {
        "fullName": "Aarti Susan Kuruvilla",
        "position": "Communication Head"
      },
      {
        "fullName": "Rahul Nigam",
        "position": "Marketing & Design Head"
      },
      {
        "fullName": "Mallika Rai",
        "position": "University Relations"
      },
      {
        "fullName": "Lekhani Ray",
        "position": "Membership Coordinator"
      }
    ]
  }
];

export const teamYears: number[] = [
  CURRENT_BOARD_YEAR,
  ...pastBoards.map((board) => board.year),
];

export const historicalBoards: Record<number, TeamMember[]> = Object.fromEntries(
  pastBoards.map((board) => [board.year, board.members])
);

const yearLabels: Record<number, string> = Object.fromEntries(
  pastBoards
    .filter((board) => board.label)
    .map((board) => [board.year, board.label as string])
);

export const yearLabel = (year: number): string =>
  yearLabels[year] ?? String(year);
