import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'
import router from './router'
import { VPie } from 'vuetify/labs/VPie'

const vuetify = createVuetify({
  components: {
    VPie,
    ...components,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
