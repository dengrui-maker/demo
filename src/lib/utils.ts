import { clsx, type ClassValue } from 'clsx';

/**
 * 合并 CSS 类名，支持条件类名
 * @param inputs - 类名数组，支持字符串、对象、数组等
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * 延迟执行 Promise
 * @param ms - 延迟毫秒数
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 格式化日期为本地字符串
 * @param date - 日期对象或字符串
 * @param options - Intl.DateTimeFormat 选项
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', options);
}

/**
 * 截断字符串，超出长度添加省略号
 * @param str - 原字符串
 * @param maxLength - 最大长度
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
