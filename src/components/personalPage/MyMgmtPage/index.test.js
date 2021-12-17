import { hasContents } from './index';

describe('hasContent', () => {
  it('should return true if toReceiveUserId has data', () => {
    const input = [
      {
        exchangeLocation: {
          latitude: 25.0423104,
          longitude: 121.565012,
        },
        receivedInfo: {},
        exchangePlace: '110台灣台北市信義區基隆路一段178號',
        rating: 5,
        fromTimeStamp: {
          seconds: 1637743460,
          nanoseconds: 735000000,
        },
        toReceiveInfo: {
          RVwfC9NbE5eHeCYlichvHjVgH3t1: {
            quantities: 2,
            upcomingTimestamp: {
              seconds: 1641481756,
              nanoseconds: 641000000,
            },
          },
        },
        quantities: 5,
        name: '沙拉總匯',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/shengshi-8bc48.appspot.com/o/images%2Fshares%2FiOxxbjVp5q2P2XzfEpw9?alt=media&token=66a8ad8e-0a91-4ff9-8717-fe83ea023287',
        bookedQuantities: 2,
        postUser: {
          id: 'Of28IBc55zXVuq4xDjipe7ohCOa2',
          displayName: 'Peter Fan',
        },
        createdAt: {
          seconds: 1637743544,
          nanoseconds: 47000000,
        },
        receivedUserId: [],
        userLocation: '信義區',
        isArchived: false,
        savedUserId: [],
        toTimeStamp: {
          seconds: 1637748000,
          nanoseconds: 0,
        },
        toReceiveUserId: ['RVwfC9NbE5eHeCYlichvHjVgH3t1'],
        id: 'iOxxbjVp5q2P2XzfEpw9',
      },
    ];
    expect(hasContents(input)).toEqual(true);
  });
});
