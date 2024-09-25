"use server";

import { ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_POST_COLLECTION_ID: POST_COLLECTION_ID,
    APPWRITE_COMMENT_COLLECTION_ID: COMMENT_COLLECTION_ID,
  } = process.env;

//create posts
export const createPost = async ({ postId, userId, postData}: postCreationProps) => {
    try {
       const { database } = await createAdminClient();
       const postId = ID.unique();
       const post = await database.createDocument(
        DATABASE_ID!,
        POST_COLLECTION_ID!,
        postId,
        {
            postId,
            userId,
            ...postData,
        }
       )

       return parseStringify(post);
    } catch (error) {
        console.error('Error creating post',error);
    }
}

//get posts
export const getPosts = async () => {
    try {
      const { database } = await createAdminClient();
      const posts = await database.listDocuments(
        DATABASE_ID!,
        POST_COLLECTION_ID!,
      )
    
      return parseStringify(posts.documents);
    } catch (error) {
      console.error('Error fetching posts',error);
    }
  }

  //get post by id
  export const getPostById = async (postId: string) => {
    try {
      const { database } = await createAdminClient();
      const post = await database.getDocument(
        DATABASE_ID!,
        POST_COLLECTION_ID!,
         postId
      );
  
      return parseStringify(post);
    } catch (error) {
      console.error('Error fetching post by id', error);
    }
  }

  //delete post
  export const deletePost = async () => {
    try {
        const { database } = await createAdminClient();

        await database.deleteDocument(
            DATABASE_ID!,
            POST_COLLECTION_ID!,
            postId
        )
        return{ message: 'Post deleted successfully'}
    } catch (error) {
        console.error('Error deleting post',error);
    }
  }

// like post
export const likePost = async ({ postId, userId }: likePostProps) => {
    try {
      const { database } = await createAdminClient();
  
      const post = await database.getDocument(
        DATABASE_ID!,
        POST_COLLECTION_ID!,
        postId
      );
  
      // Check if the user has already liked the post
      let updatedLikes;
      if (post.likes.includes(userId)) {
        console.log("User already liked this post");
        return;
      } else {
        updatedLikes = [...post.likes, userId];
      }
  
      // Update the post with the new likes array
      const updatedPost = await database.updateDocument(
        DATABASE_ID!,
        POST_COLLECTION_ID!,
        postId,
        {
          likes: updatedLikes,
        }
      );
  
      return parseStringify(updatedPost);
    } catch (error) {
      console.error("Error liking post", error);
    }
  };
  
  //dislike post
  export const dislikePost = async ({ postId, userId }: likePostProps) => {
    try {
        const { database } = await createAdminClient();
        const post = await database.getDocument(
            DATABASE_ID!,
            POST_COLLECTION_ID!,
            postId
        );
        //check if user already disliked this post
        if (!post.dislikes.includes(userId)) {
            const updatedDislikes = [...post.dislikes, userId];
      
            const updatedPost = await database.updateDocument(
              DATABASE_ID!,
              POST_COLLECTION_ID!,
              postId,
              { dislikes: updatedDislikes }
            );
      
            return parseStringify(updatedPost);
          }
      
          return post;
    } catch (error) {
        console.error('Error disliking post',error);
    }
  }

  //comment on post
  export const commentOnPost = async ({ postId, userId, content}: CommentCardProps) => {
    try {
        const { database } = await createAdminClient();
        const commentId = ID.unique();

        const comment = await database.createDocument(
            DATABASE_ID!,
            COMMENT_COLLECTION_ID!,
            commentId,
            {
                commentId,
                postId,
                userId,
                content,
            }
        )
        return parseStringify(comment);
    } catch (error) {
        console.error('Error creating comment',error);
    }
  }