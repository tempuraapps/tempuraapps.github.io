const apps = [
  {
    slug: 'ai-noritsugi', category: 'tools',
    ja: ['AIノリツギ', 'AI間のコンテキスト引き継ぎ', '次のAIへ、コンテキストを乗り継ごう。'],
    en: ['AI Noritsugi - AI Transfer', 'Carry context between AIs', 'Pass context to the next AI.']
  },
  {
    slug: 'michiaruki', category: 'outings',
    ja: ['未知あるき', '散歩の記録アプリ', '知らない道を、歩きにいこう。'],
    en: ['MichiAruki – New Paths', 'Walk tracking', 'Walk somewhere new.']
  },
  {
    slug: 'asalog', category: 'records',
    ja: ['朝ログ', '毎朝の目覚めの記録', '毎朝5秒。目覚めの良さを記録しよう。'],
    en: ['AsaLog', 'A log of how you wake up', 'Five seconds each morning. Log how well you woke up.']
  },
  {
    slug: 'fukumeguri', category: 'outings',
    ja: ['服メグリ', '服屋めぐりの記録', '好きな店を、めぐりにいこう。'],
    en: ['FukuMeguri', 'Shop-hopping journal', 'Go visit the shops you love.']
  },
  {
    slug: 'ichinichiichizen', category: 'records',
    ja: ['一日一善', '1日ひとつの善行日記', '毎日一つ、世界を少し良くする'],
    en: ['One Good Deed', 'A one-a-day good deed diary', 'One a day, and the world gets a little better.']
  },
  {
    slug: 'oshimachi', category: 'outings', comingSoon: true,
    ja: ['推し街さがし', '住みたい街さがしの記録', '住みたいほど好きな街を、自分でさがそう。'],
    en: ['OshiMachi', 'Rating towns you might live in', 'Find the town you’d call home.']
  },
  {
    slug: 'pitawari', category: 'life',
    ja: ['ピタワリ', '明細ごとの割り勘', '割り勘、ぴたっと。'],
    en: ['Pitawari', 'Split the bill by line item', 'Split it, to the last unit.']
  },
  {
    slug: 'reeddiary', category: 'tools', comingSoon: true,
    ja: ['リード日記', 'ダブルリードの管理', '本番の成功は、リード管理から。'],
    en: ['Reed Diary', 'A diary for double reeds', 'A good performance starts with good reeds.']
  },
  {
    slug: 'omoimekuri', category: 'records',
    ja: ['おもいめくり', '写真テーマの日めくり', '大切な一枚が、今日のあなたに会いにくる。'],
    en: ['OmoiMekuri', 'A daily photo from a theme you choose', 'The photo that matters, comes to find you today.']
  },
  {
    slug: 'tastock', category: 'life',
    ja: ['TASTOCK', '珍しい調味料の記録', 'いつもの料理に、まだ知らない味を。'],
    en: ['TASTOCK', 'A record of unusual seasonings', "Bring a flavor you don't know yet to everyday cooking."]
  },
  {
    slug: 'kajidori', category: 'life', comingSoon: true,
    ja: ['カジドリ', '家事分担アプリ', '家事を分けて、時間でまわす。'],
    en: ['Kajidori', 'A chore-splitting app', 'Split the chores, run them by time.']
  },
  {
    slug: 'osoujiaizu', category: 'life', comingSoon: true,
    ja: ['おそうじ合図', '掃除の周期リマインダー', '掃除する日を、覚えておかなくていい。'],
    en: ['OsoujiAizu', 'A cleaning-cycle reminder', "You don't have to remember cleaning day."]
  },
  {
    slug: 'ainokori', category: 'tools', comingSoon: true,
    ja: ['AINOKORI', 'AI開発ツールの残量管理', 'AIの残りを、ひと目で。'],
    en: ['AINOKORI', 'AI coding usage monitor', 'See what your AI has left.']
  }
];

module.exports = { apps };
