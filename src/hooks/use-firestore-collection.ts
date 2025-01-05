import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '@/firebase';

export const useFirestoreCollection = (collectionName: string) => {
  const [data, setData] = useState<{ id: string; [key: string]: unknown }[]>(
    []
  );

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(updatedData);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [collectionName]);

  return data;
};
