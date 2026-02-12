import ReactDOM from 'react-dom/client';

import App from '@/App';
import { withSession, withStore } from '@/core/providers';

const Root = withSession(withStore(App));

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
