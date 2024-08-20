

// #region - Class Data

interface ClassData {

  name: string,
  description: string
}


interface ClassDatabase {

  classes: {
    [name: string]: ClassData
  }
}


let classDatabase: ClassDatabase = {

  classes: {

    warlock: {
      name: "Warlock",
      description: "This is the warlock class."
    },

    transposed: {
      name: "Transposed",
      description: "This is the transposed class."
    },

    rollsafe: {
      name: "Rollsafe",
      description: "This is the rollsafe class."
    },

    ogre: {
      name: "Ogre",
      description: "This is the ogre class."
    }
  }
}

// #endregion



// #region - Token Data

interface TokenData {

  name: string,
  description: string
};


interface TokenDatabase {

  tokens: {

    neutral: {
      common: TokenData[],
      rare: TokenData[],
      legendary: TokenData[]
    }

    classes: {
      [name: string]: {
        common: TokenData[],
        rare: TokenData[],
        legendary: TokenData[]
      }
    }
  },

  meta: {

    chances: {
      [rarity: string]: number;
    }
  }
};



let tokenDatabase: TokenDatabase = {

  tokens: {

    neutral: {

      common: [
        { name: "Exponential", description: "This is the description for the exponential."},
        { name: "Square", description: "This is the description for the square." },
        { name: "Heal", description: "This is the description for the heal token." },
        { name: "Deal", description: "This is the description for the deal." }
      ],

      rare: [
        { name: "Interval", description: "This is the description for the Interval." }
      ],

      legendary: [
        { name: "Fifty Fifty", description: "This is the description for the Fifty Fifty." }
      ]
    },


    classes: {

      warlock: {
        common: [],
        rare: [],
        legendary: []
      },

      transposed: {
        common: [],
        rare: [],
        legendary: []
      },

      rollsafe: {
        common: [],
        rare: [],
        legendary: []
      },

      ogre: {
        common: [],
        rare: [],
        legendary: []
      }
    }
  },


  meta: {

    chances: {

      neutral: 0.8,
      class: 0.2,

      common: 0.65,
      rare: 0.25,
      lengendary: 0.1
    }
  }
}

// #endregion


export { classDatabase, tokenDatabase };