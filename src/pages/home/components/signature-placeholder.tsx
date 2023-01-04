import type * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@terminus/nusi-mobile';

Icon.load('svg', {
	pencil: [
		{
			d: 'M571.733333 76.8l153.6 102.4L341.333333 699.733333h-8.533333L162.133333 768l17.066667-170.666667v-8.533333l392.533333-512zM563.2 0c-17.066667 0-42.666667 8.533333-59.733333 25.6L119.466667 554.666667c0 8.533333-8.533333 34.133333-8.533334 42.666666L85.333333 785.066667c0 42.666667 34.133333 68.266667 76.8 68.266666h25.6l187.733334-76.8c17.066667 0 25.6-17.066667 34.133333-25.6l384-529.066666c17.066667-34.133333 8.533333-76.8-25.6-102.4L605.866667 8.533333C597.333333 0 580.266667 0 563.2 0zM85.333333 1024h853.333334v-76.8H85.333333v76.8z',
			fill: '#2A6AD0',
			'p-id': '1725',
		},
	],
});

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		marginLeft: 4,
		fontSize: 12,
		lineHeight: 16,
		color: '#2A6AD0',
	},
});

export const SignaturePlaceholder: React.ComponentType = () => {
	return (
		<View style={styles.container}>
			<Icon svg type="pencil" size={12} color="#2A6AD0" />
			<Text style={styles.text}>点击签字</Text>
		</View>
	);
};
