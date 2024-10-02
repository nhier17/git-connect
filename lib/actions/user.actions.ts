/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { ID,Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

//get userinfo
export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error)
  }
}

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    
    // Create session
    const session = await account.createEmailPasswordSession(email, password);
    
    cookies().set("developer-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    
    const user = await getUserInfo({ userId: session.userId });
  
    // Return session data 
    return parseStringify(user);
  } catch (error) {
    console.error("Sign-in error:", error);
    
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, name } = userData;
  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();
    
    // Create a new user account
    newUserAccount = await account.create(
      ID.unique(),
       email,
       password, 
       name
      );

    if (!newUserAccount) throw new Error("Error creating new user");

    // Insert user profile into the database
    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
      }
    );

    // Create a session for the new user
    const session = await account.createEmailPasswordSession(email, password);
    
    // Set the session in cookies securely
    cookies().set("developer-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Return the newly created user
    return  parseStringify(newUser);
  } catch (error) {
    console.error("Sign-up error:", error);
  }
};

//get logged in user
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id})
    return parseStringify(user);
  } catch (error) {
    console.error("Loggd in error:", error);
  }
}

//log out user
export const logOutAccount = async () => {
  try {
    const { account } = await createSessionClient();

     cookies().delete("developer-session");

     await account.deleteSession("current");
     console.log('Logged out successfully')
  
  } catch (error) {
    return null;
  }
}
//get users
export const getUsers = async () => {
  try {
    const { database } = await createAdminClient();
    const users = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
    )
  
    return parseStringify(users.documents);
  } catch (error) {
    
  }
}

//get user by id 
export const getUserById = async ({ userId }: getUsersProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!, 
      USER_COLLECTION_ID!, 
      [Query.equal('userId', userId)]
    );

    // Check if any users were returned
    if (user.documents.length === 0) {
      throw new Error('User not found');
    }

    return  parseStringify(user.documents[0]);
  } catch (error) {
    console.error('Error getting user:', error);
  }
};

//update user profile
export async function updateUserProfile(userId: string, userData: any) {
try {
  const { database } = await createAdminClient();
  const updatedUser = await database.updateDocument(
    DATABASE_ID!,
    USER_COLLECTION_ID!,
    userId,
    userData,
  )
  
  return parseStringify(updatedUser);
} catch (error) {
  console.error('Error updating user profile', error);
}
}