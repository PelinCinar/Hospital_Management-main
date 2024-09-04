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
