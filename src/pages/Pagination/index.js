import React, { useEffect, useState } from "react";
import ultimatePagination, { ITEM_TYPES, ITEM_KEYS } from "ultimate-pagination";

import {
  Page,
  PaginationIndicatorContainer,
  PaginationBarContainer
} from "./Pagination.styles";

const defaultList = new Array(200).fill(0).map((_, index) => ({ id: index }));

const anotherList = new Array(200)
  .fill(0)
  .map((_, index) => ({ id: index }))
  .reverse();

const PageIndicator = props => {
  const { children, pageNum, onPageChange, ...remainingProps } = props;
  return (
    <PaginationIndicatorContainer
      onClick={() => onPageChange(pageNum)}
      {...remainingProps}
    >
      {children}
    </PaginationIndicatorContainer>
  );
};

/**
 *
 * @param {Array} list
 * @param {*} options For other params, see the optional properties in https://github.com/ultimate-pagination/ultimate-pagination
 * @param {number=10} options.numItemsPerPage
 */
const usePage = (list, options = {}) => {
  const { numItemsPerPage = 10 } = options;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(list.length / numItemsPerPage);
  const paginationOptions = {
    ...options,
    currentPage,
    totalPages
  };

  const paginationModel = ultimatePagination.getPaginationModel(
    paginationOptions
  );

  const currentItems = list.slice(
    (currentPage - 1) * numItemsPerPage,
    currentPage * numItemsPerPage
  );

  const onPageChange = pageNum => setCurrentPage(pageNum);

  return { paginationModel, currentPage, currentItems, onPageChange };
};

const PaginationBar = props => {
  const { paginationModel, onPageChange } = props;

  return (
    <PaginationBarContainer>
      {paginationModel.map(page => {
        const { type, key, value, isActive } = page;

        switch (type) {
          case ITEM_TYPES.PAGE:
            return (
              <PageIndicator
                key={key}
                pageNum={value}
                isActive={isActive}
                onPageChange={onPageChange}
              >
                {value}
              </PageIndicator>
            );
          case ITEM_TYPES.FIRST_PAGE_LINK:
            return (
              <PageIndicator
                key={key}
                pageNum={value}
                onPageChange={onPageChange}
              >
                First
              </PageIndicator>
            );
          case ITEM_TYPES.PREVIOUS_PAGE_LINK:
            return (
              <PageIndicator
                key={key}
                pageNum={value}
                onPageChange={onPageChange}
              >
                Prev
              </PageIndicator>
            );
          case ITEM_TYPES.NEXT_PAGE_LINK:
            return (
              <PageIndicator
                key={key}
                pageNum={value}
                onPageChange={onPageChange}
              >
                Next
              </PageIndicator>
            );
          case ITEM_TYPES.LAST_PAGE_LINK:
            return (
              <PageIndicator
                key={key}
                pageNum={value}
                onPageChange={onPageChange}
              >
                Last
              </PageIndicator>
            );
          case ITEM_TYPES.ELLIPSIS:
            return (
              <PageIndicator
                key={key}
                pageNum={value}
                onPageChange={onPageChange}
              >
                ...
              </PageIndicator>
            );
          default:
            return null;
        }
      })}
    </PaginationBarContainer>
  );
};

const Pagination = props => {
  const { list = defaultList } = props;
  const options = {
    boundaryPagesRange: 1,
    siblingPagesRange: 1,
    hideEllipsis: false,
    hidePreviousAndNextPageLinks: false,
    hideFirstAndLastPageLinks: false
  };
  const pageInfo = usePage(list, options);

  return (
    <Page>
      {pageInfo.currentItems.map(item => {
        return <div>{item.id}</div>;
      })}
      <PaginationBar
        paginationModel={pageInfo.paginationModel}
        onPageChange={pageInfo.onPageChange}
      />
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
