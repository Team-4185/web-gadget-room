import ReactDOM from 'react-dom/client';

import App from '@/App';
import { withSession } from '@/core/providers/withSession';
import { withStore } from '@/core/providers/withStore';

const Root = withSession(withStore(App));

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
