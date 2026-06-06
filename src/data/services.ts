export interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
}

export interface ServiceCategory {
  category: string;
  services: Service[];
}

export const SERVICES: ServiceCategory[] = [
  {
    category: "Cuts & Styling",
    services: [
      {
        id: "sig_cut",
        name: "Signature Cut & Blowout",
        price: "$85",
        duration: "60 min",
        description: "A tailored haircut designed to flatter your features, completed with a professional shampoo, head massage, and blowout."
      },
      {
        id: "men_cut",
        name: "Men's Precision Cut",
        price: "$50",
        duration: "45 min",
        description: "Clean, precise clipper or scissor cut, detailing, hot towel clean, and styling."
      },
      {
        id: "blowout",
        name: "Luxury Blowout",
        price: "$55",
        duration: "45 min",
        description: "Shampoo, conditioning treatment, and a voluminous round-brush blowout styling."
      },
      {
        id: "updo",
        name: "Bridal & Event Updo",
        price: "$120",
        duration: "75 min",
        description: "An elegant style, braid, or classic updo for your special occasion. Hair wash is not included."
      }
    ]
  },
  {
    category: "Color Services",
    services: [
      {
        id: "balayage",
        name: "Custom Balayage & Ombre",
        price: "$220+",
        duration: "180 min",
        description: "Custom hand-painted, natural-looking highlights blended seamlessly into your hair for a sun-kissed grow-out."
      },
      {
        id: "highlights",
        name: "Full Dimensional Highlights",
        price: "$180+",
        duration: "150 min",
        description: "Full head foil highlighting to create multi-dimensional blonde, caramel, or copper tones."
      },
      {
        id: "root_touchup",
        name: "Root Touch-up",
        price: "$80",
        duration: "90 min",
        description: "Single-process color application on the roots (up to 1.5 inches of regrowth) to cover grays or match existing color."
      },
      {
        id: "allover_color",
        name: "All-Over Gloss & Color",
        price: "$125+",
        duration: "120 min",
        description: "Single-process color applied from roots to ends to deposit rich, vibrant tones and add maximum shine."
      }
    ]
  },
  {
    category: "Hair Treatments & Extensions",
    services: [
      {
        id: "keratin",
        name: "Brazilian Keratin Treatment",
        price: "$250+",
        duration: "150 min",
        description: "A revolutionary smoothing treatment that eliminates frizz, blocks humidity, and cuts styling time in half for up to 4 months."
      },
      {
        id: "botox",
        name: "Lifting Hair Botox",
        price: "$150",
        duration: "90 min",
        description: "Deep conditioning treatment that reconstructs damaged fibers, rehydrates, and adds stunning glossy shine."
      },
      {
        id: "extensions",
        name: "Premium Extensions Installation",
        price: "Consultation Required",
        duration: "120+ min",
        description: "Professional installation of premium tape-in or micro-link real human hair extensions. Cost of hair is separate."
      }
    ]
  }
];
