class IA {
  constructor (idJoueur, numJoueur) {
    this.tab = [];
    this.ptTab = [];
    this.idJoueur = idJoueur;
    this.numJoueur = numJoueur;
    this.nbTenailles = 0;
  }
  setTab (tab) {
    if (this.tab.length == 0) {
      var first = true;
    }
    this.tab = tab;
    if (first == true) {
      this.ptTab = tab;
    }
  }
  doTenaille (l, c) {
    l = parseInt(l);
    c = parseInt(c);
    var directions = ["left", "right", "up", "down", "upRight", "upLeft", "downRight", "downLeft"];
    for (var dir in directions) {
      var firstNeighborValue = this.getNeighborValueFromDir(l, c, 1, dir);
      var secondNeighborValue = this.getNeighborValueFromDir(l, c, 2, dir);
      if ((firstNeighborValue == secondNeighborValue) && (firstNeighborValue != this.numJoueur) && (firstNeighborValue != 0)) {
        switch (dir) {
          case "right":
            this.ptTab[l][c+1] = 0;
            this.ptTab[l][c+2] = 0;
            this.nbTenailles++;
            break;
          case "left":
            this.ptTab[l][c-1] = 0;
            this.ptTab[l][c-2] = 0;
            this.nbTenailles++;
            break;
          case "up":
            this.ptTab[l-1][c] = 0;
            this.ptTab[l-2][c] = 0;
            this.nbTenailles++;
            break;
          case "down":
            this.ptTab[l+1][c] = 0;
            this.ptTab[l+2][c] = 0;
            this.nbTenailles++;
            break;
          case "upRight":
            this.ptTab[l-1][c+1] = 0;
            this.ptTab[l-2][c+2] = 0;
            this.nbTenailles++;
            break;
          case "upLeft":
            this.ptTab[l-1][c-1] = 0;
            this.ptTab[l-2][c-2] = 0;
            this.nbTenailles++;
            break;
          case "downRight":
            this.ptTab[l+1][c+1] = 0;
            this.ptTab[l+2][c+2] = 0;
            this.nbTenailles++;
            break;
          case "downLeft":
            this.ptTab[l+1][c-1] = 0;
            this.ptTab[l+2][c-2] = 0;
            this.nbTenailles++;
            break;
        }
      }
    }
  }
  handleTenailles (tableau, dernierCoupX, dernierCoupY) {
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
    if (typeof(this.ptTab[dernierCoupX][dernierCoupY]) == "object") {
      this.ptTab[dernierCoupX][dernierCoupY].setValue(this.tab[dernierCoupX][dernierCoupY]);
    } else {
      this.dernierCoup = new Point(dernierCoupX, dernierCoupY, this.tab[dernierCoupX][dernierCoupY]);
      this.ptTab[dernierCoupX][dernierCoupY] = this.dernierCoup;
    }
  }
  playPoint (l, c) {
    this.tab[l][c] = this.numJoueur;
    if (typeof(this.ptTab[l][c]) == "object") {
      this.ptTab[l][c].setValue(this.tab[l][c]);
    } else {
      this.ptTab[l][c] = new Point(l, c, this.tab[l][c]);
    }
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
      section = section.slice(dernierCoupX - 4, dernierCoupX + 5); //limite externe non incluse
    } else if (dernierCoupX < 4) {
      section = section.slice(dernierCoupX, dernierCoupX + 5); //limite externe non incluse
    } else if (dernierCoupX >= 13) {
      section = section.slice(dernierCoupX - 4, dernierCoupX); //limite externe non incluse
    }
    this.subSection = section;
  }
  getNeighborValueFromDir (l, c, distance, dir) {
    l = parseInt(l);
    c = parseInt(c);
    distance = parseInt(distance);
    switch (dir) {
      case "right":
        try {
          return this.tab[l][c+distance];
        } catch (e) {
          return false;
        }
      case "left":
        try {
          return this.tab[l][c-distance];
        } catch (e) {
          return false;
        }
      case "up":
        try {
          return this.tab[l-distance][c];
        } catch (e) {
          return false;
        }
      case "down":
        try {
          return this.tab[l+distance][c];
        } catch (e) {
          return false;
        }
      case "upRight":
        try {
          return this.tab[l-distance][c+distance];
        } catch (e) {
          return false;
        }
      case "upLeft":
        try {
          return this.tab[l-distance][c-distance];
        } catch (e) {
          return false;
        }
      case "downRight":
        try {
          return this.tab[l+distance][c+distance];
        } catch (e) {
          return false;
        }
      case "downLeft":
        try {
          return this.tab[l+distance][c-distance];
        } catch (e) {
          return false;
        }
    }
  }
  getInvertNeighborValueFromDir (l, c, distance, dir) {
    l = parseInt(l);
    c = parseInt(c);
    distance = parseInt(distance);
    switch (dir) {
      case "right":
        try {
          return this.tab[l][c-distance];
        } catch (e) {
          return false;
        }
      case "left":
        try {
          return this.tab[l][c+distance];
        } catch (e) {
          return false;
        }
      case "up":
        try {
          return this.tab[l+distance][c];
        } catch (e) {
          return false;
        }
      case "down":
        try {
          return this.tab[l-distance][c];
        } catch (e) {
          return false;
        }
      case "upRight":
        try {
          return this.tab[l+distance][c-distance];
        } catch (e) {
          return false;
        }
      case "upLeft":
        try {
          return this.tab[l+distance][c+distance];
        } catch (e) {
          return false;
        }
      case "downRight":
        try {
          return this.tab[l-distance][c-distance];
        } catch (e) {
          return false;
        }
      case "downLeft":
        try {
          return this.tab[l-distance][c+distance];
        } catch (e) {
          return false;
        }
    }
  }
  play(dernierCoupX, dernierCoupY, tableau, nbTenailleJ1, nbTenailleJ2, numTour) {
    if (dernierCoupX == null) {
      dernierCoupX = 0;
    }
    if (dernierCoupY == null) {
      dernierCoupY = 0;
    }
    if (numTour == 0) {
      // 1er à jouer => placer au centre au centre (9,9)
      this.playPoint(9,9);
      return [9,9];
    } else {
      if (this.numJoueur == 1) {
        if (this.nbTenailles != nbTenailleJ1) {
          this.handleTenailles(tableau, parseInt(dernierCoupX), parseInt(dernierCoupY));
        }
      } else {
        if (this.nbTenailles != nbTenailleJ2) {
          this.handleTenailles(tableau, parseInt(dernierCoupX), parseInt(dernierCoupY));
        }
      }
      this.setTab(tableau);
      this.addPoint(dernierCoupX, dernierCoupY);
      if (numTour == 2) {
        // 2eme pion à placer à au moins 3 cases du 1er
        if (dernierCoupX != 5 && dernierCoupY != 5) {
          this.playPoint(5,5);
          return [5,5];
        } else {
          this.playPoint(5,6);
          return [5,6];
        }
      }
      this.makeSubsection(dernierCoupX, dernierCoupY);
      var priorityList = {};
      priorityList["1"] = []; // Blocage critique
      priorityList["2"] = []; // Tenaille, éviter tenaille
      priorityList["3"] = []; // Entamer une tenaille,  bloquer une ligne adverse non dangereuse, entamer ligne dangereuse (3)
      priorityList["4"] = []; // Entamer ligne (2), entamer ligne (3)
      for (var l in this.subSection) {
        for (var c in this.subSection[l]) {
          if (typeof(this.subSection[l][c]) == "object") {
            var neighbors = this.subSection[l][c].getAllNeighbors(this.tab);
            for (var dir in neighbors) {
              var toPlay = this.subSection[l][c].checkIfEmpty(dir);
              if (toPlay != false) {
                switch (neighbors[dir]) {
                  case 3:
                    // Si 4 pions alignés on met un pion pour gagner/bloquer
                    this.playPoint(toPlay[0], toPlay[1]);
                    return toPlay;
                  case 2:
                    var neighborValue = this.getNeighborValueFromDir(this.subSection[l][c].line, this.subSection[l][c].column, 3, dir);
                    if (this.subSection[l][c].value != this.numJoueur) {
                      // Si 3 pions adverses alignés
                      if (neighborValue == this.numJoueur) {
                        // Si case opposée alliée, bloquer sa ligne
                        priorityList["3"].push(toPlay);
                        break;
                      } else {
                        // Si case opposée vide, empêcher l'entame d'une ligne de 5 adverse
                        priorityList["1"].push(toPlay);
                        break;
                      }
                    } else {
                      // Si 3 pions alliés alignés
                      if (neighborValue == 0) {
                        // Si case opposée vide, entamer ligne de 5 dangereuse
                        priorityList["3"].push(toPlay);
                        break;
                      } else {
                        // Si case opposée adverse, entamer ligne non dangereuse
                        priorityList["4"].push(toPlay);
                        break;
                      }
                    }
                  case 1:
                    var neighborValue = this.getNeighborValueFromDir(this.subSection[l][c].line, this.subSection[l][c].column, 2, dir);
                    if (this.subSection[l][c].value != this.numJoueur) {
                      // Si paire adverses
                      if (neighborValue == this.numJoueur) {
                        // Si la case opposée alliée, mettre un pion pour faire une tenaille
                        if (this.nbTenailles == 4) {
                          // Si 4 tenailles déjà faites, faire la dernière et gagner
                          this.playPoint(toPlay[0], toPlay[1]);
                          return toPlay;
                        } else {
                          // Sinon faire une tenaille
                          toPlay.push("tenaille");
                          toPlay.push(dir);
                          priorityList["2"].push(toPlay);
                          break;
                        }
                      } else {
                        // Case opposée vide
                        var neighborValue = this.getNeighborValueFromDir(this.subSection[l][c].line, this.subSection[l][c].column, 3, dir);
                        if (neighborValue != this.numJoueur) {
                          // Si la case après l'opposée n'est pas alliée, mettre le premier pion pour un tenaille. Si alliée risque de tenaille adverse
                          priorityList["3"].push(toPlay);
                          break;
                        }
                      }
                    } else {
                      // Si paire alliée
                      if (neighborValue != 0) {
                        // Si opposée adverse, mettre un pion pour éviter une tenaille adverse
                        priorityList["2"].push(toPlay);
                        break;
                      } else {
                        // Si case libre, entamer une ligne de 5
                        priorityList["4"].push(toPlay);
                        break;
                      }
                    }
                  case 0:
                    var neighborValue = this.getNeighborValueFromDir(this.subSection[l][c].line, this.subSection[l][c].column, 1, dir);
                    if (this.subSection[l][c].value == this.numJoueur) {
                      // Si case alliée
                      if (neighborValue != 0) {
                        // Si case opposée adverse, ne rien faire car on risque la tenaille
                        continue;
                      } else {
                        // Si case libre, entamer un ligne
                        priorityList["4"].push(toPlay);
                        break;
                      }
                    } else {
                      // Si case adverse
                      if (neighborValue == this.numJoueur) {
                        // Si case opposée alliée, ne rien faire car possibilité de tenaille
                        continue;
                      } else {
                        // Si case opposée libre,
                        var otherNeighborValue = this.getNeighborValueFromDir(this.subSection[l][c].line, this.subSection[l][c].column, 2, dir);
                        if (otherNeighborValue == 0) {
                          // Si autre case libre, mettre un pion
                          priorityList["4"].push(toPlay);
                          break;
                        } else if (otherNeighborValue == this.numJoueur) {
                          // Si autre case alliée, ne rien faire car possibilité de tenaille
                          continue;
                        } else {
                          // Si autre case adverse, mettre car ligne possible
                          priorityList["4"].push(toPlay);
                          break;
                        }
                      }
                    }
                }
              }
            }
          }
        }
      }
      if (priorityList["1"].length > 0) {
        //var i = Math.random(0, priorityList["1"].length + 1);
        var i = Math.floor(Math.random() * priorityList["1"].length);
        this.playPoint(priorityList["1"][i][0], priorityList["1"][i][1]);
        return priorityList["1"][i];
      } else if (priorityList["2"].length > 0) {
        var i = Math.floor(Math.random() * priorityList["2"].length);
        this.playPoint(priorityList["2"][i][0], priorityList["2"][i][1]);
        if (priorityList["2"][i].indexOf("tenaille") > -1) {
          this.doTenaille(priorityList["2"][i][0],priorityList["2"][i][1], priorityList["2"][i][3]);
        }
        return priorityList["2"][i];
      } else if (priorityList["3"].length > 0) {
        var i = Math.floor(Math.random() * priorityList["3"].length);
        this.playPoint(priorityList["3"][i][0], priorityList["3"][i][1]);
        return priorityList["3"][i];
      } else if (priorityList["4"].length > 0) {
        var i = Math.floor(Math.random() * priorityList["4"].length);
        this.playPoint(priorityList["4"][i][0], priorityList["4"][i][1]);
        return priorityList["4"][i];
      } else {
        for (var l in this.tab) {
          for (var c in this.tab[l]) {
            if (this.tab[l][c] == 0) {
              var r = [l,c];
              this.playPoint(l,c);
              return r;
            }
          }
        }
      }
    }
  }
}
