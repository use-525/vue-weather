<template>
  <div class="container city-management-container">
    <h2>Weather Widget Managernt</h2>
    <div class="list__city-manager">
      <MyLds v-if="!isLoading" />
      <CardWeatherVue
        v-for="weather in listWeather"
        :dataWeather="weather.weatherData"
        :key="weather.index"
        :isRemove="true"
        :weatherIdDB="weather.weatherIdDB"
        @update-dataWeather="updateDataWeather"
      />
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
import { useLoadweathers } from "@/firebase.js";
import MyLds from "./MyLds.vue";
export default {
  components: {
    CardWeatherVue,
    MyLds,
  },
  data() {
    return {
      listWeather: [],
      api_url:
        "https://api.openweathermap.org/data/2.5/weather?q=HaNoi&units=metric&appid=",
      api_key: "cc02418d8eedb2ccfe78901273f6207b",
      isLoading: false,
    };
  },
  created() {
    this.getAllData();
  },
  methods: {
    async getAllData() {
      let dataWeatherDataBase = await useLoadweathers();
      dataWeatherDataBase.value?.forEach(async (data) => {
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${data.data.id}&units=metric&appid=${this.api_key}`
        );
        let weather = await response.json();
        this.listWeather.push({
          weatherIdDB: data.id,
          weatherData: weather,
        });
        if (this.listWeather.length == dataWeatherDataBase.value?.length) {
          this.isLoading = true;
        }
      });
      this.isLoading = true;
    },
    openViewAddNew() {
      this.$router.push({ name: "add-new-city" });
    },
    updateDataWeather($event) {
      this.listWeather = this.listWeather.filter(
        (data) => data.weatherIdDB != $event
      );
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
