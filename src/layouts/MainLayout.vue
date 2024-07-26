<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />
        <q-toolbar-title> Generic front </q-toolbar-title>

        <q-item v-if="isLoggedIn" clickable v-ripple @click="toggleRightDrawer">
          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-avatar icon="menu" />
          </q-item-section>
        </q-item>

        <q-item v-else clickable v-ripple to="/login" active-class="white">
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-avatar icon="login" />
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list separator>
        <q-item
          clickable
          v-ripple
          v-for="item in menuItems"
          :key="item.id"
          :active="active == item.id"
          active-class="my-menu-link"
          :to="item.route"
          :disable="item.disabled"
        >
          <q-item-section avatar>
            <q-avatar
              :icon="item.icon"
              :size="active == item.id ? '40px' : '30px'"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer
      v-if="isLoggedIn"
      v-model="rightDrawerOpen"
      side="right"
      elevated
      overlay
    >
      <q-item clickable v-ripple @click="toggleRightDrawer">
        <q-item-section avatar>
          <q-avatar icon="close" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Fechar</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="sair">
        <q-item-section avatar>
          <q-avatar icon="logout" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Sair</q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { DrawerItem } from 'src/model/interfaces';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { logout } from 'src/service/loginService';

defineOptions({
  name: 'MainLayout',
});

const route = useRoute();
const data = useUserStore();
const { user, isLoggedIn } = storeToRefs(data);
const router = useRouter();
const active = ref(1);

watch(
  () => route.path,
  (path) => {
    const item = menuItems.value.find((e) => e.route === path);
    if (item) {
      active.value = item.id;
    } else {
      active.value = 0;
    }
  },
);


const menuItems = ref<DrawerItem[]>([
  { icon: 'home', label: 'Início', id: 1, route: '/', disabled: false },
  {
    icon: 'book',
    label: 'Meus livros',
    id: 2,
    route: '/books',
    disabled: false,
  },
  {
    icon: 'settings',
    label: 'Configurações',
    id: 3,
    route: '/settings',
    disabled: false,
  },
]);

const rightDrawerOpen = ref(false);

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

function sair() {
  active.value = 1;
  router.push('/');
  logout();
}

const leftDrawerOpen = ref(true);
</script>
