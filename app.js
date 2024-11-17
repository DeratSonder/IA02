import { comHeader, comNav, comTopRevenue, comMostPopular, comFooter } from "./layout.js"
import { computed } from "vue"
import * as DBProvier from './DBProvider.js'

export default {

    data() {
        return {
            topRevenue: [],
            mostPopular: [],
            topRating: []

        }
    },

    provide() {
        return {
            topRevenue: computed(() => this.topRevenue),
            mostPopular: computed(() => this.mostPopular),
            topRating: computed(() => this.topRating)

        }
    },

    mounted() {
        const db = DBProvier.DBProvier();
        this.topRevenue = db.fetch('get/topboxoffice/?per_page=5&page=1')
    },

    methods: {
        

    },

    components: {
        comHeader,
        comNav,
        comTopRevenue,
        comMostPopular,
        comFooter

    },


    template: `
     <div class="container-custom mx-auto">
        <!-- Header -->
        <comHeader/>

        <!-- Navigation Bar -->
        <comNav/>
        

    <!-- Main -->
    <div class="column mt-2 bg-danger">

      <!-- First Carousel -->
      <comTopRevenue/>

      <!-- Second Carousel -->
      <comMostPopular/>


    <!-- Footer -->
    <comFooter/>
  </div>
    `
}