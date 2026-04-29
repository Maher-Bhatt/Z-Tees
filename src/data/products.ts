import imgShinchan from '@/assets/shinchan-vibes.jpeg';
import imgPeaceOut from '@/assets/peace-out.jpeg';
import imgStranger from '@/assets/gang-walk.jpeg';
import imgKingNorth from '@/assets/king-north.jpeg';
import imgWowCats from '@/assets/wow-cats.jpeg';
import imgGotham from '@/assets/gotham-nights.jpeg';
import imgKnowPain from '@/assets/pain-tee.jpeg';
import imgGojo from '@/assets/gojo-tee.jpeg';
import imgPoMark from '@/assets/po-mark.jpeg';
import imgBoxHead from '@/assets/box-head.jpeg';
import imgSpiderman from '@/assets/spiderman-tee.jpeg';
import imgHoodedHero from '@/assets/hooded-hero.png';
import imgEnjoyMadness from '@/assets/enjoy-the-madness.jpeg';
import imgEnjoyMadnessV2 from '@/assets/enjoy-the-madness-v2.jpeg';
import imgBlankTee from '@/assets/blank-tee.jpeg';
import imgMclarenRacing from '@/assets/mclaren-racing-tee.jpeg';
import imgPorsche911 from '@/assets/porsche-911-rs-tee.jpeg';
import imgIronMan from '@/assets/iron-man-tee.jpeg';
import imgBehindBlades from '@/assets/behind-blades-tee.jpeg';
import imgMoonRonin from '@/assets/moon-ronin-tee.jpeg';
import imgParshuramWarrior from '@/assets/parshuram-warrior-tee.jpeg';
import imgSpiderFour from '@/assets/spider-four-tee.jpeg';
import imgWebWisdom from '@/assets/web-wisdom-tee.jpeg';
import imgRealityApe from '@/assets/reality-ape-tee.jpeg';

export const ALL_SIZES = ['S', 'M', 'L', 'XL'] as const;
export type Size = (typeof ALL_SIZES)[number];
export type Category = 'Graphic';

export type SizeAvailability = Record<Size, boolean>;

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  category: Category;
  color: string;
  sizes: SizeAvailability;
  images: string[];
  tag: string;
  stockNote: string;
  description: string;
  fabric: string;
  fit: string;
}

export const INR_SYMBOL = '\u20B9';
export const WA_NUMBER = '917990407096';
export const IG_URL = 'https://instagram.com/z_tees.in';
export const IG_HANDLE = 'z_tees.in';

const ALL_AVAILABLE: SizeAvailability = { S: true, M: true, L: true, XL: true };

const SIZES: Record<string, SizeAvailability> = {
  'Shinchan Vibes': { S: false, M: true, L: true, XL: false },
  'Peace Out': { S: true, M: true, L: true, XL: false },
  'Enjoy the Madness': { S: true, M: true, L: true, XL: true },
  'Gojo Satoru': { S: false, M: true, L: true, XL: false },
  'Know Pain': { S: true, M: false, L: false, XL: false },
  'Stranger Things': { S: true, M: false, L: false, XL: false },
  'King in the North': { S: true, M: true, L: true, XL: false },
  'Gotham Nights': { S: true, M: true, L: false, XL: false },
  PoMark: { S: true, M: true, L: true, XL: true },
  'Box Head': { S: true, M: true, L: true, XL: true },
  'Spider-Man': { S: true, M: false, L: false, XL: false },
  'Hooded Hero': { S: true, M: true, L: true, XL: true },
  'Wow Cats': { S: false, M: true, L: false, XL: true },
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod_mclaren_racing',
    name: 'McLaren Racing MC F1 Tee',
    slug: 'mclaren-racing-mc-f1-tee',
    price: 529,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Cream',
    sizes: ALL_AVAILABLE,
    images: [imgMclarenRacing],
    tag: 'Premium Motorsport',
    stockNote: 'New Launch',
    description:
      'Premium cream streetwear tee with a minimal Racing chest hit and a bold back graphic inspired by the McLaren F1 era, finished with orange supercar artwork and vintage racing typography.',
    fabric: '100% Premium Cotton',
    fit: 'Oversized Fit',
  },
  {
    id: 'prod_porsche_911_rs',
    name: 'Porsche 911 RS Rave Tee',
    slug: 'porsche-911-rs-rave-tee',
    price: 529,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: ALL_AVAILABLE,
    images: [imgPorsche911],
    tag: 'Premium Motorsport',
    stockNote: 'New Launch',
    description:
      'Premium black 911-inspired graphic tee with a clean front number mark and a high-energy green race car back print, built around drifting club typography and night-vision details.',
    fabric: '100% Premium Cotton',
    fit: 'Oversized Fit',
  },
  {
    id: 'prod_iron_man',
    name: 'Iron Man Arc Reactor Tee',
    slug: 'iron-man-arc-reactor-tee',
    price: 419,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Charcoal Grey',
    sizes: ALL_AVAILABLE,
    images: [imgIronMan],
    tag: 'Hero Graphic',
    stockNote: 'New Launch',
    description:
      'Charcoal grey tee featuring an Iron Man collage print with glowing armor detail, cinematic panel fragments, and a crisp front placement for a sharp comic-tech look.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_8',
    name: 'Gotham Nights',
    slug: 'gotham-nights',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: SIZES['Gotham Nights'],
    images: [imgGotham],
    tag: 'Limited Edition',
    stockNote: 'Only Few Left',
    description:
      "The iconic bat symbol with Gotham's city skyline etched inside. A clean, refined graphic. Limited edition - will not be restocked once sold out.",
    fabric: '100% Premium Cotton',
    fit: 'Oversized Fit',
  },
  {
    id: 'prod_11',
    name: 'Spider-Man',
    slug: 'spider-man',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: SIZES['Spider-Man'],
    images: [imgSpiderman],
    tag: 'New Drop',
    stockNote: 'Only Size S Available',
    description:
      'Black graphic tee featuring a bold Spider-Man inspired spider emblem in white and red for a sharp comic-book finish.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_behind_blades',
    name: 'Behind Blades Tee',
    slug: 'behind-blades-tee',
    price: 519,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Red',
    sizes: ALL_AVAILABLE,
    images: [imgBehindBlades],
    tag: 'Premium Anime',
    stockNote: 'New Launch',
    description:
      'Premium red statement tee with a small Behind chest print and a dramatic back graphic showing a swordsman holding chained blades, framed by oversized varsity-style lettering.',
    fabric: '100% Premium Cotton',
    fit: 'Oversized Fit',
  },
  {
    id: 'prod_moon_ronin',
    name: 'Moon Ronin Tee',
    slug: 'moon-ronin-tee',
    price: 419,
    originalPrice: 699,
    category: 'Graphic',
    color: 'White',
    sizes: ALL_AVAILABLE,
    images: [imgMoonRonin],
    tag: 'Anime Graphic',
    stockNote: 'New Launch',
    description:
      'White tee with a monochrome warrior silhouette standing before a full moon, surrounded by birds and smoky brush textures for a cinematic dark fantasy finish.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_4',
    name: 'Gojo Satoru',
    slug: 'gojo-satoru',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: SIZES['Gojo Satoru'],
    images: [imgGojo],
    tag: 'Anime Collection',
    stockNote: '',
    description:
      'A bold back-print graphic of Gojo Satoru from Jujutsu Kaisen, featuring red slash accents and Reverse Curse Technique typography in kanji.',
    fabric: '100% Premium Cotton',
    fit: 'Oversized Fit',
  },
  {
    id: 'prod_5',
    name: 'Know Pain',
    slug: 'know-pain',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'White',
    sizes: SIZES['Know Pain'],
    images: [imgKnowPain],
    tag: 'Anime Collection',
    stockNote: '',
    description:
      'A manga-style graphic panel featuring Japanese kanji and the phrase This World Shall Know Pain. A dramatic print on premium white cotton.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_3',
    name: 'Enjoy the Madness',
    slug: 'enjoy-the-madness',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: SIZES['Enjoy the Madness'],
    images: [imgEnjoyMadness, imgEnjoyMadnessV2, imgBlankTee],
    tag: 'Back Print',
    stockNote: '',
    description:
      'Black graphic tee with a clean front and a bold Enjoy the Madness back print featuring a hooded skater character, glowing eyes, and gritty street-art styling.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_12',
    name: 'Hooded Hero',
    slug: 'hooded-hero',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Cream White',
    sizes: SIZES['Hooded Hero'],
    images: [imgHoodedHero],
    tag: 'New Drop',
    stockNote: '',
    description:
      'Cream-white tee with a striking hooded anime-inspired figure in cool blue tones for a standout modern streetwear feel.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_parshuram_warrior',
    name: 'Parshuram Warrior Tee',
    slug: 'parshuram-warrior-tee',
    price: 419,
    originalPrice: 699,
    category: 'Graphic',
    color: 'White',
    sizes: ALL_AVAILABLE,
    images: [imgParshuramWarrior],
    tag: 'Mythic Graphic',
    stockNote: 'New Launch',
    description:
      'White tee with a bold Parshuram warrior illustration, axe artwork, and vintage poster typography. A clean front keeps the focus on the detailed back design.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_7',
    name: 'King in the North',
    slug: 'king-in-the-north',
    price: 399,
    originalPrice: 649,
    category: 'Graphic',
    color: 'Cream / Off-White',
    sizes: SIZES['King in the North'],
    images: [imgKingNorth],
    tag: 'Fan Favourite',
    stockNote: '',
    description:
      'A detailed front graphic of a warrior holding a sword, paired with bold King in the North typography on cream off-white cotton.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_spider_four',
    name: 'Spider Four Web Tee',
    slug: 'spider-four-web-tee',
    price: 499,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Cream',
    sizes: ALL_AVAILABLE,
    images: [imgSpiderFour],
    tag: 'Premium Graphic',
    stockNote: 'New Launch',
    description:
      'Premium cream tee with a small spider chest mark and an oversized back print featuring a black spider, red web lines, and a bold number 4 for a clean graphic punch.',
    fabric: '100% Premium Cotton',
    fit: 'Oversized Fit',
  },
  {
    id: 'prod_web_wisdom',
    name: 'Web Wisdom Spider Tee',
    slug: 'web-wisdom-spider-tee',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'White',
    sizes: ALL_AVAILABLE,
    images: [imgWebWisdom],
    tag: 'Spider Graphic',
    stockNote: 'New Launch',
    description:
      'White tee with a sharp black spider-web illustration and scattered quote-style text, giving the design an abstract editorial feel with a minimal back.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_9',
    name: 'PoMark',
    slug: 'po-mark',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Cream White',
    sizes: SIZES.PoMark,
    images: [imgPoMark],
    tag: 'New Drop',
    stockNote: '',
    description:
      'A clean cream-white tee with a bold illustrated headphone graphic and handwritten street-art detailing on the front.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_10',
    name: 'Box Head',
    slug: 'box-head',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Off White',
    sizes: SIZES['Box Head'],
    images: [imgBoxHead],
    tag: 'New Drop',
    stockNote: '',
    description:
      'Minimal off-white tee with a box-head character illustration and sketch-style accents for a playful streetwear look.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_reality_ape',
    name: 'Reality Ape Tee',
    slug: 'reality-ape-tee',
    price: 519,
    originalPrice: 699,
    category: 'Graphic',
    color: 'White',
    sizes: ALL_AVAILABLE,
    images: [imgRealityApe],
    tag: 'Premium Art',
    stockNote: 'New Launch',
    description:
      'Premium white art tee with a small Reality chest graphic and a large back illustration blending sculpture texture, bold lettering, and an orange ape mask for a surreal streetwear look.',
    fabric: '100% Premium Cotton',
    fit: 'Oversized Fit',
  },
  {
    id: 'prod_6',
    name: 'Stranger Things',
    slug: 'stranger-things',
    price: 439,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Chocolate Brown',
    sizes: SIZES['Stranger Things'],
    images: [imgStranger],
    tag: 'Fan Favourite',
    stockNote: 'Only Size S Available',
    description:
      'All eight Stranger Things characters illustrated side by side on rich chocolate brown cotton. A minimalist graphic for fans who appreciate subtle references.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_1',
    name: 'Shinchan Vibes',
    slug: 'shinchan-vibes',
    price: 419,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Navy Blue',
    sizes: SIZES['Shinchan Vibes'],
    images: [imgShinchan],
    tag: 'Best Seller',
    stockNote: 'Limited Stock',
    description:
      'A bold Shinchan character print on premium navy blue cotton. Relaxed regular fit with the message Choose Peace, Love Yourself, Be Happy.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_2',
    name: 'Peace Out',
    slug: 'peace-out',
    price: 419,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: SIZES['Peace Out'],
    images: [imgPeaceOut],
    tag: 'Best Seller',
    stockNote: '',
    description:
      'Back-print graphic featuring a white dove, red rose, and bold Peace typography. Clean front, expressive back. Printed on premium black cotton.',
    fabric: '100% Premium Cotton',
    fit: 'Oversized Fit',
  },
  {
    id: 'prod_14',
    name: 'Wow Cats',
    slug: 'wow-cats',
    price: 419,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Dusty Pink',
    sizes: SIZES['Wow Cats'],
    images: [imgWowCats],
    tag: 'Fun Collection',
    stockNote: '',
    description:
      'Three stacked cartoon cats printed on the side of a dusty pink tee, with WOW!! and Hi typography. Soft, breathable premium cotton.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(product => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(product => product.id === id);
}

export function getAvailableSizes(product: Product): Size[] {
  return ALL_SIZES.filter(size => product.sizes[size]);
}

export function isSizeAvailable(product: Product, size: string): size is Size {
  return (ALL_SIZES as readonly string[]).includes(size) && product.sizes[size as Size];
}

export function formatPrice(value: number): string {
  return `${INR_SYMBOL}${value}`;
}

export function getDiscountPercent(product: Product): number {
  return Math.round((1 - product.price / product.originalPrice) * 100);
}

export function getAvailabilityNote(product: Product): string {
  const available = getAvailableSizes(product);
  if (available.length === 0) return 'Out of Stock';
  if (available.length === 1) return `Only Size ${available[0]} Available`;
  return product.stockNote;
}

export interface CartLineItem {
  product: Product;
  size: string;
  qty: number;
}

export function buildWhatsAppURL(cart: CartLineItem[]): string {
  const lines = cart.map(
    (item, i) =>
      `${i + 1}. ${item.product.name} - Size: ${item.size} - ${formatPrice(item.product.price)}${
        item.qty > 1 ? ` x${item.qty}` : ''
      }`,
  );
  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const msg = [
    'Hi, I want to order:',
    '',
    ...lines,
    '',
    `Total: ${formatPrice(total)}`,
    '',
    'Please confirm availability.',
  ].join('\n');

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
