// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Object factory for pAequor species
function pAequorFactory(uniqNum, arrDNA) {
  return {
    _specimenNum: uniqNum,
    _dna: arrDNA,
    _dnaLength: arrDNA.length,

    // to mutate a dna strand in case we want to
    mutate() {
      let randIndex = Math.floor(Math.random() * 15);
      let randBase = this._dna[randIndex];
    
      let newBase = "";
      do {
        newBase = returnRandBase();
      } while (newBase === randBase);

      this._dna[randIndex] = newBase;
    },

    //Compares current DNA strand with a given DNA strand
    compareDNA(hokanoDNA) {
      let currentDNA = this._dna;
      let targetDNA = hokanoDNA;
      let numCommonDNA = 0;
      let percentCommon = 0;

      for (let i = 0; i < currentDNA.length; i++) {
        let exists = targetDNA.indexOf(currentDNA[i]);
        if (exists >= 0) {
          numCommonDNA++;
          targetDNA.splice(exists, 1);
        }
      }

      percentCommon = (numCommonDNA / currentDNA.length) * 100;

      console.log(
        `Our current species and the given species have ${percentCommon}% DNA in common`
      );
    },
    
    // This species only survives outside water if the DNA base 'C' or 'G' is more than or equal to 60% of total DNA
    // Hence this method will return true if it has those DNA capabilities
    willLikelySurvive() {
      let numOfC = 0;
      let numOfG = 0;
      let dna = this._dna;
      let dnaLength = this._dnaLength;

      for (let i = 0; i < dnaLength; i++) {
        if (dna[i] === "C") {
          numOfC++;
        } else if (dna[i] === "G") {
          numOfG++;
        }
      }

      let percentOfC = (numOfC / dnaLength) * 100;
      let percentOfG = (numOfG / dnaLength) * 100;

      if (percentOfC >= 60 || percentOfG >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };
}

// This will give 30 possibilities of this species which will definitely survive outside water
const strongStrands = () => {
  let arrStrongStrands = [];
  for (let i = 0; i < 30; i++) {
    let proto = [];
    proto = pAequorFactory(i, mockUpStrand());
    if (proto.willLikelySurvive()) {
      arrStrongStrands.push(proto);
    } else {
      while (!proto.willLikelySurvive()) {
        proto.mutate();
      }
      arrStrongStrands.push(proto);
    }
  }

  return arrStrongStrands;
};


//checking answer
const thirtySurvivors = strongStrands();
thirtySurvivors.forEach((organism, index) => {
  console.log(`Organism ${index + 1}:`);
  console.log(`Specimen Number: ${organism._specimenNum}`);
  console.log(`DNA: ${organism._dna}`);
  console.log(`DNA Length: ${organism._dnaLength}`);
  console.log(`Will Likely Survive: ${organism.willLikelySurvive()}`);
  console.log("-----------------------");
});

