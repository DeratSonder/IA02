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
    template:`
        <nav class="navbar navbar-expand-lg px-2">
            <i class="fas fa-home text-dark"></i>
            <div class="flex-grow-1"></div>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-primary" type="submit">Search</button>
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

        formatGenres(genreList){
            // Kiểm tra nếu genreList tồn tại và không rỗng
            if (!genreList || genreList.length === 0) {
                return 'N/A'; // Trả về giá trị mặc định nếu genreList trống
            }
            return `[${genreList.map(genre => genre.value).join(', ')}]`;
        }

    },
    template:`
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

    template:`

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

    template:`

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
    template:`
    <footer class="bg-secondary text-white text-center py-2 mt-3">
      <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
    `
}