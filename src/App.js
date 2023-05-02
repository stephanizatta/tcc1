import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import EsqueceuSenha from './pages/esqueceu-senha/esqueceu-senha';
import CadastroRelatorio from './pages/cadastro-relatorio/cadastro-relatorio';
import CadastroMaterial from './pages/cadastro-material/cadastro-material';
import CadastroMedico from './pages/cadastro-medico/cadastro-medico';

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
  },
  {
    path: "/cadastro-material",
    element: <CadastroMaterial />,
  },
  {
    path: "/cadastro-medico",
    element: <CadastroMedico />,
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