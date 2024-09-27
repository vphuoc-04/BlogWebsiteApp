import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Layout } from './layout/Layout';

function App() {
    return (
        <div className = "App">
            <RouterProvider router = { Layout } />
        </div>
    );
}

export default App;
