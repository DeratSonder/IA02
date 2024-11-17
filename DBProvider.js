

class MovieDBProvider {
    constructor() {
      this.baseUrl = 'http://matuan.online:2422/api/';
      this.cache = {}; // Sử dụng đối tượng cache cho dữ liệu như movies, top50movies, mostPopularMovies
    }
  
    /**
     * Fetch and cache data if not already cached
     * @param {string} endpoint
     * @param {string} cacheKey
     * @returns {Promise<Array>}
     */
    async fetchDataIfNotCached(endpoint, cacheKey) {
      if (!this.cache[cacheKey]) {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.cache[cacheKey] = await response.json();
      }
      return this.cache[cacheKey];
    }
  
    /**
     * Main fetch method that handles all types of requests
     * @param {string} paramString Format: "<type>/<class>/param?param1=value1&param2=value2"
     * @returns {Promise<Object>} Filtered and paginated results
     */
    async fetch(paramString) {
      try {
        const { type, className, params } = this.parseParamString(paramString);
  
        // Parse query parameters
        const queryParams = new URLSearchParams(params.split('?')[1] || '');
        const page = parseInt(queryParams.get('page')) || 1;
        const perPage = parseInt(queryParams.get('per_page')) || 6;
  
        // Determine the data source and action
        let results;
        switch (`${type}/${className}`) {
          case 'search/movie': {
            const movies = await this.fetchDataIfNotCached('Movies', 'movies');
            const searchQuery = params.split('?')[0] || '';
            results = this.filterMovieBySearch(movies, searchQuery);
            break;
          }
  
          case 'detail/movie': {
            const movies = await this.fetchDataIfNotCached('Movies', 'movies');
            const movieId = params.split('?')[0];
            return movies.find(m => m.id === movieId) || null;
          }
  
          case 'get/top50': {
            results = await this.fetchDataIfNotCached('Top50Movies', 'top50movies');
            break;
          }
  
          case 'get/mostpopular': {
            results = await this.fetchDataIfNotCached('MostPopularMovies', 'mostPopularMovies');
            break;
          }
  
          case 'get/topboxoffice': {
            const movies = await this.fetchDataIfNotCached('Movies', 'movies');
            results = [...movies].sort((a, b) => b.boxOffice - a.boxOffice);
            break;
          }
  
          default:
            throw new Error('Invalid request type or class');
        }
  
        // Return paginated results
        return this.paginateResults(results, page, perPage, type, params.split('?')[0]);
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
  
    /**
     * Parse parameter string into components
     * @param {string} paramString
     * @returns {Object}
     */
    parseParamString(paramString) {
      const parts = paramString.split('/');
      return {
        type: parts[0],
        className: parts[1],
        params: parts.slice(2).join('/')
      };
    }
  
    /**
     * Filter movies by search query
     * @param {Array} movies
     * @param {string} query
     * @returns {Array}
     */
    filterMovieBySearch(movies, query) {
      return movies.filter(movie => {
        const searchString = `${movie.title} ${movie.description} ${movie.actors}`.toLowerCase();
        return searchString.includes(query.toLowerCase());
      });
    }
  
    /**
     * Paginate results
     * @param {Array} items
     * @param {number} page
     * @param {number} perPage
     * @param {string} type
     * @param {string} typeValue
     * @returns {Object}
     */
    paginateResults(items, page, perPage, type, typeValue = '') {
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedItems = items.slice(startIndex, endIndex);
  
      return {
        [type]: typeValue,
        page: page,
        per_page: perPage,
        total_page: Math.ceil(items.length / perPage),
        total: items.length,
        items: paginatedItems
      };
    }
  
    /**
     * Clear cached data
     */
    clearCache() {
      this.cache = {};
    }
  }
  
  // Export for CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MovieDBProvider;
  }
  


  async function main() {
    try {
        const db = new MovieDBProvider();
        const movieId = 'tt0012349';
        // const response  = await fetch('http://matuan.online:2422/api/Movies')
        // console.log(response)
        // const data = await response.json()
        // console.log(data)
        const response = await db.fetch(`search/movie/avenger?per_page=5&page=1`);
        console.log(typeof response);
        console.log(response);
        
        
        
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  main();