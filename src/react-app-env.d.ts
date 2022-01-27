/// <reference types="react-scripts" />
interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user?: User,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}