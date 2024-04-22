import {Link} from "expo-router"
import * as React from "react"
import {Text, View, StyleSheet, Image, Pressable} from "react-native"

interface MovieListItemProps {
 movie: {
  id: String
  title: String
  poster_path: String
 }
}

const MovieListItem = ({movie}: MovieListItemProps) => {
 return (
  <Link href={`/${movie.id}`} asChild>
   <Pressable style={styles.container}>
    <Image
     source={{
      uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
     }}
     style={{width: "100%", aspectRatio: 3 / 5, borderRadius: 20}}
    />
    {/* <Text>{movie.title}</Text> */}
   </Pressable>
  </Link>
 )
}

export default MovieListItem

const styles = StyleSheet.create({
 container: {
  padding: 5,
  flex: 1,
 },
})
