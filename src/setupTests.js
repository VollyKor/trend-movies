import '@testing-library/jest-dom';
// src/setupTests.js
import server from './mocks/server.js';

// import Enzyme from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// import { createSerializer } from 'enzyme-to-json';

// expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// Enzyme.configure({ adapter: new Adapter() });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
