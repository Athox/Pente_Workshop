class Point {
    constructor (l, c, value) {
        this.line = parseInt(l);
        this.column = parseInt(c);
        this.value = parseInt(value);
        this.empty = [];
    }
    setValue (value) {
        this.value = value;
    }
    checkIfEmpty (dir) {
        var response = [];
        switch (dir) {
          case "right":
            if (this.empty.indexOf("left") > -1) {
              response.push(this.line);
              response.push(this.column - 1);
              return response;
            } else {
              return false;
            }
          case "left":
            if (this.empty.indexOf("right") > -1) {
              response.push(this.line);
              response.push(this.column + 1);
              return response;
            } else {
              return false;
            }
          case "up":
            if (this.empty.indexOf("down") > -1) {
              response.push(this.line + 1);
              response.push(this.column);
              return response;
            } else {
              return false;
            }
          case "down":
            if (this.empty.indexOf("up") > -1) {
              response.push(this.line - 1);
              response.push(this.column);
              return response;
            } else {
              return false;
            }
          case "upRight":
            if (this.empty.indexOf("downLeft") > -1) {
              response.push(this.line + 1);
              response.push(this.column - 1);
              return response;
            } else {
              return false;
            }
          case "upLeft":
            if (this.empty.indexOf("downRight") > -1) {
              response.push(this.line + 1);
              response.push(this.column + 1);
              return response;
            } else {
              return false;
            }
          case "downRight":
            if (this.empty.indexOf("upLeft") > -1) {
              response.push(this.line - 1);
              response.push(this.column - 1);
              return response;
            } else {
              return false;
            }
          case "downLeft":
            if (this.empty.indexOf("upRight") > -1) {
              response.push(this.line - 1);
              response.push(this.column + 1);
              return response;
            } else {
              return false;
            }
        }
    }
    getRightNeighbors (tab) {
        var nb_neighbors = 0;
        this.rightNeighbors = nb_neighbors;
        try {
          if (tab[parseInt(this.line)][parseInt(this.column)+1] == 0) {
              this.empty.push("right");
              this.rightNeighbors = nb_neighbors;
              return;
          }
        } catch (e) {
          return;
        }
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[this.line][parseInt(this.column)+i] == this.value) {
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
    getLeftNeighbors (tab) {
        var nb_neighbors = 0;
        this.leftNeighbors = nb_neighbors;
        try {
          if (tab[parseInt(this.line)][parseInt(this.column)-1] == 0) {
              this.empty.push("left");
              this.leftNeighbors = nb_neighbors;
              return;
          }
        } catch (e) {
          return;
        }
        for (var i = 1; i < 4; i++) {
            try {
                if (tab[this.line][parseInt(this.column)-i] == this.value) {
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
    getUpNeighbors (tab) {
        var nb_neighbors = 0;
        this.upNeighbors = nb_neighbors;
        try {
          if (tab[parseInt(this.line)-1][parseInt(this.column)] == 0) {
              this.empty.push("up");
              this.upNeighbors = nb_neighbors;
              return;
          }
        } catch (e) {
          return;
        }
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[parseInt(this.line)-i][this.column] == this.value) {
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
    getDownNeighbors (tab) {
        var nb_neighbors = 0;
        this.downNeighbors = nb_neighbors;
        try {
          if (tab[parseInt(this.line)+1][parseInt(this.column)] == 0) {
              this.empty.push("down");
              this.downNeighbors = nb_neighbors;
              return;
          }
        } catch (e) {
          return;
        }
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[parseInt(this.line)+i][this.column] == this.value) {
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
    getUpRightNeighbors (tab) {
        var nb_neighbors = 0;
        this.upRighNeighbors = nb_neighbors;
        try {
          if (tab[parseInt(this.line)-1][parseInt(this.column)+1] == 0) {
              this.empty.push("upRight");
              this.upRighNeighbors = nb_neighbors;
              return;
          }
        } catch (e) {
          return;
        }
        for (var i = 1; i < 4; i++) {
          try {
            if (tab[parseInt(this.line)-i][parseInt(this.column)+i] == this.value) {
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
    getUpLeftNeighbors (tab) {
        var nb_neighbors = 0;
        this.upLeftNeighbors = nb_neighbors;
        try {
          if (tab[parseInt(this.line)-1][parseInt(this.column)-1] == 0) {
              this.empty.push("upLeft");
              this.upLeftNeighbors = nb_neighbors;
              return;
          }
        } catch (e) {
          return;
        }
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[parseInt(this.line)-i][parseInt(this.column)-i] == this.value) {
                  nb_neighbors++;
                  continue;
              }  else {
                  break;
              }
            } catch (e) {
                break;
            }
        }
        this.upLeftNeighbors = nb_neighbors;
    }
    getDownLeftNeighbors (tab) {
        var nb_neighbors = 0;
        this.downLeftNeighbors = 0;
        try {
          if (tab[parseInt(this.line)+1][parseInt(this.column)-1] == 0) {
              this.empty.push("downLeft");
              this.downLeftNeighbors = nb_neighbors;
              return;
          }
        } catch (e) {
          return;
        }
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[parseInt(this.line)+i][parseInt(this.column)-i] == this.value) {
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
    getDownRightNeighbors (tab) {
        var nb_neighbors = 0;
        this.downRightNeighbors = nb_neighbors;
        try {
          if (tab[parseInt(this.line)+1][parseInt(this.column)+1] == 0) {
              this.empty.push("downRight");
              this.downRightNeighbors = nb_neighbors;
              return;
          }
        } catch (e) {
          return;
        }
        for (var i = 1; i < 4; i++) {
            try {
              if (tab[parseInt(this.line)+i][parseInt(this.column)+i] == this.value) {
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
    getAllNeighbors (tab) {
        this.empty = [];
        this.getRightNeighbors(tab);
        this.getLeftNeighbors(tab);
        this.getUpNeighbors(tab);
        this.getDownNeighbors(tab);
        this.getUpRightNeighbors(tab);
        this.getUpLeftNeighbors(tab);
        this.getDownLeftNeighbors(tab);
        this.getDownRightNeighbors(tab);
        var neighbors = {};
        neighbors["right"] = this.rightNeighbors;
        neighbors["left"] = this.leftNeighbors;
        neighbors["up"] = this.upNeighbors;
        neighbors["down"] = this.downNeighbors;
        neighbors["upRight"] = this.upRighNeighbors;
        neighbors["upLeft"] = this.upLeftNeighbors;
        neighbors["downRight"] = this.downRightNeighbors;
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
