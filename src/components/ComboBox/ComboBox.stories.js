import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import { StateDecorator, State, Store } from "@sambego/storybook-state";

import ComboBox from "./index";

const store = new Store({
  selected: []
});

const stories = storiesOf("ComboBox", module);
stories.addDecorator(withKnobs);
stories.addDecorator(StateDecorator(store));

stories.add("with different levels of renderItem", () => {
  const props = {
    filterBy: (input, element) =>
      element.label.toLowerCase().includes(input.toLowerCase()),
    groupBy: [
      {
        label: "Fruits",
        data: [
          { id: 1, label: "Apple" },
          { id: 2, label: "Banana" },
          { id: 3, label: "Durian" }
        ]
      },
      {
        label: "Vegetables",
        data: [{ id: 1, label: "Tomato" }, { id: 2, label: "Eggy plant" }],
        renderItem: (group, item) => (
          <div>
            <i>{item.label}</i>
          </div>
        )
      },
      {
        label: "Meats",
        data: [
          {
            id: 1,
            label: "Green ham",
            element: <div style={{ backgroundColor: "#aaeeaa" }}>Green ham</div>
          },
          {
            id: 2,
            label: "Suspicious lump",
            element: (
              <div style={{ backgroundColor: "#eeddaa" }}>Suspicious lump</div>
            )
          },
          {
            id: 3,
            label: "Email spam",
            element: (
              <div style={{ backgroundColor: "#eebbbb" }}>Email spam</div>
            )
          }
        ]
      }
    ],
    onSelect: (group, item) => {
      action("select")(group, item);
      store.set("selected", store.get("selected").push(item));
    },
    renderItem: (group, item) => {
      const selected = store.get("selected");
      const isSelected = selected.some(
        selectedItem => selectedItem.id === item.id
      );

      return (
        <div style={{ color: isSelected ? "#bbb" : "#000" }}>{`${group} - ${
          item.label
        }`}</div>
      );
    },
    renderSelect: item => {
      const { label } = item;
      return <div>{label}</div>;
    },
    renderEmpty: () => <div>No records found</div>,
    renderNoResult: () => <div>No records match search term</div>,
    selected: store.get("selected")
  };

  store.subscribe(state => console.log(state));

  return (
    <State store={store}>
      <ComboBox {...props} />
    </State>
  );
});

stories.add("with different renderEmpty", () => {
  const props = {
    filterBy: (input, element) =>
      element.label.toLowerCase().includes(input.toLowerCase()),
    groupBy: [
      {
        label: "Appetizers",
        data: []
      },
      {
        label: "Mains",
        data: [],
        renderEmpty: () => <div>No mains found</div>,
        renderNoResult: () => <div>No mains match search term</div>
      },
      {
        label: "Desserts",
        data: [{ id: 1, label: "Cake" }]
      },
      {
        label: "Drinks",
        data: [{ id: 1, label: "Coke" }],
        renderEmpty: () => <div>No drinks found</div>,
        renderNoResult: () => <div>No drinks match search term</div>
      }
    ],
    onSelect: (group, item) => {
      action("select")(group, item);
      store.set("selected", store.get("selected").push(item));
    },
    renderItem: (group, item) => {
      return <div>{item.label}</div>;
    },
    renderSelect: item => {
      const { label } = item;
      return <div>{label}</div>;
    },
    renderEmpty: () => <div>No records found</div>,
    renderNoResult: () => <div>No records match search term</div>,
    selected: store.get("selected")
  };

  store.subscribe(state => console.log(state));

  return (
    <State store={store}>
      <ComboBox {...props} />
    </State>
  );
});
