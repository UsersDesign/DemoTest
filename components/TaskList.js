import React, { useEffect, useState } from "react";
import { Container, Stack, Navbar, Table } from "react-bootstrap";
import { Task } from "./TodoCard/Task";
import { getAllTasks } from "../apis/TaskApis";
import { TaskAddEditModal } from "./TaskAddEditModal";

export const TaskList = ({ taskList, fetchAllTasks, handleDeleteTask }) => {
  const [editTaskModal, setEditTaskModal] = useState(null);

  return (
    <>
      <Stack className="mt-3" direction="vertical" gap={3}>
        {taskList.length > 0 ? (
          taskList.map((task) => (
            <Task
              key={task._id}
              task={task}
              setEditTaskModal={setEditTaskModal}
              handleDeleteTask={handleDeleteTask}
            />
          ))
        ) : (
          <p>No Tasks to show</p>
        )}
      </Stack>
      {editTaskModal && (
        <TaskAddEditModal
          show={editTaskModal?.isOpen}
          onHide={() => setEditTaskModal(null)}
          isNewTask={false}
          task={editTaskModal?.task}
          fetchAllTasks={fetchAllTasks}
          title="Edit Task"
        />
      )}
    </>
  );
};
