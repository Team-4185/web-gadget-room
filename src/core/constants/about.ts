import {
  AboutCardIcon,
  AboutDeliveryIcon,
  AboutFocusedIcon,
  AboutGrowthIcon,
  AboutQualityIcon,
  AboutSecurePaymentIcon,
  AboutTransparencyIcon,
  AboutUserIcon,
  AboutWarrantyIcon,
  AboutFastDeliveryIcon,
  AboutPhoneInHandIcon,
  Check,
} from '@/assets';

export const aboutBrands = [
  'Apple',
  'Samsung',
  'Xiaomi',
  'Google Pixel',
  'OnePlus',
  'Huawei',
  'Sony',
  'Motorola',
] as const;

export const aboutTestimonials = [
  {
    id: 1,
    author: 'Mykola H.',
    city: 'Kyiv',
    initials: 'MH',
    tone: 'teal',
    text: '"Ordered an iPhone 15 Pro - arrived in Kyiv within 2 days, original packaging, official warranty card. GadgetRoom is now my go-to for everything tech!"',
  },
  {
    id: 2,
    author: 'Sofiya D.',
    city: 'Lviv',
    initials: 'SD',
    tone: 'yellow',
    text: '"Compared prices across 6 stores. GadgetRoom was cheapest AND had the best warranty terms. Support answered my questions instantly, 10/10 recommend!"',
  },
  {
    id: 3,
    author: 'Roman P.',
    city: 'Odesa',
    initials: 'RP',
    tone: 'blue',
    text: '"Had a small issue with my order - wrong color sent. They replaced it next day, no questions asked. That kind of service is rare. Respect to the whole team!"',
  },
] as const;

export const aboutStars = Array.from({ length: 5 });

export const aboutTeamMembers = [
  {
    id: 1,
    name: 'Artem Kovalenko',
    role: 'FOUNDER & CEO',
    text: '10+ years in tech retail. Passionate about making gadgets accessible to everyone in Ukraine.',
    initials: 'AK',
  },
  {
    id: 2,
    name: 'Olena Shevchenko',
    role: 'HEAD OF PRODUCT',
    text: 'Curates our catalog with an eye for quality and value. Every listing passes her approval.',
    initials: 'OS',
  },
  {
    id: 3,
    name: 'Vasyl Marchenko',
    role: 'LOGISTIC MANAGER',
    text: 'Ensures every order reaches you on time. Manages relationships with all delivery partners.',
    initials: 'VM',
  },
  {
    id: 4,
    name: 'Yulia Petrenko',
    role: 'CUSTOMER EXPERIENCE',
    text: 'Heads our support team. Committed to resolving every issue within 24 hours.',
    initials: 'YP',
  },
] as const;

export const aboutProcessSteps = [
  {
    id: 1,
    title: 'Supplier Vetting',
    text: 'We partner only with certified, authorized suppliers. Every vendor undergoes strict quality screening.',
    tone: 'lavender',
    Icon: AboutUserIcon,
  },
  {
    id: 2,
    title: 'Quality Check',
    text: 'Every product is inspected and verified. Accessories are tested, specs are confirmed accurate.',
    tone: 'blue',
    Icon: Check,
  },
  {
    id: 3,
    title: 'Catalog Listing',
    text: 'Products are listed with full specs, real photos, honest pricing, and clear warranty information.',
    tone: 'amber',
    Icon: AboutCardIcon,
  },
  {
    id: 4,
    title: 'Delivery & Support',
    text: 'Fast shipping across Ukraine. Post-sale support and hassle-free returns within 14 days.',
    tone: 'green',
    Icon: AboutDeliveryIcon,
  },
] as const;

export const aboutCoreValues = [
  {
    id: 1,
    valueLabel: 'VALUE 01',
    title: 'Transparency',
    text: 'No hidden fees, no misleading specs. We show complete and honest product information so you can make confident buying decisions.',
    tone: 'violet',
    Icon: AboutTransparencyIcon,
  },
  {
    id: 2,
    valueLabel: 'VALUE 02',
    title: 'Customer First',
    text: 'Every feature, policy, and process is designed around the customer. Your satisfaction is not a metric - it is our mission.',
    tone: 'lavender',
    Icon: AboutUserIcon,
  },
  {
    id: 3,
    valueLabel: 'VALUE 03',
    title: 'Quality Assurance',
    text: 'Each product is sourced from certified suppliers and passes quality checks before appearing in our catalog.',
    tone: 'green',
    Icon: AboutQualityIcon,
  },
  {
    id: 4,
    valueLabel: 'VALUE 04',
    title: 'Ukraine-Focused',
    text: 'Based in Kyiv, we understand Ukrainian customers. Fast domestic delivery, local support, and UAH pricing with no surprises.',
    tone: 'orange',
    Icon: AboutFocusedIcon,
  },
  {
    id: 5,
    valueLabel: 'VALUE 05',
    title: 'Secure Payments',
    text: 'All transactions are encrypted and processed through certified payment gateways. Your financial data is always protected.',
    tone: 'blue',
    Icon: AboutCardIcon,
  },
  {
    id: 6,
    valueLabel: 'VALUE 06',
    title: 'Continuous Growth',
    text: 'We constantly expand our catalog, improve delivery speeds, and train our team to offer you the best possible experience.',
    tone: 'purple',
    Icon: AboutGrowthIcon,
  },
] as const;

export const aboutMetrics = [
  {
    id: 1,
    value: '47k+',
    label: 'HAPPY CUSTOMERS',
    caption: 'Served across Ukraine since 2019',
  },
  {
    id: 2,
    value: '2.4k+',
    label: 'PRODUCTS',
    caption: 'Smartphones',
  },
  {
    id: 3,
    value: '98%',
    label: 'SATISFACTION RATE',
    caption: 'Based on 12,000+ verified reviews',
  },
  {
    id: 4,
    value: '24/7',
    label: 'SUPPORT',
    caption: 'Round-the-clock customer care',
  },
] as const;

export const aboutMissionCards = [
  {
    id: 'original',
    title: 'Original Devices',
    text: 'Only verified suppliers and tested smartphones. Every product is authenticated before listing.',
    Icon: AboutPhoneInHandIcon,
  },
  {
    id: 'warranty',
    title: 'Warranty',
    text: 'Clear warranty policy and fast support response. We stand behind every product we sell.',
    Icon: AboutWarrantyIcon,
  },
  {
    id: 'payment',
    title: 'Secure Payment',
    text: 'Safe and popular payment methods. Visa, Mastercard, Apple Pay, Google Pay and more.',
    Icon: AboutSecurePaymentIcon,
  },
  {
    id: 'delivery',
    title: 'Fast Delivery',
    text: 'Clear warranty policy and fast support response. We stand behind every product we sell.',
    Icon: AboutFastDeliveryIcon,
  },
] as const;
