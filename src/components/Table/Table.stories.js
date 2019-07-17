import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import Table from "./index";

const stories = storiesOf("Table", module);
stories.addDecorator(withKnobs);

stories.add("with different levels of renderItem", () => {
  const props = {
    columns: [
      { label: "Name", field: "name", width: 2 },
      {
        label: "Class/Index",
        width: 3,
        field: row => <div>{`${row.className} - ${row.index}`}</div>
      },
      { label: "Response", field: "response", width: 1 }
    ],
    data: [
      {
        studentId: "STUDENT1",
        name: "Ebi",
        className: "P1 Apple",
        index: 1,
        response: null
      },
      {
        studentId: "STUDENT2",
        name: "Matcha",
        className: "P1 Banana",
        index: 1,
        response: "YES"
      },
      {
        studentId: "STUDENT3",
        name: "Nyan",
        className: "P1 Cherry",
        index: 1,
        response: "NO"
      }
    ],
    renderRow: row => {
      const { name, className, index, response } = row;

      return <div />;
    }
  };

  return <Table {...props} />;
});
