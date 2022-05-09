<template>
  <div class="container city-management-container">
    <h2>City Managernt</h2>
    <div class="list__city-manager">
      <CardWeatherVue v-for="city in list_city" :key="city.index" />
      <div
        class="card__city-manager card__city-add-new"
        @click="openViewAddNew"
      >
        <div class="card__city-manager__content">
          <div class="card__city-add-new-icon">
            <img src="../assets/icon/add-new.svg" alt="" srcset="" />
          </div>
          <div class="card__city-add-new-title">Add New City</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardWeatherVue from "./CardWeather.vue";
export default {
  components: {
    CardWeatherVue,
  },
  data() {
    return {
      list_city: [1, 2, 3, 4],
      api: "https://api.openweathermap.org/data/2.5/weather?q=HaNoi&units=metric&appid=cc02418d8eedb2ccfe78901273f6207b",
    };
  },
  methods: {
    openViewAddNew() {
      this.$router.push({ name: "add-new-city" });
    },
  },
};
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 45px;
}
.list__city-manager {
  padding: 0px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 15px;
  .card__city-manager {
    min-width: 50%;
    height: 182px;
    border-radius: 25px;
    padding: 15px;
  }
  .card__city-manager.card__city-add-new {
    background: none;
    border: 0.5px solid #989898;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 17px 30px;
    .card__city-manager__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .card__city-add-new-icon {
      width: 50px;
      height: 50px;
      margin-bottom: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .card__city-add-new-title {
      font-size: 14px;
    }
  }
}
</style>
