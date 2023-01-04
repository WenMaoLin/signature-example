import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@terminus/nusi-mobile';
import { Platform } from '@terminus/octopus-core';

import { SignaturePlaceholder } from './signature-placeholder';

const styles = StyleSheet.create({
	signatureImage: {
		width: 96,
		height: 96,
	},
	preview: {
		position: 'relative',
		width: 96,
		height: 96,
	},
	removeIcon: {
		position: 'absolute',
		top: 8,
		right: 8,
		// @ts-ignore
		borderRadius: '50%',
	},
});

export const getSignature = async (): Promise<string> => {
	return new Promise(res => {
		Platform.API.navigateTo({
			url: '/pages/signature/index',
			events: {
				signed: async (localUrl: string) => {
					Platform.API.showLoading({
						title: '上传中',
						mask: true,
					});
					try {
						// 可以调用微信提供的 API 将本地路径的图片进行上传，最终将远程图片地址返回。
						// const url = await uploadFile(localUrl);
						const url = localUrl;
						res(url);
					} finally {
						Platform.API.hideLoading();
					}
				},
			},
		});
	});
};

export const SignatureField = ({ value, onChange }: any) => {
	const url = value;
	return (
		<View>
			{url ? (
				<View style={styles.preview}>
					<Image style={styles.signatureImage as any} resizeMode="contain" source={{ uri: url }} />
					<TouchableOpacity
						onPress={() => {
							onChange(undefined);
						}}
					>
						<Icon
							style={styles.removeIcon}
							svg
							type="error"
							size={22}
							color={['#222222', '#FFFFFF']}
						/>
					</TouchableOpacity>
				</View>
			) : (
				<TouchableOpacity
					onPress={() => {
						// TODO
						getSignature().then(url => {
							onChange(url);
						});
					}}
				>
					<SignaturePlaceholder />
				</TouchableOpacity>
			)}
		</View>
	);
};
