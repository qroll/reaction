import React from "react";
import styled from "styled-components";

import BookingContext from "./BookingContext";
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
  const { id } = props;
  return (
    <BookingContext.Consumer>
      {ctx => {
        if (ctx.form.status === FORM_STATUS.POSTED) {
          return <Success className={`notif-success-${id}`}>Hoorah!</Success>;
        }
        if (ctx.form.status === FORM_STATUS.ERROR) {
          return <Error className={`notif-error-${id}`}>Boo!</Error>;
        }
        return null;
      }}
    </BookingContext.Consumer>
  );
};

export default Notification;
