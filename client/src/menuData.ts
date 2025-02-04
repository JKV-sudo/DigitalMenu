export interface SubMenuItem {
  label: string;
  value: string;
  img: string;
  price: number; // Preis in Euro
}



export const grillOptions = [
    { label: "Adanakebab 8,90€", value: "adanakebab", img: "/assets/adanakebab.webp", },
    { label: "Adanakebab 8,90€", value: "adanakebab", img: "/assets/adanakebab.webp", },
    { label: "Adanakebab 8,90€", value: "adanakebab", img: "/assets/adanakebab.webp", },

    { label: "Adanateller 11,90€", value: "adanateller", img: "/assets/adanateller.webp" },
    { label: "Gemischte Platte 24,90€", value: "gemischtePlatte", img: "/assets/adanakebab.webp", },
    { label: "Master Lamm-Spieß 12,90€", value: "koeftespies", img: "/assets/koeftespieß.webp" },
    { label: "Master Königsplatte 39,90€", value: "masterKönig", img: "/assets/adanakebab.webp", },

  ];
  
  export const burgerOptions = [
    { label: "Smashburger O.G. 7,90€", value: "smashburger", img: "/assets/smashburger.webp" },
    { label: "smashburger O.G. Menü 15,00€", value: "smashburger_menu", img: "/assets/smashburger.webp" },
    { label: "Double Smash 10,50€", value: "doubleSmash", img: "/assets/smashburger.webp" },
    { label: "Double smash Menü 15,00€", value: "doubleSmashMenu", img: "/assets/smashburger.webp" },
  ];
  
  export const kebabOptions = [
    
    { label: "Döner 6,50€", value: "doener", img: "/assets/kebab.webp" },
    { label: "Chicken Bowl 10,50€ ", value: "doener-teller", img: "/assets/kebab.webp" },
    { label: "Chicken Dürüm 7,50€", value: "duerum", img: "/assets/kebab.webp" },
    { label: "Masterdöner 8,90€", value:"masterDoener", img:"/assets/kebab.webp"},
    { label: "Masterdürüm 9,90€", value:"masterDuerum", img:"/assets/kebab.webp"},
    { label: "Master Bowl 15,00€", value:"masterBowl", img:"/assets/kebab.webp"},

  ];
  export const beilagenOptions = [
    { label: "Pommes Klein 3,50€", value: "pommesK", img: "/assets/adanakebab.webp", },
    { label: "Pommes Groß 6,50€", value: "pommesG", img: "/assets/koeftespieß.webp" },
    { label: "2x Baklava 3,00€", value: "adanateller", img: "/assets/adanateller.webp" },
  ];
  export interface MainMenuOption {
    label: string;
    value: string;
    css: string;
    img: string;
  }
  
  // Interface für Untermenü-Optionen mit Preis
  export interface SubMenuItem {
    label: string;
    value: string;
    img: string;
    price: number;
  }

  export interface animatedMenu{
    label: string;
    value: string;
    img: string;
    price: number;
  }
  