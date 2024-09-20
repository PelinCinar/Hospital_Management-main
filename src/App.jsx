import 'antd/dist/reset.css'; // Vite ve Ant Design için güncel stil dosyası
import "./app.css";
import Layout from "./layout/Layout";
import AddUsers from "./pages/AdminPage/AddUsers";

const App = () => {
  
  return (
    <div>
      <Layout />;
      <AddUsers />
  
    </div>
  );
};

export default App;
//acaba burada direkt const App const { user } = useSelector((store) => store.user);
//yapıp  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <Layout />,
    //   children: [
    //     { path: "/", element: <Home /> },
    //     {
    //       path: "/profile",
    //       element: user ? <Profile
    //bu şekilde routerları buradn mı yapsam ? ? 