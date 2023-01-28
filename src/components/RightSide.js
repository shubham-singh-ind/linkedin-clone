import styled from "styled-components";
import { LinkedinCard } from "./common-style/Layout";

export default function RightSide() {
  return (
    <Container>
      <News>
        <Title>LinkedIn News</Title>
        <NewsList>
          <NewsItem>
            <a>
              <h2>PepsiCo to hire 1,200</h2>
              <span>3d ago • 9,016 readers</span>
            </a>
          </NewsItem>
          <NewsItem>
            <a>
              <h2>PepsiCo to hire 1,200</h2>
              <span>3d ago • 9,016 readers</span>
            </a>
          </NewsItem>
          <NewsItem>
            <a>
              <h2>PepsiCo to hire 1,200</h2>
              <span>3d ago • 9,016 readers</span>
            </a>
          </NewsItem>
          <NewsItem>
            <a>
              <h2>PepsiCo to hire 1,200</h2>
              <span>3d ago • 9,016 readers</span>
            </a>
          </NewsItem>
          <NewsItem>
            <a>
              <h2>PepsiCo to hire 1,200</h2>
              <span>3d ago • 9,016 readers</span>
            </a>
          </NewsItem>
        </NewsList>
      </News>
    </Container>
  );
}

const Container = styled.div`
  flex-basis: 30%;
`;

const News = styled(LinkedinCard)`
  max-width: 15rem;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const Title = styled.div`
  text-align: start;
  font-weight: 600;
`;
const NewsList = styled.ul`
  padding: 10px;
`;
const NewsItem = styled.li`
  text-align: start;
  font-size: 14px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition-duration: 200ms;
  span {
    color: rgba(0, 0, 0, 0.5);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
