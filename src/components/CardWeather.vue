<template>
  <div class="card__city-manager" :class="backgroundTemplate">
    <button class="removeWidget" v-if="isRemove" @click="removeWidget">
      <v-icon color="#ffffff"> mdi-minus </v-icon>
    </button>
    <div class="card__city-manager__content">
      <div class="card__city-icon">
        <img :src="iconWeather" />
      </div>
      <div class="card__city-temperature">{{ template }}°c</div>
      <div class="card__city-name">{{ nameCity }}</div>
    </div>
  </div>
</template>
<script>
import { deleteweather } from "@/firebase.js";
export default {
  name: "CardWeatherVue",
  props: {
    dataWeather: {
      type: Object,
      required: true,
    },
    isRemove: {
      default: false,
      type: Boolean,
    },
    weatherIdDB: {
      required: true,
    },
  },
  data() {
    return {
      backgroundTemplate: null,
    };
  },
  methods: {
    async removeWidget() {
      let removeWidget = await deleteweather(this.weatherIdDB);
      if (!removeWidget) {
        this.$emit("update-dataWeather", this.weatherIdDB);
      }
    },
  },
  created() {
    if ("n" == this.dataWeather.weather[0].icon.slice(2)) {
      this.backgroundTemplate = "background-night";
    }
    if (
      "d" == this.dataWeather.weather[0].icon.slice(2) &&
      this.dataWeather.main.temp >= 20
    ) {
      this.backgroundTemplate = "background-sunny";
    }
    if (
      "d" == this.dataWeather.weather[0].icon.slice(2) &&
      this.dataWeather.main.temp <= 20
    ) {
      this.backgroundTemplate = "background-snow";
    }
    if (this.dataWeather.weather[0].main == "Rain") {
      this.backgroundTemplate = "background-rain";
    }
    if (
      "n" == this.dataWeather.weather[0].icon.slice(2) &&
      this.dataWeather.main.temp <= 10
    ) {
      this.backgroundTemplate = "background-snow";
    }
  },
  computed: {
    iconWeather() {
      return `https://openweathermap.org/img/wn/${this.dataWeather.weather[0].icon}@2x.png`;
    },
    nameCity() {
      return this.dataWeather.name;
    },
    template() {
      return this.dataWeather.main.temp;
    },
  },
};
</script>
<style lang="scss" scoped>
$color-background-sunny: linear-gradient(
  133.29deg,
  #ffdf37 4.13%,
  #ff5621 108.3%
);
$color-background-rain: linear-gradient(
  138.05deg,
  #94ff98 4.49%,
  #00bdbd 97.11%
);
$color-background-night: linear-gradient(
  133.29deg,
  #fb37ff 4.13%,
  #3531ff 108.3%
);
$color-background-snow: linear-gradient(
  133.29deg,
  #ff7aa2 4.13%,
  #9021ff 108.3%
);

.card__city-manager.background-sunny {
  background: $color-background-sunny;
}
.card__city-manager.background-rain {
  background: $color-background-rain;
}
.card__city-manager.background-night {
  background: $color-background-night;
}
.card__city-manager.background-snow {
  background: $color-background-snow;
}
.card__city-manager {
  position: relative;
  box-shadow: 2px 2px 25px -9px #000000;
  .removeWidget {
    width: 30px;
    height: 30px;
    background: #000000;
    border-radius: 30px;
    position: absolute;
    right: -10px;
    top: -10px;
  }
  .card__city-manager__content {
    height: 100%;
    .card__city-icon {
      width: 50px;
      height: 50px;
      margin-left: auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .card__city-temperature {
      font-size: 35px;
      color: #ffffff;
      margin-top: 12px;
    }
    .card__city-name {
      font-size: 15px;
      color: #ffffff;
    }
  }
}
</style>
