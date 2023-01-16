import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      deleteDoc(TweetTextRef);
      deleteObject(ref(storageService, tweetObj.attachmentUrl));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (event) => {
    event.preventDefault();
    updateDoc(TweetTextRef, {
      text: newTweet,
    });
    setEditing(false); // editng 모드 풀어주기
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update" className="formBtn"></input>
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl}></img>}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
