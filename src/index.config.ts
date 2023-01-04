import { IAppConfig } from '@terminus/octopus-shared';

const config: IAppConfig = {
  debug: false,
  window: {
    navigationBarTitleText: '小程序',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#5A7AF4'
  },
  tabBar: {
    color: '#6E6E6E',
		selectedColor: '#2A6AD0',
  }
};

export default config;
