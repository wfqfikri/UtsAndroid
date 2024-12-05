import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";

export default function List() {
  const [topanime, setTopanime] = useState([]);
  const [topmanga, setTopmanga] = useState([]);
  const [seasonlist, setSeasonlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk query pencarian

  // Fetch top anime
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime")
      .then(response => response.json())
      .then(data => setTopanime(data.data))
      .catch(error => console.error(error));
  }, []);

  // Fetch top manga
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/manga")
      .then(response => response.json())
      .then(data => setTopmanga(data.data))
      .catch(error => console.error(error));
  }, []);

  // Fetch current season list
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/seasons/now")
      .then(response => response.json())
      .then(data => setSeasonlist(data.data))
      .catch(error => console.error(error));
  }, []);

  // Filter anime, manga, and season list based on search query
  const filteredTopanime = topanime.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredTopmanga = topmanga.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredSeasonlist = seasonlist.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render item for FlatList
  const renderItem = ({
    item,
  }: {
    item: {
      title: string;
      mal_id: number;
      images: { jpg: { image_url: string } };
    };
  }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        router.push({
          pathname: "/Animedetail",
          params: { anime: JSON.stringify(item) },
        })
      }
    >
      <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
      <View>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style = {{alignItems : "center"}}>
                    {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search Anime, Manga, or Season..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        </View>

        {/* Top Anime */}
        <View>
          <Text style={styles.sectionTitle}>Top Anime</Text>
          <FlatList
            style={styles.listContainer}
            horizontal={true}
            data={filteredTopanime}
            renderItem={renderItem}
            keyExtractor={item => item.mal_id.toString()}
          />
        </View>

        {/* Top Manga */}
        <View>
          <Text style={styles.sectionTitle}>Top Manga</Text>
          <FlatList
            style={styles.listContainer}
            horizontal={true}
            data={filteredTopmanga}
            renderItem={renderItem}
            keyExtractor={item => item.mal_id.toString()}
          />
        </View>

        {/* Current Season List */}
        <View>
          <Text style={styles.sectionTitle}>Season List</Text>
          <FlatList
            style={styles.listContainer}
            horizontal={true}
            data={filteredSeasonlist}
            renderItem={renderItem}
            keyExtractor={item => item.mal_id.toString()}
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Copyright © 2024 EnemyMovie History Archives. All Rights Reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A0A0A",
    padding: 20,
  },
  searchInput: {
    alignItems : "center",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 20,
    color: "white",
    backgroundColor: "#333",
    width : 350,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  listContainer: {
    backgroundColor: "black",
  },
  itemContainer: {
    flexDirection: "column",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#0A0A0A",
    width: 250,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  footer: {
    backgroundColor: "#252525",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "white",
    textAlign: "center",
  },
});
