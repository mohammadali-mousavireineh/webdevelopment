import { SafaRouter } from 'safa-router'
import headerComponent from '../../pages/components/Header.js'
import footerComponent from '../../pages/components/Footer.js'

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

router.start()
