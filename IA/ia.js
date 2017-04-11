class IA {
  constructor (tab, idJoueur, numJoueur) {
    this.tab = tab;
    this.idJoueur = idJoueur;
    this.numJoueur = numJoueur;
    this.nbTenailles = 0;
  }
  setTab (tab) {
    this.tab = tab;
  }
  setNbTenailles (nbTenailles) {
    this.nbTenailles = nbTenailles;
  }
  addPoint (dernierCoupX, dernierCoupY) {
    this.dernierCoup = new Point(dernierCoupX, dernierCoupY, this.tab[dernierCoupX][dernierCoupY]);
  }
  makeSubsection (dernierCoupX, dernierCoupY) {
    var section = [];
    for (var line in this.tab) {
      if ((dernierCoupY >= 4) && (dernierCoupY < 13)) {
        section.push(this.tab[line].slice(dernierCoupY - 4, dernierCoupY + 5)); //limite externe non incluse
      } else if (dernierCoupY < 4) {
        section.push(this.tab[line].slice(dernierCoupY, dernierCoupY + 5)); //limite externe non incluse
      } else if (dernierCoupY >= 13) {
        section.push(this.tab[line].slice(dernierCoupY - 4, dernierCoupY)); //limite externe non incluse
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
  play() {

  }
}
