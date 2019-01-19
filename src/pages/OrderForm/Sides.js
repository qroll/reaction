import React from "react";
import { setIn, deleteIn } from "immutable-setter";
import shortid from "shortid";

import FormInput from "src/components/Form/FormInput";
import FormButton from "src/components/Form/FormButton";
import FormSelect from "src/components/Form/FormSelect";

const SIDE_OPTIONS = [
  { value: "1", label: "Cupcake" },
  { value: "2", label: "Donut" },
  { value: "3", label: "Eclair" },
  { value: "4", label: "Froyo" },
  { value: "5", label: "Gingerbread" },
  { value: "6", label: "Honeycomb" },
  { value: "7", label: "Ice cream sandwich" },
  { value: "8", label: "Jellybean" },
  { value: "9", label: "Kit Kat" },
  { value: "10", label: "Lollipop" },
  { value: "11", label: "Marshmallow" },
  { value: "12", label: "Nougat" },
  { value: "13", label: "Oreo" },
  { value: "14", label: "Pie" }
];
const SIZE_OPTIONS = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" }
];

class Sides extends React.Component {
  handleOnChange = index => (field, value) => {
    let nextValue = setIn(this.props.value, [index, field], value);
    this.props.onChange(this.props.field, nextValue);
  };

  handleOnAddSide = () => {
    let nextValue = setIn(this.props.value, [undefined], {
      id: shortid.generate(),
      option: "",
      size: "S",
      comments: ""
    });
    this.props.onChange(this.props.field, nextValue);
  };

  handleOnDeleteSide = index => () => {
    let nextValue = deleteIn(this.props.value, [index]);
    this.props.onChange(this.props.field, nextValue);
  };

  render() {
    let { value: sides } = this.props;
    return (
      <>
        {sides.map((side, index) => (
          <div key={side.id}>
            <FormSelect
              field={"option"}
              value={side.option}
              options={SIDE_OPTIONS}
              onChange={this.handleOnChange(index)}
            />
            <FormSelect
              field={"size"}
              value={side.size}
              options={SIZE_OPTIONS}
              onChange={this.handleOnChange(index)}
            />
            <FormInput
              field={"comments"}
              value={side.comments}
              onChange={this.handleOnChange(index)}
            />
            <FormButton
              label="Remove"
              onClick={this.handleOnDeleteSide(index)}
            />
          </div>
        ))}
        <FormButton label="Add a side" onClick={this.handleOnAddSide} />
      </>
    );
  }
}

export default Sides;
