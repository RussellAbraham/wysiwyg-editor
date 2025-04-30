import EditorModel from './editorModel.js';
import EditorView from './editorView.js';
import EditorController from './editorController.js';

class Editor {
  constructor({ content = '' }) {
    // Initialize MVC
    this.model = new EditorModel();
    this.view = new EditorView(iframe, toolbar, footer, container);
    this.controller = new EditorController(this.model, this.view);
    // Set initial content
    this.controller.setContent(content);
  }
  destroy() {
    this.container.innerHTML = '';
  }
}

window.Editor = Editor;

export default Editor;