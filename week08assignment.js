/* Week 8 Assignment JavaScript */
/* By Derek McGuire */

// Defining the Class of Vocabulary Definitions
class Definition {
    constructor(definition, part) {
        this.definition = definition;
        this.part = part;
    }

    describe() {
        return `${this.definition} - Part of Speech: ${this.part}`
    }
};
// End of Vocabulary Definitions class


// Defining the Class of Vocabulary Terms
// Notice how definitions is pluralized
class Word {
    constructor(word) {
        this.word = word;
        this.definitions = []; // Here is an Array to hold Definitions
    }

    addDefinition(definition) {
        if (definition instanceof Definition) {
            this.definitions.push(definition);
        } else {
            throw new Error(`You can only add a Definition. This is not a definition: ${vocabDefinition}`);
        }
    }

    describe() {
        return `${this.word} has ${this.definitions.length} definitions.`;
    }
};
//

// Class to hold the Menu
class VocabMenu {
    constructor() {
        this.words = [];  // here is an Array to hold the Vocabulary Terms
        this.selectedWord = null;
    }

    // Start method allows the menu to run
    start() {
        let selection = this.showMainMenuOptions();
        while (selection!= 0) {
            switch(selection) {
                case '1' :
                    this.createWord();
                    break;
                case '2' :
                    this.viewWord();
                    break;
                case '3' :
                    this.deleteWord();
                    break;
                case '4' :
                    this.displayWords();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Thanks for Reading! Goodbye!');
    }


    // methods to run the switch statement above, are below:
    showMainMenuOptions() {
        return prompt (`
            0) Exit the Vocabulary Menu
            1) Create a new Vocabulary Term
            2) View a Vocabulary Term
            3) Delete a Vocabulary Term
            4) Display All Vocabulary Terms
        `);
    }

    showWordMenuOptions(wordInfo) {
        return prompt(`
            0) Go Back to Vocabulary Menu
            1) Add a New Defintion
            2) Delete a Definition
            - - - - - - - - - 
            ${wordInfo}
        `);
    }

    displayWords() {
        let wordString = '';
        for (let i = 0; i < this.words.length; i++) {
            wordString += i + ') ' + this.words[i].word + '\n';
        }
        alert(wordString);
    }

    createWord() {
        let word = prompt('Enter a new Vocabulary Term: ');
        this.words.push(new Word(word));
    }

    // This method digs deeper into the definitions of the vocabulary terms
    viewWord() {
        let i = prompt('Enter the index of the Vocabulary Term you want to see:');
        if (i > -1 && i < this.words.length) {
            this.selectedWord = this.words[i];
            let description = 'Vocabulary Term: ' + i + ') ' + this.selectedWord.word + '\n';
            for (let j = 0; j < this.selectedWord.definitions.length; j++) {
                description += j + ') ' + this.selectedWord.definitions[j].describe() + '\n';
            }
            let selectionOne = this.showWordMenuOptions(description);
            switch (selectionOne) {
                case '1' :
                    this.createDefinition();
                    break;
                case '2' :
                    this.deleteDefinition();
            }
        }
    }
    
    deleteWord() {
        let i = prompt('Enter the index of the definition to delete: ');
        if (i > -1 && i < this.words.length) {
            this.words.splice(i,1);
        }
    }

    createDefinition() {
        let definition = prompt('Enter a new definition: ');
        let part = prompt('Enter a part of speech this defintion fits: ');
        this.selectedWord.addDefinition(new Definition(definition,part));
    }

    deleteDefinition() {
        let q = prompt('Enter the index of the definition that you wish to delete: ');
        if (q > -1 && q < this.selectedWord.definitions.length) {
            this.selectedWord.definitions.splice(q,1);
        }
    }
};

// This is the Entry Point of the program
let vocabMenu = new VocabMenu();
vocabMenu.start();
