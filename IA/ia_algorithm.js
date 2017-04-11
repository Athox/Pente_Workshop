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
