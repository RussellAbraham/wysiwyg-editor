export default class EditorModel {
	constructor(initialContent = "") {
		this.content = initialContent;
	}
	setContent(html) {
		this.content = html;
	}
	getContent() {
		return this.content;
	}
}
