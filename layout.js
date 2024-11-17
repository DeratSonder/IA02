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
    template:`
    <div class="mb-4" id="top-carousel">
        <div id="top-film-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div class="custom-inner carousel-inner">
            <div class="carousel-item active c-item">
              <img src="girl_08.png" class="d-block w-100 c-img" alt="Slide 1">
            </div>
            <div class="carousel-item c-item">
              <img src="girl_09.png" class="d-block w-100 c-img" alt="Slide 2">
            </div>
            <div class="carousel-item c-item">
              <img src="girl_10.png" class="d-block w-100 c-img" alt="Slide 3">
            </div>
          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#top-film-carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
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
    template:`
    <div class="mt-4" id="most-popular">
        <h4 class="mx-4">Most Popular</h4>
        <div id="most-popular-carousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="cards-wrapper">

                <div class="image-card-container">
                  <img src="girl_08.png" class="carousel-image" alt="...">
                  <div class="card hover-card">
                    <img src="girl_08.png" class="card-img-top" alt="...">
                    <div class="card-body">
                      <p class="card-text">Some quick example </p>
                    </div>
                  </div>
                </div>

                <div class="image-card-container">
                  <img src="girl_09.png" class="carousel-image" alt="...">
                  <div class="card hover-card">
                    <img src="girl_09.png" class="card-img-top" alt="...">
                    <div class="card-body">
                      <p class="card-text">Some quick example text </p>
                    </div>
                  </div>
                </div>

                <div class="image-card-container">
                  <img src="girl_10.png" class="carousel-image" alt="...">
                  <div class="card hover-card">
                    <img src="girl_10.png" class="card-img-top" alt="...">
                    <div class="card-body">
                      <p class="card-text">Some quick example text toddddddddddddddddddd </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="cards-wrapper">
                <div class="image-card-container">
                  <img src="girl_08.png" class="carousel-image" alt="...">
                  <div class="card hover-card">
                    <img src="girl_08.png" class="card-img-top" alt="...">
                    <div class="card-body">
                      <p class="card-text">Some quick example text to buil</p>
                    </div>
                  </div>
                </div>
                <div class="image-card-container">
                  <img src="girl_09.png" class="carousel-image" alt="...">
                  <div class="card hover-card">
                    <img src="girl_09.png" class="card-img-top" alt="...">
                    <div class="card-body">
                      <p class="card-text">Some quick example text </p>
                    </div>
                  </div>
                </div>
                <div class="image-card-container">
                  <img src="girl_10.png" class="carousel-image" alt="...">
                  <div class="card hover-card">
                    <img src="girl_10.png" class="card-img-top" alt="...">
                    <div class="card-body">
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                        the card's content.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#most-popular-carousel"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#most-popular-carousel"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <!-- Second Carousel (Updated to Bootstrap 5)-->
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