<template>
  <div class="container">
    <Menubar :model="items">
    </Menubar>
  </div>
  <Terminal
      welcomeMessage="Welcome to vladislav-novikov.ru"
      prompt="novikov.vs $"
      aria-label="PrimeVue Terminal Service"
  />
</template>
<script>
import Terminal from "primevue/terminal";
import TerminalService from "primevue/terminalservice";
import Menubar from "primevue/menubar";

export default {
  components: {
    Menubar,
    Terminal
  },
  mounted() {
    TerminalService.on('command', (command) => {
      switch (command) {
        case 'help': {
          TerminalService.emit('response', 'Доступные команды: about')
          // TerminalService.emit('response','about')
          break;
        }
        default: {
          TerminalService.emit('response', `Неизвестная команда: ${command}`)
          break;
        }
      }
    })
  },
  data() {
    return {
      items: [
        {
          label: '>>  Terminal',
        }
      ]
    }
  },
  name: "App"
}
</script>
<style lang="scss">
@import 'primeicons/primeicons.css';

@font-face {
  font-family: "Rocket Pop";
  src: url("@/assets/fonts/rocketpophalf.otf");
}

.p-menuitem-link {
  font-family: Rocket Pop, serif;
}

.container {
  padding-bottom: 10px;
}
</style>
