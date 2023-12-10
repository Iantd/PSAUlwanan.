import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import AuthProvider from './context/AuthContext';
import { QueryProvider } from './lib/react-query/QueryProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </QueryProvider>
    </BrowserRouter>
)
//serves as the entry point for rendering your React application using ReactDOM. 
// root rendering of a React application using ReactDOM. It includes the necessary 
// providers for context (authentication and query), integrates React Router for navigation, 
// and renders the main application component (App) into the root element of the HTML document.