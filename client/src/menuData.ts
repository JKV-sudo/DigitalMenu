export interface SubMenuItem {
  label: string;
  value: string;
  img: string;
  price: number; 
}

export const grillOptions = [
  { label: "Adanakebab ", value: "adanakebab", img: "/assets/adanakebab.webp", price: 8.9 },
  { label: "Adanateller ", value: "adanateller", img: "/assets/adanateller.webp", price: 11.9 },
  { label: "Gemischte Platte ", value: "gemischtePlatte", img: "/assets/adanakebab.webp", price: 24.9 },
  { label: "Master Lamm-Spieß ", value: "koeftespies", img: "/assets/koeftespieß.webp", price: 12.9 },
  { label: "Master Königsplatte ", value: "masterKönig", img: "/assets/adanakebab.webp", price: 39.9 },
];

export const burgerOptions = [
  { label: "Smashburger O.G. ", value: "smashburger", img: "/assets/smashburger.webp", price: 7.9 },
  { label: "smashburger O.G. Menü ", value: "smashburger_menu", img: "/assets/smashburger.webp", price: 15 },
  { label: "Double Smash ", value: "doubleSmash", img: "/assets/smashburger.webp", price: 10.5 },
  { label: "Double smash Menü ", value: "doubleSmashMenu", img: "/assets/smashburger.webp", price: 15 },
];

export const kebabOptions = [
  { label: "Döner ", value: "doener", img: "/assets/kebab.webp", price: 6.5 },
  { label: "Chicken Bowl  ", value: "doener-teller", img: "/assets/kebab.webp", price: 10.5 },
  { label: "Chicken Dürüm ", value: "duerum", img: "/assets/kebab.webp", price: 7.5 },
  { label: "Masterdöner ", value:"masterDoener", img:"/assets/kebab.webp", price: 8.9},
  { label: "Masterdürüm ", value:"masterDuerum", img:"/assets/kebab.webp", price: 9.9},
  { label: "Master Bowl ", value:"masterBowl", img:"/assets/kebab.webp", price: 15},
];

export const beilagenOptions = [
  { label: "Pommes Klein ", value: "pommesK", img: "/assets/adanakebab.webp", price: 3.5 },
  { label: "Pommes Groß ", value: "pommesG", img: "/assets/koeftespieß.webp", price: 6.5 },
  { label: "2x Baklava ", value: "adanateller", img: "/assets/adanateller.webp", price: 3 },
];

export interface MainMenuOption {
  label: string;
  value: string;
  css: string;
  img: string;
  price: number;
}

export interface animatedMenu {
  label: string;
  value: string;
  img: string;
  price: number;
}
