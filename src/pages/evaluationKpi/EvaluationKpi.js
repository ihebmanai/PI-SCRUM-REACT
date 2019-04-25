import React, { Component } from "react";
import { Select, Table, Rate } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchSprints,
  fetchMemberBySprint
} from "../../actions/ScrumtableActions";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-centent: center;
  align-items: center;
`;

const Title = styled.h1`
  padding: 8px;
`;
const SelectContent = styled.div`
  padding: 8px;
`;
const Content = styled.div`
  padding: 8px;
  width: 100%;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
`;
const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Label = styled.label`
  padding: 8px;
  flex: 1;
`;
const ScoreBox = styled.label`
  display: flex;
  justify-content: center;
  border: 1px solid #d9d9d9;
  width: 60px;
  margin: 5px;
  padding: 5px;
`;

const Option = Select.Option;

class EvaluationKpi extends Component {
  state = {
    sprint: "",
    memeber: ""
  };
  componentDidMount() {
    this.props.fetchSprints();
  }
  handleChangeSelectSprint = value => {
    console.log(`selected ${value}`);
    this.setState({ sprint: value });
    this.props.fetchMemberBySprint(value);
  };

  handleFocusSprint() {
    console.log("blur");
  }

  handleBlurSprint() {
    console.log("focus");
  }

  handleChangeSelectMember = value => {
    console.log(`selected ${value}`);
    this.setState({ memeber: value });
  };

  handleFocusMember() {
    console.log("blur");
  }

  handleBlurMember() {
    console.log("focus");
  }
  render() {
    return (
      <Container>
        <Title>KPi Evaluation</Title>
        <SelectContent>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="select a sprint"
            optionFilterProp="children"
            onChange={this.handleChangeSelectSprint}
            onFocus={this.handleFocusSprint}
            onBlur={this.handleBlurSprint}
          >
            {this.props.scrum.sprints.data &&
              this.props.scrum.sprints.data.map(item => (
                <Option key={item._id} value={item._id}>
                  {item.name}{" "}
                </Option>
              ))}
          </Select>
        </SelectContent>
        <SelectContent>
          {
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="select a member"
              optionFilterProp="children"
              onChange={this.handleChangeSelectMember}
              onFocus={this.handleFocusMember}
              onBlur={this.handleBlurMember}
            >
              {this.props.scrum.memberBySprint.devs &&
                this.props.scrum.memberBySprint.devs.map(item => (
                  <Option key={item._id} value={item._id}>
                    {item.firstName}{" "}
                  </Option>
                ))}
            </Select>
          }
        </SelectContent>
        {this.state.memeber && (
          <Content>
            <Item>
              <Label>Absences</Label> <ScoreBox>90%</ScoreBox>
            </Item>
            <Item>
              <Label>Work Done</Label> <ScoreBox>90%</ScoreBox>
            </Item>
            <Item>
              <Label>Behavior</Label> <ScoreBox>90%</ScoreBox>
            </Item>
            <Item>
              {" "}
              <Label>Final score</Label> <ScoreBox>90%</ScoreBox>
            </Item>
          </Content>
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
  )(EvaluationKpi)
);
