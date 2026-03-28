import imgShinchan  from '@/assets/shinchan-vibes.jpeg';
import imgPeaceOut  from '@/assets/peace-out.jpeg';
import imgStranger  from '@/assets/gang-walk.jpeg';
import imgKingNorth from '@/assets/king-north.jpeg';
import imgWowCats   from '@/assets/wow-cats.jpeg';
import imgGotham    from '@/assets/gotham-nights.jpeg';
import imgKnowPain  from '@/assets/pain-tee.jpeg';
import imgGojo      from '@/assets/gojo-tee.jpeg';

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  category: 'Graphic' | 'Basic';
  color: string;
  sizes: { S: boolean; M: boolean; L: boolean };
  images: string[];
  /** Optional back-view image. When present, cards show a front→back flip on hover. */
  backImage?: string;
  tag: string;
  stockNote: string;
  description: string;
  fabric: string;
  fit: string;
};

export const ALL_SIZES = ['S', 'M', 'L'] as const;
export type Size = (typeof ALL_SIZES)[number];

export const PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Shinchan Vibes',
    slug: 'shinchan-vibes',
    price: 419, originalPrice: 699,
    category: 'Graphic', color: 'Navy Blue',
    sizes: { S: true, M: true, L: true },
    images: [imgShinchan],
    tag: 'Popular',
    stockNote: 'Limited Stock',
    description: 'A bold Shinchan character print on premium navy blue cotton. Relaxed regular fit with the message Choose Peace, Love Yourself, Be Happy.',
    fabric: '100% Premium Cotton', fit: 'Regular Fit',
  },
  {
    id: 'prod_2',
    name: 'Peace Out',
    slug: 'peace-out',
    price: 419, originalPrice: 699,
    category: 'Graphic', color: 'Black',
    sizes: { S: true, M: true, L: true },
    images: [imgPeaceOut],
    tag: 'Best Seller',
    stockNote: '',
    description: 'Back-print graphic featuring a white dove, red rose, and bold Peace typography. Clean front, expressive back. Printed on premium black cotton.',
    fabric: '100% Premium Cotton', fit: 'Oversized Fit',
  },
  {
    id: 'prod_3',
    name: 'Stranger Things',
    slug: 'stranger-things',
    price: 439, originalPrice: 699,
    category: 'Graphic', color: 'Chocolate Brown',
    sizes: { S: true, M: true, L: true },
    images: [imgStranger],
    tag: 'Fan Favourite',
    stockNote: '',
    description: 'All eight Stranger Things characters illustrated side by side on rich chocolate brown cotton. A minimalist graphic for fans who appreciate subtle references.',
    fabric: '100% Premium Cotton', fit: 'Regular Fit',
  },
  {
    id: 'prod_4',
    name: 'King in the North',
    slug: 'king-in-the-north',
    price: 399, originalPrice: 649,
    category: 'Graphic', color: 'Cream / Off-White',
    sizes: { S: true, M: true, L: true },
    images: [imgKingNorth],
    tag: 'Fan Favourite',
    stockNote: '',
    description: 'A detailed front graphic of a warrior holding a sword, paired with bold King in the North typography on cream off-white cotton.',
    fabric: '100% Premium Cotton', fit: 'Regular Fit',
  },
  {
    id: 'prod_5',
    name: 'Wow Cats',
    slug: 'wow-cats',
    price: 419, originalPrice: 699,
    category: 'Basic', color: 'Dusty Pink',
    sizes: { S: true, M: true, L: true },
    images: [imgWowCats],
    tag: '',
    stockNote: '',
    description: 'Three stacked cartoon cats printed on the side of a dusty pink tee, with WOW!! and Hi typography integrated into the design. Soft, breathable premium cotton.',
    fabric: '100% Premium Cotton', fit: 'Regular Fit',
  },
  {
    id: 'prod_6',
    name: 'Gotham Nights',
    slug: 'gotham-nights',
    price: 409, originalPrice: 699,
    category: 'Graphic', color: 'Black',
    sizes: { S: true, M: false, L: true },
    images: [imgGotham],
    tag: 'Limited Edition',
    stockNote: 'Only Few Left',
    description: 'The iconic bat symbol with Gotham\'s city skyline etched inside. A clean, refined graphic. Limited edition — will not be restocked once sold out.',
    fabric: '100% Premium Cotton', fit: 'Oversized Fit',
  },
  {
    id: 'prod_7',
    name: 'Know Pain',
    slug: 'know-pain',
    price: 409, originalPrice: 699,
    category: 'Graphic', color: 'White',
    sizes: { S: false, M: true, L: false },
    images: [imgKnowPain],
    tag: 'Anime Collection',
    stockNote: 'Only Size M Available',
    description: 'A manga-style graphic panel featuring Japanese kanji and the phrase This World Shall Know Pain. A dramatic print on premium white cotton.',
    fabric: '100% Premium Cotton', fit: 'Regular Fit',
  },
  {
    id: 'prod_8',
    name: 'Gojo Satoru',
    slug: 'gojo-satoru',
    price: 409, originalPrice: 699,
    category: 'Graphic', color: 'Black',
    sizes: { S: true, M: true, L: true },
    images: [imgGojo],
    tag: 'Back Print',
    stockNote: '',
    description: 'A bold back-print graphic of Gojo Satoru from Jujutsu Kaisen, featuring red slash accents and Reverse Curse Technique typography in kanji.',
    fabric: '100% Premium Cotton', fit: 'Oversized Fit',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export const WA_NUMBER = '917990407096';
export const IG_URL = 'https://instagram.com/z_tees.in';
export const IG_HANDLE = 'z_tees.in';

export function buildWhatsAppURL(cart: Array<{ product: Product; size: string; qty: number }>) {
  const lines = cart.map((item, i) =>
    `${i + 1}. ${item.product.name} – Size: ${item.size} – ₹${item.product.price}${item.qty > 1 ? ` x${item.qty}` : ''}`
  );
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const msg = [
    'Hi, I want to order:',
    '',
    ...lines,
    '',
    `Total: ₹${total}`,
    '',
    'Please confirm availability.',
  ].join('\n');
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
