import Layout from './hoc/Layout/Layout';
import TodoController from './containers/TodoController';

function App() {
  return <>
    <Layout>
      <TodoController />
    </Layout>
  </>
}

export default App;
