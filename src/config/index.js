import local from './local';
import dev from './dev';
import prod from './prod';

const hostMapping = {
    'localhost': 'local',
    'registrations-dev.eldt.com': 'dev',
    'registrations-dev.cdlpowersuite.com': 'dev',
    'registrations.eldt.com': 'prod',
    'registrations.cdlpowersuite.com': 'prod',
};

console.log('In new version', window.location.hostname);

const resolvedHost = hostMapping[window.location.hostname] ? window.location.hostname : 'prod';

const config = { dev, local, prod }[hostMapping[resolvedHost]];

console.log(config);

export default config;
