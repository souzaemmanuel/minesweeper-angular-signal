import { Match } from './match.model';

export const MOCK_DATA: Match[] = [
  {
    yAxisSize: 8,
    xAxisSize: 10,
    minesNumber: 2,
    startTime: '2023-08-31T01:25:16.313Z',
    difficulty: 'Customized',
    status: 'Lost',
    totalTimeSpent: '00:00:00',
    endTime: '2023-08-31T01:25:18.112Z',
  },
  {
    yAxisSize: 10,
    xAxisSize: 15,
    minesNumber: 30,
    startTime: '2023-08-31T01:25:29.039Z',
    difficulty: 'Medium',
    status: 'Lost',
    totalTimeSpent: '00:00:00',
    endTime: '2023-08-31T01:25:29.039Z',
  },
  {
    yAxisSize: 15,
    xAxisSize: 20,
    minesNumber: 150,
    startTime: '2023-08-31T01:39:27.643Z',
    difficulty: 'Customized',
    status: 'Lost',
    totalTimeSpent: '00:00:00',
    endTime: '2023-08-31T01:39:27.644Z',
  },
  {
    yAxisSize: 15,
    xAxisSize: 20,
    minesNumber: 150,
    startTime: '2023-08-31T01:39:27.643Z',
    difficulty: 'Customized',
    status: 'Won',
    totalTimeSpent: '00:00:00',
    endTime: '2023-08-31T01:39:27.647Z',
  },
];
