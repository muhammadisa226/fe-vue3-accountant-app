<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-8">
        <RouterLink
          :to="{ name: 'transaction.create' }"
          class="btn btn-outline-primary btn-sm rounded shadow mb-3"
          >Create</RouterLink
        >
        <div class="card rounded shadow">
          <div class="card-header">Transaction List</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(transaction, index) in transactions.data"
                  :key="index"
                >
                  <td>{{ transaction.title }}</td>
                  <td>{{ transaction.amount }}</td>
                  <td>{{ transaction.type }}</td>
                  <td>
                    <div class="btn-group">
                      <RouterLink
                        :to="{
                          name: 'transaction.edit',
                          params: { id: transaction.id },
                        }"
                        class="btn btn-sm btn-outline-info"
                        >Edit</RouterLink
                      >
                      <button
                        @click.prevent="destroy(transaction.id, index)"
                        class="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
import { onMounted, ref } from "vue";
// reactive state
const transactions = ref([]);
onMounted(() => {
  // get data from api
  axios
    .get(import.meta.env.VITE_URL_API)
    .then((result) => {
      transactions.value = result.data;
    })
    .catch((err) => {
      console.log(err.response);
    });
});
const destroy = (id, index) => {
  axios
    .delete(import.meta.env.VITE_URL_API + `/${id}`)
    .then(() => {
      transactions.value.data.splice(index, 1);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
</script>
