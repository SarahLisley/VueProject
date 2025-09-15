// filepath: /home/sarah/vueproject/src/plugins/vuetify.ts
import 'vuetify/styles' // Já importado, ótimo!
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components' // <-- IMPORTANTE: Importa todos os componentes
import * as directives from 'vuetify/directives' // <-- IMPORTANTE: Importa todas as diretivas
import '@mdi/font/css/materialdesignicons.css' // <-- Sugestão: Importa os ícones do Material Design

export default createVuetify({
  components, // <-- IMPORTANTE: Registra os componentes
  directives, // <-- IMPORTANTE: Registra as diretivas
  icons: {
    defaultSet: 'mdi', // <-- Sugestão: Define o conjunto de ícones padrão
  },
})
