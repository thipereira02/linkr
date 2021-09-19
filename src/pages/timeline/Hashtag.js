import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getPostsByHashtag } from "../../service/api.service";
import UserContext from "../../contexts/UserContext";
import Post from "../../components/Post";
import Trending from "../../components/Trending";
import Header from "../../components/Header";
import { Main, Title, Container, Loader, LoaderText } from "./mainStyles";

export default function Hashtag() {
  const { hashtag } = useParams();
  const { userData } = useContext(UserContext);
  const [hashtagPosts, setHashtagPosts] = useState({});

  useEffect(() => {
    getPostsByHashtag({ token: userData.token }, hashtag).then((r) =>
      setHashtagPosts(r.data)
    );
  }, [hashtag, userData.token]);

  return (
    <>
      <Header />
      <Main>
        <Title># {hashtag}</Title>
        {hashtagPosts.posts ? (
          hashtagPosts.posts.map((post, index) => (
            <Post key={index} {...post} />
          ))
        ) : (
          <Container>
            <Loader />
            <LoaderText>Carregando...</LoaderText>
          </Container>
        )}
      </Main>
      <Trending />
    </>
  );
}