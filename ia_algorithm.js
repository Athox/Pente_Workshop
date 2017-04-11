if (("4 pions alignés") && ("au moins 1 case libre à côté")) {
    "placer un pion";
}

else if (("paire adverse") && ("4 tenailles faites") && ("1 pion à côté")) {
    "placer un pion de l'autre côté";
}

else if ("au moins 3 pions adverses alignés") {
    "placer un pion";
}

else if ("paire adverse") {
    if ("1 pion à côté") {
        "placer un pion de l'autre côté";
    } else {
        "placer un pion";
    }
}

else if ("2 ou 3 pions alignés") {
    "placer un pion à côté";
}

else if ("1 pion libre"){
    "placer un pion à côté";
}

else {
    "placer un pion au hazard";
}

var tab = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

class Point {
    constructor (l,c) {
        this.line = l;
        this.column = c;
    }
    setValue (value) {
        this.value = value;
    }
    getRightNeighbors (l, c, tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 5; i++) {
            try {
              if (tab[l][c+i] == this.value) {
                  nb_neighbors++;
                  continue;
              } else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.rightNeighbors = nb_neighbors;
    }
    getLeftNeighbors (l, c, tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 5; i++) {
            try {
                if (tab[l][c-i] == this.value) {
                    nb_neighbors++;
                    continue;
                } else {
                    break;
                }
            } catch (e) {
                break;
            }

        }
        this.leftNeighbors = nb_neighbors;
    }
    getUpNeighbors (l, c, tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 5; i++) {
            try {
              if (tab[l-i][c] == this.value) {
                  nb_neighbors++;
                  continue;
              } else {
                  break;
              }
            } catch (e) {

            }
        }
        this.upNeighbors = nb_neighbors;
    }
    getDownNeighbors (l, c, tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 5; i++) {
            try {
              if (tab[l+i][c] == this.value) {
                  nb_neighbors++;
                  continue;
              } else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.downNeighbors = nb_neighbors;
    }
    getUpRightNeighbors (l, c, tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 5; i++) {
          try {
            if (tab[l-i][c+i] == this.value) {
                nb_neighbors++;
                continue;
            } else {
                break;
            }
          } catch (e) {
              break;
          }
        }
        this.upRighNeighbors = nb_neighbors;
    }
    getUpLeftNeighbors (l, c, tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 5; i++) {
            try {
              if (tab[l-i][c-i] == this.value) {
                  nb_neighbors++;
                  continue;
              } else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.upLeftNeighbors = nb_neighbors;
    }
    getDownLeftNeighbors (l, c, tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 5; i++) {
            try {
              if (tab[l+i][c-i] == this.value) {
                  nb_neighbors++;
                  continue;
              } else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.downLeftNeighbors = nb_neighbors;
    }
    getDownRightNeighbors (l, c, tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 5; i++) {
            try {
              if (tab[l+i][c+i] == this.value) {
                  nb_neighbors++;
                  continue;
              } else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.downRightNeighbors = nb_neighbors;
    }
    getMaxNeighbors () {
        var neighbors = [];
        neighbors.push(this.rightNeighbors);
        neighbors.push(this.leftNeighbors);
        neighbors.push(this.upNeighbors);
        neighbors.push(this.downNeighbors);
        neighbors.push(this.upRighNeighbors);
        neighbors.push(this.upLeftNeighbors);
        neighbors.push(this.downRighNeighbors);
        neighbors.push(this.downLeftNeighbors);
        var max = Math.max(...neighbors);
        var dir;
        for (var i in neighbors) {
          if (neighbors[i] == max) {
            switch (i) {
              case 0:
                dir = "right";
                break;
              case 1:
                dir = "left";
                break;
              case 2:
                dir = "up";
                break;
              case 3:
                dir = "down";
                break;
              case 4:
                dir = "upRight";
                break;
              case 5:
                dir = "upLeft";
                break;
              case 6:
                dir = "downLeft";
                break;
              case 7:
                dir = "downRight";
                break;
            }
            return [dir, max];
          }
        }
    }
}

function associatePoints (pt) {

}

/*
function getAllNeighbors (l,c) {
    //
    var neighbors = {};
    neighbors["right"] = getRightNeighbors(l,c);
    neighbors["left"] = getLeftNeighbors(l,c);
    neighbors["up"] = getUpNeighbors(l,c);
    neighbors["down"] = getDownNeighbors(l,c);
    neighbors["up-right"] = getUpRightNeighbors(l,c);
    neighbors["up-left"] = getUpLeftNeighbors(l,c);
    neighbors["down-right"] = getDownRightNeighbors(l,c);
    neighbors["down-left"] = getDownLeftNeighbors(l,c);
    //
    var neighbors = [];
    neighbors.push(getRightNeighbors(l,c));
    neighbors.push(getLeftNeighbors(l,c));
    neighbors.push(getUpNeighbors(l,c));
    neighbors.push(getDownNeighbors(l,c));
    neighbors.push(getUpRightNeighbors(l,c));
    neighbors.push(getUpLeftNeighbors(l,c));
    neighbors.push(getDownRightNeighbors(l,c));
    neighbors.push(getDownLeftNeighbors(l,c));
    max = Math.max(...neighbors);
}

function getLeftNeighbors (l, c) {
    var side = tab[l][c];
    nb_neighbors = 0;
    for (var i = 1; i < 5; i++) {
        try {
            if (tab[l][c-i] == side) {
                nb_neighbors++;
                continue;
            } else {
                break;
            }
        } catch (e) {
            break;
        }

    }
    return nb_neighbors;
}
function getUpNeighbors (l, c) {
    var side = tab[l][c];
    nb_neighbors = 0;
    for (var i = 1; i < 5; i++) {
        try {
          if (tab[l-i][c] == side) {
              nb_neighbors++;
              continue;
          } else {
              break;
          }
        } catch (e) {

        }
    }
    return nb_neighbors;
}
function getDownNeighbors (l, c) {
    var side = tab[l][c];
    nb_neighbors = 0;
    for (var i = 1; i < 5; i++) {
        try {
          if (tab[l+i][c] == side) {
              nb_neighbors++;
              continue;
          } else {
              break;
          }
        } catch (e) {
            break;
        }
    }
    return nb_neighbors;
}
function getUpRightNeighbors (l, c) {
    var side = tab[l][c];
    nb_neighbors = 0;
    for (var i = 1; i < 5; i++) {
      try {
        if (tab[l-i][c+i] == side) {
            nb_neighbors++;
            continue;
        } else {
            break;
        }
      } catch (e) {
          break;
      }
    }
    return nb_neighbors;
}
function getUpLeftNeighbors (l, c) {
    var side = tab[l][c];
    nb_neighbors = 0;
    for (var i = 1; i < 5; i++) {
        try {
          if (tab[l-i][c-i] == side) {
              nb_neighbors++;
              continue;
          } else {
              break;
          }
        } catch (e) {
            break;
        }
    }
    return nb_neighbors;
}
function getDownLeftNeighbors (l, c) {
    var side = tab[l][c];
    nb_neighbors = 0;
    for (var i = 1; i < 5; i++) {
        try {
          if (tab[l+i][c-i] == side) {
              nb_neighbors++;
              continue;
          } else {
              break;
          }
        } catch (e) {
            break;
        }
    }
    return nb_neighbors;
}
function getDownRightNeighbors (l, c) {
    var side = tab[l][c];
    nb_neighbors = 0;
    for (var i = 1; i < 5; i++) {
        try {
          if (tab[l+i][c+i] == side) {
              nb_neighbors++;
              continue;
          } else {
              break;
          }
        } catch (e) {
            break;
        }
    }
    return nb_neighbors;
}
*/
