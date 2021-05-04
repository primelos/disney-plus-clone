import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../features/movie/movieSlice";
import { selectUserName } from "../../features/user/userSlice";
import styled from "styled-components";
import ImageSlider from "../image-slider";
import NewDisney from "../newdisney";
import Originals from "../originals";
import Recommended from "../recommended";
import Trending from "../trending";
import Viewers from "../viewers";
import { db } from "../../firebase";
import data from '../../disneyPlusMoviesData'

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        // console.log(recommends);
        switch (doc.data().type) {
          case "recommend":
            recommends =[...recommends, { id: doc.id, ...doc.data() }]
            break;
          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;
          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;
          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
        }
      });
      dispatch(setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trending
      }))
    });
  }, [userName]);

  //    //  Needed to add the files to firestore!
  // useEffect(() => {
  //    const addCollectionAndDocuments = async (
  //     collectionKey,
  //     objectsToAdd
  //   ) => {
  //     const collectionRef = db.collection(collectionKey);
  //     const batch = db.batch();
  //     objectsToAdd.forEach((obj) => {
  //       const newDocRef = collectionRef.doc();
  //       batch.set(newDocRef, obj);
  //     });
  //     return await batch.commit();
  //   };
  //   addCollectionAndDocuments('movies', data)
  // }, [])

  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Recommended />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
