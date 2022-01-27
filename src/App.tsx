import React from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';

type State = {
  todos: Todo[],
  users: User[],
  userId: number,
  title: string,
  isTitleError: boolean,
  isSelectUserError: boolean,
};

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
    users: users.map(user => ({
      ...user,
    })),
    userId: 0,
    title: '',
    isTitleError: false,
    isSelectUserError: false,
  };

  handleChangeId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userId: +value,
    });
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  addTodo = () => {
    this.setState(state => {
      const addTodo = {
        title: state.title,
        id: state.todos.length + 1,
        userId: state.userId,
        completed: false,
        user: users.find(user => user.id === state.userId),
      };

      return {
        todos: [...state.todos, addTodo],
        userId: 0,
        title: '',
      };
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.state.title === '') {
      this.setState({
        isTitleError: true,
      });
    } else {
      this.setState({
        isTitleError: false,
      });
    }

    if (this.state.userId === 0) {
      this.setState({
        isSelectUserError: true,
      });
    } else {
      this.setState({
        isSelectUserError: false,
      });
    }

    if (this.state.userId !== 0 && this.state.title !== '') {
      this.addTodo();
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          onSubmit={this.handleSubmit}
          className="form"
        >
          <section>
            <label htmlFor="title">
              <span>Todo </span>
              <input
                type="text"
                value={this.state.title}
                name="title"
                id="title"
                placeholder="Add todo title"
                onChange={this.handleChangeTitle}
                className="form__input"
              />
            </label>
            {this.state.isTitleError && (
              <div>
                Please enter the title
              </div>
            )}
          </section>

          <section>
            <label htmlFor="user">
              <span>User </span>
              <select
                value={this.state.userId}
                name="userId"
                id="user"
                onChange={this.handleChangeId}
                className="form__select"
              >
                <option value="">Choose a user</option>
                {this.state.users.map(user => (
                  <option key={user.id} value={user.id}>
                    {`${user.name} ${user.username}`}
                  </option>
                ))}
              </select>
            </label>
            {this.state.isSelectUserError && (
              <div>
                Please choose a user
              </div>
            )}
          </section>

          <button type="submit" className="form__submit">add</button>
        </form>
        <TodoList preparedTodos={this.state.todos} />
      </div>
    );
  }
}

export default App;