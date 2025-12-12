import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export interface NewsItem {
  id?: string;
  title: string;
  category: string;
  description: string;
  content: string;
  authorId: string;
  author: string;
  date?: Timestamp | Date;
  status: "draft" | "published";
}

const NEWS_COLLECTION = "news";

// Отримати всі опублікована новини (публічне)
export async function getAllPublishedNews() {
  try {
    const q = query(
      collection(db, NEWS_COLLECTION),
      where("status", "==", "published")
    );
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate?.() || new Date(),
    })) as NewsItem[];
    // Клієнтське сортування за датою (desc), щоб не вимагати composite index у Firestore
    items.sort((a, b) => {
      const at = a.date instanceof Date ? a.date.getTime() : (a.date as any)?.toDate?.()?.getTime?.() ?? 0;
      const bt = b.date instanceof Date ? b.date.getTime() : (b.date as any)?.toDate?.()?.getTime?.() ?? 0;
      return bt - at;
    });
    return items;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

// Отримати одну новину по ID
export async function getNewsById(id: string) {
  try {
    const docRef = doc(db, NEWS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        date: docSnap.data().date?.toDate?.() || new Date(),
      } as NewsItem;
    }
    return null;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

// Отримати всі новини користувача
export async function getUserNews(authorId: string) {
  try {
    console.log("Fetching user news for authorId:", authorId);
    const q = query(
      collection(db, NEWS_COLLECTION),
      where("authorId", "==", authorId)
    );
    const snapshot = await getDocs(q);
    console.log("Found", snapshot.docs.length, "news for user");
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate?.() || new Date(),
    })) as NewsItem[];
    items.sort((a, b) => {
      const at = a.date instanceof Date ? a.date.getTime() : (a.date as any)?.toDate?.()?.getTime?.() ?? 0;
      const bt = b.date instanceof Date ? b.date.getTime() : (b.date as any)?.toDate?.()?.getTime?.() ?? 0;
      return bt - at;
    });
    return items;
  } catch (error) {
    console.error("Error fetching user news:", error);
    throw error;
  }
}
