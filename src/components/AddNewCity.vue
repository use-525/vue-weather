<template>
  <div class="container form-add-new">
    <input type="text" name="" id="" v-model="name_city" @keyup="getDataCity" />
    <button @click="addNew">Add New</button>
  </div>
</template>

<script>
export default {
  name: "AddNewCity",
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
    async getDataCity() {
      this.isLoading = true;
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.name_city}&units=metric&appid=${this.api_key}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status >= 400 && data.status < 600) {
            this.isLoading = false;
            console.error("Bad data from server");
          }
          this.isLoading = false;
          console.log(
            "%cAddNewCity.vue line:32 object",
            "color: #007acc;",
            data
          );
          this.dataWeather = data;
        });
    },
    addNew() {},
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
</style>
