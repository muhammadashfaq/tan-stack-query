import {useEffect, useState} from "react"
import {ActivityIndicator, FlatList, StyleSheet, Text} from "react-native"
import {View} from "@/components/Themed"
import {getTopRatedMovies} from "@/api/movies"

export default function TabOneScreen() {
 const [movies, setMovies] = useState([])
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState("")
 useEffect(() => {
  const getMovies = async () => {
   try {
    setLoading(true)
    const movies = await getTopRatedMovies()
    setMovies(movies)
    setLoading(false)
   } catch (err) {
    setLoading(false)
    setError(err)
   }
  }
  getMovies()
 }, [])

 const renderMovie = ({item, index}) => {
  return (
   <View>
    <Text>{item.title}</Text>
   </View>
  )
 }

 if (loading) {
  return <ActivityIndicator />
 }

 if (error) {
  return <Text>{error.message}</Text>
 }

 return (
  <View style={styles.container}>
   <FlatList data={movies} renderItem={renderMovie} />
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
 },
})
