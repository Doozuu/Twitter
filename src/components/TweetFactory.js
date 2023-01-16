import React from "react";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      //파일 경로 참조 만들기
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      //storage 참조 경로로 파일 업로드 하기
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
      attachmentUrl = await getDownloadURL(response.ref);
    }
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      });
      setTweet(""); // 입력창 비우기
      setAttachment(""); // 파일 미리보기 이미지 src 비우기
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
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const fileInput = useRef();
  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = ""; // clear하고 파일이름 남아있는거 지우기
  };
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={tweet}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
        style={{
          opacity: 0,
        }}
      ></input>
      {attachment && (
        <div>
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          ></img>
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
