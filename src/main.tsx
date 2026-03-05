import ReactDOM from 'react-dom/client';

import App from '@/App';
// import { withSession, withStore } from '@/core/providers';
import { withStore } from '@/core/providers';
// const Root = withSession(withStore(App));
const Root = withStore(App);

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
