import { View } from 'react-native';
import { usePageContext } from '@terminus/octopus-core';
import { Platform } from '@terminus/octopus-core';
import { Signature as SignatureComp } from '../../components/signature';

export const Signature = () => {
	const pageContext = usePageContext();
	const eventChannel = pageContext.getOpenerEventChannel();

	return (
		<View
			style={{
				paddingBottom: 'env(safe-area-inset-bottom)',
				paddingLeft: 'env(safe-area-inset-left)',
				height: '100vh',
				backgroundColor: '#F7F7F7',
			}}
		>
			<SignatureComp
				onConfirm={(path: string | Error) => {
					if (typeof path === 'string') {
						Platform.API.navigateBack({
							success: () => {
								eventChannel.emit('signed', path);
							},
						});
					}
				}}
				onClear={() => {}}
				onCancel={() => {
					Platform.API.navigateBack();
				}}
			/>
		</View>
	);
};

export default Signature;
