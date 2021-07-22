class Utility {
  static random(min, max) {
    return ~~(Math.random() * (max - min + 1) + min);
  }
  static inBoundary(object, boundary) {
    return (
      object.x < 0 - object.width ||
      object.x > boundary.width ||
      object.y < 0 ||
      object.y > boundary.height
    );
  }
  static isCollide(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.y + object1.height > object2.y
    );
  }
}
