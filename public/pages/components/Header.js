export default function headerComponent({ path }) {
  const links = [
    { href: '/', label: 'خانه' },
    { href: '/blog', label: 'وبلاگ' },
    { href: '/images', label: 'گالری' },
    { href: '/about', label: 'درباره ما' },
    { href: '/contact', label: 'تماس با ما' },
  ]
  return `
      <a href="/" data-safa-link class="header__logo">وبلاگ</a>
      <div class="header__search">
        <button class="header__search-toggle" aria-label="جستجو" type="button">🔍</button>
        <div class="header__search-dropdown">
          <input class="header__search-input" type="text" placeholder="جستجو در مطالب..." aria-label="عبارت جستجو">
        </div>
      </div>
      <input type="checkbox" id="menu-toggle" class="header__toggle">
      <label for="menu-toggle" class="header__hamburger">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <div class="header__nav-wrapper">
        <nav class="header__nav">
          <ul class="header__nav--links">
            ${links.map(l => `<li><a href="${l.href}" data-safa-link class="${path === l.href ? 'header__nav--link-path' : 'header__nav--link'}">${l.label}</a></li>`).join('')}
          </ul>
        </nav>
        <div class="header__auth">
          <button class="header__auth--button">ورود | ثبت نام</button>
        </div>
      </div>
  `
}
