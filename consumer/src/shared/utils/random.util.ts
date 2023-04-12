export class RandomUtil {
  static randomFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static random(num: number): number {
    return Math.floor(Math.random() * num) + 1;
  }
}
