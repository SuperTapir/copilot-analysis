const sourcemap = require('source-map');
const fs = require('fs-extra');
const path = require('path');
const parser = require('@babel/parser');
const types = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const updateNodeName = require('./lib/updateNodeName');

// 在这里调整要解析的文件
const EXTENSION_NAME = 'GitHub.copilot-1.186.856';
const EXPORT_FOLDER_NAME = 'analysis';
const ANALYSIS_JS_NAME = 'extension.js';
const ANALYSIS_JS_MAP_NAME = ANALYSIS_JS_NAME + '.map';

const ANALYSIS_EXPORT_PATH = path.join(EXPORT_FOLDER_NAME, 'empty');

const extensionSrcPath = path.join('source', EXTENSION_NAME, 'extension');
const extensionDistPath = path.join(extensionSrcPath, 'dist');

const sourceFile = fs.readFileSync(path.join(extensionDistPath, ANALYSIS_JS_NAME), 'utf8');
const extensionAst = parser.parse(sourceFile);

const mapFile = fs.readFileSync(path.join(extensionDistPath, ANALYSIS_JS_MAP_NAME), 'utf8');
const rawSourceMap = JSON.parse(mapFile.toString());

(async () => {
  const nameMap = new Map();
  const fileMap = new Map();

  await sourcemap.SourceMapConsumer.with(rawSourceMap, null, (consumer) => {
    consumer.eachMapping(function (m) {
      if (m.name) {
        nameMap.set(`${m.generatedLine}:${m.generatedColumn}`, m);
      }

      if (m.source) {
        if (!fileMap.has(m.source)) {
          fileMap.set(m.source, {
            start: m,
          });
        } else {
          fileMap.set(m.source, {
            ...fileMap.get(m.source),
            end: m,
          });
        }
      }
    });
  });

  let lastFile;
  let lastNodes = [];

  traverse(extensionAst, {
    enter(p) {
      const node = p.node;
      const { line, column } = node.loc.start;

      // 处理变量命名
      if (nameMap.has(`${line}:${column}`)) {
        const sourceObj = nameMap.get(`${line}:${column}`);
        const name = sourceObj.name;
        updateNodeName(node, name);
      }
    },
  });

  traverse(extensionAst, {
    enter(p) {
      const node = p.node;
      const { line, column } = node.loc.start;

      // 处理路径
      for (const [file, m] of fileMap.entries()) {
        if (m.start.generatedLine === line && m.start.generatedColumn === column) {
          if (lastFile && lastNodes.length) {
            const pp = path.resolve(__dirname, ANALYSIS_EXPORT_PATH, lastFile);
            fs.ensureFileSync(pp);
            fs.writeFileSync(pp, lastNodes.map((n) => generate(n).code).join());
            lastNodes = [];
          }
          lastFile = file;
          break;
        }
      }
      if (lastFile) {
        lastNodes.push(node);
        p.skip();
      }
    },
  });
})();
