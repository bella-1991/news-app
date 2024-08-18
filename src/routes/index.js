import React from 'react'

const Home = React.lazy(() => import('../pages/home'));

const routes = [
    { path: '/', element: <Home /> },
]
export default routes;