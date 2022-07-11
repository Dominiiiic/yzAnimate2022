/**
 * Generate initial array with elements as objects *以元素作为对象生成初始数组
 * This array will be extended later with elements attributes values *稍后将使用元素属性值扩展此数组
 * like 'position'
 */

export default () => {
  const elements = document.querySelectorAll('[data-aos]');
  return Array.prototype.map.call(elements, node => ({ node }));
};
