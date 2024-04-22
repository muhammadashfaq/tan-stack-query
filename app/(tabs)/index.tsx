import {ActivityIndicator, FlatList, StyleSheet, Text} from "react-native"
import {View} from "@/components/Themed"
import {getTopRatedMovies} from "@/api/movies"
import {useQuery} from "@tanstack/react-query"
import MovieListItem from "@/components/MovieListItem"

export default function TabOneScreen() {
 const {data, isLoading, error} = useQuery({
  queryKey: ["movies"],
  queryFn: getTopRatedMovies,
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

 return (
  <View style={styles.container}>
   <FlatList
    data={data}
    numColumns={2}
    contentContainerStyle={{gap: 5}}
    columnWrapperStyle={{gap: 5}}
    renderItem={renderMovie}
   />
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
})
