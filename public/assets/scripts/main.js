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

router.start()
