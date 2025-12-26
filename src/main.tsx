import ReactDOM from 'react-dom/client';

import { withRouter } from './core/providers/withRouter';
import { withSession } from './core/providers/withSession';
import { withStore } from './core/providers/withStore';
import App from './App';

const Root = withRouter(withSession(withStore(App)));

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
