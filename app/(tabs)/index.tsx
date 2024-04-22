import {ActivityIndicator, FlatList, StyleSheet, Text} from "react-native"
import {View} from "@/components/Themed"
import {getTopRatedMovies} from "@/api/movies"
import {useInfiniteQuery} from "@tanstack/react-query"
import MovieListItem from "@/components/MovieListItem"

export default function TabOneScreen() {
 const {data, isLoading, error, fetchNextPage} = useInfiniteQuery({
  queryKey: ["movies"],
  initialPageParam: 1,
  queryFn: getTopRatedMovies,
  getNextPageParam: (lastPage, pages) => pages.length + 1,
 })

 const renderMovie = ({item, index}: any) => {
  return <MovieListItem movie={item} />
 }

 if (isLoading) {
  return <ActivityIndicator />
 }

 if (error) {
  return <Text>{error.message}</Text>
 }

 const movies = data?.pages?.flat()
 return (
  <View style={styles.container}>
   <FlatList
    data={movies}
    numColumns={2}
    contentContainerStyle={{gap: 5}}
    columnWrapperStyle={{gap: 5}}
    renderItem={renderMovie}
    onEndReached={() => {
     console.log("[onEndReached Called]")
     fetchNextPage()
    }}
   />
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
})
