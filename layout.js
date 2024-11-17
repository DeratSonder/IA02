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
                >
                    <img :src="item.image" class="d-block w-100 c-img" :alt="'Slide ' + (index + 1)">
                    <div class="carousel-caption d-none d-md-block text-warning">
                        <h5>{{item.fullTitle}}</h5>
                        <p>{{ formatGenres(item.genreList) }}</p>
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
            <div v-for="(item, index) in group" :key="item.id" class="image-card-container">
                <img :src="item.image" class="carousel-image" alt="...">
                <div class="card hover-card">
                <img :src="item.image" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">{{ item.fullTitle }}</p>
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
            <div v-for="(item, index) in group" :key="item.id" class="image-card-container">
                <img :src="item.image" class="carousel-image" alt="...">
                <div class="card hover-card">
                <img :src="item.image" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">{{ item.fullTitle }}</p>
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

    template:
        `
    <div class="column mt-2">
    <comTopRevenue/>
    <comMostPopular/>
    <comTopRating/>
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
                                    <h5 class="card-title text-truncate">{{ item.title }}</h5>
                                    <p class="card-text small">{{ item.fullTitle }}</p>
                                    
                                    <!-- Additional info -->
                                    <div class="d-flex justify-content-between align-items-center mt-2">
                                        <span class="badge bg-secondary">{{ item.year }}</span>
                                        <button @click="userDetails(item.id)" 
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
        </div>
    
    `
}