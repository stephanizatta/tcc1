import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import EsqueceuSenha from './pages/esqueceu-senha/esqueceu-senha';
import CadastroRelatorio from './pages/cadastro-relatorio/cadastro-relatorio';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/esqueceu-senha",
    element: <EsqueceuSenha />,
  },
  {
    path: "/cadastro-relatorio",
    element: <CadastroRelatorio />,
  }
])

function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;