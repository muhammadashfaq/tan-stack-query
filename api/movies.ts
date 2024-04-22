export const getTopRatedMovies = async () => {
 try {
  const url =
   "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  const options = {
   method: "GET",
   headers: {
    accept: "application/json",
    Authorization:
     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDA2ODg2YTg2MjJkMzVlNTBlOGFiOWEzNGZmNDdhNSIsInN1YiI6IjY2MjYzZmFjMTk3ZGU0MDE3ZDJjNWI0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3DfhFSSEEwGIZEgDdOT8ej4nJiUW_kQq7eEhp-V5WdU",
   },
  }

  const respsonse = await fetch(url, options)
  const movies = await respsonse.json()
  return movies.results
 } catch (err) {
  console.log("[err]", err)
 }
}
