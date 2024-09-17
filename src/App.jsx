import 'antd/dist/reset.css'; // Vite ve Ant Design için güncel stil dosyası
import "./app.css";
import Layout from "./layout/Layout";
import AddUsers from "./pages/AdminPage/AddUsers";

const App = () => {
  return (
    <div>
      {/* <Provider store={store}></Provider> */}
      <Layout />;
      <AddUsers />
  
    </div>
  );
};

export default App;
