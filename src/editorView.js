export default class EditorView {
	constructor(iframe, toolbar, footer, container) {
		this.iframe = iframe;
		this.toolbar = toolbar;
		this.footer = footer;
		this.container = container;
		this._onInput = null;
		this.initIframe();
		this.initFullscreenToggle();
	}

	initIframe() {
		const doc =
			this.iframe.contentDocument || this.iframe.contentWindow.document;
		doc.open();
		doc.write(`
        <html>
          <head>
            <style>
              body {
                font-family: sans-serif;
                padding: 1rem;
                margin: 0;
              }
              body:focus {
                outline: none;
              }
            </style>
          </head>
          <body contenteditable="true"></body>
        </html>
      `);
		doc.close();
		this.doc = doc;
		this.body = doc.body;
		this.bindIframeEvents();
	}

	bindIframeEvents() {
		this.body.addEventListener("input", () => {
			if (typeof this._onInput === "function") {
				this._onInput(this.getContent());
			}
		});
	}

	initFullscreenToggle() {
		const toggleBtn = document.getElementById("fullscreen-toggle");
		toggleBtn.addEventListener("click", () => {
			this.container.classList.toggle("fullscreen");
		});
	}

	onInput(callback) {
		this._onInput = callback;
	}

	execCommand(cmd, value = null) {
		this.doc.execCommand(cmd, false, value);
	}

	setContent(html) {
		this.body.innerHTML = html;
	}

	getContent() {
		return this.body.innerHTML;
	}

	focus() {
		this.body.focus();
	}

	getText() {
		return this.body.textContent || "";
	}

	getWordCount() {
		const text = this.getText().trim();
		return text ? text.split(/\s+/).length : 0;
	}

	getCharCount() {
		return this.getText().length;
	}

	updateFooter(wordCount, charCount) {
		if (this.footer) {
			this.footer.querySelector(
				"#word-count"
			).textContent = `Words: ${wordCount}`;
			this.footer.querySelector(
				"#char-count"
			).textContent = `Characters: ${charCount}`;
		}
	}
}
