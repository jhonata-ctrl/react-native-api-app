import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getPostById, getCommentsByPostId } from '../services/api';

export default function PostDetailScreen({ route, navigation }) {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    loadPostDetails();
  }, [postId]);

  const loadPostDetails = async () => {
    try {
      setLoading(true);
      const postData = await getPostById(postId);
      setPost(postData);
      
      setCommentsLoading(true);
      const commentsData = await getCommentsByPostId(postId);
      setComments(commentsData);
    } catch (error) {
      console.error('Error loading post details:', error);
    } finally {
      setLoading(false);
      setCommentsLoading(false);
    }
  };

  const handleUserPress = () => {
    if (post) {
      navigation.navigate('User', { userId: post.userId });
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.centered}>
        <Text>Post não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
        
        <TouchableOpacity 
          style={styles.userButton} 
          onPress={handleUserPress}
        >
          <View style={styles.userInfo}>
            <Icon name="person" size={20} color="#007AFF" />
            <Text style={styles.userButtonText}>
              Ver perfil do usuário {post.userId}
            </Text>
          </View>
          <Icon name="arrow-forward" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>
          Comentários ({comments.length})
        </Text>
        
        {commentsLoading ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : (
          comments.map((comment) => (
            <View key={comment.id} style={styles.commentCard}>
              <Text style={styles.commentName}>{comment.name}</Text>
              <Text style={styles.commentEmail}>{comment.email}</Text>
              <Text style={styles.commentBody}>{comment.body}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  postContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    lineHeight: 30,
  },
  body: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
  },
  userButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  commentsSection: {
    padding: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  commentCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  commentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  commentEmail: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  commentBody: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});