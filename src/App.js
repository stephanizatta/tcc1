import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import EsqueceuSenha from './pages/esqueceu-senha/esqueceu-senha';
import CadastroRelatorio from './pages/cadastro-relatorio/cadastro-relatorio';
import CadastroMaterial from './pages/cadastro-material/cadastro-material';
import CadastroUsuario from './pages/cadastro-usuario/cadastro-usuario';
import RelatoriosCadastrados from './pages/relatorios-cadastrados/relatorios-cadastrados';
import MateriaisCadastrados from './pages/materiais-cadastrados/materiais-cadastrados';
import UsuariosCadastrados from './pages/usuarios-cadastrados/usuarios-cadastrados';

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
    path: "/cadastro-usuario",
    element: <CadastroUsuario />,
  },
  {
    path: "/relatorios-cadastrados",
    element: <RelatoriosCadastrados />,
  },
  {
    path: "/materiais-cadastrados",
    element: <MateriaisCadastrados />,
  },
  {
    path: "/usuarios-cadastrados",
    element: <UsuariosCadastrados />,
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