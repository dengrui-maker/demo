import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

/**
 * 按钮变体类型
 */
const Variant = {
  Primary: 'primary',
  Secondary: 'secondary',
  Outline: 'outline',
  Ghost: 'ghost',
} as const;
type Variant = (typeof Variant)[keyof typeof Variant];

/**
 * 按钮尺寸类型
 */
const Size = {
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
} as const;
type Size = (typeof Size)[keyof typeof Size];

/**
 * 按钮组件 Props
 */
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮变体 */
  readonly variant?: Variant;
  /** 按钮尺寸 */
  readonly size?: Size;
  /** 是否全宽 */
  readonly fullWidth?: boolean;
  /** 加载状态 */
  readonly loading?: boolean;
  /** 按钮内容 */
  readonly children: ReactNode;
}

/**
 * 基础按钮组件
 *
 * @example
 * ```tsx
 * <Button onClick={handleClick}>点击我</Button>
 * <Button variant="secondary" size="lg">大按钮</Button>
 * <Button loading>加载中...</Button>
 * ```
 */
export function Button({
  variant = Variant.Primary,
  size = Size.Md,
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        styles.button,
        variant === Variant.Secondary && styles.variantSecondary,
        variant === Variant.Outline && styles.variantOutline,
        variant === Variant.Ghost && styles.variantGhost,
        size === Size.Sm && styles.sizeSm,
        size === Size.Lg && styles.sizeLg,
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}

export { Variant as ButtonVariant, Size as ButtonSize };
export type { Props as ButtonProps };
