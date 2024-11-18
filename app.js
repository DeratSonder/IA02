import {
    comHeader, comNav, comTopRevenue, comMostPopular,
    comTopRating, comFooter, comMainHome, comMainSearch, comMovieDetail, comActorDetail
} from "./layout.js"
import { computed } from "vue"
import MovieDBProvider, * as DBProvier from './DBProvider.js'

export default {

    data() {
        return {
            topRevenue: [],
            mostPopular: [],
            topRating: [],
            search: [],
            searchQuery: "",
            movie: {},
            actor: {},
            page: 1,
            per_page: 6,
            total_pages: 0,
            content: 'comMainHome',
            loading: false,


        }
    },

    provide() {
        return {
            topRevenue: computed(() => this.topRevenue),
            mostPopular: computed(() => this.mostPopular),
            topRating: computed(() => this.topRating),
            search: computed(() => this.search),
            page: computed(() => this.page),
            total_pages: computed(() => this.total_pages),
            searchQuery: computed(() => this.searchQuery),
            movie: computed(() => this.movie),
            actor: computed(() => this.actor),
            content: computed(() => this.content)
        }
    },

    mounted() {
        this.loadHomePage()

    },

    methods: {

        async loadHomePage() {
            this.loading = true; 
            
            setTimeout(async () => {
                const db = new MovieDBProvider();
                try {
                    this.getRevenueMovies(db);
                    this.getMostPopularMovies(db);
                    this.getTopRatedMovies(db);
                    this.content = 'comMainHome';
                    console.log(this.page);
                } catch (error) {
                    console.error(error);
                } finally {
                    this.loading = false; 
                }
            }, 1000); 
        },

        async getRevenueMovies(db) {
            try {
                const result = await db.fetch('get/topboxoffice/?per_page=5&page=1');
                this.topRevenue = result.items
            } catch (error) {
                console.error(error);
            }
        },

        async getMostPopularMovies(db) {
            try {
                const result = await db.fetch('get/mostpopular/?per_page=30&page=1');
                this.mostPopular = result.items

            } catch (error) {
                console.error(error);
            }
        },

        async getTopRatedMovies(db) {
            try {
                const result = await db.fetch('get/top50/?per_page=30&page=1');
                this.topRating = result.items
            } catch (error) {
                console.error(error);
            }
        },

        async searchMovies(query, page) {
            try {
                const db = new MovieDBProvider();
                const result = await db.fetch(`search/movie/${query}?per_page=${this.per_page}&page=${page}`);

                console.log("Result", result);

                if (result && result.items) {
                    this.searchQuery = query;
                    this.search = result.items;
                    this.page = result.page;
                    this.total_pages = result.total_page;
                    this.content = 'comMainSearch';
                } else {
                    this.search = [];
                    his.content = 'comMainSearch';
                    console.error("No movies found for the query:", query);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                his.content = 'comMainSearch';
                this.search = [];
            }
        },

        async getMovie(id) {
            try {
                const db = new MovieDBProvider();
                const result = await db.fetch(`detail/movie/${id}`);
                this.movie = result;
                this.content = 'comMovieDetail';
                console.log("Movie", this.movie);
            } catch (error) {
                console.error(error);
            }
        },

        async getActor(id) {
            try {
                const db = new MovieDBProvider();
                const result = await db.fetch(`detail/name/${id}`);
                this.actor = result;
                console.log("Actor", this.actor);
                this.content = 'comActorDetail';
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
        comTopRating,
        comMainHome,
        comMainSearch,
        comMovieDetail,
        comActorDetail

    },


    template: `

    <div class="container-custom mx-auto pt-2">
    <!-- Header -->
    <comHeader />

    <!-- Navigation Bar -->
    <comNav @onSearch="searchMovies" @backHome="loadHomePage" />

    <div v-if="loading" class="column mt-2">
        <div class="spinner-container">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        </div>
    </div>

    <!-- Main -->
    <component v-else :is="content" @updateData="searchMovies" @onClickItem="getMovie" @onClickActor="getActor"
        @onClickDetail="getMovie" @onClickMovie="getMovie" />

    <!-- Footer -->
    <comFooter />
    </div>
    `
}