import React, { Fragment } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Modal, Icon, Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
const TextArea = Input.TextArea;
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
`;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);
export default class Task extends React.Component {
  state = { visible: false, comments: [], submitting: false, value: "" };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: "Zayneb",
            avatar: (
              <Avatar
                style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                alt="Zeineb"
              >
                Z
              </Avatar>
            ),
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow()
          },
          ...this.state.comments
        ]
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    return (
      <Draggable draggableId={this.props.task._id} index={this.props.index}>
        {(provided, snapshot) => (
          <Fragment>
            <Container
              onClick={this.showModal}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              innerRef={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <div>{this.props.task.UserStoryName}</div>
              <div>{this.props.task.description}</div>

              {/* <div>
                <Icon type="message" />
                {`${comments.length} `}
              </div> */}
            </Container>
            <Modal
              title={this.props.task.UserStoryName}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/* <div>
                <formComent />
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                  avatar={
                    <Avatar
                      style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                      alt="Zeineb"
                    >
                      Z
                    </Avatar>
                  }
                  content={
                    <Editor
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  }
                />
              </div> */}
            </Modal>
          </Fragment>
        )}
      </Draggable>
    );
  }
}
