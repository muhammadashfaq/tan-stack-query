const headers = {
 accept: "application/json",
 "content-type": "application/json",
 Authorization:
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDA2ODg2YTg2MjJkMzVlNTBlOGFiOWEzNGZmNDdhNSIsInN1YiI6IjY2MjYzZmFjMTk3ZGU0MDE3ZDJjNWI0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3DfhFSSEEwGIZEgDdOT8ej4nJiUW_kQq7eEhp-V5WdU",
}

export const getWatchlistMovies = async () => {
 try {
  const url =
   "https://api.themoviedb.org/3/account/21227809/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc"
  const options = {
   method: "GET",
   headers,
  }
  const respsonse = await fetch(url, options)
  const movies = await respsonse.json()
  return movies.results
 } catch (err) {
  console.log("[err]", err)
 }
}

export const addToWatchlist = async (movieId: any) => {
 try {
  const url = `https://api.themoviedb.org/3/account/${movieId}/watchlist`
  const options = {
   method: "POST",
   headers: headers,
   body: JSON.stringify({
    media_type: "movie",
    media_id: movieId,
    watchlist: true,
   }),
  }

  const respsonse = await fetch(url, options)
  const addToWatclistRes = await respsonse.json()
  console.log("[addToWatclistRes]", addToWatclistRes)
  return addToWatclistRes
 } catch (err) {
  console.log("err", err)
 }
}
