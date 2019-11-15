import React, { Component } from "react";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Capitalize = styled.h1`
  text-transform: capitalize;
`;

const Lowercase = styled.h1`
  text-transform: lowercase;
`;

// const H1 = styled.h1`
//   font-weight: ${props => (props.bold ? "bold" : "normal")};
// `;

// const ExtendedH1 = styled(H1)`
//   border-bottom: 2px solid #efefef;
// `;

// const StyledHeader = styled.h1``;

// // header: h1, h2, h3, h4, h5, h6
// // subtitle: large, regular, small | italic, bold (?)
// // text: large, regular, small | italic, bold

// const Header = props => {
//   const { size, children, className } = props;
//   const as = size === "h1" ? "h1" : "h2";

//   return (
//     <StyledHeader as={as} className={className}>
//       {children}
//     </StyledHeader>
//   );
// };

// weight: bold or regular
// style: italic or regular
// size

const Header = styled.h1`
  font-family: sans;
  margin: 1rem;
  font-weight: ${props => (props.fontWeight === "bold" ? "700" : "400")};
  font-style: ${props => (props.fontStyle === "italic" ? "italic" : "normal")};
  color: ${props => props.color || "#bebebe"};
`;

const H1 = styled(Header).attrs({ as: "h1" })`
  font-size: 2.5rem;
`;

const H1BoldItalic = styled(H1)`
  font-weight: 700;
  font-style: italic;
`;

const H2 = styled(Header).attrs({ as: "h2" })`
  font-size: 2rem;
`;

const Small = styled(Header)`
  font-size: 0.8rem;
`;

class Typography extends Component {
  render() {
    return (
      <Page>
        <Capitalize id="capitalize">This is upper case</Capitalize>
        <Lowercase id="lower">This is lower case</Lowercase>
        {/* <H1>This is H1 header</H1>
        <H1 bold>This is H1 header</H1>
        <ExtendedH1>This is extended H1 header</ExtendedH1>
        <Header size="h1">This is generic header</Header> */}
        <H1>Base header</H1>
        <Small color="red">Base header</Small>
        <H1 fontWeight="regular" fontStyle="italic" color="grey">
          Base header
        </H1>
        <H1 fontWeight="regular" fontStyle="italic" color="#3A8EE8">
          Base header with color
        </H1>
        <H1 fontWeight="regular" fontStyle="italic" color="#F26C47">
          Base header with color
        </H1>
        <H1BoldItalic>Base header</H1BoldItalic>
        <H2>Base header</H2>
      </Page>
    );
  }
}

export default Typography;
