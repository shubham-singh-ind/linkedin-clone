import { connect } from "react-redux";
import styled from "styled-components";

function LeftSide(props) {
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo>
              <img
                src={
                  props.user && props.user.photoURL
                    ? props.user.photoURL
                    : "/images/photo.svg"
                }
                onError={(e) => (e.target.src = "/images/user.svg")}
                alt=""
              />
            </Photo>
            <Link blue>Add Photo</Link>
            <Link>
              Welcome, {props.user ? props.user.displayName : "there"}
            </Link>
            <Bio>
              System Engineer at TCS Digital | JavaScript | SQL | Node | React |
              Angular
            </Bio>
          </a>
        </UserInfo>
        <Widgets>
          <a className="connections">
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src="/images/widget-icon.svg" alt="" />
          </a>
          <a className="my-item">
            <img src="/images/item-icon.svg" alt="" />
            <span className="my-item">My Item</span>
          </a>
        </Widgets>
      </ArtCard>
    </Container>
  );
}

const Container = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ArtCard = styled.div`
  max-width: 15rem;
  background-color: white;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const UserInfo = styled.div`
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;
const CardBackground = styled.div`
  height: 4rem;
  background: url("https://m.media-amazon.com/images/I/31qu4ixHZ3L._SY355_.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const Photo = styled.div`
  height: 5rem;
  width: 5rem;
  position: relative;
  bottom: 3rem;
  border-radius: 50%;
  background-color: white;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  margin-bottom: -2rem;
`;

const Link = styled.div`
  font-weight: 600;
  line-height: 1.6;
  ${(props) =>
    props.blue &&
    `
      color: var(--blue);
      cursor: pointer;
      ;
    `}
`;

const Bio = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
`;

const Widgets = styled.div`
  .connections {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span {
        font-size: 14px;
        justify-content: center;
      }
      span:nth-child(1) {
        color: rgba(0, 0, 0, 0.7);
      }
      span:nth-child(2) {
        font-size: 12px;
        font-weight: 600;
      }
    }
    img {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      padding: 5px;
      cursor: pointer;
      transition-duration: 125ms;
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }

  .my-item {
    display: flex;
    justify-content: flex-start;
    padding: 5px 10px;
    transition-duration: 125ms;
    cursor: pointer;
    span {
      font-weight: 600;
      font-size: 12px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

export default connect(mapStateToProps)(LeftSide);
