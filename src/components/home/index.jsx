import React from "react";
import styled from "styled-components";
import ImageSlider from "../image-slider";
import NewDisney from "../newdisney";
import Originals from "../originals";
import Recommended from "../recommended";
import Trending from "../trending";
import Viewers from "../viewers";
import { db } from '../../firebase'
import data from '../../disneyPlusMoviesData'


const Home = () => {
  // console.log('data', data);
 const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = db.collection(collectionKey);

  const batch = db.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

addCollectionAndDocuments('movies', data)

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
