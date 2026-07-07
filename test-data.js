import { signalIssues } from './src/data/siteData.js';
const featured = signalIssues.find(issue => issue.featured);
console.log('Featured issue:', JSON.stringify(featured, null, 2));
