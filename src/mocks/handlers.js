import { rest } from 'msw';

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');

    return res(
      ctx.json({ apiKey: '124154764fzhsddshcxbvbsdbfsdbjhk' }),
      ctx.status(200),
    );
  }),

  rest.get('/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ login: true }));
  }),

  rest.get('/greeting', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({ greeting: 'hello there' }));
  }),

  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.status(500));
  }),
];
