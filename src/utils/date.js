export default class DateUtil {
  static getDiffWithSecond(start, end) {
    let diff = end - start;
    if (diff / 1000 < 60) {
      return "Just now";
    }
    let days = diff / (1000 * 3600 * 24);
    if (days < 1) {
      return "Less than a day";
    }
    return `${days.toFixed(0)}d`;
  }
}
