'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		onoff: [{
			command_class: 'COMMAND_CLASS_SWITCH_BINARY',
			command_get: 'SWITCH_BINARY_GET',
			command_set: 'SWITCH_BINARY_SET',
			command_set_parser: value => ({
				'Switch Value': (value) ? 0xFF : 0x00,
			}),
			command_report: 'SWITCH_BINARY_REPORT',
			command_report_parser: report => {
				if (report && report.hasOwnProperty('Value')) {
					if (report.Value === 'on/enable') return true;
					else if (report.Value === 'off/disable') return false;
				}
				return null;
			},
		}, {
			command_class: 'COMMAND_CLASS_BASIC',
			command_report: 'BASIC_SET',
			command_report_parser: report => {
				if (report && report.hasOwnProperty('Value')) return report.Value > 0;
				return null;
			},
		}],
	},
	settings: {
		blinking: {
			index: 2,
			size: 2,
		},
		notifications: {
			index: 80,
			size: 1,
		},
		button_mode: {
			index: 120,
			size: 1,
		},
		partner_id: {
			index: 200,
			size: 1,
		},
		config_lock: {
			index: 252,
			size: 1,
		},
		device_tag: {
			index: 254,
			size: 2,
		},
		config_reset: {
			index: 255,
			size: 1,
		}
	}
});
