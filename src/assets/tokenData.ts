
// Type interface for single token
interface SingleToken {
  name: string,
  description: string
};


// Type interface for token data
interface TokenData {
  tokens: {

    neutral: {
      common: SingleToken[],
      rare: SingleToken[],
      legendary: SingleToken[]
    }

    classes: {
      [name: string]: {
        common: SingleToken[],
        rare: SingleToken[],
        legendary: SingleToken[]
      }
    }
  },

  meta: {

    chances: {
      [rarity: string]: number;
    }
  }
};



let tokenData: TokenData = {
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


export default tokenData;