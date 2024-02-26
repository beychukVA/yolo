import { LONG_DASH } from 'constants/index'

export const XFT_LEVELS = {
  0: {
    id: 0,
    key: 'nonft',
    caption: 'No XFT',
    color: '#2a6dff',
    background10: '#1d4baf',
    background01: 'rgba(29,75,175,.1)',
    backgroundGrad: 'none',
    iconProps: { collection: 'general', name: 'userCircle', masking: true, maskingColor: 'rgba(42,109,255,.5)' }
  },
  1: {
    id: 1,
    key: 'silver',
    caption: 'Silver XFT',
    color: '#aaaaaa',
    background10: '#707070',
    background01: 'rgba(112,112,112,.1)',
    backgroundGrad: 'linear-gradient(180deg, rgba(32,37,47,0) 0%, rgba(58,58,58,1) 100%)',
    iconProps: { collection: 'yolorekt', name: 'nftSilver' },
    neededBids: LONG_DASH,
    neededAmount: LONG_DASH,
    yoloRewards: '1.25x'
  },
  2: {
    id: 2,
    key: 'orchid',
    caption: 'Orchid XFT',
    color: ' #9256FF',
    background10: '#5209D3',
    background01: 'rgba(119,50,250,.1)',
    backgroundGrad: 'linear-gradient(180deg, rgba(32,37,47,0) 0%,  rgba(43,44,88,1) 100%)',
    iconProps: { collection: 'yolorekt', name: 'nftOrchid' },
    neededBids: '100',
    neededAmount: '500',
    yoloRewards: '1.5x'
  },
  3: {
    id: 3,
    key: 'emerald',
    caption: 'Emerald XFT',
    color: ' #24F019',
    background10: '#13AA09',
    background01: 'rgba(71,253,62,.1)',
    backgroundGrad: 'linear-gradient(180deg, rgba(32,37,47,0) 0%, rgba(30,58,55,1) 100%)',
    iconProps: { collection: 'yolorekt', name: 'nftEmerald' },
    neededBids: '500',
    neededAmount: '2500',
    yoloRewards: '1.75x'
  },
  4: {
    id: 4,
    key: 'gold',
    caption: 'Gold XFT',
    color: '#EFB80F',
    background10: '#9F7907',
    background01: 'rgba(240,187,25,.1)',
    backgroundGrad: 'linear-gradient(180deg, rgba(32,37,47,0) 0%, rgba(84,76,42,1) 100%)',
    iconProps: { collection: 'yolorekt', name: 'nftGold' },
    neededBids: '2000',
    neededAmount: '1000',
    yoloRewards: '2x'
  },
  5: {
    id: 5,
    key: 'ruby',
    caption: 'Ruby XFT',
    color: ' #EE0000',
    background10: '#9D0707',
    background01: 'rgba(243,63,63,.1)',
    backgroundGrad: 'linear-gradient(180deg, rgba(32,37,47,0) 0%, rgba(73,37,53,1) 100%)',
    iconProps: { collection: 'yolorekt', name: 'nftRuby' },
    neededBids: '6000',
    neededAmount: '30000',
    yoloRewards: '2.5x'
  },
  6: {
    id: 6,
    key: 'diamond',
    caption: 'Diamond XFT',
    color: '#00AEF0',
    background10: '#008BC0',
    background01: 'rgba(137,219,247,.1)',
    backgroundGrad: 'linear-gradient(180deg, rgba(32,37,47,0) 0%, rgba(23,77,108,1) 100%)',
    iconProps: { collection: 'yolorekt', name: 'nftDiamond' },
    maskingText: true,
    maskingColor: 'linear-gradient(90deg, rgba(0,174,240,1) 0%, rgba(195,236,251,1) 50%, rgba(227,246,251,1) 100%)',
    neededBids: '18000',
    neededAmount: '90000',
    yoloRewards: '3x'
  }
}
