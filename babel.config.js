module.exports = {
	presets: ['babel-preset-expo'],
	plugins: [
		['react-native-reanimated/plugin'],
		[
			'module-resolver',
			{
				root: ['.'],
				extensions: [
					'.ts',
					'.tsx',
					'.jsx',
					'.js',
					'.json',
					'.svg',
					'.jpg',
				],
				alias: {
					'~': './src',
					'@screens': './src/screens',
					'@components': './src/components',
					'@constants': './src/constants',
					'@utils': './src/utils',
					'@state': './src/state',
					'@navigation': './src/navigation',
					'@hooks': './src/hooks',
					'@config': './src/config',
					'@contexts': './src/contexts',
				},
			},
		],
	],
};
