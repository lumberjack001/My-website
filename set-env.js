const fs = require('fs');
const path = require('path');

// Target path where Angular expects the environment file
const targetDir = path.join(__dirname, 'src', 'environments');
const targetPath = path.join(targetDir, 'environment.ts');

// Ensure the directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Generate the content using Netlify's injected environment variables
const envConfigFile = `export const environment = {
  production: true,
  supabaseUrl: '${process.env.supabaseUrl || ''}',
  supabaseAnonKey: '${process.env.supabaseAnonKey || ''}'
};
`;

console.log('Generating environment.ts file dynamically...');
fs.writeFileSync(targetPath, envConfigFile, 'utf8');
console.log(`Environment file generated successfully at ${targetPath}`);