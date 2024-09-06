/**
 * @typedef {{
 *  id: number;
 *  text: string
 * }} Fact
 */

window.addEventListener('load', () => {
  console.log('DOM fully loaded and parsed');

  /**
   * @type {HTMLButtonElement}
   */
  const ADD_NEW_FACT_BTN = document.querySelector('button#add-new-fact-btn');
  /**
   * @type {HTMLDialogElement}
   */
  const ADD_NEW_FACT_DIALOG = document.querySelector('dialog#add-new-fact-dialog');
  /**
   * @type {HTMLFormElement}
   */
  const ADD_NEW_FACT_FORM = ADD_NEW_FACT_DIALOG.querySelector('form#add-new-fact-form');
  /**
   * @type {HTMLButtonElement}
   */
  const CLOSE_ADD_NEW_FACT_DIALOG_BTN = ADD_NEW_FACT_DIALOG.querySelector(
    'button#close-add-new-fact-dialog-btn'
  );
  /**
   * @type {HTMLTableElement}
   */
  const FACTS_TABLE = document.querySelector('table#facts-table');
  /**
   * @type {HTMLButtonElement}
   */
  const LOAD_CAT_FACTS_BTN = document.querySelector('button#load-facts-btn');

  ADD_NEW_FACT_BTN.addEventListener('click', () => {
    ADD_NEW_FACT_DIALOG.showModal();
  });
  ADD_NEW_FACT_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();

    const partialFact = Object.fromEntries(new FormData(ADD_NEW_FACT_FORM).entries());

    try {
      await addFact(partialFact);

      ADD_NEW_FACT_DIALOG.close();
    } catch (error) {
      console.error('Failed to add fact', error);
    }
  });
  CLOSE_ADD_NEW_FACT_DIALOG_BTN.addEventListener('click', () => {
    ADD_NEW_FACT_DIALOG.close();
  });
  LOAD_CAT_FACTS_BTN.addEventListener('click', () => void loadFacts());

  void loadFacts();

  /**=
   * @param {Omit<Fact, 'id'>} partialFact
   */
  async function addFact(partialFact) {
    const url = new URL('/api/facts', location.origin);
    const response = await fetch(url, {
      body: JSON.stringify(partialFact),
      method: 'POST',
    });

    if (response.ok) {
      console.log('Fact added successfully');
    } else {
      console.error('Failed to add fact');
    }

    void loadFacts();
  }
  async function loadFacts() {
    const url = new URL('/api/facts', location.origin);
    const response = await fetch(url, {
      method: 'GET',
    });
    /**
     * @type {Fact[]}
     */
    const facts = await response.json();
    const rows = facts.map((fact) => {
      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const textCell = document.createElement('td');

      idCell.textContent = fact.id;
      textCell.textContent = fact.text;

      row.append(idCell, textCell);

      return row;
    });

    FACTS_TABLE.querySelector('tbody').replaceChildren(...rows);
  }
});
