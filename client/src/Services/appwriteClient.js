// frontend/src/services/appwriteClient.js
import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // e.g. http://localhost/v1
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

export async function signup(email, password, name) {
  // create user (Appwrite will store it)
  const user = await account.create("unique()", email, password, name);
  // create session (login)
  await account.createSession(email, password);
  return account.get(); // returns logged-in user object
}

export async function login(email, password) {
  await account.createSession(email, password);
  return account.get();
}

export async function logout() {
  await account.deleteSession("current");
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch (err) {
    return null;
  }
}
