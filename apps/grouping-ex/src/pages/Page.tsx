import { Link } from 'react-router';

import { ProjectUrl } from '@/constants/url';

export const RootRoute = () => {
  return (
    <div>
      <h1>RootPage</h1>
      <Link to={ProjectUrl['todo'].toString()}>todo</Link>
    </div>
  );
};
