<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Generic front </q-toolbar-title>

        <q-item v-if="isUserLogged">
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { storeToRefs } from 'pinia';
import { DrawerItem } from 'src/model/interfaces';

defineOptions({
  name: 'MainLayout',
});

const store = useUserStore();
const { user, isLoggedIn } = storeToRefs(store);
const isUserLogged = ref(false);
const active = ref(1);

watch(isLoggedIn, (isLoggedIn) => {
  isUserLogged.value = isLoggedIn;
});

const menuItems = ref<DrawerItem[]>([
  { icon: 'home', label: 'Início', id: 1, route: '/', disabled: false },
  {
    icon: 'book',
    label: 'Livros',
    id: 3,
    route: '/books',
    disabled: false,
  },
  {
    icon: 'settings',
    label: 'Configurações',
    id: 2,
    route: '/settings',
    disabled: false,
  },
]);

const leftDrawerOpen = ref(true);
</script>
