import * as vscode from "vscode";
import { Parser } from "./parser";

export function activate(context: vscode.ExtensionContext) {
  let activeEditor: vscode.TextEditor;
  const parser: Parser = new Parser();

  const removeComments = function (n: number) {
    if (!activeEditor || !parser.supportedLanguage) {
      return;
    }

    if (n === 0) {
      parser.findSingleLineComments(activeEditor);
    } else if (n === 1) {
      parser.findMultilineComments(activeEditor);
    } else {
      parser.findSingleLineComments(activeEditor);
      parser.findMultilineComments(activeEditor);
    }

    vscode.workspace.applyEdit(parser.edit);
  };

  // Register commands here

  const removeAllCommentsCommand = vscode.commands.registerCommand(
    "extension.removeAllComments",
    () => {
      if (vscode.window.activeTextEditor) {
        activeEditor = vscode.window.activeTextEditor;
        parser.setRegex(activeEditor, activeEditor.document.languageId);
        removeComments(2);
      }
    }
  );

  const removeSingleLineCommentsCommand = vscode.commands.registerCommand(
    "extension.removeSingleLineComments",
    () => {
      if (vscode.window.activeTextEditor) {
        activeEditor = vscode.window.activeTextEditor;
        parser.setRegex(activeEditor, activeEditor.document.languageId);
        removeComments(0);
      }
    }
  );

  const removeMultilineCommentsCommand = vscode.commands.registerCommand(
    "extension.removeMultilineComments",
    () => {
      if (vscode.window.activeTextEditor) {
        activeEditor = vscode.window.activeTextEditor;
        parser.setRegex(activeEditor, activeEditor.document.languageId);
        removeComments(1);
      }
    }
  );

  context.subscriptions.push(removeAllCommentsCommand);
  context.subscriptions.push(removeSingleLineCommentsCommand);
  context.subscriptions.push(removeMultilineCommentsCommand);
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
