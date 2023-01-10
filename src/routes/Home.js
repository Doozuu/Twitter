import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { reload } from "firebase/auth";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const q = query(collection(dbService, "tweets"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTweets(newArray);
      console.log("Current tweets in CA: ", newArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setTweet(""); // 입력창 비우기
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error adding document", error);
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={tweet}
        />
        <input onChange={onChange} type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid} // 내가 쓴 것만 지우거나 수정할 수 있게
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
