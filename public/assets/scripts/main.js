import { SafaRouter } from 'safa-router'
import headerComponent from '../../pages/components/Header.js'
import footerComponent from '../../pages/components/Footer.js'

const loadingOverlay = document.createElement('div')
loadingOverlay.className = 'loading-overlay'
loadingOverlay.innerHTML = '<div class="loading-spinner"></div>'
document.body.appendChild(loadingOverlay)

const router = new SafaRouter({
  target: '#app',
  pageDir: 'public/pages',
  components: {
    header: headerComponent,
    footer: footerComponent,
  },
  errors: {
    pageDir: 'public/pages/errors',
    stackTraces: false,
  },
  realtime: {
    enabled: true,
    mode: 'sse',
  },
  titleTemplate: '%s — وبلاگ برنامه‌نویسی',
  transitionDuration: 300,
  transitionEnterClass: 'page-enter',
  transitionExitClass: 'page-exit',
  transitionEnterActiveClass: 'page-enter-active',
  transitionExitActiveClass: 'page-exit-active',
})

let loadingTimeout

router.onBeforeNavigate(() => {
  clearTimeout(loadingTimeout)
  loadingTimeout = setTimeout(() => loadingOverlay.classList.add('active'), 300)
})

router.afterEach(() => {
  clearTimeout(loadingTimeout)
  loadingOverlay.classList.remove('active')
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el))
  const contactForm = document.querySelector('.contact-form')
  if (contactForm) attachFormHandler(contactForm)
  const ctaForm = document.querySelector('.cta__form')
  if (ctaForm) attachFormHandler(ctaForm, { successMsg: 'عضویت شما با موفقیت ثبت شد.' })
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.15 })

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

const mutationObserver = new MutationObserver(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el))
})
mutationObserver.observe(document.getElementById('app'), { childList: true, subtree: true })

function attachFormHandler(form, { successMsg = 'پیام شما با موفقیت ارسال شد.', reset = true } = {}) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputs = form.querySelectorAll('input, textarea')
    let valid = true
    inputs.forEach(inp => {
      if (inp.hasAttribute('required') && !inp.value.trim()) {
        inp.style.borderColor = 'var(--color-danger)'
        valid = false
      } else {
        inp.style.borderColor = ''
      }
      if (inp.type === 'email' && inp.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) {
        inp.style.borderColor = 'var(--color-danger)'
        valid = false
      }
    })
    if (!valid) return
    const btn = form.querySelector('button[type="submit"]')
    const orig = btn.textContent
    btn.disabled = true; btn.textContent = '...'
    setTimeout(() => {
      btn.disabled = false; btn.textContent = orig
      if (reset) form.reset()
      alert(successMsg)
    }, 800)
  })
}

router.start()
