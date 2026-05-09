// ── ThreadCo Mock Data ──
import React from 'react'
import {
  Shirt,
  Sparkles,
  Baby,
  Flower2,
  Dumbbell,
  Wind,
  Briefcase,
  Coffee,
} from 'lucide-react'

export const CATEGORIES = [
  { id: 'men',    label: "Men's",   icon: <Shirt size={20} /> },
  { id: 'women',  label: "Women's", icon: <Sparkles size={20} /> },
  { id: 'kids',   label: "Kids",    icon: <Baby size={20} /> },
  { id: 'ethnic', label: "Ethnic",  icon: <Flower2 size={20} /> },
  { id: 'sports', label: "Sports",  icon: <Dumbbell size={20} /> },
  { id: 'winter', label: "Winter",  icon: <Wind size={20} /> },
  { id: 'formal', label: "Formal",  icon: <Briefcase size={20} /> },
  { id: 'casual', label: "Casual",  icon: <Coffee size={20} /> },
]

export const SIZES = ['XS','S','M','L','XL','XXL','3XL']
export const COLORS_LIST = ['White','Black','Navy','Red','Green','Grey','Beige','Brown','Pink','Yellow']

const IMG = (seed, w=400, h=500) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const PRODUCTS = [
  // Men
  { id:1,  name:'Oxford Button-Down Shirt',  price:1299, mrp:1799, category:'men',    sub:'shirts',    color:'White',    sizes:['S','M','L','XL'],           rating:4.3, reviews:128, stock:45, seller:'KartikFashions', img: IMG('shirt1'),    description:'Classic oxford weave cotton shirt. Perfect for office or casual outings. Breathable and wrinkle-resistant fabric.' },
  { id:2,  name:'Slim Fit Chinos',           price:1599, mrp:2199, category:'men',    sub:'trousers',  color:'Beige',    sizes:['30','32','34','36'],         rating:4.5, reviews:204, stock:30, seller:'DenimDays',      img: IMG('chinos2'),   description:'Stretch chinos with a modern slim fit. Four-pocket styling, versatile for work and weekends.' },
  { id:3,  name:'Polo T-Shirt',              price:699,  mrp:999,  category:'men',    sub:'tshirts',   color:'Navy',     sizes:['S','M','L','XL','XXL'],      rating:4.1, reviews:87,  stock:100,seller:'UrbanThreads',  img: IMG('polo3'),     description:'Premium pique cotton polo. Classic fit with ribbed collar and two-button placket.' },
  { id:4,  name:'Formal Blazer',             price:3499, mrp:4999, category:'formal', sub:'blazers',   color:'Charcoal', sizes:['38','40','42','44'],         rating:4.7, reviews:56,  stock:15, seller:'SuitCraft',      img: IMG('blazer4'),   description:'Single-breasted two-button blazer in premium poly-viscose blend. Side vents, fully lined.' },
  { id:5,  name:'Graphic Hoodie',            price:1099, mrp:1499, category:'casual', sub:'hoodies',   color:'Grey',     sizes:['S','M','L','XL'],           rating:4.2, reviews:312, stock:60, seller:'StreetStyle',    img: IMG('hoodie5'),   description:'Heavyweight fleece hoodie with kangaroo pocket. Soft brushed interior. Screen-printed graphic.' },
  { id:6,  name:'Denim Jacket',              price:2199, mrp:2999, category:'men',    sub:'jackets',   color:'Blue',     sizes:['S','M','L','XL'],           rating:4.6, reviews:189, stock:25, seller:'DenimDays',      img: IMG('denim6'),    description:'Classic denim jacket in mid-wash. Two chest pockets, adjustable button cuffs.' },

  // Women
  { id:7,  name:'Floral Wrap Dress',         price:1799, mrp:2499, category:'women',  sub:'dresses',   color:'Pink',     sizes:['XS','S','M','L'],           rating:4.8, reviews:445, stock:35, seller:'BloomStyle',     img: IMG('dress7'),    description:'Lightweight chiffon wrap dress with V-neck and adjustable tie waist. Floral all-over print.' },
  { id:8,  name:'High-Rise Skinny Jeans',    price:1999, mrp:2799, category:'women',  sub:'jeans',     color:'Blue',     sizes:['26','28','30','32'],         rating:4.4, reviews:267, stock:40, seller:'DenimDays',      img: IMG('jeans8'),    description:'Super-stretch denim with high-rise fit. Gives flattering silhouette. Five-pocket styling.' },
  { id:9,  name:'Linen Kurti',               price:899,  mrp:1199, category:'women',  sub:'kurtis',    color:'Beige',    sizes:['S','M','L','XL','XXL'],      rating:4.3, reviews:178, stock:55, seller:'EthnicRoots',    img: IMG('kurti9'),    description:'Straight-cut linen kurti with embroidered neckline. Breathable and comfortable for daily wear.' },
  { id:10, name:'Crop Top',                  price:599,  mrp:799,  category:'women',  sub:'tops',      color:'White',    sizes:['XS','S','M','L'],           rating:4.0, reviews:134, stock:70, seller:'UrbanThreads',   img: IMG('crop10'),    description:'Ribbed cotton crop top with scoop neck. Versatile staple, pairs well with high-waist bottoms.' },
  { id:11, name:'Pleated Midi Skirt',        price:1399, mrp:1899, category:'women',  sub:'skirts',    color:'Black',    sizes:['XS','S','M','L','XL'],      rating:4.6, reviews:98,  stock:28, seller:'BloomStyle',     img: IMG('skirt11'),   description:'Flowing pleated midi skirt in chiffon. Elastic waistband. Lined.' },
  { id:12, name:'Blazer Co-ord Set',         price:3299, mrp:4499, category:'formal', sub:'coord',     color:'Cream',    sizes:['S','M','L','XL'],           rating:4.7, reviews:62,  stock:18, seller:'SuitCraft',      img: IMG('coord12'),   description:'Tailored blazer and trouser co-ord in woven fabric. Sharp and professional look.' },

  // Kids
  { id:13, name:'Kids Denim Overalls',       price:849,  mrp:1199, category:'kids',   sub:'bottoms',   color:'Blue',     sizes:['2Y','4Y','6Y','8Y'],        rating:4.5, reviews:89,  stock:40, seller:'LittleTots',     img: IMG('kids13'),    description:'Durable denim overalls with adjustable straps. Side pockets, reinforced knees.' },
  { id:14, name:'Graphic Tee – Dino Print',  price:399,  mrp:599,  category:'kids',   sub:'tshirts',   color:'Green',    sizes:['2Y','4Y','6Y','8Y','10Y'],  rating:4.4, reviews:156, stock:80, seller:'LittleTots',     img: IMG('kids14'),    description:'100% cotton crew-neck tee with fun dinosaur print. Soft and breathable for all-day play.' },
  { id:15, name:'Frock with Bow',            price:699,  mrp:999,  category:'kids',   sub:'dresses',   color:'Pink',     sizes:['2Y','4Y','6Y','8Y'],        rating:4.6, reviews:112, stock:50, seller:'LittleTots',     img: IMG('frock15'),   description:'Layered cotton frock with satin bow waist. Perfect for parties or special occasions.' },

  // Ethnic
  { id:16, name:'Anarkali Suit Set',         price:2999, mrp:4499, category:'ethnic', sub:'suits',     color:'Red',      sizes:['S','M','L','XL','XXL'],      rating:4.8, reviews:234, stock:20, seller:'EthnicRoots',    img: IMG('anarkali16'),description:'Heavy embroidered anarkali with churidar and dupatta. Festive occasion wear.' },
  { id:17, name:'Kurta Pyjama Set',          price:1499, mrp:2199, category:'ethnic', sub:'sets',      color:'White',    sizes:['S','M','L','XL','XXL'],      rating:4.5, reviews:167, stock:35, seller:'EthnicRoots',    img: IMG('kurta17'),   description:'Fine cotton kurta with straight pyjama. Block print detailing on the collar and cuffs.' },
  { id:18, name:'Banarasi Saree',            price:4999, mrp:7999, category:'ethnic', sub:'sarees',    color:'Gold',     sizes:['Free'],                      rating:4.9, reviews:89,  stock:10, seller:'SilkRoutes',     img: IMG('saree18'),   description:'Pure Banarasi silk saree with zari border and pallu. Comes with unstitched blouse piece.' },

  // Sports
  { id:19, name:'Dry-Fit Running Shorts',    price:799,  mrp:1099, category:'sports', sub:'shorts',    color:'Black',    sizes:['S','M','L','XL'],           rating:4.3, reviews:201, stock:65, seller:'SportZone',      img: IMG('shorts19'),  description:'Lightweight polyester shorts with inner liner. Reflective details, zip pocket at back.' },
  { id:20, name:'Compression Tights',        price:1199, mrp:1699, category:'sports', sub:'tights',    color:'Navy',     sizes:['S','M','L','XL'],           rating:4.4, reviews:88,  stock:45, seller:'SportZone',      img: IMG('tights20'),  description:'4-way stretch compression tights. Moisture-wicking fabric. Wide waistband.' },
  { id:21, name:'Sports Bra',                price:899,  mrp:1299, category:'sports', sub:'innerwear', color:'Pink',     sizes:['XS','S','M','L','XL'],      rating:4.5, reviews:143, stock:55, seller:'SportZone',      img: IMG('sportsbra21'),description:'Medium-impact sports bra with removable padding. Moisture-wicking, racerback design.' },

  // Winter
  { id:22, name:'Wool Overcoat',             price:4499, mrp:6499, category:'winter', sub:'coats',     color:'Camel',    sizes:['S','M','L','XL'],           rating:4.7, reviews:74,  stock:12, seller:'WinterWear',     img: IMG('coat22'),    description:'Double-breasted wool blend overcoat with belt. Classic lapel, fully lined, below-knee length.' },
  { id:23, name:'Cable-Knit Sweater',        price:1799, mrp:2499, category:'winter', sub:'sweaters',  color:'Cream',    sizes:['S','M','L','XL','XXL'],      rating:4.5, reviews:119, stock:30, seller:'WinterWear',     img: IMG('sweater23'), description:'Chunky cable-knit in wool blend. Relaxed fit with ribbed hem and cuffs.' },
  { id:24, name:'Puffer Jacket',             price:2999, mrp:3999, category:'winter', sub:'jackets',   color:'Black',    sizes:['S','M','L','XL','XXL'],      rating:4.6, reviews:198, stock:22, seller:'WinterWear',     img: IMG('puffer24'),  description:'Lightweight puffer with 80g fill. Hood with faux fur trim, two side pockets.' },
]

export const SELLERS = [
  { id:'s1', name:'KartikFashions', email:'kartik@fashions.com', products:6, sales:1240, rating:4.5, joined:'2022-03-15' },
  { id:'s2', name:'DenimDays',      email:'denim@days.com',      products:4, sales:3100, rating:4.7, joined:'2021-07-01' },
  { id:'s3', name:'BloomStyle',     email:'bloom@style.com',     products:5, sales:890,  rating:4.6, joined:'2023-01-20' },
  { id:'s4', name:'EthnicRoots',    email:'ethnic@roots.com',    products:7, sales:560,  rating:4.8, joined:'2022-09-10' },
  { id:'s5', name:'SportZone',      email:'sport@zone.com',      products:6, sales:2300, rating:4.4, joined:'2021-11-05' },
]

export const REVIEWS = [
  { id:1, productId:1,  user:'Rahul M.',  rating:5, comment:'Fits perfectly. Great quality cotton.',                          date:'2024-11-10' },
  { id:2, productId:1,  user:'Priya K.',  rating:4, comment:'Good shirt but the collar is slightly stiff.',                   date:'2024-10-28' },
  { id:3, productId:7,  user:'Ananya S.', rating:5, comment:'Love the print! Comfortable and runs true to size.',             date:'2024-11-15' },
  { id:4, productId:16, user:'Meena R.',  rating:5, comment:'Exactly as shown. Wore it for Diwali, got many compliments!',    date:'2024-10-20' },
]

export const BANNERS = [
  { id:1, title:'New Winter Collection', sub:'Up to 40% off on jackets & coats',          cta:'Shop Now',  link:'/shop?category=winter', bg:'#1a1a2e' },
  { id:2, title:'Ethnic Festive Wear',   sub:'Sarees, Suits & Kurtas for every occasion', cta:'Explore',   link:'/shop?category=ethnic', bg:'#4a1020' },
  { id:3, title:'Sports & Active',       sub:'Performance gear that moves with you',       cta:'View Range',link:'/shop?category=sports', bg:'#0d3349' },
]