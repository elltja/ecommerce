import createNextIntlPlugin from 'next-intl/plugin';
import './src/env.js';

/** @type {import("next").NextConfig} */
const config = {};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(config);
