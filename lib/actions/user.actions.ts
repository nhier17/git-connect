'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createSessionClient();
    
    // Create session
    const session = await account.createEmailPasswordSession(email, password);

    // Set the session in cookies securely
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Return session data 
    return { success: true, session };
  } catch (error) {
    console.error("Sign-in error:", error.message || error);
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
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Return the newly created user
    return  parseStringify(newUser);
  } catch (error) {
    console.error("Sign-up error:", error.message || error);
  }
};
