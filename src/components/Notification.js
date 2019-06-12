import React from "react";
import styled from "styled-components";

import { FORM_STATUS } from "src/actions/form";

const NotificationWrapper = styled.div`
  border-radius: 0.25rem;
  color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
`;

const Success = styled(NotificationWrapper)`
  background-color: #609480;
`;

const Error = styled(NotificationWrapper)`
  background-color: #de4a43;
`;

const Notification = props => {
  const { id, type } = props;
  if (type === FORM_STATUS.POSTED) {
    return <Success className={`notif-success-${id}`}>Hoorah!</Success>;
  }
  if (type === FORM_STATUS.ERROR) {
    return <Error className={`notif-error-${id}`}>Boo!</Error>;
  }
  return null;
};

export default Notification;
