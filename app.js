import { comHeader,comNav, comTopRevenue, comMostPopular, comFooter } from "./layout.js"
import { computed } from "vue"

export default {

    data() {
        return {
           
        }
    },

    provide() {
        return {
           
        }
    },

    mounted() {
       
    },

    methods:{
        
        
       
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