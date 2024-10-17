import 'antd/dist/reset.css'; // Vite ve Ant Design için güncel stil dosyası
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
