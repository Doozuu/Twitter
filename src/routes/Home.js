import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
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

  return (
    <div>
      <TweetFactory userObj={userObj} />
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
