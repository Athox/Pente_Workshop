class Point {
    constructor (l, c, value) {
        this.line = l;
        this.column = c;
        this.value = value;
        this.empty = [];
    }
    setValue (value) {
        this.value = value;
    }
    checkIfEmpty (dir) {
        var response = [];
        switch (dir) {
          case "right":
            if (this.empty.indexOf("left")) {
              response.push(this.line);
              response.push(this.column - 1);
              return response;
            } else {
              return false;
            }
          case "left":
            if (this.empty.indexOf("right")) {
              response.push(this.line);
              response.push(this.column + 1);
              return response;
            } else {
              return false;
            }
          case "up":
            if (this.empty.indexOf("down")) {
              response.push(this.line + 1);
              response.push(this.column);
              return response;
            } else {
              return false;
            }
          case "down":
            if (this.empty.indexOf("up")) {
              response.push(this.line - 1);
              response.push(this.column);
              return response;
            } else {
              return false;
            }
          case "upRight":
            if (this.empty.indexOf("downLeft")) {
              response.push(this.line - 1);
              response.push(this.column + 1);
              return response;
            } else {
              return false;
            }
          case "upLeft":
            if (this.empty.indexOf("downRight")) {
              response.push(this.line - 1);
              response.push(this.column - 1);
              return response;
            } else {
              return false;
            }
          case "downRight":
            if (this.empty.indexOf("upLeft")) {
              response.push(this.line + 1);
              response.push(this.column + 1);
              return response;
            } else {
              return false;
            }
          case "downLeft":
            if (this.empty.indexOf("upRight")) {
              response.push(this.line + 1);
              response.push(this.column - 1);
              return response;
            } else {
              return false;
            }
        }
    }
    getRightNeighbors (tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[this.line][this.column+i] == this.value) {
                  nb_neighbors++;
                  continue;
              } else if (tab[this.line][this.column+i] == 0) {
                  this.empty.push("right");
                  break;
              } else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.rightNeighbors = nb_neighbors;
    }
    getLeftNeighbors (tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 4; i++) {
            try {
                if (tab[this.line][this.column-i] == this.value) {
                    nb_neighbors++;
                    continue;
                } else if (tab[this.line][this.column-i] == 0) {
                    this.empty.push("left");
                    break;
                } else {
                    break;
                }
            } catch (e) {
                break;
            }

        }
        this.leftNeighbors = nb_neighbors;
    }
    getUpNeighbors (tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[this.line-i][this.column] == this.value) {
                  nb_neighbors++;
                  continue;
              } else if (tab[this.line-i][this.column] == 0) {
                  this.empty.push("up");
                  break;
              } else {
                  break;
              }
            } catch (e) {

            }
        }
        this.upNeighbors = nb_neighbors;
    }
    getDownNeighbors (tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[this.line+i][this.column] == this.value) {
                  nb_neighbors++;
                  continue;
              } else if (tab[this.line-i][this.column] == 0) {
                  this.empty.push("down");
                  break;
              } else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.downNeighbors = nb_neighbors;
    }
    getUpRightNeighbors (tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 4; i++) {
          try {
            if (tab[this.line-i][this.column+i] == this.value) {
                nb_neighbors++;
                continue;
            } else if (tab[this.line-i][this.column+i] == 0) {
                this.empty.push("upRight");
                break;
            } else {
                break;
            }
          } catch (e) {
              break;
          }
        }
        this.upRighNeighbors = nb_neighbors;
    }
    getUpLeftNeighbors (tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[this.line-i][this.column-i] == this.value) {
                  nb_neighbors++;
                  continue;
              } else if (tab[this.line][this.column+i] == 0) {
                  this.empty.push("upLeft");
                  break;
              } else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.upLeftNeighbors = nb_neighbors;
    }
    getDownLeftNeighbors (tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[this.line+i][this.column-i] == this.value) {
                  nb_neighbors++;
                  continue;
              } else if (tab[this.line][this.column+i] == 0) {
                  this.empty.push("downLeft");
                  break;
              } else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.downLeftNeighbors = nb_neighbors;
    }
    getDownRightNeighbors (tab) {
        //var side = tab[l][c];
        nb_neighbors = 0;
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[this.line+i][this.column+i] == this.value) {
                  nb_neighbors++;
                  continue;
              } else if (tab[this.line][this.column+i] == 0) {
                  this.empty.push("downRight");
                  break;
              } else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.downRightNeighbors = nb_neighbors;
    }
    getAllNeighbors (tab) {
        getRightNeighbors(tab);
        getLeftNeighbors(tab);
        getUpNeighbors(tab);
        getDownNeighbors(tab);
        getUpRightNeighbors(tab);
        getUpLeftNeighbors(tab);
        getDownLeftNeighbors(tab);
        getDownRightNeighbors(tab);
        var neighbors = {};
        neighbors["right"] = this.rightNeighbors;
        neighbors["left"] = this.leftNeighbors;
        neighbors["up"] = this.upNeighbors;
        neighbors["down"] = this.downNeighbors;
        neighbors["upRight"] = this.upRighNeighbors;
        neighbors["upLeft"] = this.upLeftNeighbors;
        neighbors["downRight"] = this.downRighNeighbors;
        neighbors["downLeft"] = this.downLeftNeighbors;
        return neighbors;
    }
    getMaxNeighbor (neighbors) {
        var values = [];
        values.push(neighbors["right"]);
        values.push(neighbors["left"]);
        values.push(neighbors["up"]);
        values.push(neighbors["down"]);
        values.push(neighbors["upRight"]);
        values.push(neighbors["upLeft"]);
        values.push(neighbors["downRight"]);
        values.push(neighbors["downLeft"]);
        var max = Math.max(...values);
        var dir;
        for (var i in values) {
          if (values[i] == max) {
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
