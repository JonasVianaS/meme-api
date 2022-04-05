import './App.css';
import FileUpload from './components/FileUpload';
import {useState} from 'react'

function App() {

  return (
    <div className='App'>
      <h1>Meme Api</h1>
      <FileUpload />
    </div>
  );
}

export default App;
