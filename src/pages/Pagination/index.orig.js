import React, { useEffect, useState } from "react";

import {
  Page,
  PaginationIndicator,
  PaginationBarContainer,
  PaginationArrowIndicator,
  PaginationEllipsis
} from "./Pagination.styles";

const defaultList = new Array(100).fill(0).map((_, index) => ({ id: index }));

const anotherList = new Array(100)
  .fill(0)
  .map((_, index) => ({ id: index }))
  .reverse();

const DefaultPaginationIndicator = props => {
  const { pageNum, ...remainingProps } = props;
  return (
    <PaginationIndicator {...remainingProps}>{pageNum}</PaginationIndicator>
  );
};

const usePage = (list, options = {}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    PaginationIndicator = DefaultPaginationIndicator,
    numItemsPerPage = 10,
    resetOnNewList = false,
    numSiblings = 2
  } = options;
  const maxPages = Math.ceil(list.length / numItemsPerPage);

  const nextPage = () => setCurrentPage(Math.min(currentPage + 1, maxPages));
  const previousPage = () => setCurrentPage(Math.max(currentPage - 1, 1));
  const goToPage = page => setCurrentPage(page);

  const pages = new Array(maxPages).fill(0).map((_, index) => {
    return {
      pageNum: index + 1,
      onClick: () => goToPage(index + 1)
    };
  });

  useEffect(() => {
    if (resetOnNewList) {
      setCurrentPage(1);
    }
  }, [list]);

  return {
    nextPage,
    previousPage,
    goToPage,
    currentItems: list.slice(
      (currentPage - 1) * numItemsPerPage,
      currentPage * numItemsPerPage
    ),
    currentPage,
    pages,
    numSiblings,
    PaginationIndicator
  };
};

const PaginationBar = ({
  PaginationIndicator,
  pages,
  previousPage,
  nextPage,
  currentPage,
  numSiblings
}) => {
  const index = currentPage - 1;

  const previousPages = pages.slice(Math.max(index - numSiblings, 0), index);
  const nextPages = pages.slice(index + 1, index + 1 + numSiblings);

  return (
    <PaginationBarContainer>
      <PaginationArrowIndicator onClick={previousPage}>
        Prev
      </PaginationArrowIndicator>
      {previousPages.length >= numSiblings && (
        <PaginationEllipsis>...</PaginationEllipsis>
      )}
      {previousPages.map(props => (
        <PaginationIndicator {...props} />
      ))}
      <PaginationIndicator isActive {...pages[index]} />
      {nextPages.map(props => (
        <PaginationIndicator {...props} />
      ))}
      {nextPages.length >= numSiblings && (
        <PaginationEllipsis>...</PaginationEllipsis>
      )}
      <PaginationArrowIndicator onClick={nextPage}>
        Next
      </PaginationArrowIndicator>
    </PaginationBarContainer>
  );
};

const Pagination = props => {
  const { list = defaultList } = props;
  const pageInfo = usePage(list);

  return (
    <Page>
      {pageInfo.currentItems.map(item => {
        return <div>{item.id}</div>;
      })}
      <PaginationBar {...pageInfo} />
    </Page>
  );
};

class Wow extends React.Component {
  state = {
    list: defaultList
  };

  componentDidMount() {
    setTimeout(() => this.setState({ list: anotherList }), 3000);
  }

  render() {
    return <Pagination list={this.state.list} />;
  }
}

export default Wow;
