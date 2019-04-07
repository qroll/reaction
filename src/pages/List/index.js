import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";

import { Page, Card } from "src/components/Container";

const ListItem = styled(Card)`
  padding: 1rem;
  margin: 1rem;
`;

const Placeholder = styled(Card)`
  background-color: #bebebe;
  color: #fff;
  padding: 1rem;
  margin: 1rem;
`;

const items = new Array(100).fill(1).map((item, index) => {
  return {
    no: index
  };
});

const List = () => {
  return (
    <Page>
      {items.map(item => {
        return (
          <LazyLoad
            placeholder={<Placeholder />}
            height="100%"
            once
            key={item.no}
          >
            <ListItem>{item.no}</ListItem>
          </LazyLoad>
        );
      })}
    </Page>
  );
};

export default List;
