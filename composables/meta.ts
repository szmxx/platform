export function useSiteMeta() {
  const SiteName = '猫染'
  const SiteUrl = 'https://tool.aitimi.cn'
  const SiteImage = '/maskable-icon.png'
  const SiteLogo = '/maskable-icon.png'
  const SiteKeyWords = '工具、国庆头像、转盘抽奖、苹果营销'
  const SiteLanguage = 'zh-CN'
  const SiteOrgImage =
    'https://res.cloudinary.com/dcro7qdzl/image/upload/f_auto,q_auto:best,dpr_auto/assets/bg.png'

  const SiteDescription = '一个有趣的工具站'
  const SameAs = ['https://github.com/szmxx/']

  return {
    name: SiteName,
    description: SiteDescription,
    sameAs: SameAs,
    image: SiteImage,
    orgImage: SiteOrgImage,
    logo: SiteLogo,
    lang: SiteLanguage,
    host: SiteUrl,
    keywords: SiteKeyWords,
  }
}
