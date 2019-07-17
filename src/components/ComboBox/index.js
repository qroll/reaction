import React from "react";
import PropTypes from "prop-types";

class ComboBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroupIndex: props.selectedGroupIndex,
      selectedText: "",
      input: "",
      isFocused: false
    };
  }

  setSelectedGroupIndex = i => {
    this.setState({ selectedGroupIndex: i });
  };

  onSelect = (group, datum) => {
    this.props.onSelect(group, datum);
    this.setState({
      selectedText: datum.label,
      input: ""
      // isFocused: false
    });
  };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onBlur = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState({
        isFocused: false,
        selectedGroupIndex: this.props.selectedGroupIndex,
        input: ""
      });
    }
  };

  onInputChange = e => {
    const value = e.target.value;
    this.setState({
      input: value
    });
  };

  _renderSelected = () => {
    const { input } = this.state;
    const { selected, renderSelected } = this.props;

    return (
      <div>
        {selected.map(item => {
          return renderSelected(item);
        })}
        <input
          value={input}
          placeholder="Select something"
          onFocus={this.onFocus}
          onChange={this.onInputChange}
        />
      </div>
    );
  };

  _renderDropdown = () => {
    const { isFocused } = this.state;

    return (
      <div style={{ display: isFocused ? "block" : "none" }}>
        {this._renderTabs()}
        {this._renderDropdownList()}
      </div>
    );
  };

  _renderTabs = () => {
    const { groupBy } = this.props;
    const { selectedGroupIndex } = this.state;

    return (
      <div>
        {groupBy.map((group, index) => {
          const { label } = group;

          if (index === selectedGroupIndex) {
            return <b key={label}>{label}</b>;
          }

          return (
            <span key={label} onClick={() => this.setSelectedGroupIndex(index)}>
              {label}
            </span>
          );
        })}
      </div>
    );
  };

  _renderDropdownList = () => {
    const {
      groupBy,
      filterBy,
      renderItem: renderItemForAll,
      renderEmpty: renderEmptyForAll,
      renderNoResult: renderNoResultForAll
    } = this.props;
    const { selectedGroupIndex, input } = this.state;

    const selectedGroup = groupBy[selectedGroupIndex];
    const {
      data,
      renderItem: renderItemForGroup,
      renderEmpty: renderEmptyForGroup,
      renderNoResult: renderNoResultForGroup
    } = selectedGroup;

    if (!selectedGroup.data.length) {
      const renderEmpty = renderEmptyForGroup || renderEmptyForAll;
      return renderEmpty();
    }

    const filteredData = data.reduce((filtered, datum) => {
      if (filterBy(input, datum)) {
        filtered.push(datum);
      }
      return filtered;
    }, []);

    if (!filteredData.length) {
      const renderNoResult = renderNoResultForGroup || renderNoResultForAll;
      return renderNoResult();
    }

    return (
      <div>
        {filteredData.map(datum => {
          const { id, element, label, renderItem: renderItemForItem } = datum;
          const renderItem =
            renderItemForItem || renderItemForGroup || renderItemForAll;

          return (
            <div
              key={id}
              onClick={() => this.onSelect(selectedGroup.label, datum)}
            >
              {element || renderItem(selectedGroup.label, datum)}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div tabIndex={-1} onBlur={this.onBlur}>
        {this._renderSelected()}
        {this._renderDropdown()}
      </div>
    );
  }
}

ComboBox.propTypes = {
  filterBy: PropTypes.func,
  groupBy: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          element: PropTypes.node,
          label: PropTypes.string,
          renderItem: PropTypes.func
        })
      ),
      renderItem: PropTypes.func,
      renderEmpty: PropTypes.func,
      renderError: PropTypes.func,
      renderNoResult: PropTypes.func
    })
  ),
  onSelect: PropTypes.func,
  renderItem: PropTypes.func,
  renderSelected: PropTypes.func,
  renderEmpty: PropTypes.func,
  renderError: PropTypes.func,
  renderNoResult: PropTypes.func,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      element: PropTypes.node,
      label: PropTypes.string
    })
  ),
  selectedGroupIndex: PropTypes.number
};

ComboBox.defaultProps = {
  filterBy: () => true,
  onSelect: () => {},
  renderItem: null,
  renderSelected: item => item.label,
  renderEmpty: () => null,
  renderError: () => null,
  renderNoResult: () => null,
  selected: [],
  selectedGroupIndex: 0
};

export default ComboBox;
