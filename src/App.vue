<template>
  <div class="container">
    <TabMenu :model="items">
    </TabMenu>
  </div>
  <Terminal
      welcomeMessage="Welcome. Список команд: list"
      prompt="nvs $"
      aria-label="Terminal"
  />
  <Sidebar v-model:visible="linksVisible" header="Links" position="bottom" style="height: auto">
    <Menubar v-if="!$isMobile()" :model="links"/>
    <Menu v-else :model="links"/>
  </Sidebar>

  <Dialog v-model:visible="showContactDialog" modal header="Contact me" :style="{ width: '25rem' }">
    <div class="mb">
      <Textarea placeholder="Текст для контактной информации" :invalid="invalidContactText" v-model="contactText" rows="5" cols="30"/>
    </div>
    <div class="mb">
      <Button type="button" label="Отправить" severity="contrast" @click="sendContactMe"></Button>
    </div>
  </Dialog>
  <Toast/>
</template>
<script>
import Terminal from "primevue/terminal";
import TerminalService from "primevue/terminalservice";
import Menubar from "primevue/menubar";
import TabMenu from "primevue/tabmenu";
import Dialog from "primevue/dialog";
import Sidebar from "primevue/sidebar";
import Menu from "primevue/menu";
import Button from "primevue/button";
import Dock from "primevue/dock";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";

export default {
  components: {
    Menubar,
    Terminal,
    TabMenu,
    Dialog,
    Sidebar,
    Menu,
    Button,
    Dock,
    Textarea,
    Toast
  },
  mounted() {
    TerminalService.on('command', (command) => {
      switch (command.toLowerCase()) {
        case 'list': {
          this.list()
          break;
        }
        case 'about': {
          this.about()
          break;
        }
        case 'links': {
          this.showLinks()
          break;
        }
        case 'contact-me': {
          this.showContactMe()
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
          label: 'Terminal',
        }
      ],
      links: [
        {
          label: 'Github',
          icon: "pi pi-github",
          url: 'https://github.com/novikovvs'
        },
        {
          label: 'VK',
          icon: "pi pi-share-alt",
          url: 'https://vk.com/gameboii'
        },
        {
          label: 'Telegram',
          icon: "pi pi-telegram",
          url: 'https://t.me/its_treatable'
        },
        {
          label: 'Email',
          icon: "pi pi-at",
          url: 'mailto:vladonnx@mail.ru'
        },
        {
          label: 'YA.Music',
          icon: "pi pi-headphones",
          url: 'https://music.yandex.ru/artist/18391903'
        }
      ],
      linksVisible: false,
      showContactDialog: false,
      contactText: '',
      invalidContactText: false,
    }
  },
  methods: {
    showLinks() {
      TerminalService.emit('response', `Открываю ссылки...`)
      setTimeout(() => {
        this.linksVisible = true;
      }, 500);

    },
    about() {
      TerminalService.emit('response', 'Здравствуйте! Меня зовут Влад, и я опытный PHP-разработчик с более чем 3-летним опытом работы, специализирующийся на фреймворке Laravel. Моя цель — создавать высококачественное программное обеспечение, которое не только соответствует требованиям заказчика, но и эффективно решает поставленные задачи.\n' +
          '\n' +
          'Мои навыки включают глубокие знания Laravel, понимание принципов ООП и SOLID, а также опыт работы с базами данных MySQL/PostgreSQL. Кроме того, я имею опыт работы с Docker для контейнеризации приложений, Redis для кэширования и управления сессиями, а также понимание паттернов DDD (Domain-Driven Design).\n' +
          '\n' +
          'Я также обладаю опытом интеграции с внешними API и разработки пользовательских интерфейсов с использованием HTML, CSS и JavaScript/Vue2-3. Мои коммуникативные навыки помогают мне эффективно работать в команде и взаимодействовать с заказчиками.\n' +
          '\n' +
          'Я стремлюсь к профессиональному росту и всегда готов изучать новые технологии и подходы. Уверен, что могу внести ценный вклад, развивая проекты и обеспечивая их успешную реализацию. Готов принять новые вызовы и участие в интересных проектах.\n' +
          '\n' +
          'Буду рад вместе создавать инновационное программное обеспечение!\n')
    },
    list() {
      TerminalService.emit('response', 'Доступные команды: about, links, contact-me')
    },
    showContactMe() {
      this.invalidContactText = false
      TerminalService.emit('response', `Открываю контактную форму...`)
      setTimeout(() => {
        this.showContactDialog = true;
      }, 500);
    },
    sendContactMe() {
      if (this.contactText.length <= 0) {
        this.invalidContactText = true
        this.$toast.add({
          severity: 'error',
          summary: 'Заполните поле "Текст"',
          life: 2000,
        })
        return
      }
      this.$axios.post('/alerts/contact-me', {
        text: this.contactText
      }).then(() => {
        this.$toast.add({
          severity: 'success',
          summary: 'Обратная связь отправлена!',
          life: 2000,
        })

        setTimeout(() => {
          this.showContactDialog = false;
        }, 500);
      }).catch(() => {
        this.$toast.add({
          severity: 'error',
          summary: 'Не удалось отправить форму!',
          life: 2000,
        })
      });
    },
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

.mb {
  margin-bottom: 10px
}

.p-menuitem-link {
  font-family: Rocket Pop, serif;
}

.p-dialog-title {
  font-family: Rocket Pop, serif;
}

.p-sidebar-header-content {
  font-family: Rocket Pop, serif;
}

.container {
  padding-bottom: 10px;
}
</style>
