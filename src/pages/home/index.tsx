import { View, Text } from 'react-native';
import { FormBuilder } from '@terminus/nusi-mobile';
import { SignatureField } from './components/signature-field';

export default () => {
	return (
		<View style={{ padding: 20 }}>
			<Text>微信小程序签字示例</Text>
			<FormBuilder
				listBodyStyle={{
					backgroundColor: undefined,
				}}
				passesVerifyTrigger={false}
			>
				<FormBuilder.Fields
					columnNum={1}
					fields={[
						{
							label: '签字',
							name: 'signature',
							rules: [
								{
									required: true,
									message: '请签字',
								},
							],
							element: SignatureField,
							fieldProps: {
								readonly: true,
							},
							listItemStyle: {
								height: undefined,
							},
							lineWrapStyle: {
								alignItems: 'flex-start',
							},
						},
					]}
				/>
			</FormBuilder>
		</View>
	);
};
