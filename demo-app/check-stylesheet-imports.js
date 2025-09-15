#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript files
function findTsFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item !== 'node_modules' && item !== '.git') {
      findTsFiles(fullPath, files);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to check and fix StyleSheet imports
function checkAndFixStyleSheetImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if file uses StyleSheet.create but imports StyleSheet from react-native
  const hasStyleSheetCreate = content.includes('StyleSheet.create');
  const hasReactNativeStyleSheetImport =
    /import.*StyleSheet.*from\s+['"]react-native['"]/.test(content);
  const hasUnistylesStyleSheetImport =
    /import.*StyleSheet.*from\s+['"]react-native-unistyles['"]/.test(content);

  if (
    hasStyleSheetCreate &&
    hasReactNativeStyleSheetImport &&
    !hasUnistylesStyleSheetImport
  ) {
    console.log(
      `❌ ${filePath}: Uses StyleSheet.create but imports StyleSheet from react-native instead of react-native-unistyles`,
    );
    return true;
  }

  if (
    hasStyleSheetCreate &&
    !hasReactNativeStyleSheetImport &&
    !hasUnistylesStyleSheetImport
  ) {
    console.log(
      `❌ ${filePath}: Uses StyleSheet.create but missing StyleSheet import from react-native-unistyles`,
    );
    return true;
  }

  return false;
}

// Main execution
const baseDir = process.argv[2] || '.';
const files = findTsFiles(baseDir);
let issuesFound = 0;

console.log('🔍 Checking StyleSheet import patterns...\n');

for (const file of files) {
  if (checkAndFixStyleSheetImports(file)) {
    issuesFound++;
  }
}

if (issuesFound === 0) {
  console.log('✅ All StyleSheet imports look correct!');
} else {
  console.log(`\n❌ Found ${issuesFound} files with StyleSheet import issues.`);
}
