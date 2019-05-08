import React, { Component } from "react";
import { Select, Table, Rate } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchSprints,
  fetchMemberBySprint,
  fetchMemberBySprintRate,
  restStore,
  fetchAbsence,
  fetchMemberWorkDone
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
    memeber: "",
    meetings: [{}],
    userStorys: [{}],
    note: 0,
    sumFinal: 0
  };
  componentDidMount() {
    this.props.fetchSprints();
  }
  handleChangeSelectSprint = value => {
    this.setState({ note: 0 });
    // this.props.restStore();
    this.props.scrum.sprints.data &&
      this.props.scrum.sprints.data.forEach(element => {
        if (value === element._id) {
          this.setState({ meetings: { meetings: element.Meetings } });
        }
      });

    this.setState({ sprint: value });
    this.props.fetchMemberBySprint(value);
    this.props.fetchMemberBySprintRate(value);

    this.setState({ memeber: "" });
  };

  handleFocusSprint() {
    // this.props.restStore();
  }

  handleBlurSprint = value => {
    this.props.scrum.memberRateBySprint.devs &&
      this.props.scrum.memberRateBySprint.devs.forEach(element => {
        if (value === element.sprint) {
          this.setState({ note: element.note });
        } else this.setState({ note: 0 });
      });
  };

  handleChangeSelectMember = value => {
    this.props.scrum.memberBySprint.devs &&
      this.props.scrum.memberBySprint.devs.forEach(element => {
        if (value === element._id) {
          this.setState({ userStorys: { userStorys: element.userStories } });
        }
      });
    this.setState({ memeber: value });
    console.log(this.state.meetings);
    this.props.fetchAbsence(value, this.state.meetings);
    this.props.fetchMemberWorkDone(value);
  };

  handleFocusMember() {
    console.log("blur");
  }

  handleBlurMember() {
    console.log("focus");
  }
  componentWillUnmount() {
    // this.props.restStore();
  }
  sum = value => {
    return this.state.meetings.meetings.length > 0
      ? (value * 100) / this.state.meetings.meetings.length
      : 0;
  };
  sumWork = value => {
    return this.state.userStorys.userStorys.length > 0
      ? (value * 100) / this.state.userStorys.userStorys.length
      : 0;
  };
  sumRate = value => {
    return this.state.note > 0 ? (value * 100) / 5 : 0;
  };
  sumFinal() {
    const sumFinal = Number(
      this.sum(this.props.scrum.absence.presence) / 3 +
        this.sumWork(this.props.scrum.workDone.workDone) +
        this.sumRate(this.state.note) / 3
    ).toFixed(1);

    return sumFinal;
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
                  {item.name}
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
              <Label>Presence</Label>{" "}
              <ScoreBox>
                {" "}
                {this.sum(this.props.scrum.absence.presence)}%{" "}
              </ScoreBox>
            </Item>
            <Item>
              <Label>Work Done</Label>{" "}
              <ScoreBox>
                {this.sumWork(this.props.scrum.workDone.workDone)}%
              </ScoreBox>
            </Item>
            <Item>
              <Label>Behavior</Label>{" "}
              <ScoreBox>{this.sumRate(this.state.note)}%</ScoreBox>
            </Item>
            <Item>
              {" "}
              <Label>Final score</Label>{" "}
              <ScoreBox>{this.sumFinal()}% </ScoreBox>
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
    {
      fetchSprints,
      fetchMemberBySprint,
      fetchMemberBySprintRate,
      restStore,
      fetchAbsence,
      fetchMemberWorkDone
    }
  )(EvaluationKpi)
);
