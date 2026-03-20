import type { ReactNode } from 'react';

/**
 * 通用组件 Props 基础接口
 * 所有 UI 组件应扩展此接口
 */
export interface BaseComponentProps {
  /** 自定义类名 */
  readonly className?: string;
  /** 子元素 */
  readonly children?: ReactNode;
}

/**
 * 异步操作状态
 * 使用判别联合类型表示不同状态
 */
export type AsyncState<T> =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'error'; readonly error: Error };

/**
 * API 响应标准格式
 */
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly message?: string;
  readonly code?: string;
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  readonly page: number;
  readonly pageSize: number;
}

/**
 * 分页响应数据
 */
export interface PaginatedData<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

/**
 * 通用事件处理函数类型
 */
export type EventHandler<E = void> = (event: E) => void;

/**
 * 可选值类型辅助
 */
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
