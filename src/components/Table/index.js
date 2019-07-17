import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TableWrapper = styled.div``;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  display: inline-block;
  padding: 5px;
  flex-grow: ${props => props.width};
`;

const HeaderCell = styled(Cell)`
  font-weight: bold;
`;

const BodyCell = styled(Cell)``;

class Table extends React.Component {
  render() {
    const { columns, data } = this.props;
    return (
      <TableWrapper>
        <Row>
          {columns.map(column => {
            return <HeaderCell>{column.label}</HeaderCell>;
          })}
        </Row>
        {data.map(row => {
          return (
            <Row>
              {columns.map(column => {
                if (typeof column.field === "function") {
                  return (
                    <BodyCell width={column.width}>
                      {column.field(row)}
                    </BodyCell>
                  );
                }
                return (
                  <BodyCell width={column.width}>{row[column.field]}</BodyCell>
                );
              })}
            </Row>
          );
        })}
      </TableWrapper>
    );
  }
}

Table.propTypes = {};

Table.defaultProps = {};

export default Table;
