class IA {
  constructor (tab, idJoueur, numJoueur) {
    this.tab = tab;
    this.idJoueur = idJoueur;
    this.numJoueur = numJoueur;
    this.nbTenailles = 0;
    this.ptTab = tab;
  }
  setTab (tab) {
    this.tab = tab;
  }
  handleTenailles (tableau) {
    if (this.tab[dernierCoupX][dernierCoupY+1] != tableau[dernierCoupX][dernierCoupY+1]) {
      if (this.tab[dernierCoupX][dernierCoupY+2] != tableau[dernierCoupX][dernierCoupY+2]) {
        this.ptTab[dernierCoupX][dernierCoupY+1].setValue(0);
        this.ptTab[dernierCoupX][dernierCoupY+2].setValue(0);
        this.nbTenailles = nbTenailles + 1;
      }
    }
    if (this.tab[dernierCoupX][dernierCoupY-1] != tableau[dernierCoupX][dernierCoupY-1]) {
      if (this.tab[dernierCoupX][dernierCoupY-2] != tableau[dernierCoupX][dernierCoupY-2]) {
        this.ptTab[dernierCoupX][dernierCoupY-1].setValue(0);
        this.ptTab[dernierCoupX][dernierCoupY-2].setValue(0);
        this.nbTenailles = nbTenailles + 1;
      }
    }
    if (this.tab[dernierCoupX-1][dernierCoupY] != tableau[dernierCoupX-1][dernierCoupY]) {
      if (this.tab[dernierCoupX-2][dernierCoupY] != tableau[dernierCoupX-2][dernierCoupY]) {
        this.ptTab[dernierCoupX-1][dernierCoupY].setValue(0);
        this.ptTab[dernierCoupX-2][dernierCoupY].setValue(0);
        this.nbTenailles = nbTenailles + 1;
      }
    }
    if (this.tab[dernierCoupX+1][dernierCoupY] != tableau[dernierCoupX+1][dernierCoupY]) {
      if (this.tab[dernierCoupX+2][dernierCoupY] != tableau[dernierCoupX+2][dernierCoupY]) {
        this.ptTab[dernierCoupX+1][dernierCoupY].setValue(0);
        this.ptTab[dernierCoupX+2][dernierCoupY].setValue(0);
        this.nbTenailles = nbTenailles + 1;
      }
    }
    if (this.tab[dernierCoupX-1][dernierCoupY+1] != tableau[dernierCoupX-1][dernierCoupY+1]) {
      if (this.tab[dernierCoupX-2][dernierCoupY+2] != tableau[dernierCoupX-2][dernierCoupY+2]) {
        this.ptTab[dernierCoupX-1][dernierCoupY+1].setValue(0);
        this.ptTab[dernierCoupX-2][dernierCoupY+2].setValue(0);
        this.nbTenailles = nbTenailles + 1;
      }
    }
    if (this.tab[dernierCoupX-1][dernierCoupY-1] != tableau[dernierCoupX-1][dernierCoupY-1]) {
      if (this.tab[dernierCoupX-2][dernierCoupY-2] != tableau[dernierCoupX-2][dernierCoupY-2]) {
        this.ptTab[dernierCoupX-1][dernierCoupY-1].setValue(0);
        this.ptTab[dernierCoupX-2][dernierCoupY-2].setValue(0);
        this.nbTenailles = nbTenailles + 1;
      }
    }
    if (this.tab[dernierCoupX+1][dernierCoupY-1] != tableau[dernierCoupX+1][dernierCoupY-1]) {
      if (this.tab[dernierCoupX+2][dernierCoupY-2] != tableau[dernierCoupX+2][dernierCoupY-2]) {
        this.ptTab[dernierCoupX+1][dernierCoupY-1].setValue(0);
        this.ptTab[dernierCoupX+2][dernierCoupY-2].setValue(0);
        this.nbTenailles = nbTenailles + 1;
      }
    }
    if (this.tab[dernierCoupX+1][dernierCoupY+1] != tableau[dernierCoupX+1][dernierCoupY+1]) {
      if (this.tab[dernierCoupX+2][dernierCoupY+2] != tableau[dernierCoupX+2][dernierCoupY+2]) {
        this.ptTab[dernierCoupX+1][dernierCoupY+1].setValue(0);
        this.ptTab[dernierCoupX+2][dernierCoupY+2].setValue(0);
        this.nbTenailles = nbTenailles + 1;
      }
    }
  }
  addPoint (dernierCoupX, dernierCoupY) {
    this.dernierCoup = new Point(dernierCoupX, dernierCoupY, this.tab[dernierCoupX][dernierCoupY]);
    this.ptTab[dernierCoupX][dernierCoupY] = this.dernierCoup;
  }
  makeSubsection (dernierCoupX, dernierCoupY) {
    var section = [];
    for (var line in this.ptTab) {
      if ((dernierCoupY >= 4) && (dernierCoupY < 13)) {
        section.push(this.ptTab[line].slice(dernierCoupY - 4, dernierCoupY + 5)); //limite externe non incluse
      } else if (dernierCoupY < 4) {
        section.push(this.ptTab[line].slice(dernierCoupY, dernierCoupY + 5)); //limite externe non incluse
      } else if (dernierCoupY >= 13) {
        section.push(this.ptTab[line].slice(dernierCoupY - 4, dernierCoupY)); //limite externe non incluse
      }
    }
    if ((dernierCoupX >= 4) && (dernierCoupX < 13)) {
      section = section.slice(dernierCoupX - 4, dernierCoupX + 5)); //limite externe non incluse
    } else if (dernierCoupX < 4) {
      section = section.slice(dernierCoupX, dernierCoupX + 5)); //limite externe non incluse
    } else if (dernierCoupX >= 13) {
      section = section.slice(dernierCoupX - 4, dernierCoupX)); //limite externe non incluse
    }
    this.subSection = section;
  }
  play(dernierCoupX, dernierCoupY, tableau, nbTenailleJ1, nbTenailleJ2) {
    if (this.numJoueur == 1) {
      if (this.nbTenailles != nbTenailleJ1) {
        this.handleTenailles(tableau);
      }
    } else {
      if (this.nbTenailles != nbTenailleJ2) {
        this.handleTenailles(tableau);
      }
    }
    this.setTab(tableau);
    this.addPoint(dernierCoupX, dernierCoupY);
    this.makeSubsection(dernierCoupX, dernierCoupY);
    var priorityList = {};
    priorityList["1"] = [];
    priorityList["2"] = [];
    priorityList["3"] = [];

    for (var l in this.subSection) {
      for (var c of this.subSection[l]) {
        if (typeof(this.subSection[l][c] == "object")) {
          var neighbors = this.subSection[l][c].getAllNeighbors(this.tab);
          for (var dir in neighbors) {
            var toPlay = this.subSection[l][c].checkIfEmpty(dir);
            if (toPlay != false) {
              switch (neighbors[dir]) {
                case 3:
                  // Si 4 pions alignés on met un pion pour gagner/bloquer
                  return toPlay;
                case 2:
                  if (this.subSection[l][c].value != this.numJoueur) {
                    // Si 3 pions adverses alignés, mettre un pion a côté pour bloquer
                    priorityList["1"].push(toPlay);
                  } else {
                    // Si 3 pions alliés alignés on met un pion à côté
                  }
              }
            }
          }
        }
      }
    }
  }
}
