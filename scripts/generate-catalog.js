const fs = require('fs');
const path = require('path');
const { apps } = require('./apps-data');

const root = path.resolve(__dirname, '..');
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

const pages = {
  ja: {
    output: 'index.html', prefix: './', lang: 'ja', alternate: './en/',
    title: 'TempuraApps — 毎日がちょっと便利に、楽しくなる iPhone アプリ',
    description: '毎日がちょっと便利に、楽しくなるようなアプリをつくっています。',
    ogLocale: 'ja_JP', ogAlt: 'en_US', ogAltText: 'TempuraApps のブランドバナー',
    apps: 'アプリ一覧', contact: 'お問い合わせ', language: 'English', navLabel: 'サイト内リンク',
    eyebrow: 'SMALL APPS, EVERYDAY JOY', hero: '<span class="nowrap">毎日に、</span><br class="mobile-break"><em class="nowrap">ちょっといい</em><br><span class="nowrap">アプリを。</span>',
    intro: '毎日がちょっと便利に、楽しくなるようなアプリをつくっています。', cta: 'アプリを見る',
    kicker: 'APP COLLECTION', collection: '<span class="nowrap">あなたの毎日に、</span><br><span class="nowrap">ぴったりを。</span>', collectionText: '気になること、続けたいこと、出かけたい場所。小さなアプリを、毎日のそばに。',
    search: 'アプリを検索', searchLabel: 'アプリを検索', count: '{count} 件のアプリ', countSingular: '{count} 件のアプリ', more: '詳しく見る', comingSoon: '近日公開',
    categories: [['all', 'すべて'], ['life', '暮らし'], ['records', '記録・習慣'], ['outings', 'おでかけ'], ['tools', 'ツール・趣味']],
    noResults: '条件に合うアプリが見つかりませんでした。', reset: '絞り込みをリセット',
    belief: '小さなアプリで、毎日に余白を。', beliefText: '使うたびに、ほんの少し気分がよくなる。そんな道具を、ひとつずつ丁寧につくっています。', bannerAlt: 'TempuraApps のブランドバナー', bannerLabel: 'バナーを大きく見る ↗',
    contactText: 'ご質問やご連絡は', contactEnd: 'からどうぞ。', policies: 'プライバシーポリシー', policyLabel: 'アプリごとのプライバシーポリシーを開く',
    privacy: 'privacy.html', social: [['mailto:tempuraapps.support@gmail.com', 'tempuraapps.support@gmail.com'], ['https://x.com/TempuraApps', 'X（@TempuraApps）'], ['https://www.instagram.com/tempuraapps/', 'Instagram（@tempuraapps）'], ['https://www.facebook.com/profile.php?id=61592551509905', 'Facebook ページ']]
  },
  en: {
    output: 'en/index.html', prefix: '../', lang: 'en', alternate: '../',
    title: 'TempuraApps — iPhone apps that make every day a little easier',
    description: 'We make iPhone apps that make every day a little easier and a little more fun.',
    ogLocale: 'en_US', ogAlt: 'ja_JP', ogAltText: 'TempuraApps brand banner',
    apps: 'Apps', contact: 'Contact', language: '日本語', navLabel: 'Site links',
    eyebrow: 'SMALL APPS, EVERYDAY JOY', hero: 'Small apps.<br><em>Brighter days.</em>',
    intro: 'We make iPhone apps that make every day a little easier and a little more fun.', cta: 'Explore apps',
    kicker: 'APP COLLECTION', collection: 'Find a little app<br>that fits your day.', collectionText: 'For the things you notice, keep up with, and set out to do. Small apps, close at hand.',
    search: 'Search apps', searchLabel: 'Search apps', count: '{count} apps', countSingular: '{count} app', more: 'Learn more', comingSoon: 'Coming soon',
    categories: [['all', 'All'], ['life', 'Everyday life'], ['records', 'Records & habits'], ['outings', 'Outings'], ['tools', 'Tools & hobbies']],
    noResults: 'No apps match those filters.', reset: 'Reset filters',
    belief: 'Small apps, more room in your day.', beliefText: 'We make thoughtful tools that leave you feeling just a little better each time you use them.', bannerAlt: 'TempuraApps brand banner', bannerLabel: 'View full-size banner ↗',
    contactText: 'Questions or hellos? Reach us at', contactEnd: '.', policies: 'Privacy policies', policyLabel: 'Open privacy policies for each app',
    privacy: 'en/privacy.html', social: [['mailto:tempuraapps.support@gmail.com', 'tempuraapps.support@gmail.com'], ['https://x.com/TempuraApps', 'X (@TempuraApps)'], ['https://www.instagram.com/tempuraapps/', 'Instagram (@tempuraapps)'], ['https://www.facebook.com/profile.php?id=61592551509905', 'Facebook']]
  }
};

function categoryName(page, category) { return page.categories.find(([id]) => id === category)[1]; }
function appLink(page, app) { return `${page.prefix}${app.slug}/${page.lang === 'en' ? 'en/' : ''}`; }
function card(page, app) {
  const [name, eyebrow, tagline] = app[page.lang];
  const search = `${name} ${eyebrow} ${tagline} ${categoryName(page, app.category)}${app.comingSoon ? ` ${page.comingSoon}` : ''}`;
  // 未配信のアプリだけカテゴリ行の右に「近日公開」を出す。
  // 配信されたら apps-data.js の comingSoon を消して再生成すれば、ここも一緒に消える。
  const soon = app.comingSoon ? `<span class="soon">${esc(page.comingSoon)}</span>` : '';
  return `<li class="card" data-category="${app.category}" data-search="${esc(search)}"><a href="${appLink(page, app)}"><img src="${page.prefix}${app.slug}/icon-180.png" width="64" height="64" alt=""><p class="category">${esc(categoryName(page, app.category))}${soon}</p><h3>${esc(name)}</h3><p class="tagline">${esc(tagline)}</p><p class="more">${page.more} <span aria-hidden="true">→</span></p></a></li>`;
}
function socialLinks(page) { return page.social.map(([href, label]) => `<a href="${href}"${href.startsWith('http') ? ' rel="me noopener" target="_blank"' : ''}>${esc(label)}</a>`).join(' · '); }
function policyLinks(page) { return apps.map((app) => `<a href="${page.prefix}${app.slug}/${page.privacy}">${esc(app[page.lang][0])}</a>`).join(' '); }
function render(page) {
  const filters = page.categories.map(([id, label], index) => `<button class="filter" type="button" data-category="${id}" aria-pressed="${index === 0}">${esc(label)}</button>`).join('');
  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="theme-color" content="#f8f7f2">
  <link rel="canonical" href="https://tempuraapps.github.io/${page.lang === 'en' ? 'en/' : ''}">
  <link rel="alternate" hreflang="ja" href="https://tempuraapps.github.io/">
  <link rel="alternate" hreflang="en" href="https://tempuraapps.github.io/en/">
  <link rel="alternate" hreflang="x-default" href="https://tempuraapps.github.io/">
  <link rel="icon" type="image/png" sizes="64x64" href="${page.prefix}icon-64.png">
  <link rel="apple-touch-icon" href="${page.prefix}icon-180.png">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="TempuraApps">
  <meta property="og:locale" content="${page.ogLocale}">
  <meta property="og:locale:alternate" content="${page.ogAlt}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="https://tempuraapps.github.io/${page.lang === 'en' ? 'en/' : ''}">
  <meta property="og:image" content="https://tempuraapps.github.io/ogp.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="480">
  <meta property="og:image:alt" content="${page.ogAltText}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="${page.prefix}assets/catalog.css">
</head>
<body>
  <a class="skip" href="#apps">${page.lang === 'ja' ? 'アプリ一覧へ移動' : 'Skip to apps'}</a>
  <header class="site-head"><div class="wrap head-inner"><a class="brand" href="${page.lang === 'en' ? './' : './'}"><img src="${page.prefix}icon-64.png" width="32" height="32" alt="">TempuraApps</a><nav class="head-nav" aria-label="${page.navLabel}"><a href="#apps">${page.apps}</a><a href="#links">${page.contact}</a><a class="locale" href="${page.alternate}" lang="${page.lang === 'ja' ? 'en' : 'ja'}" hreflang="${page.lang === 'ja' ? 'en' : 'ja'}">${page.language}</a></nav></div></header>
  <main>
    <section class="hero"><div class="wrap"><a class="brand-banner hero-banner" href="${page.prefix}cover@2x.jpg" target="_blank" rel="noopener" aria-label="${page.bannerLabel}"><img src="${page.prefix}cover.jpg" srcset="${page.prefix}cover.jpg 1600w, ${page.prefix}cover@2x.jpg 1983w" sizes="(min-width: 1220px) 1180px, calc(100vw - 40px)" width="1600" height="640" loading="eager" decoding="async" alt="${page.bannerAlt}"><span>${page.bannerLabel}</span></a><div class="hero-grid"><div><p class="eyebrow">${page.eyebrow}</p><h1>${page.hero}</h1></div><div><p class="hero-copy">${page.intro}</p><a class="button" href="#apps">${page.cta} <span aria-hidden="true">↓</span></a></div></div></div></section>
    <section class="catalogue" id="apps" aria-labelledby="apps-title"><div class="wrap"><div class="section-intro"><div><p class="section-kicker">${page.kicker}</p><h2 id="apps-title">${page.collection}</h2></div><p>${page.collectionText}</p></div><div class="filters"><label><span class="skip">${page.searchLabel}</span><input class="search" data-search type="search" placeholder="${page.search}" aria-label="${page.searchLabel}" autocomplete="off"></label><div class="filter-row" aria-label="${page.lang === 'ja' ? 'カテゴリで絞り込む' : 'Filter by category'}">${filters}</div><p class="result-count" data-result-count data-template="${page.count}" data-singular-template="${page.countSingular}" role="status" aria-live="polite">${page.count.replace('{count}', apps.length)}</p></div><ul class="cards" role="list">${apps.map((app) => card(page, app)).join('')}</ul><div class="empty is-hidden" data-empty><p>${page.noResults}</p><button class="reset" type="button" data-reset>${page.reset}</button></div></div></section>
    <section class="belief" id="links"><div class="wrap belief-grid"><h2>${page.belief}</h2><div><p>${page.beliefText}</p><p>${page.contactText} <a class="contact-link" href="mailto:tempuraapps.support@gmail.com">tempuraapps.support@gmail.com</a>${page.contactEnd}</p></div></div></section>
  </main>
  <footer class="site-foot"><div class="wrap foot-row"><details><summary>${page.policies}</summary><p class="policy-links" aria-label="${page.policyLabel}">${policyLinks(page)}</p></details><p>© 2026 TempuraApps</p></div><p class="wrap" style="margin-top:16px">${socialLinks(page)}</p></footer>
  <script src="${page.prefix}assets/catalog.js" defer></script>
</body>
</html>
`;
}

Object.values(pages).forEach((page) => fs.writeFileSync(path.join(root, page.output), render(page)));
