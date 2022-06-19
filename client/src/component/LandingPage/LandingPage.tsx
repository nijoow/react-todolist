import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRefreshToken from '../../hooks/useRefreshToken';
import { useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import useGetProfile from '../../hooks/useGetProfile';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Modal from '../Modal/Modal';
function LandingPage() {
  const user = useSelector((state: RootState) => state.user_reducer.loginUser);
  const refresh = useRefreshToken();
  const getProfile = useGetProfile();
  const [todos, setTodos] = useState<Object[]>([]);

  useEffect(() => {
    const localTodos = localStorage.getItem('todos');
    if (localTodos !== null) {
      setTodos(JSON.parse(localTodos));
    }
  });
  const addTodo = (todo: any) => {
    const newTodos = [todo, ...todos];
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };
  const editTodo = (edit: any) => {
    console.log(edit);
    let updatedTodos = todos.map((todo: any) => {
      if (todo.id === edit.id) {
        todo.text = edit.text;
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number, username: string) => {
    if (user.username === username) {
      const deletedTodos = [...todos].filter((todo: any) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(deletedTodos));
      setTodos(deletedTodos);
    } else {
      alert('username이 다릅니다!');
    }
  };

  const completeTodo = (id: number) => {
    let updatedTodos = todos.map((todo: any) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    setTodos(updatedTodos);
  };

  const profile = () => {
    if (user) {
      refresh();
      let accessToken = localStorage.getItem('accessToken');
      getProfile(accessToken);
    } else {
      console.log('로그인하세요');
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    profile();
    if (!user) {
      alert('LOGIN!');
    } else {
      setModalOpen(true);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-5/6 min-h-screen flex flex-col px-24 py-24 text-3xl font-extrabold text-gray-900 ">
      <button className="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-slate-700"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={openModal}
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <Modal open={modalOpen} closeModal={closeModal} header="Add Todo">
        <TodoForm
          onSubmit={addTodo}
          username={user ? user.username : null}
          closeModal={closeModal}
          edit={{ id: null, username: '', text: '' }}
        ></TodoForm>
      </Modal>
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        editTodo={editTodo}
      ></TodoList>
    </div>
  );
}

export default LandingPage;
