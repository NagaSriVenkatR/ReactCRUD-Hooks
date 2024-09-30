import {BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import Form from './Components/Form';
import { FormProvider } from './Components/FormProvider';
import FormTable from './Components/FormaTable';


function App() {
  return (
    <Router>
      <FormProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/form" />} />
          <Route path="/form" element={<Form />} />
          <Route path="/table" element={<FormTable />} />
        </Routes>
      </FormProvider>
    </Router>
  );
}

export default App;
