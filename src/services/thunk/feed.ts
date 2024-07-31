import { createAppAsyncThunk } from '../hooks';
import { getFeedsApi } from '@api';

export const getFeed = createAppAsyncThunk('feed/getFeeds', getFeedsApi);
