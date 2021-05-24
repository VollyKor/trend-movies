import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

export default renderWithRouter;

//  render with Redux
// export const customRender = (
//   ui,
//   {
//     route = '/',
//     history = createMemoryHistory({ initialEntries: [route] }),
//     initialState,
//     store = createStore(rootReducer, initialState),
//     ...options
//   } = {},
// ) => ({
//   ...rtl(
//     <Provider store={store}>
//       <Router history={history}>{ui}</Router>
//     </Provider>,
//     options,
//   ),
//   history,
// });

//  Example from tutorial for params
// const renderComponent = ({ slug }) =>
//   render(
//     <MemoryRouter initialEntries={[`/movies/${slug}`]}>
//       <Route path="/movies/:slug">
//         <MovieDetailView />
//       </Route>
//     </MemoryRouter>,
//   );
