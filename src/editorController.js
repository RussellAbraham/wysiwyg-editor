export default class EditorController {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		this.view.onInput((html) => {
			this.model.setContent(html);
			this.updateFooter();
		});

		this.bindToolbar();
		this.updateFooter();
	}

	bindToolbar() {
		this.view.toolbar.addEventListener("click", (e) => {
			const btn = e.target.closest("button");
			if (!btn || btn.id === "fullscreen-toggle") return;

			const cmd = btn.dataset.cmd;
			const promptText = btn.dataset.prompt;
			let value = null;

			if (promptText) {
				value = prompt(promptText);
				if (!value) return;
			}

			this.view.execCommand(cmd, value);
			this.view.focus();
		});
	}

	updateFooter() {
		const words = this.view.getWordCount();
		const chars = this.view.getCharCount();
		this.view.updateFooter(words, chars);
	}

	getContent() {
		return this.model.getContent();
	}

	setContent(html) {
		this.model.setContent(html);
		this.view.setContent(html);
		this.updateFooter();
	}
}
