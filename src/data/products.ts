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
import imgParshuram from '@/assets/parshuram-tee.jpeg';
import imgEnjoyTheMadness from '@/assets/enjoy-the-madness.jpeg';
import imgEnjoyTheMadnessV2 from '@/assets/enjoy-the-madness-v2.jpeg';
import imgBlankTee from '@/assets/blank-tee.jpeg';

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  category: 'Graphic' | 'Basic';
  color: string;
  sizes: { S: boolean; M: boolean; L: boolean; XL: boolean };
  images: string[];
  backImage?: string;
  tag: string;
  stockNote: string;
  description: string;
  fabric: string;
  fit: string;
};

export const ALL_SIZES = ['S', 'M', 'L', 'XL'] as const;
export type Size = (typeof ALL_SIZES)[number];
export const INR_SYMBOL = '\u20B9';

export const PRODUCT_SIZE_AVAILABILITY = [
  {
    name: 'Shinchan Vibes',
    sizes: { S: false, M: true, L: true, XL: false },
  },
  {
    name: 'Wow Cats',
    sizes: { S: false, M: true, L: true, XL: false },
  },
  {
    name: 'Stranger Things',
    sizes: { S: true, M: false, L: false, XL: false },
  },
  {
    name: 'King in the North',
    sizes: { S: true, M: true, L: true, XL: false },
  },
  {
    name: 'Gotham Nights',
    sizes: { S: true, M: true, L: false, XL: false },
  },
  {
    name: 'Peace Out',
    sizes: { S: true, M: true, L: true, XL: false },
  },
  {
    name: 'Gojo Satoru',
    sizes: { S: false, M: true, L: true, XL: false },
  },
  {
    name: 'Know Pain',
    sizes: { S: true, M: false, L: false, XL: false },
  },
  {
    name: 'Parshuram',
    sizes: { S: true, M: true, L: true, XL: true },
  },
  {
    name: 'PoMark',
    sizes: { S: true, M: true, L: true, XL: true },
  },
  {
    name: 'Box Head',
    sizes: { S: true, M: true, L: true, XL: true },
  },
  {
    name: 'Spider-Man',
    sizes: { S: true, M: false, L: false, XL: false },
  },
  {
    name: 'Hooded Hero',
    sizes: { S: true, M: true, L: true, XL: true },
  },
  {
    name: 'Enjoy the Madness',
    sizes: { S: true, M: true, L: true, XL: true },
  },
  {
    name: 'Madness Skater',
    sizes: { S: true, M: true, L: true, XL: true },
  },
  {
    name: 'Essential Black',
    sizes: { S: true, M: true, L: true, XL: true },
  },
] as const;

const PRODUCT_SIZE_LOOKUP: Record<string, Product['sizes']> = {
  'Shinchan Vibes': PRODUCT_SIZE_AVAILABILITY[0].sizes,
  'Wow Cats': PRODUCT_SIZE_AVAILABILITY[1].sizes,
  'Stranger Things': PRODUCT_SIZE_AVAILABILITY[2].sizes,
  'King in the North': PRODUCT_SIZE_AVAILABILITY[3].sizes,
  'Gotham Nights': PRODUCT_SIZE_AVAILABILITY[4].sizes,
  'Peace Out': PRODUCT_SIZE_AVAILABILITY[5].sizes,
  'Gojo Satoru': PRODUCT_SIZE_AVAILABILITY[6].sizes,
  'Know Pain': PRODUCT_SIZE_AVAILABILITY[7].sizes,
  Parshuram: PRODUCT_SIZE_AVAILABILITY[8].sizes,
  PoMark: PRODUCT_SIZE_AVAILABILITY[9].sizes,
  'Box Head': PRODUCT_SIZE_AVAILABILITY[10].sizes,
  'Spider-Man': PRODUCT_SIZE_AVAILABILITY[11].sizes,
  'Hooded Hero': PRODUCT_SIZE_AVAILABILITY[12].sizes,
  'Enjoy the Madness': PRODUCT_SIZE_AVAILABILITY[13].sizes,
  'Madness Skater': PRODUCT_SIZE_AVAILABILITY[14].sizes,
  'Essential Black': PRODUCT_SIZE_AVAILABILITY[15].sizes,
};

export const PRODUCTS: Product[] = [
  // BEST SELLERS & POPULAR
  {
    id: 'prod_1',
    name: 'Shinchan Vibes',
    slug: 'shinchan-vibes',
    price: 419,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Navy Blue',
    sizes: PRODUCT_SIZE_LOOKUP['Shinchan Vibes'],
    images: [imgShinchan],
    tag: 'Best Seller',
    stockNote: 'Limited Stock',
    description: 'A bold Shinchan character print on premium navy blue cotton. Relaxed regular fit with the message Choose Peace, Love Yourself, Be Happy.',
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
    sizes: PRODUCT_SIZE_LOOKUP['Peace Out'],
    images: [imgPeaceOut],
    tag: 'Best Seller',
    stockNote: '',
    description: 'Back-print graphic featuring a white dove, red rose, and bold Peace typography. Clean front, expressive back. Printed on premium black cotton.',
    fabric: '100% Premium Cotton',
    fit: 'Oversized Fit',
  },
  {
    id: 'prod_3',
    name: 'Enjoy the Madness',
    slug: 'enjoy-the-madness',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: PRODUCT_SIZE_LOOKUP['Enjoy the Madness'],
    images: [imgEnjoyTheMadness],
    tag: 'Back Print',
    stockNote: '',
    description: 'Black graphic tee with a clean front and a bold Enjoy the Madness back print featuring a hooded skater character, glowing eyes, and gritty street-art styling.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },

  // ANIME COLLECTION
  {
    id: 'prod_4',
    name: 'Gojo Satoru',
    slug: 'gojo-satoru',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: PRODUCT_SIZE_LOOKUP['Gojo Satoru'],
    images: [imgGojo],
    tag: 'Anime Collection',
    stockNote: '',
    description: 'A bold back-print graphic of Gojo Satoru from Jujutsu Kaisen, featuring red slash accents and Reverse Curse Technique typography in kanji.',
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
    sizes: PRODUCT_SIZE_LOOKUP['Know Pain'],
    images: [imgKnowPain],
    tag: 'Anime Collection',
    stockNote: '',
    description: 'A manga-style graphic panel featuring Japanese kanji and the phrase This World Shall Know Pain. A dramatic print on premium white cotton.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },

  // FANFAVOURITE COLLECTION
  {
    id: 'prod_6',
    name: 'Stranger Things',
    slug: 'stranger-things',
    price: 439,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Chocolate Brown',
    sizes: PRODUCT_SIZE_LOOKUP['Stranger Things'],
    images: [imgStranger],
    tag: 'Fan Favourite',
    stockNote: 'Only Size S Available',
    description: 'All eight Stranger Things characters illustrated side by side on rich chocolate brown cotton. A minimalist graphic for fans who appreciate subtle references.',
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
    sizes: PRODUCT_SIZE_LOOKUP['King in the North'],
    images: [imgKingNorth],
    tag: 'Fan Favourite',
    stockNote: '',
    description: 'A detailed front graphic of a warrior holding a sword, paired with bold King in the North typography on cream off-white cotton.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },

  // PREMIUM COLLECTION
  {
    id: 'prod_8',
    name: 'Gotham Nights',
    slug: 'gotham-nights',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: PRODUCT_SIZE_LOOKUP['Gotham Nights'],
    images: [imgGotham],
    tag: 'Limited Edition',
    stockNote: 'Only Few Left',
    description: "The iconic bat symbol with Gotham's city skyline etched inside. A clean, refined graphic. Limited edition and it will not be restocked once sold out.",
    fabric: '100% Premium Cotton',
    fit: 'Oversized Fit',
  },

  // ARTISTIC PRINTS
  {
    id: 'prod_9',
    name: 'PoMark',
    slug: 'po-mark',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Cream White',
    sizes: PRODUCT_SIZE_LOOKUP.PoMark,
    images: [imgPoMark],
    tag: 'New Drop',
    stockNote: '',
    description: 'A clean cream-white tee with a bold illustrated headphone graphic and handwritten street-art detailing on the front.',
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
    sizes: PRODUCT_SIZE_LOOKUP['Box Head'],
    images: [imgBoxHead],
    tag: 'New Drop',
    stockNote: '',
    description: 'Minimal off-white tee with a box-head character illustration and sketch-style accents for a playful streetwear look.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_11',
    name: 'Spider-Man',
    slug: 'spider-man',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: PRODUCT_SIZE_LOOKUP['Spider-Man'],
    images: [imgSpiderman],
    tag: 'New Drop',
    stockNote: 'Only Size S Available',
    description: 'Black graphic tee featuring a bold Spider-Man inspired spider emblem in white and red for a sharp comic-book finish.',
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
    sizes: PRODUCT_SIZE_LOOKUP['Hooded Hero'],
    images: [imgHoodedHero],
    tag: 'New Drop',
    stockNote: '',
    description: 'Cream-white tee with a striking hooded anime-inspired figure in cool blue tones for a standout modern streetwear feel.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_13',
    name: 'Parshuram',
    slug: 'parshuram',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'White',
    sizes: PRODUCT_SIZE_LOOKUP.Parshuram,
    images: [imgParshuram],
    tag: 'New Drop',
    stockNote: '',
    description: 'White graphic tee with a clean front and a bold Parshuram illustration on the back, finished with vintage-style typography for a strong streetwear look.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },

  // QUIRKY & FUN COLLECTION
  {
    id: 'prod_14',
    name: 'Wow Cats',
    slug: 'wow-cats',
    price: 419,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Dusty Pink',
    sizes: PRODUCT_SIZE_LOOKUP['Wow Cats'],
    images: [imgWowCats],
    tag: 'Fun Collection',
    stockNote: '',
    description: 'Three stacked cartoon cats printed on the side of a dusty pink tee, with WOW!! and Hi typography integrated into the design. Soft, breathable premium cotton.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },

  // NEW RELEASES
  {
    id: 'prod_15',
    name: 'Madness Skater',
    slug: 'madness-skater',
    price: 409,
    originalPrice: 699,
    category: 'Graphic',
    color: 'Black',
    sizes: PRODUCT_SIZE_LOOKUP['Madness Skater'],
    images: [imgEnjoyTheMadnessV2],
    tag: 'New Drop',
    stockNote: '',
    description: 'Bold streetwear graphic featuring an extreme action skater character with glowing energy effects. "Enjoy the Madness" with "Extreme Traction" motif. Street culture meets extreme sports energy on premium black cotton.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
  {
    id: 'prod_16',
    name: 'Essential Black',
    slug: 'essential-black',
    price: 299,
    originalPrice: 399,
    category: 'Basic',
    color: 'Black',
    sizes: PRODUCT_SIZE_LOOKUP['Essential Black'],
    images: [imgBlankTee],
    tag: 'Basic Essentials',
    stockNote: '',
    description: 'Premium quality blank black tee - the perfect canvas for your style. Clean minimalist design made from 100% soft premium cotton. A wardrobe staple that works with everything.',
    fabric: '100% Premium Cotton',
    fit: 'Regular Fit',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(product => product.slug === slug);
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

export function getAvailabilityNote(product: Product): string {
  const availableSizes = getAvailableSizes(product);

  if (availableSizes.length === 0) {
    return 'Out of Stock';
  }

  if (availableSizes.length === 1) {
    return `Only Size ${availableSizes[0]} Available`;
  }

  return product.stockNote;
}

export const WA_NUMBER = '917990407096';
export const IG_URL = 'https://instagram.com/z_tees.in';
export const IG_HANDLE = 'z_tees.in';

export function buildWhatsAppURL(cart: Array<{ product: Product; size: string; qty: number }>) {
  const lines = cart.map((item, index) =>
    `${index + 1}. ${item.product.name} - Size: ${item.size} - ${formatPrice(item.product.price)}${item.qty > 1 ? ` x${item.qty}` : ''}`
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
