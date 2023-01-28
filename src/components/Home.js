import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";

function Home(props) {
  const navigate = useNavigate();

  return (
    <Container>
      {!props.user && navigate("/")}
      <Section>
        <h5>
          <a>Hiring in a hurry? -</a>
        </h5>
        <p>
          Find talented pros in record time with Upwork and keep business
          moving.
        </p>
      </Section>
      <Layout>
        <LeftSide />
        <Main />
        <RightSide />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }

  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 25px;
  row-gap: 25px;
  padding-bottom: 100px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

// Redux
const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
