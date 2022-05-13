<template>
  <div class="container form-add-new">
    <div class="" style="margin-bottom: 10px">
      <router-link :to="'/'">Back to weather widget</router-link>
    </div>
    <v-text-field
      v-model="name_city"
      @keypress="getDataCity($event)"
      :success-messages="['Success']"
      success
    ></v-text-field>
    <v-btn
      depressed
      elevation="2"
      raised
      :disabled="!dataWeather"
      color="primary"
      @click="addNew"
      >Add New</v-btn
    >

    <MyLds v-if="isLoading && !dataWeather" />
    <div class="">
      <CardWeatherVue v-if="dataWeather" :dataWeather="dataWeather" />
    </div>
  </div>
</template>

<script>
import CardWeatherVue from "./CardWeather.vue";
import MyLds from "./MyLds.vue";
import Notify from "simple-notify";
import { createweather, useLoadweathers } from "@/firebase.js";

export default {
  name: "AddNewCity",
  components: {
    CardWeatherVue,
    MyLds,
  },
  data() {
    return {
      name_city: null,
      api_url:
        "https://api.openweathermap.org/data/2.5/weather?q=HaNoi&units=metric&appid=",
      api_key: "cc02418d8eedb2ccfe78901273f6207b",
      isLoading: false,
      dataWeather: null,
    };
  },
  methods: {
    async getDataCity($event) {
      if ($event.charCode === 13) {
        this.isLoading = true;
        this.dataWeather = null;
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.name_city}&units=metric&appid=${this.api_key}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.cod >= 400 && data.cod < 600) {
              this.isLoading = false;
              this.dataWeather = null;
              return;
            }
            this.isLoading = false;
            this.dataWeather = data;
          })
          .catch((error) => {
            console.error(error.message);
            this.dataWeather = null;
          });
      }
    },
    async addNew() {
      this.dataWeather = {
        id: this.dataWeather.id,
        main: this.dataWeather.main,
        weather: this.dataWeather.weather,
        name: this.dataWeather.name,
      };
      try {
        let allWeather = await useLoadweathers();
        let checkAllData = allWeather.value?.filter(
          (weather) => weather.id == this.dataWeather.id
        );
        if (checkAllData.length > 0) {
          new Notify({
            status: "warning",
            title: "Weather City Already Exist",
            effect: "fade",
            speed: 300,
            customClass: null,
            customIcon: null,
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 3000,
            gap: 20,
            distance: 20,
            type: 1,
            position: "right top",
          });
        } else {
          createweather(this.dataWeather)
            .then((weather) => {
              console.log(weather)
              new Notify({
                status: "success",
                title: "Weather City Add New Success",
                effect: "fade",
                speed: 300,
                customClass: null,
                customIcon: null,
                showIcon: true,
                showCloseButton: true,
                autoclose: true,
                autotimeout: 3000,
                gap: 20,
                distance: 20,
                type: 1,
                position: "right top",
              });
            })
            .catch((error) => {
              console.log(
                "%cAddNewCity.vue line:103 error",
                "color: #007acc;",
                error
              );
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-add-new {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 100px;
}
.card__city-manager {
  width: 50%;
  height: 182px;
  border-radius: 25px;
  padding: 15px;
  margin: auto;
  margin-top: 30px;
}
</style>
