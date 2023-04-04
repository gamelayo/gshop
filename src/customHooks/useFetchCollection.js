import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

import { toast } from "react-toastify";
import { db } from "../firebase/Config";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLOading] = useState(false);

  const getCollection = () => {
    setIsLOading(true);
    try {
      const docRef = collection(db, collectionName);

      const q = query(docRef, orderBy("createdAt", "desc"));

      // const q = query(collection(db, "cities"), where("state", "==", "CA"));
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(allData);
        setData(allData);
        setIsLOading(false);
      });
    } catch (error) {
      setIsLOading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading };
};

export default useFetchCollection;
