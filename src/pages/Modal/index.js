import React, { Component, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ModalContext = React.createContext();

const ModalOverlay = props => {
  return (
    <ModalContext.Consumer>
      {value => {
        const { isOpen } = value;

        return isOpen ? <div>it me</div> : null;
      }}
    </ModalContext.Consumer>
  );
};

const withModal = Component => props => {
  return (
    <ModalContext.Consumer>
      {value => (
        <Component
          openModal={value.openModal}
          closeModal={value.closeModal}
          {...props}
        />
      )}
    </ModalContext.Consumer>
  );
};

const withPage = (Component, pageKey) => {
  const PageHOC = props => {
    const { notification } = props;
    const [title, setPageTitle] = useState("");

    return (
      <div>
        <div>Title: {title}</div>
        <div>Notification: {notification}</div>
        <Component setPageTitle={setPageTitle} {...props} />
      </div>
    );
  };

  return PageHOC;
};

// if reading from redux
const withNotifications = Component => {
  return props => <Component {...props} />;
  // const NotificationHOC = props => {
  //   console.log(">>> props", props);
  //   return <Component {...props} />;
  // };

  // const mapStateToProps = state => {
  //   return state.notification || {};
  // };
  // const mapDispatchToProps = {};

  // return connect(
  //   mapStateToProps,
  //   mapDispatchToProps
  // )(NotificationHOC);
};

const App = props => {
  const { openModal, closeModal } = props;
  return (
    <div>
      <div onClick={openModal}>open</div>
      <div onClick={closeModal}>close</div>
    </div>
  );
};

const AppWithModal = withModal(withNotifications(withPage(App, "appKey")));

const ModalProvider = props => {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    isOpen: isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false)
  };

  return (
    <ModalContext.Provider value={value}>
      {props.children}
    </ModalContext.Provider>
  );
};

const ModalPage = () => {
  return (
    <Page>
      <ModalProvider>
        <ModalOverlay />
        <AppWithModal />
      </ModalProvider>
    </Page>
  );
};

export default ModalPage;
