<template>
  <div class="container form-add-new">
    <input
      type="text"
      name=""
      id=""
      v-model="name_city"
      @keypress="getDataCity($event)"
    />
    <button @click="addNew" :disabled="!dataWeather">Add New</button>
    <MyLds v-if="isLoading && !dataWeather" />
    <div class="">
      <CardWeatherVue v-if="dataWeather" :dataWeather="dataWeather" />
    </div>
  </div>
</template>

<script>
import CardWeatherVue from "./CardWeather.vue";
import MyLds from "./MyLds.vue";
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
    addNew() {
      let listDataWeather = [];
      let listDataWeatherCache = JSON.parse(
        localStorage.getItem("dataWeather")
      );
      if (listDataWeatherCache) {
        listDataWeatherCache.push(this.dataWeather);

        if (
          listDataWeatherCache.find((x) => x.id == this.dataWeather.id) != undefined
        ) {
          return true;
        }

        localStorage.setItem(
          "dataWeather",
          JSON.stringify(listDataWeatherCache)
        );
      } else {
        console.log(this.dataWeather);
        listDataWeather.push(this.dataWeather);
        localStorage.setItem("dataWeather", JSON.stringify(listDataWeather));
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
  input {
    height: 30px;
    max-width: 60%;
    margin: auto;
    border-radius: 5px;
    border: 1px solid #333;
    margin-bottom: 10px;
    padding: 15px;
  }
  button {
    width: 60%;
    margin: auto;
    text-align: center;
    padding: 7px;
    border-radius: 5px;
    border: 1px solid #333;
  }
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
