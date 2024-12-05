import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function AnimeDetail() {
  const {anime} = useLocalSearchParams();
  const animeData = JSON.parse(Array.isArray(anime) ? anime[0] : anime);

  return (
    <View style = {{flex : 1}}>
    <View style={styles.container}>
      <Image
        source={{uri: animeData.images.jpg.image_url}}
        style={styles.image}
      />
      <Text style={styles.title}>{animeData.title}</Text>
      <Text style = {{color : "white", fontSize : 15}}>{animeData.synopsis}</Text>
    </View>

    <View style = {{ backgroundColor : "#252525", }}>
      <Text style = {{color : "white", alignItems : "center", justifyContent : "center", textAlign : "center"}}>
      Copyright © 2024 EnemyMovie History Archives. All Rights Reserved.
      </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor : "#0A0A0A",
    flex: 1,
    padding: 20,
    position : "relative"
  },
  image: {
    width: "100%",
    height: "20%",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color : "white",
  },
});