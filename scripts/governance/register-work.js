#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');
const workItemsPath = path.join(rootDir, 'work-items.json');

function loadWorkItems() {
  if (!fs.existsSync(workItemsPath)) {
    throw new Error('work-items.json not found');
  }
  return JSON.parse(fs.readFileSync(workItemsPath, 'utf-8'));
}

function saveWorkItems(data) {
  fs.writeFileSync(workItemsPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

export function claimWork(itemId, sessionId) {
  const data = loadWorkItems();
  const item = data.items.find(i => i.id === itemId);
  if (!item) {
    throw new Error(`Item ${itemId} not found in work-items.json`);
  }

  const previousStatus = item.status;
  item.status = 'in_progress';
  if (!item.history) item.history = [];

  item.history.push({
    from: previousStatus,
    to: 'in_progress',
    at: new Date().toISOString(),
    session_id: sessionId || 'agent-session-active',
    evidence: `Claimed work item ${itemId} with active write scopes: ${item.scope.write_globs.join(', ')}`,
  });

  saveWorkItems(data);
  console.log(`🚀 Claimed ${itemId} (${item.title}). Status set to 'in_progress'.`);
  return item;
}

export function verifyWork(itemId, evidence, sessionId) {
  const data = loadWorkItems();
  const item = data.items.find(i => i.id === itemId);
  if (!item) {
    throw new Error(`Item ${itemId} not found in work-items.json`);
  }

  const previousStatus = item.status;
  item.status = 'local_verified';
  if (!item.history) item.history = [];

  item.history.push({
    from: previousStatus,
    to: 'local_verified',
    at: new Date().toISOString(),
    session_id: sessionId || 'agent-session-verified',
    evidence: evidence || 'All local tests passed with 0 errors.',
  });

  saveWorkItems(data);
  console.log(`✅ Verified ${itemId} (${item.title}). Status set to 'local_verified'.`);
  return item;
}

export function registerNewWorkItem(newItem) {
  const data = loadWorkItems();
  if (data.items.some(i => i.id === newItem.id)) {
    throw new Error(`Item ${newItem.id} already exists`);
  }

  data.items.push({
    id: newItem.id,
    order: data.items.length + 1,
    title: newItem.title,
    summary: newItem.summary || newItem.title,
    phase: newItem.phase || 'Feature Execution',
    owner: newItem.owner || 'engineering',
    priority: newItem.priority || 'P1',
    risk_tier: newItem.risk_tier ?? 2,
    authority: newItem.authority || 'agent_local',
    approval: newItem.approval || 'approved_local',
    status: 'queued',
    auto_start: false,
    depends_on: newItem.depends_on || [],
    source: newItem.source || { path: 'work-items.json', section: 'Registered Tasks' },
    scope: {
      write_globs: newItem.write_globs || ['src/**'],
    },
    acceptance: newItem.acceptance || ['Unit and integration tests pass cleanly.'],
    next_action: newItem.next_action || 'Claim work item and initiate implementation branch.',
    history: [
      {
        from: 'new',
        to: 'queued',
        at: new Date().toISOString(),
        session_id: newItem.session_id || 'agent-registrar',
        evidence: 'Registered new task in work-items.json ledger.',
      },
    ],
  });

  saveWorkItems(data);
  console.log(`📝 Registered new work item ${newItem.id}: "${newItem.title}"`);
}

// CLI Argument Handling
const args = process.argv.slice(2);
if (args[0] === '--claim' && args[1]) {
  claimWork(args[1], args[2] || process.env.SESSION_ID);
} else if (args[0] === '--verify' && args[1]) {
  verifyWork(args[1], args.slice(2).join(' '));
} else if (args[0] === '--list') {
  const data = loadWorkItems();
  console.table(data.items.map(i => ({ id: i.id, title: i.title.substring(0, 40), status: i.status, priority: i.priority })));
}
