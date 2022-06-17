import { useState } from 'react';
import { FlatList, Button } from 'react-native';
import PostList from '../PostItem';

const renderItem = (item) => <PostList post={item.item} />;

import { colors } from '../..//styles/constants';
import { StatusBar } from 'expo-status-bar';

import Header from '../Header';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { addPost, loadPosts } from '../../utils/store';
export default ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  useFocusEffect(() => {
    loadPosts().then((loadedPosts) => {
      if (loadedPosts) {
        setPosts(loadedPosts);
      }
    });
  });
  const onNewPost = async (newPost) => {
    await addPost(newPost);
    const loadedPosts = await loadPosts();
    if (loadedPosts) {
      setPosts(loadedPosts);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.cardBackground}
        translucent={true}
        style="dark"
      />
      <Header label="Kind Words" />
      <FlatList
        style={styles.list}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.body}
      />
      <Button
        title="New Post"
        onPress={() => navigation.push('NewPost', { onNewPost })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  container: {
    height: '100%',
    backgroundColor: colors.background,
  },
});
