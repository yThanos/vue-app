<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-actions align="left">
        <q-btn flat dense to="/login" icon="arrow_back" label="Voltar" />
      </q-card-actions>
      <q-card-section>
        <q-card>
          <q-card-section>
            <q-form @submit="register">
              <q-input
                v-model="name"
                label="Nome"
                type="text"
                outlined
                lazy-rules
                :rules="[(val) => !!val || 'Please enter your name']"
              />
              <q-input
                v-model="email"
                label="Email"
                type="email"
                outlined
                lazy-rules
                :rules="[(val) => !!val || 'Please enter your email']"
              />
              <q-input
                v-model="password"
                label="Senha"
                type="password"
                outlined
                lazy-rules
                :rules="[(val) => !!val || 'Please enter your password']"
              />
              <q-btn
                type="submit"
                color="secondary"
                label="Criar"
                class="q-mt-md"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createAcc } from 'src/service/loginService';

const name = ref('');
const email = ref('');
const password = ref('');

const router = useRouter();

function register() {
  createAcc({
    name: name.value,
    email: email.value,
    password: password.value,
    token: '',
  });
  router.push('/');
}
</script>
