import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Stack, Navbar, Button } from "react-bootstrap";
// import { TaskAddEditModal } from "./components/TaskAddEditModal";
import { TaskList } from "./components/TaskList";
import { TaskAddEditModal } from "./components/TaskAddEditModal";

import "react-toastify/dist/ReactToastify.css";
import { deleteTask, getAllTasks } from "./apis/TaskApis";

function App() {
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    const response = await getAllTasks();
    if (response?.success) {
      setTaskList(response.tasks);
    }
  };

  const handleDeleteTask = async (id) => {
    const response = await deleteTask(id);
    if (response?.success) {
      toast.success(response.message);
      fetchAllTasks();
    } else {
      toast.error(response.message);
    }
  }

  return (
    <Container>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Todo App</Navbar.Brand>
        </Container>
      </Navbar>
      <Stack className="mt-5" direction="horizontal" gap={3}>
        {/* <AddNewTodo /> */}
        <Button variant="primary" onClick={() => setAddTaskModalOpen(true)}>
          New Task
        </Button>
      </Stack>
      <TaskList taskList={taskList} fetchAllTasks={fetchAllTasks} handleDeleteTask={handleDeleteTask}/>
      <TaskAddEditModal
        show={isAddTaskModalOpen}
        onHide={() => setAddTaskModalOpen(false)}
        isNewTask={true}
        fetchAllTasks={fetchAllTasks}
        title="Add New Task"
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
}

export default App;
