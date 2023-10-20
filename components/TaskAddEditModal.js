import React from "react";
import { Formik, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import { Button, Modal, Form, Row } from "react-bootstrap";
import { DatePickerComponent } from "./common/DatePicker/DatePicker";
import { addTask, updateTask } from "../apis/TaskApis";
import { toast } from "react-toastify";

export const TaskAddEditModal = (props) => {

  const addNewTask = async (params) => {
    const response = await addTask(params);
    if (response?.success) {
      toast.success(response?.message);
    } else {
      toast.error("Something went wrong.");
    }
    props.fetchAllTasks();
    props.onHide();
  };

  const editTask = async (values) => {
    const response = await updateTask(props.task._id, values);
    if (response?.success) {
      toast.success(response?.message);
    } else {
      toast.error("Something went wrong.");
    }
    props.fetchAllTasks();
    props.onHide();
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    dueDate: yup.date().required("Due Date is required"),
  });

  return (
    <Modal
      {...props}
      
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={{
            title: props?.isNewTask ? "" : props?.task?.title,
            description: props?.isNewTask ? "" : props?.task?.description,
            dueDate: props?.isNewTask ? "" : new Date(props?.task?.dueDate),
          }}
          validationSchema={validationSchema}
          onSubmit={(values) =>
            props.isNewTask ? addNewTask(values) : editTask(values)
          }
        >
          {({ touched, errors, setFieldValue, values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Task Title</Form.Label>
                <Field
                  type="text"
                  name="title"
                  className={`form-control ${
                    touched.title && errors.title ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Field
                  as="textarea"
                  name="description"
                  className={`form-control ${
                    touched.description && errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Row className="p-2">
                  <DatePickerComponent
                    name="dueDate"
                    startDate={values.dueDate}
                    onChange={(value) => setFieldValue("dueDate", value)}
                  />
                </Row>
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Modal.Footer>
                <Button type="submit">Save</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={() => addNewTask()}>Save</Button>
      </Modal.Footer> */}
    </Modal>
  );
};
