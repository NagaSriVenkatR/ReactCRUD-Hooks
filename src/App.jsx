
import './App.css';
import { UserProvider } from './Components/Usercontext';
import UserForm from './Components/Userform';
import UserList from './Components/Userlist';

function App() {
  return (
    <UserProvider>
      <div>
        <h1>CRUD Operations with Use Context , Use Ref ,Use Reducer</h1>
        <UserForm />
        <UserList />
      </div>
    </UserProvider>
  );
}

export default App;
