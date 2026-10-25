#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');
const workItemsPath = path.join(rootDir, 'work-items.json');

function validateGovernance() {
  console.log('🔍 Auditing governance work-items.json...');

  if (!fs.existsSync(workItemsPath)) {
    console.error('❌ FATAL: work-items.json does not exist at project root!');
    process.exit(1);
  }

  let data;
  try {
    const raw = fs.readFileSync(workItemsPath, 'utf-8');
    data = JSON.parse(raw);
  } catch (err) {
    console.error('❌ FATAL: work-items.json is not valid JSON:', err.message);
    process.exit(1);
  }

  if (data.version !== 1) {
    console.error('❌ Error: work-items.json version must be 1. Received:', data.version);
    process.exit(1);
  }

  if (!data.policy || !data.policy.source_of_truth || !data.policy.production_boundary) {
    console.error('❌ Error: work-items.json is missing required policy definitions.');
    process.exit(1);
  }

  if (!Array.isArray(data.items) || data.items.length === 0) {
    console.error('❌ Error: work-items.json items must be a non-empty array.');
    process.exit(1);
  }

  const validStatuses = ['queued', 'in_progress', 'blocked', 'local_verified', 'approved_for_staging', 'completed'];
  const ids = new Set();

  for (const item of data.items) {
    if (!item.id || !item.title || !item.owner || !item.priority) {
      console.error(`❌ Error in item: Missing mandatory fields in ${JSON.stringify(item)}`);
      process.exit(1);
    }

    if (ids.has(item.id)) {
      console.error(`❌ Error: Duplicate work item ID found: ${item.id}`);
      process.exit(1);
    }
    ids.add(item.id);

    if (!validStatuses.includes(item.status)) {
      console.error(`❌ Error in ${item.id}: Invalid status '${item.status}'. Must be one of: ${validStatuses.join(', ')}`);
      process.exit(1);
    }

    if (!item.scope || !Array.isArray(item.scope.write_globs)) {
      console.error(`❌ Error in ${item.id}: Missing scope.write_globs array.`);
      process.exit(1);
    }

    // Verify dependencies exist
    if (Array.isArray(item.depends_on)) {
      for (const dep of item.depends_on) {
        if (!data.items.some(it => it.id === dep)) {
          console.error(`❌ Error in ${item.id}: Dependency '${dep}' not found in items list.`);
          process.exit(1);
        }
      }
    }
  }

  console.log(`✅ Governance audit passed: ${data.items.length} items verified with clean dependency graph.`);
}

validateGovernance();
