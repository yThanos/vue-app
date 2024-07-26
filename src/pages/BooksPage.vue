<template>
  <q-page>
    <div v-if="!loading" class="row items-center justify-evenly">
      <q-card
      v-for="item in interactions"
      :key="item.id"
      class="col-12 col-sm-8 col-md-4 col-lg-3"
      clickable
      v-ripple
    >
      <q-card-section>
        <q-img
          :src="item.book.imgUrl"
          basic
          height="350px"
          class="full-width"
        />
      </q-card-section>
      <q-card-section>
        <q-card-section style="height: 7vh;">
          <q-card-title >{{ item.book.title }}</q-card-title>
        </q-card-section>
        <q-card-section>
          <q-card-subtitle>{{ item.book.author }}</q-card-subtitle>
        </q-card-section>
        <q-card-action>
          <q-rating v-model="item.book.avgRating" :max="5" />
          <q-card-subtitle> ({{ item.book.avgRating }})</q-card-subtitle>
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
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Interaction } from 'src/model/interfaces';
import useApi from 'src/service/apiService';
import { useUserStore } from 'src/stores/userStore';

const { api } = useApi();
const { user } = useUserStore();
const interactions = ref<Interaction[]>();
const loading = ref(true);

api.get(`/book/bookmarked/${user.id}`).then((res) => {
  interactions.value = res.data;
  loading.value = false;
});
</script>
