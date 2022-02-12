import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/firebase-config";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import List from '@mui/material/List';
import { ListItemText } from "@mui/material";


const ServiceList = () => {
  const { currentUser } = useAuth();
  const [service, setService] = useState([]);


  useEffect(() => {
    let collectionRef = collection(db, "services");
    let queryRef = query(collectionRef, where("uid", "==", currentUser.uid));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let serviceData = querySnap.docs.map((doc) => {
          return {
          ...doc.data(),
          DOC_ID: doc.id,
        };
      });
        setService(serviceData);
      }
    });
    return unsubscribe;
  }, []);
  
  
  return (
      <>
      {service.map((service, index) => {
        return (
          <List key={index}>
            <ListItemText primary={`Service: ${service.service}`}/>
            <ListItemText primary={`Cost Per Hour: $${service.hourly_Cost}`}/>
          </List>
        )
        })}
      </>
  );
};

export default ServiceList;
