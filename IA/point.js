class Point {
    constructor (l, c, value) {
        this.line = l;
        this.column = c;
        this.calue = value;
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
