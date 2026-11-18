import {spawnSync} from 'node:child_process';
const url=process.env.PUBLIC_SITE_URL || 'https://heywunmi.com';
if(!/^https:\/\/[^/]+$/.test(url))throw new Error('PUBLIC_SITE_URL must be an HTTPS origin without a trailing slash');
const result=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build','--outDir','dist-launch'],{stdio:'inherit',env:{...process.env,PUBLIC_LAUNCH:'true',PUBLIC_SITE_URL:url}});
if(result.status!==0)process.exit(result.status ?? 1);
const security=spawnSync(process.execPath,['scripts/check-security.mjs','dist-launch'],{stdio:'inherit'});
if(security.status!==0)process.exit(security.status ?? 1);
const structured=spawnSync(process.execPath,['--experimental-strip-types','scripts/check-structured-data.mjs','dist-launch'],{stdio:'inherit'});
process.exit(structured.status ?? 1);
