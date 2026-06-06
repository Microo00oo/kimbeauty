export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialization: string[];
  image: string;
  portfolio: {
    id: string;
    image: string;
    caption: string;
  }[];
}

export const STYLISTS: Stylist[] = [
  {
    id: "kim",
    name: "Kim",
    role: "Founder & Master Stylist",
    bio: "With over 15 years of industry experience, Kim is a visionary stylist who believes that hair is your ultimate accessory. She specializes in advanced cutting techniques, high-end bridal updos, and custom transformation styling.",
    specialization: ["Precision Cuts", "Bridal & Event Updos", "Hair Transformations"],
    image: "/images/stylist_kim.png",
    portfolio: [
      { id: "p1", image: "/images/portfolio_cut.png", caption: "Sleek Asymmetrical Bob Cut" },
      { id: "p2", image: "/images/portfolio_styling.png", caption: "Elegant Braided Bridal Updo" }
    ]
  },
  {
    id: "chloe",
    name: "Chloe",
    role: "Senior Color Specialist",
    bio: "Chloe is our resident color architect. She lives for beautiful color melts, hand-painted balayages, and fixing challenging color issues. Chloe stays up-to-date with the latest European color trends to bring you the best.",
    specialization: ["Balayage & Ombre", "Highlights & Babylights", "Color Correction"],
    image: "/images/stylist_chloe.png",
    portfolio: [
      { id: "p3", image: "/images/portfolio_balayage.png", caption: "Honey Blonde & Rose Gold Balayage" }
    ]
  },
  {
    id: "marcus",
    name: "Marcus",
    role: "Hair Health & Extensions Expert",
    bio: "Marcus treats hair like a science. He is certified in various high-end keratin and Botox treatments, as well as multiple hair extension installation methods. His goal is always to deliver maximum volume while maintaining your natural hair's health.",
    specialization: ["Keratin Treatments", "Hair Botox & Hydration", "Premium Hair Extensions"],
    image: "/images/stylist_marcus.png",
    portfolio: [
      { id: "p4", image: "/images/portfolio_extension.png", caption: "Voluminous Tape-in Extensions" }
    ]
  }
];
