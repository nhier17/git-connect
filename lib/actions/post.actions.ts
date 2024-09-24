"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_POST_COLLECTION_ID: POST_COLLECTION_ID,
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