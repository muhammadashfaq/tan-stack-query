import {getMovieDetail} from "@/api/movies"
import {useQuery} from "@tanstack/react-query"
import {useLocalSearchParams} from "expo-router"
import * as React from "react"
import {Text, View, StyleSheet, ActivityIndicator} from "react-native"

interface MovieDetailsProps {}

const MovieDetails = (props: MovieDetailsProps) => {
 const {id} = useLocalSearchParams()

 const {data, isLoading, error} = useQuery({
  queryKey: ["movies", id],
  queryFn: () => getMovieDetail(id),
 })

 if (isLoading) {
  return <ActivityIndicator />
 }

 if (error) {
  return <Text>{error.message}</Text>
 }

 return (
  <View style={styles.container}>
   <Text>MovieDetails: {data.title}</Text>
  </View>
 )
}

export default MovieDetails

const styles = StyleSheet.create({
 container: {},
})
