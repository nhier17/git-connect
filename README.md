<div align="center">
  <br />
      <img src="https://github.com/nhier17/git-connect/blob/main/public/icons/home2.png" alt="Project Banner">
    
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
  </div>

  <h3 align="center">A Social Network for Developers</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🚀 [More](#more)



## <a name="introduction">🤖 Introduction</a>

GitConnect is a social networking platform for developers to create profiles, share posts, collaborate, and seek help from other developers. It offers a developer-centric environment where users can share their projects, showcase their GitHub repositories, and interact with others through posts and comments.

<a href="https://discord.com/invite/n6EdbFJ" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/618f4872-1e10-42da-8213-1d69e486d02e" /></a>

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- Appwrite
- Typescript
- TailwindCSS
- ShadCN


## <a name="features">🔋 Features</a>

👉 **Sign Up and Sign In**: Users can create an account and log in securely.
👉 **Public Access**: The list of all registered developers is publicly accessible. Visitors can browse through profiles without logging in. This list is fetched from the Appwrite backend and displayed in a responsive UI.

👉 **Developer Profiles**: Each developer has a profile with personal details, education, work experience, and GitHub repositories.

👉 **Edit Profile**: Users can edit their profiles to update their personal information, education, work experience, and GitHub repository links. Only authenticated users can edit their own profile.

👉 **Post Feed**: View posts: Display a list of posts from all developers.
Create posts: Users can create new posts.
Like/Dislike posts: Interact with posts by liking or disliking.
Delete posts: Users can delete their own posts.

👉 **Comment on Post**:Users can comment on posts, which allows for discussions and interaction. The number of comments is displayed along with the post.


and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/nhier17/git-connect.git
cd git-connect
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
USER_COLLECTION_ID=
COMMENT_COLLECTION_ID=
POST_COLLLECTION_ID=


```

Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Deployment
Deployment was achieved through vercel
- Login  into vercel with your Github Account
- Add new project then import git-connect repository and add all enviromental variables
```bash
vercel login
```

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>user.actions.ts</code></summary>

```typescript

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createSessionClient();
    
    // Create session
    const session = await account.createEmailPasswordSession(email, password);
    
    cookies().set("appwrite-session", session.secret, {
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
    cookies().set("appwrite-session", session.secret, {
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
    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  
    console.log('Logged out successfully')
  } catch (error) {
    return null;
  }
}
```

</details>

## <a name="more">🚀 More</a>
### Future Enhancements
- Search Functionality: Implement a search bar to allow users to search for developers by name or skill set.
- Profile Image Upload: Allow users to upload profile images.
- Notifications: Notify users when someone likes or comments on their posts.
- Following System: Users can follow other developers to receive updates on their posts.


## Author: Abraham Nhier 
## Contacts:
    phone: +254716903151
    email: abrahamnhier@gmail.com

### LICENSE: [MIT License](link-to-license-file). 

#
