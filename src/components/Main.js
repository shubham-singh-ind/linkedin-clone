import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticlesAPI } from "../actions";
import DateUtil from "../utils/date";
import PostModal from "./PostModal";

function Main({ user, loading, getArticles, articles }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Container>
      <CreatePost>
        <Content>
          <Photo>
            <img
              src={user?.photoURL ? user.photoURL : "/images/user.svg"}
              alt="Profile"
            />
          </Photo>
          <input
            type="text"
            placeholder="Start a post"
            onClick={toggleModal}
            disabled={loading}
          />
        </Content>
        <MediaListWrapper>
          <MediaList>
            <img src="/images/image-frame-svgrepo-com.svg" alt="" />
            <span>Photo</span>
          </MediaList>
          <MediaList>
            <img src="/images/video-call-svgrepo-com.svg" alt="" />
            <span>Video</span>
          </MediaList>
          <MediaList>
            <img
              src="/images/event-calender-date-note-svgrepo-com.svg"
              alt=""
            />
            <span>Event</span>
          </MediaList>
          <MediaList>
            <img src="/images/article-1-svgrepo-com.svg" alt="" />
            <span>Write article</span>
          </MediaList>
        </MediaListWrapper>
      </CreatePost>
      <Posts>
        <Spinner>
          {loading && <img src="/images/spin.svg" alt="Spinner" />}
        </Spinner>
        {!articles || (articles.length === 0 && <NoPost>No post yet</NoPost>)}
        {articles.map((article, i) => (
          <PostContainer key={`${article}-${i}`}>
            <PostHeader>
              <Photo>
                {article?.actor?.image ? (
                  <img
                    src={article.actor.image}
                    onError={(e) => (e.target.src = "/images/user.svg")}
                    alt="Profile"
                  />
                ) : (
                  <img src="/images/user.svg" alt="Profile" />
                )}
              </Photo>
              <div className="user-detail-wrapper">
                <div className="user-detail">
                  <a href="#" className="user-name">
                    {article?.actor.title
                      ? article?.actor.title
                      : "Linkedin User"}
                  </a>
                  <span>•</span>
                  <span>Following</span>
                </div>
                <h2>Lorem ipsum dolor sit amet.</h2>
                <h2>
                  {DateUtil.getDiffWithSecond(
                    article.actor.date.seconds * 1000,
                    new Date().getTime()
                  )}
                </h2>
              </div>
              <Follow>+ Follow</Follow>
            </PostHeader>
            <PostContent>{article?.description}</PostContent>
            <PostMedia>
              {article?.sharedImage && (
                <img
                  src={article.sharedImage}
                  alt={article.description.substr(0, 10)}
                />
              )}
            </PostMedia>
            <PostReactions>
              <ReactionLeft>
                <ReactionIcons>
                  <img
                    src="https://static.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                    alt=""
                  />
                  <img
                    src="https://static.licdn.com/sc/h/41j9d0423ck1snej32brbuuwg"
                    alt=""
                  />
                  <img
                    src="https://static.licdn.com/sc/h/cpho5fghnpme8epox8rdcds22"
                    alt=""
                  />
                </ReactionIcons>
                <ReactionStatus>Aniket Vyas and 3,937 others</ReactionStatus>
              </ReactionLeft>
              <ReactionRight>
                <span>50</span>
                <span>Comments</span>
                <span>4</span>
                <span>reposts</span>
              </ReactionRight>
            </PostReactions>
            <PostActions>
              <PostAction>
                <img src="/images/thumb-up-svgrepo-com.svg" alt="" />
                <span>Like</span>
              </PostAction>
              <PostAction>
                <img src="/images/comment-line-svgrepo-com.svg" alt="" />
                <span>Comment</span>
              </PostAction>
              <PostAction>
                <img src="/images/retweet-svgrepo-com.svg" alt="" />
                <span>Repost</span>
              </PostAction>
              <PostAction>
                <img src="/images/send-svgrepo-com.svg" alt="" />
                <span>Send</span>
              </PostAction>
            </PostActions>
          </PostContainer>
        ))}
      </Posts>
      {isModalOpen && <PostModal onClose={() => toggleModal()} />}
    </Container>
  );
}

const Container = styled.div`
  flex-basis: 40%;
  flex-grow: 1;
`;

const CreatePost = styled.div`
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 10px;
  background-color: white;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  input {
    font-size: 12px;
    line-height: 2;
    font-weight: 600;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%;
    border-radius: 25px;
    padding: 10px 0px;
    padding-left: 10px;
    color: rgba(0, 0, 0, 0.8);
    cursor: none;
    transition-duration: 130ms;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;
const Photo = styled.a`
  height: 30px;
  width: 30px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  transition-duration: 130ms;
  img {
    height: 30px;
    border-radius: 50%;
  }
`;
const MediaListWrapper = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
`;
const MediaList = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  transition-duration: 130ms;
  img {
    height: 20px;
    margin-right: 2px;
  }
  span {
    font-size: 14px;
    font-weight: 600;
    color: var(--light-blue);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

// Post Styles:begin
const Posts = styled.div``;
const PostContainer = styled(CreatePost)`
  margin-top: 10px;
  min-width: 400px;
  padding: 0px 0px;
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  padding: 10px 10px;
  ${Photo} {
    margin-right: 17px;
    flex-basis: 10%;
  }
  h2 {
    font-weight: 500;
    font-size: 14px;
    text-align: start;
    color: rgba(0, 0, 0, 0.5);
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  .user-detail-wrapper {
    flex-basis: 70%;
  }
  .user-detail {
    display: flex;
    a,
    span {
      font-size: 14px;
      padding-right: 5px;
    }
  }
  .user-name {
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Follow = styled.a`
  color: var(--blue);
  flex-basis: 20%;
  font-weight: 600;
  padding: 10px 5px;
  border-radius: 5px;
  transition-duration: 130ms;
  &:hover {
    background-color: rgba(0, 0, 255, 0.1);
  }
`;
const PostContent = styled.div`
  font-size: 14px;
  text-align: justify;
  padding: 5px 10px;
`;
const PostMedia = styled.div`
  max-height: 400px;
  overflow: auto;
  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }
`;
const PostReactions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px;
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
`;
const ReactionLeft = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    color: var(--blue);
  }
`;
const ReactionRight = styled.div`
  display: flex;
  justify-content: space-around;
  span {
    padding: 0px 3px;
  }
`;
const ReactionIcons = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 20px;
    margin-right: -7px;
    transition: 200ms;
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const ReactionStatus = styled.div`
  position: relative;
  left: 10px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px 5px;
`;

const PostAction = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 5px;
  transition: 130ms;
  cursor: pointer;
  img {
    height: 20px;
    margin-right: 5px;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;
// Post Styles:end

const Spinner = styled.div`
  text-align: center;
  margin-top: 10px;
  img {
    height: 30px;
  }
`;

const NoPost = styled.div`
  color: var(--blue);
  margin-top: 2rem;
`;

const mapStateToProps = (state) => ({
  user: state.userState.user,
  loading: state.articleState.loading,
  articles: state.articleState.articles,
});

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
