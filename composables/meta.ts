export function useSiteMeta() {
  const SiteName = '猫染'
  const SiteUrl = 'https://tool.aitimi.cn'
  const SiteImage = '/maskable-icon.png'
  const SiteLogo = '/maskable-icon.png'
  const SiteKeyWords = '工具、国庆头像、转盘抽奖、苹果营销'
  let SiteLanguage = 'zh-CN'

  const SiteDescription = '一个有趣的工具站'
  const SameAs = ['https://github.com/szmxx/']

  return {
    name: SiteName,
    description: SiteDescription,
    sameAs: SameAs,
    image: SiteImage,
    logo: SiteLogo,
    lang: SiteLanguage,
    host: SiteUrl,
    keywords: SiteKeyWords,
  }
}
