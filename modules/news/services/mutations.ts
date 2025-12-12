import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { NewsItem } from "./queries";

const NEWS_COLLECTION = "news";

// Створити нову новину
export async function createNews(news: Omit<NewsItem, "id">) {
  try {
    console.log("Creating news with data:", news);
    const docRef = await addDoc(collection(db, NEWS_COLLECTION), {
      ...news,
      date: Timestamp.now(),
    });
    console.log("News created successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
}

// Оновити новину
export async function updateNews(id: string, news: Partial<NewsItem>) {
  try {
    console.log("Updating news with ID:", id, "Data:", news);
    const docRef = doc(db, NEWS_COLLECTION, id);
    const updateData = { ...news };
    if (!("date" in news)) {
      updateData.date = Timestamp.now();
    }
    await updateDoc(docRef, updateData);
    console.log("News updated successfully");
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
}

// Видалити новину
export async function deleteNews(id: string) {
  try {
    await deleteDoc(doc(db, NEWS_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
}
