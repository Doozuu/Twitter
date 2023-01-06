import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { reload } from "firebase/auth";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = async () => {
    const q = query(collection(dbService, "tweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const tweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setTweets((prev) => [tweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getTweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        tweet,
        createdAt: Date.now(),
      });
      setTweet(""); // 입력창 비우기
      window.location.reload(); // 새로고침
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
          <h4 key={tweet.id}>{tweet.tweet}</h4>
        ))}
      </div>
    </div>
  );
};

export default Home;
