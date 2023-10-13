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
import CadastroMedicos from './pages/cadastro-medicos/cadastro-medicos';
import MedicosCadastrados from './pages/medicos-cadastrados/medicos-cadastrados';
import RelatoriosAssinados from './pages/relatorios-assinados/relatorios-assinados';
import AssinarRelatorio from './pages/assinar-relatorio/assinar-relatorio';

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
    path: "/cadastro-relatorio/:id",
    element: <CadastroRelatorio />,
  },
  {
    path: "/cadastro-material",
    element: <CadastroMaterial />,
  },
  {
    path: "/cadastro-material/:id",
    element: <CadastroMaterial />,
  },
  {
    path: "/cadastro-usuario",
    element: <CadastroUsuario />,
  },
  {
    path: "/cadastro-usuario/:id",
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
  },
  {
    path: "/cadastro-medicos",
    element: <CadastroMedicos />,
  },
  {
    path: "/cadastro-medicos/:id",
    element: <CadastroMedicos />,
  },
  {
    path: "/medicos-cadastrados",
    element: <MedicosCadastrados />,
  },
  {
    path: "/relatorios-assinados",
    element: <RelatoriosAssinados />,
  },
  {
    path: "/assinar-relatorio",
    element: <AssinarRelatorio />,
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