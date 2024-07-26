<template>
  <q-page>
    <div v-if="!loading" class="row items-center justify-evenly">
      <q-card
      v-for="item in books"
      :key="item.id"
      class="col-12 col-sm-8 col-md-4 col-lg-3"
      clickable
      v-ripple
      @click="openModal(item)"
    >
      <q-card-section>
        <q-img
          :src="item.imgUrl"
          basic
          height="350px"
          class="full-width"
        />
      </q-card-section>
      <q-card-section>
        <q-card-section style="height: 7vh;">
          <q-card-title >{{ item.title }}</q-card-title>
        </q-card-section>
        <q-card-section>
          <q-card-subtitle>{{ item.author }}</q-card-subtitle>
        </q-card-section>
        <q-card-action>
          <q-rating v-model="item.avgRating" :max="5" />
          <q-card-subtitle> ({{ item.avgRating }})</q-card-subtitle>
        </q-card-action>
      </q-card-section>
    </q-card>
    </div>
    <div v-else class="row items-center justify-evenly">
      <q-card
      v-for="item in 5"
      :key="item"
      class="col-12 col-sm-8 col-md-4 col-lg-3"
    >
      <q-card-section>
        <q-skeleton
          style="height: 350px; width: 100%"
          animation="wave"
        />
      </q-card-section>
      <q-card-section>
        <q-item-label>
          <q-skeleton type="text" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" />
        </q-item-label>
      </q-card-section>
    </q-card>
    </div>

    <q-dialog v-model="modalOpen" persistent>
      <q-card style="width: 55vw;">
          <q-card-section>
          <q-card-title class="text-h4">{{ modalItem?.title }}</q-card-title>
        </q-card-section>
        <q-card-section v-for="item in modalItem?.interactions" v-bind:key="item.id">
          <div class="text-h6">{{ item.user.name }}</div>
          <div><q-rating readonly v-model="item.rating" :max="5" /> ({{ item.rating }})</div>
          <q-card-section>{{ item.comment }}</q-card-section>
        </q-card-section>
        <q-card-section align="center">
          <div><q-rating v-model="newInteraction!.rating" :max="5" /> ({{ newInteraction?.rating }})</div>
          <q-input v-model="newInteraction!.comment" label="Comentário" />
          <q-select
            v-model="selectedStatus"
            :options="statuses.map((e) => e.status)"
            label="Status"
            use-input
          />
          <q-checkbox v-model="newInteraction!.bookmarked" label="Adicionar a minha biblioteca" />
        </q-card-section>
        <q-card-actions align="center" class="justify-evenly">
          <q-btn label="Salvar" color="primary" @click="saveInteraction" />
          <q-btn label="Fechar" color="grey" @click="closeModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { Book, Interaction, Status } from 'src/model/interfaces';
import useApi from 'src/service/apiService';
import { useUserStore } from 'src/stores/userStore';
import { ref } from 'vue';

defineOptions({
  name: 'HomePage'
});

const { api } = useApi();

api.get('/book/byRating').then((res) => {
  books.value = res.data;
  loading.value = false;
});

const selectedStatus = ref();
const { user, isLoggedIn } = useUserStore();
const loading = ref(true);
const books = ref<Book[]>();
const modalOpen = ref(false);
const modalItem = ref<Book>();

const newInteraction = ref<Interaction>();

const statuses = ref<Status[]>([
  { id: 1, status: 'Lido' },
  { id: 2, status: 'Lendo' },
  { id: 3, status: 'Quero ler' },
]);

const openModal = (item: Book) => {
  newInteraction.value = { comment: '', rating: 0 , user: user, book: item, bookmarked: false, id: 0, status: {id: 0, status: ''} };
  modalItem.value = item;
  modalOpen.value = true;
};

const closeModal = () => {
  newInteraction.value = undefined;
  modalOpen.value = false;
};

function saveInteraction() {
  if(!isLoggedIn){
    alert('Você precisa estar logado para salvar uma interação!');
  }
  const interaction = { ...newInteraction.value, status: statuses.value.find((e) => e.status === selectedStatus.value) };
  api.post('/book/saveInteraction', interaction);
}
</script>
