import ReactDOM from 'react-dom/client';

import { withSession } from './core/providers/withSession';
import { withStore } from './core/providers/withStore';
import App from './App';

const Root = withSession(withStore(App));

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
