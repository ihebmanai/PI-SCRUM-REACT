import React, { Component } from "react";
import jsPDF from "jspdf";
import { Form, Input, Button } from "antd";
import styled from "styled-components";

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 8 }
};
const Title = styled.h1`
  padding: 8px;
`;
class InterviewForm extends Component {
  state = {
    judul: "Interveiw-Question.pdf"
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        var doc = new jsPDF();

        doc.text(
          `can u tell us a little about yourself ?:${values["question1"]} `,
          0.5,
          10
        );
        doc.text(
          `How did you hear about the position?: ${values["question2"]}`,
          0.5,
          30
        );

        doc.save(`${this.state.judul}`);
      }
    });
  };

  // unduhPdf(e){
  //   e.preventDefault();

  // var doc = new jsPDF({
  //   // orientation: 'landscape',
  //   unit: 'in',
  //   // format: [4, 2]  // tinggi, lebar
  //   format: [this.state.tinggi, this.state.lebar]
  // })
  // doc.text(`PDF size: ${this.state.tinggi} x ${this.state.lebar} in`, 0.5, 0.5)
  // doc.text(`PDF filename: ${this.state.judul}`, 0.5, 0.8)
  // doc.text(`Recipient: ${this.state.nama}`, 0.5, 1.1)
  // doc.text(`Message: ${this.state.pesan}`, 0.5, 1.4)
  // doc.addImage(this.state.gambar, 'JPEG', 0.5, 2, 2.5, 2.5)
  // // format: (image_file, 'image_type', X_init, Y_init, X_fin, Y_fin)

  // doc.save(`${this.state.judul}`)
  // };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Title>Sheet interview questions </Title>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="Can u tell us a little about yourself ?"
          >
            {getFieldDecorator("question1", {
              rules: [
                {
                  required: true,
                  message: "Please input your answer"
                }
              ]
            })(<Input placeholder="Please input your answer" />)}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="How did you hear about the position?"
          >
            {getFieldDecorator("question2", {
              rules: [
                {
                  required: true,
                  message: "Please input your answer"
                }
              ]
            })(<Input placeholder="Please input your answer" />)}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="what do you know about the company?"
          >
            {getFieldDecorator("question3", {
              rules: [
                {
                  // required: true,
                  message: "Please input your answer"
                }
              ]
            })(<Input placeholder="Please input your answer" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="why do you want this job?">
            {getFieldDecorator("question4", {
              rules: [
                {
                  // required: true,
                  message: "Please input your answer"
                }
              ]
            })(<Input placeholder="Please input your answer" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="why we shoud hire u ?">
            {getFieldDecorator("question5", {
              rules: [
                {
                  // required: true,
                  message: "Please input your answer"
                }
              ]
            })(<Input placeholder="Please input your answer" />)}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="What do you consider to be your weakness ?"
          >
            {getFieldDecorator("question6", {
              rules: [
                {
                  // required: true,
                  message: "Please input your answer"
                }
              ]
            })(<Input placeholder="Please input your answer" />)}
          </Form.Item>

          <Button
            type="primary"
            shape="round"
            icon="download"
            htmlType="submit"
          >
            Download PDF
          </Button>
        </Form>
      </div>
    );
  }
}

const Interview = Form.create({ name: "dynamic_rule" })(InterviewForm);

export default Interview;
