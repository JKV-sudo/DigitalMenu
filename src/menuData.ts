export interface SubMenuItem {
  label: string;
  value: string;
  img: string;
  price: number;
  ingredients?: string[]; // Optional ingredients array
  versions?: SubMenuItem[]; // Optional versions array
}

export const grillOptions: SubMenuItem[] = [
  {
    label: "Adanakebab",
    value: "adanakebab",
    img: "/assets/adanakebab.webp",
    price: 8.9,
    ingredients: ["Salad", "Tomatoes", "Onions", "Sauce"]
  },
  {
    label: "Adanateller",
    value: "adanateller",
    img: "/assets/adanateller.webp",
    price: 11.9,
    ingredients: ["Rice", "Grilled Vegetables", "Yogurt"]
  },
  {
    label: "Gemischte Platte",
    value: "gemischtePlatte",
    img: "/assets/adanakebab.webp",
    price: 24.9,
    ingredients: ["Chicken", "Beef", "Lamb", "Salad"]
  },
  {
    label: "Master Lamm-Spieß",
    value: "koeftespies",
    img: "/assets/koeftespieß.webp",
    price: 12.9,
    ingredients: ["Lamb", "Peppers", "Onions", "Garlic Sauce"]
  },
  {
    label: "Master Königsplatte",
    value: "masterKönig",
    img: "/assets/adanakebab.webp",
    price: 39.9,
    ingredients: ["Chicken", "Beef", "Lamb", "Rice", "Salad"]
  },
  {
    value: "grillItem2",
    label: "Grill Item 2",
    img: "/assets/grill-item-2.jpg",
    price: 6.99,
    ingredients: ["Lettuce", "Cheese", "Pickles", "Ketchup"]
  },
];

export const burgerOptions: SubMenuItem[] = [
  {
    label: "Classic",
    value: "smashburger",
    img: "/assets/smashburger.webp",
    price: 7.9,
    ingredients: []
  },
  {
    label: "Double",
    value: "doubleSmash",
    img: "/assets/smashburger.webp",
    price: 11.50,
    ingredients: []
  },
  {
    label: "Spicy",
    value: "spicySmash",
    img: "/assets/smashburger.webp",
    price: 10.5,
    ingredients: []
  },
  {
    label: "Juicy",
    value: "jucySmash",
    img: "/assets/smashburger.webp",
    price: 7.90,
    ingredients: []
  },
];

export const kebabOptions: SubMenuItem[] = [
  {
    label: "Döner",
    value: "doener",
    img: "/assets/kebab1.jpg",
    price: 6.5,
    ingredients: ["Lamb", "Tomatoes", "Onions", "Lettuce", "Yogurt Sauce"]
  },
  {
    label: "Bowl",
    value: "doener-teller",
    img: "/assets/bowl.png",
    price: 10.5,
    ingredients: ["Chicken", "Rice", "Grilled Vegetables", "Yogurt Sauce"]
  },
  {
    label: "Dürüm",
    value: "duerum",
    img: "/assets/durum.jpeg",
    price: 7.5,
    ingredients: ["Chicken", "Tomatoes", "Onions", "Lettuce", "Garlic Sauce"]
  },
];

export const sauceOptions: SubMenuItem[] = [
  {
    label: "Knoblauchsauce",
    value: "knoblauchsauce",
    img: "/assets/knoblauchsauce.jpg",
    price: 0.5,
  },
  {
    label: "Scharfe Sauce",
    value: "scharfesauce",
    img: "/assets/scharfesauce.jpg",
    price: 0.5,
  },
  {
    label: "Kräutersauce",
    value: "kraeutersauce",
    img: "/assets/kraeutersauce.jpg",
    price: 0.5,
  },
];

export const beilagenOptions: SubMenuItem[] = [
  {
    label: "Pommes Klein",
    value: "pommesK",
    img: "/assets/pommes_klein.webp",
    price: 3.5,
    ingredients: ["Mayo", "Ketchup"]
  },
  {
    label: "Pommes Groß",
    value: "pommesG",
    img: "/assets/pommes_groß.webp",
    price: 6.5,
    ingredients: ["Mayo", "Ketchup"]
  },
  {
    label: "Baklava",
    value: "Baklava",
    img: "/assets/baklava.webp",
    price: 3,
    versions: [
      {
        label: "5x Baklava",
        value: "baklava2",
        img: "/assets/baklava2.webp",
        price: 3,
      },
      {
        label: "1x Baklava Havuc",
        value: "baklava4",
        img: "/assets/baklava2.webp",
        price: 5,
      },
      {
        label: "1x Havuc mit Eis",
        value: "baklava5",
        img: "/assets/baklava2.webp",
        price: 8.50,
      },
    ]
  },
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
