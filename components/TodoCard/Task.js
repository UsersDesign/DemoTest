import React from "react";
import moment from "moment";
import { Badge, Card, Stack } from "react-bootstrap";

export const Task = ({ task, setEditTaskModal, handleDeleteTask }) => {
  return (
    <Card>
      <Card.Header>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            {task?.title} - {moment(task?.createdAt).format("LLL")}
          </div>
          <div
            className="p-2 ms-auto"
            onClick={() => setEditTaskModal({ isOpen: true, task })}
          >
            Update
          </div>
          <div className="vr" />
          <div className="p-2" onClick={() => handleDeleteTask(task._id)}>Delete</div>
        </Stack>
      </Card.Header>
      <Card.Body>
        <p>{task?.description}</p>
        <hr />
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">Due Date {moment(task.dueDate).format("L")}</div>
          <div className="p-2 ms-auto"></div>
          <div className="vr" />
          {/* <div className="p-2">
            <Badge bg="primary">Open</Badge>
          </div> */}
        </Stack>
      </Card.Body>
    </Card>
  );
};
