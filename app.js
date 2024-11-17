import { comHeader, comNav, comTopRevenue, comMostPopular,comTopRating,  comFooter } from "./layout.js"
import { computed } from "vue"
import MovieDBProvider, * as DBProvier from './DBProvider.js'

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
        const db = new MovieDBProvider();
        this.getRevenueMovies(db);
        this.getMostPopularMovies(db);
        this.getTopRatedMovies(db);
        

    },

    methods: {

        async getRevenueMovies(db){
            try {
                const result = await db.fetch('get/topboxoffice/?per_page=5&page=1');
                this.topRevenue = result.items
            } catch (error) {
                console.error(error);
            }
        },

        async getMostPopularMovies(db){
            try {
                const result = await db.fetch('get/mostpopular/?per_page=30&page=1');
                this.mostPopular = result.items
               
            } catch (error) {
                console.error(error);
            }
        },

        async getTopRatedMovies(db){
            try {
                const result = await db.fetch('get/top50/?per_page=30&page=1');
                this.topRating = result.items
            } catch (error) {
                console.error(error);
            }
        }

    },

    components: {
        comHeader,
        comNav,
        comTopRevenue,
        comMostPopular,
        comFooter,
        comTopRating

    },


    template: `

    <div class="container-custom mx-auto">
        <!-- Header -->
        <comHeader/>

        <!-- Navigation Bar -->
        <comNav/>
        

        <!-- Main -->
        <div class="column mt-2">

            <!-- First Carousel -->
            <comTopRevenue/>
            <comMostPopular/>
            <comTopRating/>

            
        </div>

        <!-- Footer -->
        <comFooter/>
    </div>
    `
}