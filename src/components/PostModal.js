import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import firebase from "firebase/compat/app";
import { postArticleAPI } from "../actions";

function PostModal({ onClose, user, postArticle }) {
  const [editorText, setEditorText] = useState("");
  const [sharedImage, setSharedImage] = useState("");

  const reset = () => {
    setEditorText("");
    setSharedImage("");
    onClose();
  };

  const handlePostArticle = () => {
    const payload = {
      image: sharedImage,
      user: user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    postArticle(payload);
    reset();
  };

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`Not an image, the file is a ${typeof image}`);
      return;
    }
    setSharedImage(image);
  };

  return (
    <Container>
      <Content>
        <Header>
          <Title>Create Post</Title>
          <CloseIcon onClick={() => reset()}>
            <img src="/images/close-svgrepo-com.svg" alt="" />
          </CloseIcon>
        </Header>
        <PostInput>
          <UserInfo>
            <Avatar>
              <img
                src={user.photoURL ? user.photoURL : "/images/photo.svg"}
                alt=""
              />
            </Avatar>
            <div className="user-detail">
              <div>
                <span>{user.displayName}</span>
              </div>
              <div>
                <select name="" id="">
                  <option value="">Public</option>
                  <option value="">Private</option>
                  <option value="">Connects</option>
                </select>
              </div>
            </div>
          </UserInfo>
          <TextArea
            placeholder="What do you want to talk about?"
            autoFocus={true}
            onChange={(e) => {
              setEditorText(e.target.value);
            }}
            value={editorText}
          />
          <UploadImage>
            <input
              type="file"
              accept="image/gif,image/jpeg,image/png"
              name="image"
              id="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            {sharedImage && (
              <img src={URL.createObjectURL(sharedImage)} alt="Shared" />
            )}
          </UploadImage>
        </PostInput>
        <Action>
          <AttachAssets>
            <button>
              <label htmlFor="file">
                <img src="/images/image-file-svgrepo-com.svg" alt="" />
              </label>
            </button>
            <button>
              <img src="/images/video-call-svgrepo-com.svg" alt="" />
            </button>
            <button>
              <img src="/images/article-1-svgrepo-com.svg" alt="" />
            </button>
          </AttachAssets>
          <PostButton
            disabled={editorText.length === 0 ? true : false}
            onClick={handlePostArticle}
          >
            Post
          </PostButton>
        </Action>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  animation: fadeIn 300ms;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  max-height: 90%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
`;

const Title = styled.header``;

const CloseIcon = styled.header`
  cursor: pointer;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  transition-duration: 170ms;
  img {
    height: 25px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const PostInput = styled.div`
  overflow: auto;
  max-height: 300px;
  padding: 10px;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .user-detail {
    flex-basis: 90%;
    display: flex;
    flex-direction: column;
    text-align: start;
    padding-left: 10px;
  }
`;
const Avatar = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`;
const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  min-height: 120px;
  font-size: 14px;
  padding-top: 5px;
  font-family: inherit;
`;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;
    padding: 20px;
    margin-right: 5px;
    cursor: pointer;
    border-radius: 50%;
    transition-duration: 170ms;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  img {
    width: 25px;
  }
`;

const PostButton = styled.button`
  background-color: var(--blue);
  padding: 0px 15px;
  color: white;
  border-radius: 5px;
  transition-duration: 170ms;
  cursor: pointer;
  :disabled {
    background-color: white;
    color: rgba(0, 0, 0, 0.2);
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => ({
  user: state.userState.user,
  loading: state.articleState.loading,
});

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
