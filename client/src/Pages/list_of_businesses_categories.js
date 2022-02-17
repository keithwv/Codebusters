import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  collection,
  endAt,
  onSnapshot,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebase-config";
import Header from "../Components/User_Interface/Header";
import { useLocation } from "react-router-dom";
// import HomePage from "./home_page";
// import cards from "../Components/HomePageCards/cards";
// import { useCategory } from "../contexts/SelectedCategoryContext";

export default function ListOfBusinessesInCategory() {
  //we passed props here
  // const category = useCategory
  const [list, setList] = useState([]);
  // const { value } = props;
  // console.log(value, "VALUE IS HERE!");

  //location.search is used to search in firestore
  let location = useLocation();

  console.log(`location is:`, location);
  console.log(`category is:`, location.search);

  useEffect(() => {
    if (location.search) {
      let collectionRef = collection(db, "business");
      let queryRef = query(
        collectionRef,
        where("category", "==", location.search) //value change to location.search
        // orderBy("company_name"),
        // startAt("Car Repairs"),
        // endAt("Car Repairs")
      );
      // console.log("HOMEPAGE VALUE", category)
      const undo = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let businessesList = querySnap.docs.map((doc) => {
            return {
              ...doc.data(),
              DOC_ID: doc.id,
            };
          });
          setList(businessesList);
        }
      });
      return undo;
    }
  }, [location.search]);

  return (
    <>
      <Header />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          ml: "240px",
        }}
      >
        {list.map((item) => {
          return (
            <>
              <ul key={item.DOC_ID}></ul>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={item.category}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.DOC_ID}
                      </Typography>
                      {" - this is ID of a document in firebase"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <hr />
            </>
          );
        })}
        <br />
        {/* <Divider variant="inset" component="li" /> */}
      </List>
    </>
  );
}
