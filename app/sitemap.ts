import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://taxiluigi.at';
  const currentDate = new Date();

  // Define available locales
  const locales = ['en', 'de'];
  
  // Define main pages
  const pages = [
    '',
    '/services', 
    '/fleet',
    '/booking',
    '/contact'
  ];

  // Generate sitemap entries for each locale and page
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    pages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: page === '' ? 1.0 : page === '/booking' ? 0.9 : 0.8,
      });
    });
  });

  // Add root redirect (defaults to English)
  sitemapEntries.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 1.0,
  });

  return sitemapEntries;
}
