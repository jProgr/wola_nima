/**
 * Enum for word types.
 *
 * @readonly
 * @enum {Symbol}
 */
export const WordType = Object.freeze({
  BASE: Symbol('base'),
  COMPOUND: Symbol('compound'),
  OTHER: Symbol('other'),
});

const parenthesesRegex = /\([\w\d\s'\-,]+\)/gi;

export class Word {

  /**
   * Creates a Word.
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
    this.contents = this._getContent(element);
    [this.word] = this.contents;
    this.type = this._getType(this.word);
  }

  /**
   * Returns the type of word by looking at the string.
   *
   * @param {string} word
   * @return {WordType}
   */
  _getType(word) {
    if (word.length === 4 || word === 'wa') return WordType.BASE;
    if (word.includes('.')) return WordType.COMPOUND;

    return WordType.OTHER;
  }

  /**
   * Returns a set with the word and its meanings.
   *
   * @param {HTMLElement} element
   * @return {Set} Of strings.
   */
  _getContent(element) {
    const container = element.querySelector('.term');

    let contents = new Set();

    // Add word.
    const word = container.querySelector('.word').innerText;
    contents.add(word);

    // Add meanings.
    const meaningsElement = container.querySelector('.meaning');
    for (const cssClass of ['.noun', '.verb', '.modifier']) {
      meaningsElement
        .querySelector(cssClass)
        .innerText
        .replaceAll(parenthesesRegex, '')
        .split(/[^\w-]/)
        .map(word => word.trim())
        .forEach(word => contents.add(word.toLowerCase()));
    }

    if (contents.has('')) contents.delete('');

    return contents;
  }

  /**
   * Marks element as visible.
   *
   * @return {undefined}
   */
  show() {
    this.element.style.display = 'block';
  }

  /**
   * Marks element as invisible.
   *
   * @return {undefined}
   */
  hide() {
    this.element.style.display = 'none';
  }

  /**
   * Whether this word is of any of the listed types.
   *
   * @param  {...WordType} types
   * @return {boolean}
   */
  is(...types) {
    return types.includes(this.type);
  }
}
