import { ID, Client, Databases, Account } from "appwrite";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

const databases = new Databases(client);
const account = new Account(client);

// Function to get the current user session
export async function getCurrentUser() {
  try {
    const session = await account.get();
    return session;
  } catch (error) {
    console.error("Error getting current user session:", error);
    return null;
  }
}

// login user session
export async function loginUser(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error creating user session:", error);
    throw error;
  }
}

// Create a new user
export async function createUser(
  email: string,
  password: string,
  name: string
) {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    console.log("User created:", user);
    // Automatically create a session for the new user
    await loginUser(email, password);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Function to check if a user is logged in
export async function isUserLoggedIn() {
  try {
    const session = await account.get();
    return session !== null;
  } catch (error) {
    console.error("Error checking user session:", error);
    return false;
  }
}

// savePostToDB function to save a post to the Database
export async function savePostToDB(data: {
  niche: string;
  content: string;
  imageUrl?: string;
}) {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "",
      ID.unique(),
      {
        niche: data.niche,
        content: data.content,
        imageUrl: data.imageUrl || null,
      }
    );
    console.log("Post saved to DB:", response);
  } catch (error) {
    console.error("Error saving post to DB:", error);
    throw error;
  }
}

// Function to fetch all posts from the Database
export async function getPostsFromDB() {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || ""
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching posts from DB:", error);
    throw error;
  }
}

// Function to delete a post from the Database
export async function deletePostFromDB(documentId: string) {
  try {
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "",
      documentId
    );
    console.log("Post deleted from DB:", documentId);
  } catch (error) {
    console.error("Error deleting post from DB:", error);
    throw error;
  }
}

// Function to update a post in the Database
// Allows updating niche, content, and imageUrl
export async function updatePostInDB(
  documentId: string,
  data: { niche?: string; content?: string; imageUrl?: string }
) {
  try {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "",
      documentId,
      data
    );
    console.log("Post updated in DB:", response);
  } catch (error) {
    console.error("Error updating post in DB:", error);
    throw error;
  }
}

// Function to get a post by its ID
// Useful for editing or viewing a specific post
// Returns the post document if found, or throws an error if not found
// Note: This function assumes the document ID is valid and exists in the collection
// If the document does not exist, it will throw an error
export async function getPostById(documentId: string) {
  try {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "",
      documentId
    );
    return response;
  } catch (error) {
    console.error("Error fetching post by ID from DB:", error);
    throw error;
  }
}
