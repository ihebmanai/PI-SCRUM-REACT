import React, { Component, Fragment } from "react";
import { Select, Table, Rate } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchSprints,
  fetchMemberBySprintRate,
  updateRating
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
    value: ""
  };
  componentDidMount() {
    this.props.fetchSprints();
  }
  handleChangeRating = (record, rating) => {
    // const newData = Object.assign([], this.props.scrum.memberRateBySprint.devs);
    // newData.forEach(item => {
    //   if (item._id === record._id) {
    //     item.note = note;
    //   }
    // });
    const values={
      _id:record._id,
      note:rating,
    }
    this.props.updateRating(values);

     this.props.fetchMemberBySprintRate(record.sprint);
  };

  handleChangeSelect = value => {
    console.log(`selected ${value}`);
    this.setState({ value: value });
    this.props.fetchMemberBySprintRate(value);
  };

  handleBlur() {
    console.log("blur");
  }

  handleFocus() {
    console.log("focus");
  }

  render() {
   

    const { value } = this.state;
    const desc = ["terrible", "bad", "normal", "good", "wonderful"];
 
    const columns =this.props.scrum.memberRateBySprint.devs && this.props.scrum.memberRateBySprint.devs.length >0 &&
    [
      {
        title: "Name",
        dataIndex:  this.props.scrum.memberRateBySprint.devs[0].DevTeamMember.firstName,
        key:  this.props.scrum.memberRateBySprint.devs[0].DevTeamMember._id,
        render: text => <a href="javascript:;">{ this.props.scrum.memberRateBySprint.devs[0].DevTeamMember.firstName}</a>
      },
      {
        title: "Rating",
        key:  this.props.scrum.memberRateBySprint.devs[0]._id,
        render: (text, record) => (
          <span>
            <Rate
              tooltips={desc}
              onChange={this.handleChangeRating.bind(value, record)}
              value={record.note}
            />
            {record.note ? (
              <span className="ant-rate-text">{desc[record.note - 1]}</span>
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
        {this.props.scrum.memberRateBySprint.devs && this.props.scrum.memberRateBySprint.devs.length >0 && (
          <TableContent>
            <Table columns={columns} dataSource={this.props.scrum.memberRateBySprint.devs} />
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
    { fetchSprints, fetchMemberBySprintRate,updateRating }
  )(Rating)
);
