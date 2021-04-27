import Layout from './hoc/Layout/Layout';
import TodoController from './containers/TodoController/TodoController';

function App() {
  return <>
    <Layout>
      <TodoController />
    </Layout>
  </>
}

export default App;
