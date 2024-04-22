import {getMovieDetail} from "@/api/movies"
import {addToWatchlist} from "@/api/watchlist"
import {FontAwesome} from "@expo/vector-icons"
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import {Stack, useLocalSearchParams} from "expo-router"
import * as React from "react"
import {
 Text,
 View,
 StyleSheet,
 ActivityIndicator,
 Image,
 Pressable,
 TouchableOpacity,
} from "react-native"

interface MovieDetailsProps {}

const MovieDetails = (props: MovieDetailsProps) => {
 const {id} = useLocalSearchParams()
 const queryClient = useQueryClient()

 const {data, isLoading, error} = useQuery({
  queryKey: ["movies", id],
  queryFn: () => getMovieDetail(id),
 })
 const {mutate, isPending} = useMutation({
  mutationFn: () => addToWatchlist(id),
  onSuccess: () => {
   queryClient.invalidateQueries({queryKey: ["watchlist"]})
  },
 })

 const handleAddToWatchlist = () => {
  mutate()
 }

 if (isLoading) {
  return <ActivityIndicator />
 }

 if (error) {
  return <Text>{error.message}</Text>
 }

 return (
  <View style={styles.container}>
   <Stack.Screen options={{title: data.title}} />
   <Image
    source={{uri: "https://image.tmdb.org/t/p/w500" + data.backdrop_path}}
    style={{width: "100%", height: 300}}
   />
   <View style={{padding: 10}}>
    <Text style={{fontWeight: "bold", fontSize: 30, marginVertical: 10}}>
     {data.title}
    </Text>
    <View style={{marginVertical: 10}}>
     <TouchableOpacity
      disabled={isPending}
      onPress={handleAddToWatchlist}
      style={{flexDirection: "row", alignItems: "center", gap: 5}}>
      <FontAwesome name='bookmark-o' size={24} color={"black"} />
      <Text>Add to Watchlist</Text>
     </TouchableOpacity>
    </View>
    <Text style={{fontSize: 16}}>{data.overview}</Text>
   </View>
  </View>
 )
}

export default MovieDetails

const styles = StyleSheet.create({
 container: {},
})
