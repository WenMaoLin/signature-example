import React from 'react';
import { Route, Router, TabRouter } from '@terminus/octopus-router';
import { Provider } from '@terminus/nusi-mobile';
import './styles/index.less';
import theme from './styles/theme';

import HomePage from './pages/home/index';
import UserInfo from './pages/user/index';

import HomeIcon from './images/home.png';
import HomeActiveIcon from './images/home-active.png';
import UserIcon from './images/user.png';
import UserActiveIcon from './images/user-active.png';

import SignaturePage from './pages/signature/index';

class Index extends React.Component {
	render() {
		const { children } = this.props;

		return (
			<Provider theme={theme}>
				<Router>
					<TabRouter text="Home" iconPath={HomeIcon} selectedIconPath={HomeActiveIcon}>
						<Route name="Home" component={HomePage} />
					</TabRouter>
					<TabRouter text="User" iconPath={UserIcon} selectedIconPath={UserActiveIcon}>
						<Route name="UserInfo" component={UserInfo} />
					</TabRouter>

					<Route name="签名" component={SignaturePage} />
				</Router>
				{children}
			</Provider>
		);
	}
}

export default Index;
