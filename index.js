const { promisify } = require('util');
const { join } = require('path');
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);

exports.run = async (name, options, config, rootPath) => {
	let content = `import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ___tpl_name___ from '___component_path______tpl_name___';
import '___component_path______tpl_name___/___tpl_name___.scss';

storiesOf('___tpl_name___', module)
	.add('insert different states here', () => {
		return <___tpl_name___ />;
	});`;

	if (config.path.substr(0, 2) !== '..') {
		config.path = `..${config.path}`;
	}

	content = content.replace(/___component_path___/g, config.path);
	content = content.replace(/___tpl_name___/g, name);

	try {
		await writeFile(
			join(rootPath, 'stories', `${name}.js`),
			content
		);

		return true;
	} catch(error) {
		return false;
	}
}