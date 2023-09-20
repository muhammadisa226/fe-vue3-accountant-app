<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <RouterLink
          :to="{ name: 'transaction.index' }"
          class="btn btn-outline-secondary btn-sm rounded shadow mb-3"
          >Back</RouterLink
        >
        <div class="card rounded shadow">
          <div class="card-header">Edit Transaction</div>
          <div class="card-body">
            <form @submit.prevent="update()">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  v-model="transaction.title"
                  type="text"
                  class="form-control"
                  id="title"
                  autofocus
                />
                <div v-if="validation.title" class="text-danger">
                  {{ validation.title[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label for="amount" class="form-label">Amount</label>
                <input
                  v-model="transaction.amount"
                  type="number"
                  class="form-control"
                  id="amount"
                />
                <div v-if="validation.amount" class="text-danger">
                  {{ validation.amount[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label for="time" class="form-label">Time</label>
                <input
                  v-model="transaction.time"
                  type="text"
                  class="form-control"
                  id="time"
                  placeholder="yyyy-mm-dd hh:mm:ss"
                />
                <div v-if="validation.time" class="text-danger">
                  {{ validation.time[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label for="type" class="form-label">Type</label>
                <select
                  id="type"
                  class="form-select"
                  v-model="transaction.type"
                >
                  <option value="expense">Expense</option>
                  <option value="revenue">Revenue</option>
                </select>
                <div v-if="validation.type" class="text-danger">
                  {{ validation.type[0] }}
                </div>
              </div>
              <button class="btn btn-outline-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
let transaction = reactive({
  title: "",
  amount: "",
  time: "",
  type: "",
});
const validation = ref([]);
const router = useRouter();
const route = useRoute();

onMounted(() => {
  axios
    .get(import.meta.env.VITE_URL_API + `/${route.params.id}`)
    .then((result) => {
      transaction.title = result.data.data.title;
      transaction.amount = result.data.data.amount;
      transaction.time = result.data.data.time;
      transaction.type = result.data.data.type;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
});

const update = () => {
  axios
    .put(import.meta.env.VITE_URL_API + `/${route.params.id}`, transaction)
    .then(() => {
      router.push({
        name: "transaction.index",
      });
    })
    .catch((err) => {
      validation.value = err.response.data;
    });
};
</script>
