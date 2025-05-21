const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Function to escape quotes in JSX text content
function escapeQuotesInJSX(content) {
  // This regex finds text nodes in JSX that contain double quotes
  // and replaces them with &quot;
  return content.replace(/(<[^>]*>)([^<>"]*)"([^<>"]*)(<[^>]*>|$)/g, 
    (match, openTag, before, after, closeTag) => {
      return `${openTag}${before}&quot;${after}${closeTag || ''}`;
    }
  );
}

// Function to process a single file
async function processFile(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const updatedContent = escapeQuotesInJSX(content);
    
    if (updatedContent !== content) {
      await fs.promises.writeFile(filePath, updatedContent, 'utf-8');
      return { filePath, changed: true };
    }
    
    return { filePath, changed: false };
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return { filePath, changed: false, error };
  }
}

// Main function to process all files
async function main() {
  try {
    const files = await glob('**/*.{ts,tsx}', { 
      ignore: ['**/node_modules/**', '**/.next/**', '**/out/**', '**/dist/**'],
      cwd: __dirname
    });

    console.log(`Found ${files.length} files to process`);
    
    let changedCount = 0;
    
    for (const file of files) {
      const fullPath = path.join(__dirname, file);
      const result = await processFile(fullPath);
      
      if (result.changed) {
        changedCount++;
        console.log(`✅ Updated: ${file}`);
      }
    }
    
    console.log(`\nProcessing complete!`);
    console.log(`Total files processed: ${files.length}`);
    console.log(`Files updated: ${changedCount}`);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
