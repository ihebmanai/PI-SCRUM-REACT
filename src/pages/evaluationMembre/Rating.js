import React, { Component, Fragment } from "react";
import { Select, Table, Rate } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchSprints,
  fetchMemberBySprint
} from "../../actions/ScrumtableActions";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  padding: 8px;
`;
const SelectContent = styled.div`
  padding: 8px;
`;
const TableContent = styled.div`
  padding: 8px;
  width: 100%;
`;
const Option = Select.Option;

class Rating extends Component {
  state = {
    value: "",
    data: [
      {
        key: "1",
        name: "mohamed",
        rating: 3
      },
      {
        key: "2",
        name: "zeyneb",
        rating: 5
      },
      {
        key: "3",
        name: "Malek",
        rating: 3
      }
    ]
  };
  componentDidMount() {
    this.props.fetchSprints();
  }
  handleChangeRating = (record, rating) => {
    const newData = Object.assign([], this.state.data);
    newData.forEach(item => {
      if (item.key === record.key) {
        item.rating = rating;
      }
    });
    this.setState({ data: newData });
  };
  handleChangeSelect = value => {
    console.log(`selected ${value}`);
    this.setState({ value: value });
    this.props.fetchMemberBySprint(value);
  };

  handleBlur() {
    console.log("blur");
  }

  handleFocus() {
    console.log("focus");
  }

  render() {
    console.log(this.props.scrum.memberBySprint);

    const { value } = this.state;
    const desc = ["terrible", "bad", "normal", "good", "wonderful"];
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Rating",
        key: "rating",
        render: (text, record) => (
          <span>
            <Rate
              tooltips={desc}
              onChange={this.handleChangeRating.bind(value, record)}
              value={record.rating}
            />
            {record.rating ? (
              <span className="ant-rate-text">{desc[record.rating - 1]}</span>
            ) : (
              ""
            )}
          </span>
        )
      }
    ];

    return (
      <Container>
        <Title>Behavior Evaluation</Title>
        <SelectContent>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="select a sprint"
            optionFilterProp="children"
            onChange={this.handleChangeSelect}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            {this.props.scrum.sprints.data &&
              this.props.scrum.sprints.data.map(item => (
                <Option key={item._id} value={item._id}>
                  {item.name}{" "}
                </Option>
              ))}
          </Select>
        </SelectContent>
        {this.state.value && (
          <TableContent>
            <Table columns={columns} dataSource={this.state.data} />
          </TableContent>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    scrum: state.scrum
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchSprints, fetchMemberBySprint }
  )(Rating)
);
