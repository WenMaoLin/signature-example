/**
 * 源码来自 tmd，https://data-component.app.terminus.io/docs/signature/doc
 */

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Flex } from '@terminus/nusi-mobile';
import { Canvas, Platform, useOnLoad } from '@terminus/octopus-core';
import { Provider } from '@terminus/nusi-mobile';
import theme from './theme'

interface ISignatureProps {
	lineWidth?: number;
	strokeStyle?: string;
	type?: 'png' | 'jpg';
	placeholder?: string;

	onCancel: () => void;
	onConfirm: (path: string | Error) => void;
	onClear: () => void;
}

const styles = StyleSheet.create({
	page: {
		height: '100%',
	},
	canvasContainer: {
		position: 'relative',
		paddingHorizontal: 12,
		paddingVertical: 8,
		flex: 1,
	},
	placeholder: {
		position: 'absolute',
		zIndex: 1,
		top: 24,
		left: 24,
		fontSize: 14,
		lineHeight: 20,
		color: '#C2C2C2',
	},
	canvasWrap: {
		flex: 1,
		borderRadius: 8,
		backgroundColor: '#fff',
	},
	canvas: {
		width: '100%',
		flex: 1,
	},
	buttonWrap: {
		marginLeft: 'auto',
		width: 408,
		paddingHorizontal: 12,
		paddingVertical: 4,
	},
});

// https://github.com/jdf2e/nutui/blob/f301c1aefdddd4527e8f63c733701ba9dd4489b4/src/packages/__VUE/signature/index.vue
export const Signature: React.ComponentType<ISignatureProps> = props => {
	const {
		lineWidth = 2,
		strokeStyle = '#000',
		type = 'png',
		placeholder = '请工整的书写签字',
	} = props;
	const [state, setState] = React.useState({
		canvas: null,
		canvasHeight: 0,
		canvasWidth: 0,
		ctx: null,
	});
	const [showPlaceholder, setShowPlaceholder] = React.useState(true);
	const startEventHandler = (event: TouchEvent) => {
		event.preventDefault();
		const ctx = state.ctx as any;
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		setShowPlaceholder(false);
	};
	const moveEventHandler = (event: TouchEvent) => {
		event.preventDefault();
		const evt = event.changedTouches[0];
		// @ts-ignore
		const { x, y } = evt;

		const ctx = state.ctx as any;
		ctx.lineTo(x, y);
		ctx.stroke();
	};
	const endEventHandler = (event: TouchEvent) => {
		event.preventDefault();
	};
	const leaveEventHandler = (event: TouchEvent) => {
		event.preventDefault();
	};
	const clear = () => {
		const ctx = state.ctx as any;

		ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);
		ctx.closePath();
		setShowPlaceholder(true);
		props.onClear();
	};
	const confirm = () => {
		onSave();
	};
	const onSave = () => {
		if (!state.canvas) {
			return;
		}
		Platform.API.canvasToTempFilePath({
			canvas: state.canvas,
			fileType: type,
		})
			.then((res: any) => {
				props.onConfirm(res.tempFilePath);
			})
			.catch((e: any) => {
				props.onConfirm(e);
			});
	};

	useOnLoad(() => {
		setTimeout(() => {
			Platform.API.createSelectorQuery()
				.select('#spcanvas')
				.fields(
					{
						node: true,
						size: true,
					},
					function (res: any) {
						const canvas = res.node;
						const ctx = canvas.getContext('2d');
						canvas.width = res.width;
						canvas.height = res.height;
						setState({
							canvas,
							ctx,
							canvasWidth: res.width,
							canvasHeight: res.height,
						});
					}
				)
				.exec();
		}, 500);
	});

	return (
		<Provider theme={theme}>
			<View style={styles.page}>
				<View style={styles.canvasContainer}>
					{showPlaceholder && <Text style={styles.placeholder}>{placeholder}</Text>}
					<View style={styles.canvasWrap}>
						<Canvas
							style={StyleSheet.flatten(styles.canvas)}
							id="spcanvas"
							type="2d"
							onTouchStart={startEventHandler}
							onTouchMove={moveEventHandler}
							onTouchEnd={endEventHandler}
							onTouchLeave={leaveEventHandler}
						/>
					</View>
				</View>

				<Flex style={styles.buttonWrap}>
					<Flex.Item>
						<Button
							style={{
								marginRight: 8,
							}}
							onPress={() => {
								props.onCancel();
							}}
							capsule
							size="large"
						>
							取消
						</Button>
					</Flex.Item>
					<Flex.Item>
						<Button
							style={{
								marginRight: 8,
							}}
							onPress={clear}
							capsule
							size="large"
						>
							重签
						</Button>
					</Flex.Item>
					<Flex.Item>
						<Button type="primary" onPress={confirm} capsule size="large">
							提交
						</Button>
					</Flex.Item>
				</Flex>
			</View>
		</Provider>
	);
};
