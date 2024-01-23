import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { API_KEY, TMDB_BASE_URL } from "../utils/Constants.js";
  
  const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
  };
  
  //we got the genres array and passed it
  export const getGenres = createAsyncThunk("xmovies/genres", async () => {
    const {
      data:{genres}
    } = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=47301faec66b608dbf7b2862b1b2af56"
    );
    //console.log(data);
    return genres;
  });
  
  //we loop through the results array and find the genres id,from that
  //we got the name and if that movie has a backdrop path(poster),then we push it in Array.
  //a movie has multiple genres but we need first 3
  const createArrayFromRawData = (results, Array, genres) => {
    
    results.forEach((movie) => {
      const movGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movGenres.push(name.name);
      });
      if (movie.backdrop_path)
        Array.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movGenres.slice(0, 3),
        });
    });
  };
  //get-raw-data to create-array-from-raw-data
  //we need 60 movies
  const getRawData = async (api, genres, paging = false) => {
    const Array = [];
    for (let i = 1; Array.length < 80 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, Array, genres);
    }
    return Array;
  };
  
  export const fetchDataByGenre = createAsyncThunk(
    "xmovies/genre",
    async ({ genre, type }, thunkAPI) => {
      const {
        xmovies: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `https://api.themoviedb.org/3/discover/${type}?api_key=47301faec66b608dbf7b2862b1b2af56&with_genres=${genre}`,
        genres
      );
    }
  );
  //fetch-movies to get-raw-data
  export const fetchMovies = createAsyncThunk(
    "xmovies/trending",
    async ({ type }, thunkAPI) => {
      const {xmovies: { genres },} = thunkAPI.getState();
        return getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,genres,true);
        
    }
    
  );
  
  export const getUsersLikedMovies = createAsyncThunk(
    "xmovies/getLiked",
    
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
      
      return movies;
    }
  );
  
  export const removeMovieFromLiked = createAsyncThunk(
    "xmovies/remove",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:5000/api/user/remove", {
        email,
        movieId,
      });
      return movies;
    }
  );
  
  const XMoviesSlice = createSlice({
    name: "XMovies",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      });
      builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
    },
  });
  
  export const store = configureStore({
    reducer: {
      xmovies: XMoviesSlice.reducer,
    },
  });
  
  export const 
  { setGenres, setMovies } = XMoviesSlice.actions;