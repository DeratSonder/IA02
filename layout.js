import MovieDBProvider, * as DBProvier from './DBProvider.js'

export const comHeader = {

    template:
        `
      <header class="text-black py-3 d-flex justify-content-between align-items-center">
      <div class="ps-3">
        <span id="left-text">22120410</span>
      </div>
      <div class="text-center flex-grow-1">
        <h4 class="mb-0" id="center-text">Movie Info</h4>
      </div>
      <div class="pe-3 d-flex align-items-center">
        <div class="form-check form-switch me-1">
          <input type="checkbox" class="form-check-input" id="themeSwitch">
          <label class="form-check-label" for="themeSwitch"></label>
        </div>
        <div>
          ⚙️
        </div>
      </div>
    </header>
      `
}

export const comNav = {
    inject: ['page'],
    data() {
        return {
            searchInput: '',
            searchError: ''
        }
    },
    methods: {

        onSearch(query, page) {
          this.$emit('onSearch', query, page)
        },
    
        backHome(){
          this.$emit('backHome')
        },
    
        handleSearch(event) {
          event.preventDefault();
          this.searchError = ''
          try {
        
            this.onSearch(this.searchInput, 1) ;
          } catch (error) {
            this.searchError = 'An error occurred while searching. Please try again.'
            console.log(error)
          }
        }
      },
    template: `
        <nav class="navbar navbar-expand-lg px-2">
          
            <i class="fas fa-home text-dark" @click="backHome"></i>
            <div class="flex-grow-1"></div>
            <form class="d-flex">
                <input class="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search"
                :class="{ 'is-invalid': searchError }"
                v-model.trim="searchInput"
                @keyup.enter="handleSearch"
                >
                <button class="btn btn-outline-primary" type="submit" @click="handleSearch">Search</button>
            </form>
        </nav>

    `
}

export const comTopRevenue = {
    inject: ['topRevenue'],
    data() {
        return {
            activeIndex: 0
        }
    },
    methods: {

        onClickItem(id){
            this.$emit('onClickItem', id)
        },

        formatGenres(genreList) {
            // Kiểm tra nếu genreList tồn tại và không rỗng
            if (!genreList || genreList.length === 0) {
                return 'N/A'; // Trả về giá trị mặc định nếu genreList trống
            }
            return `[${genreList.map(genre => genre.value).join(', ')}]`;
        }

    },
    template: `
    <div class="mb-4" id="top-carousel">
        <div id="top-film-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button
                v-for="(item, index) in topRevenue"
                :key="index"
                type="button"
                :data-bs-target="'#top-film-carousel'"
                :data-bs-slide-to="index"
                :class="{'active': index === activeIndex}"
                :aria-label="'Slide ' + (index + 1)"></button>
            </div>

          <div class="custom-inner carousel-inner">
            
                <div
                    v-for="(item, index) in topRevenue"
                    :key="index"
                    class="carousel-item"
                    :class="{'active': index === activeIndex}" 
                    @click="onClickItem(item?.id)"
                >
                    <img :src="item.image" class="d-block w-100 c-img" :alt="'Slide ' + (index + 1)">
                    <div class="carousel-caption d-none d-md-block text-warning">
                        <h5>{{item?.fullTitle}}</h5>
                        <p>{{ formatGenres(item?.genreList) }}</p>
                    </div>
                </div>
                
          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#top-film-carousel" data-bs-slide="prev" style="color:black">
            <span class="carousel-control-prev-icon"  aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#top-film-carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    `
}

export const comMostPopular = {
    inject: ['mostPopular'],
    methods: {
        onClickItem(id){
            this.$emit('onClickItem', id)
        },
        chunkItems(items) {
            let result = [];
            for (let i = 0; i < items.length; i += 3) {
                result.push(items.slice(i, i + 3));
            }
            return result;
        }
    },

    template: `

    <div class="mt-4" id="most-popular">
    <h4 class="mx-4">Most Popular</h4>
    <div id="most-popular-carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
        <!-- Lặp qua số lượng các nhóm 3 phần tử -->
        <div 
            v-for="(group, index) in chunkItems(mostPopular)" 
            :key="index" 
            class="carousel-item" 
            :class="{'active': index === 0}">
            
            <div class="cards-wrapper">
            <!-- Lặp qua các item trong mỗi nhóm -->
            <div v-for="(item, index) in group" :key="item?.id" class="image-card-container" @click="onClickItem(item.id)">
                <img :src="item.image" class="carousel-image" alt="...">
                <div class="card hover-card">
                <img :src="item.image" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">{{ item?.fullTitle }}</p>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </div>

        <!-- Điều khiển carousel -->
        <button class="carousel-control-prev" type="button" data-bs-target="#most-popular-carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#most-popular-carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
    </div>
    </div>

    `
}

export const comTopRating = {
    inject: ['topRating'],
    
    methods: {
        onClickItem(id){
            this.$emit('onClickItem', id)
        },
        chunkItems(items) {
            let result = [];
            for (let i = 0; i < items.length; i += 3) {
                result.push(items.slice(i, i + 3));
            }
            return result;
        }
    },

    template: `

    <div class="mt-4" id="top-rating">
    <h4 class="mx-4">Top Rating</h4>
    <div id="top-rating-carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
        <!-- Lặp qua số lượng các nhóm 3 phần tử -->
        <div 
            v-for="(group, index) in chunkItems(topRating)" 
            :key="index" 
            class="carousel-item" 
            :class="{'active': index === 0}">
            
            <div class="cards-wrapper">
            <!-- Lặp qua các item trong mỗi nhóm -->
            <div v-for="(item, index) in group" :key="item.id" class="image-card-container" @click="onClickItem(item.id)">
                <img :src="item.image" class="carousel-image" alt="...">
                <div class="card hover-card">
                <img :src="item.image" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">{{ item?.fullTitle }}</p>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </div>

        <!-- Điều khiển carousel -->
        <button class="carousel-control-prev" type="button" data-bs-target="#top-rating-carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#top-rating-carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
    </div>
    </div>

    `

}

export const comFooter = {
    template: `
    <footer class="bg-secondary text-white text-center py-2 mt-3">
      <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
    `
}


export const comMainHome = {
    components: {
        comTopRevenue,
        comMostPopular,
        comTopRating,
    },
    methods:{
        onClickItem(id){
            this.$emit('onClickItem', id)
        }
    },

    template:
        `
    <div class="column mt-2">
    <comTopRevenue @onClickItem = "onClickItem"/>
    <comMostPopular @onClickItem = "onClickItem"/>
    <comTopRating @onClickItem = "onClickItem"/>
    </div>
    
    `
}


export const comMainSearch = {
    inject: ['search', 'page', 'total_pages', 'searchQuery'],
    
    computed: {


        displayedPages() {
            const current = this.page;
            const total = this.total_pages;
            const delta = 2;
            let pages = [];

            if (!total) return pages; // Trả về mảng rỗng nếu không có trang

            pages.push(1);

            const rangeStart = Math.max(2, current - delta);
            const rangeEnd = Math.min(total - 1, current + delta);

            if (rangeStart > 2) {
                pages.push('...');
            }

            for (let i = rangeStart; i <= rangeEnd; i++) {
                pages.push(i);
            }

            if (rangeEnd < total - 1) {
                pages.push('...');
            }

            if (total > 1) {
                pages.push(total);
            }

            return pages;
        },
        
        hasResults() {
            return this.search && this.search.length > 0;
        }
    },

    methods: {
        onClickItem(id){
            this.$emit('onClickItem', id)
        },
        updateData(query, page) {
            if (!query) return; // Ngăn chặn gọi API khi không có query
            this.$emit('updateData', query, page);
        },
        userDetails(id) {
            this.$emit('userDetails', id);
        }
    },

    mounted() {
        console.log('Main search total pages:', this.total_pages);
        console.log('Search query:', this.searchQuery);
    },

    template: `
        <div class="column mt-2" id="main-search">
            <div v-if="!hasResults" class="alert alert-info text-center my-4">
                Không tìm thấy kết quả phù hợp
            </div>

            <div v-else>
                <div class="row row-cols-1 row-cols-md-3 g-4 py-5 mx-1">
                    <div class="col" v-for="(item, index) in search" :key="index">
                        <div class="image-card-container position-relative">
                            <!-- Hover card -->
                            <div class="card hover-card">
                                <div class="position-relative">
                                    <img :src="item.image" 
                                         class="card-img-top" 
                                         alt="Movie poster"
                                         onerror="this.src='/path/to/placeholder.jpg'">
                                    
                                    <!-- Length badge -->
                                    <span class="position-absolute bottom-0 start-0 bg-dark m-2">
                                        {{ item.runtimeStr || 'N/A' }}
                                    </span>
                                    
                                    <!-- Rating -->
                                    <div class="position-absolute bottom-0 end-0 bg-warning text-dark p-2 rounded-start m-2">
                                        <i class="fas fa-star"></i> {{ item.ratings.imDb|| 'N/A' }}
                                    </div>
                                </div>

                                <div class="card-body">
                                    <h5 class="card-title text-truncate">{{ item?.title }}</h5>
                                    <p class="card-text small">{{ item?.fullTitle }}</p>
                                    
                                    <!-- Additional info -->
                                    <div class="d-flex justify-content-between align-items-center mt-2">
                                        <span class="badge bg-secondary">{{ item?.year }}</span>
                                        <button @click="onClickItem(item?.id)"
                                                class="btn btn-sm btn-outline-primary">
                                            Chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination section -->
                <!-- Phân trang chỉ hiển thị khi có kết quả -->
                <div v-if="total_pages > 1" class="d-flex justify-content-center mt-auto">
                    <ul class="pagination">
                        <!-- Previous button -->
                        <li :class="{ 'page-item': true, 'disabled': page <= 1 }">
                            <a @click.prevent="page > 1 && updateData(searchQuery, page - 1)" 
                               class="page-link" 
                               href="#" 
                               aria-label="Previous"
                               :style="{ cursor: page <= 1 ? 'not-allowed' : 'pointer' }">
                                <span style="font-weight: bold;">&laquo;</span>
                            </a>
                        </li>

                        <!-- Page numbers with ellipsis -->
                        <template v-for="pageNum in displayedPages">
                            <li v-if="pageNum === '...'" 
                                :key="'ellipsis-' + pageNum" 
                                class="page-item disabled">
                                <span class="page-link">...</span>
                            </li>
                            <li v-else 
                                :key="pageNum" 
                                :class="{ 'page-item': true, 'active': pageNum === page }">
                                <a @click="updateData(searchQuery, pageNum)" 
                                   class="page-link" 
                                   href="#"
                                   :style="{ cursor: 'pointer' }">
                                    {{ pageNum }}
                                </a>
                            </li>
                        </template>

                        <!-- Next button -->
                        <li :class="{ 'page-item': true, 'disabled': page >= total_pages }">
                            <a @click.prevent="page < total_pages && updateData(searchQuery, page + 1)" 
                               class="page-link" 
                               href="#" 
                               aria-label="Next"
                               :style="{ cursor: page >= total_pages ? 'not-allowed' : 'pointer' }">
                                <span style="font-weight: bold;">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
    `
}


export const comMovieDetail = {
    inject: ['movie'],
    methods:{
        onClickActor(id){
            this.$emit('onClickActor', id);
        },

        formatDate(dateString) {
            // Tách chuỗi ngày theo định dạng "YYYY-MM-D"
            if(!dateString) return "";

            const [year, month, day] = dateString.split('-');
            
            // Danh sách tên tháng
            const months = [
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];
            
            // Lấy tên tháng từ chỉ mục (month - 1 vì mảng bắt đầu từ 0)
            const monthName = months[parseInt(month, 10) - 1];
          
            // Trả về chuỗi định dạng "Month Day, Year"
            return `${monthName} ${parseInt(day, 10)}, ${year}`;
          },

          trimString(input) {

            if(!input) return "";
            
            if (input.length <= 6) {
              return ""; // Chuỗi quá ngắn, trả về chuỗi rỗng
            }
            return input.slice(3, -4); // Loại bỏ 3 ký tự đầu và cuối
          },

          directors(){
           return this.movie.directorList.map(director => director.name).join(", ")
          }
          
    },
    template:
    `
     <div class="column mt-2">

  
        <!-- Movie Header -->
        <div class="row mb-5">
            <div class="col-md-4">
                <img :src="movie.image" 
                     alt="The Movie Poster" 
                     class="movie-poster img-fluid">
            </div>
            <div class="col-md-8">
                <h1 class="display-4">{{movie?.fullTitle}}</h1>
                <p class="lead">{{movie?.plot}}</p>
                
                <div class="my-4">
                    <span class="badge badge-primary rating-badge">IMDb: {{movie?.ratings?.imDb}}</span>
                    <span class="badge badge-success rating-badge">Rotten Tomatoes: {{movie?.ratings?.rottenTomatoes}}</span>
                    <span class="badge badge-info rating-badge">FilmAffinity: {{movie?.ratings?.filmAffinity}}</span>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <h5>Details</h5>
                        <ul class="list-unstyled">
                            <li><strong>Release Date:</strong> {{formatDate(movie?.releaseDate)}}</li>
                            <li><strong>Runtime:</strong> {{movie?.runtimeStr}}</li>
                            <li><strong>Director:</strong> {{directors()}} </li>
                            <li><strong>Production:</strong> {{movie?.companies}}</li>
                            <li><strong>Country:</strong> {{movie?.countries}}</li>
                            <li><strong>Language:</strong> {{movie?.languages}}</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h5>Box Office</h5>
                        <ul class="list-unstyled">
                            <li><strong>Budget:</strong> {{movie?.boxOffice?.budget}}</li>
                            <li><strong>Worldwide Gross:</strong> {{movie?.boxOffice?.cumulativeWorldwideGross}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Genres -->
        <div class="mb-5">
            <h3>Genres</h3>
            <div>
                <span 
                v-for="(genre, index) in movie?.genreList" 
                :key="genre.key" 
                class="badge badge-pill badge-secondary p-2 h4 mx-2 bg-primary">
                {{ genre.value }}
                </span>
            </div>
        </div>

        <!-- Plot -->
        <div class="mb-5">
            <h3>Plot</h3>
            <div class="card">
                <div class="card-body">
                    <p class="card-text"> {{trimString(movie?.plotFull)}} </p>
                </div>
            </div>
        </div>

        <!-- Cast -->
       <div class="mb-5">
            <h3 class="mb-4">Cast</h3>
            <div class="scrollable cast-list">
            <div 
                class="actor-item" 
                v-for="actor in movie?.actorList" 
                :key="actor?.id"
                @click="onClickActor(actor.id)"
            >
                <div class="row align-items-center">
                <div class="col-auto">
                    <img 
                    :src="actor.image" 
                    class="actor-image" 
                    :alt="actor?.name" 
                    />
                </div>
                <div class="col actor-info">
                    <div class="actor-name">{{ actor?.name }}</div>
                    <div class="actor-character">{{ actor?.asCharacter }}</div>
                </div>
                </div>
            </div>
            </div>
        </div>

        <!-- Similar Movies -->
        <h3 class="mb-4">Similar Movies</h3>
        <div class="row">
            <div class="col-md-2 mb-3">
                <div class="card h-100">
                    <img src="https://m.media-amazon.com/images/M/MV5BZDc4NjE1M2EtNWVjNi00NDRkLTg5MzctNzJhMGQ4Yjc5YzcyXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_Ratio0.7150_AL_.jpg" 
                         class="card-img-top" 
                         alt="The Circus">
                    <div class="card-body">
                        <h6 class="card-title">The Circus</h6>
                        <span class="badge badge-warning">IMDb: 8.1</span>
                    </div>
                </div>
            </div>
            <!-- Add more similar movies here -->
        </div>
     
    </div>
    
    `

}


export const comActorDetail = {
    inject: ['actor'],
    data() {
        return {
            actorMovies: [],
            page: 1,
            total_pages:0
        }
    },
   

    methods:{
        formatDate(dateString) {
            // Tách chuỗi ngày theo định dạng "YYYY-MM-D"
            if(!dateString) return "";

            const [year, month, day] = dateString.split('-');
            
            // Danh sách tên tháng
            const months = [
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];
            
            // Lấy tên tháng từ chỉ mục (month - 1 vì mảng bắt đầu từ 0)
            const monthName = months[parseInt(month, 10) - 1];
          
            // Trả về chuỗi định dạng "Month Day, Year"
            return `${monthName} ${parseInt(day, 10)}, ${year}`;
          },

        async getMoviesOfActor(id, page){
            try {
                const db = new MovieDBProvider();
                const result = await db.fetch(`get/moviesofactor/${id}?per_page=3&page=${page}`);
                this.actorMovies = result.items;
                console.log("Actor Movies: ", this.actorMovies);
                this.page = result.page;
                this.total_pages = result.total_page;
                console.log("Total pages: ", this.total_pages);
            }
            catch (error) {
                console.error(error);
            }
        }

    },

    mounted() {
        this.getMoviesOfActor(this.actor?.id, 1);
    },
    template:
    `
    <div class="column mt-2">

        <div class="row mb-5">
            <div class="col-md-4 text-center">
                <img :src="actor?.image" alt="actor?.name" class="actor-img mb-3">
            </div>
            <div class="col-md-8">
                <h1 class="display-4">{{actor?.name}}</h1>
                <p class="lead">{{actor?.role}}</p>
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Birth Date:</strong> {{formatDate(actor?.birthday)}}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Awards:</strong> {{actor?.awards}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Biography Section -->
        <div class="bio-section">
            <h2 class="mb-4">Summary</h2>
            <p class="lead">
                {{actor?.summary}}
            </p>
        </div>

        <h2 class="mb-4">Films</h2>
        <div class="row" id="movies">

            <div class="row">
                <div class="col-md-4" v-for="movie in actorMovies" :key="movie.id">
                    <div class="card movie-card">
                        <img :src="movie.image" class="card-img-top movie-img" :alt="movie?.fullTitle">
                        <div class="card-body">
                            <h5 class="card-title">{{ movie?.title }}</h5>
                            <p class="card-text">{{ movie?.plot }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="total_pages > 1" class="d-flex justify-content-center mt-auto">
            <ul class="pagination">
                <!-- Previous button -->
                <li :class="{ 'page-item': true, 'disabled': page <= 1 }">
                    <a @click.prevent="page > 1 && getMoviesOfActor(actor.id, page - 1)" class="page-link" href="#"
                        aria-label="Previous" :style="{ cursor: page <= 1 ? 'not-allowed' : 'pointer' }">
                        <span style="font-weight: bold;">&laquo;</span>
                    </a>
                </li>

                <!-- Page numbers with ellipsis -->
                <template v-for="pageNum in displayedPages">
                    <li v-if="pageNum === '...'" :key="'ellipsis-' + pageNum" class="page-item disabled">
                        <span class="page-link">...</span>
                    </li>
                    <li v-else :key="pageNum" :class="{ 'page-item': true, 'active': pageNum === page }">
                        <a @click="getMoviesOfActor(actor.id, pageNum)" class="page-link" href="#"
                            :style="{ cursor: 'pointer' }">
                            {{ pageNum }}
                        </a>
                    </li>
                </template>

                <!-- Next button -->
                <li :class="{ 'page-item': true, 'disabled': page >= total_pages }">
                    <a @click.prevent="page < total_pages && getMoviesOfActor(actor.id, page + 1)" class="page-link"
                        href="#" aria-label="Next" :style="{ cursor: page >= total_pages ? 'not-allowed' : 'pointer' }">
                        <span style="font-weight: bold;">&raquo;</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>


    
    `
}