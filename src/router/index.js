import { createRouter, createWebHistory } from "vue-router";
import AddNewCity from "@/components/AddNewCity.vue";
import CityManagement from "@/components/CityManagement.vue";
import WeatherCity from "@/components/WeatherCity.vue";

const routes = [
  { path: "/", component: CityManagement ,name: "home-app"},
  { path: "/add-new-city", component: AddNewCity ,name: "add-new-city"},
  { path: "/city/:name", component: WeatherCity ,name: "city"},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
