<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model="email"
            label="Email"
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
            label="Login"
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>
      <q-card-actions>
        <q-btn align="left" flat dense to="/register" label="Criar conta!" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { login } from 'src/service/loginService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');

function onSubmit() {
  login(email.value, password.value).then((e) => {
    if (e) {
      router.push('/');
    }
  });
}
</script>
