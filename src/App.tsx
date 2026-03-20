import { useActionState } from 'react';
import { Button } from '@/components/ui';
import styles from './App.module.css';

/**
 * 表单提交状态
 */
type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

/**
 * 模拟异步表单提交
 */
async function submitForm(_prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;

  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!name || name.length < 2) {
    return { status: 'error', message: '名称至少需要2个字符' };
  }

  return { status: 'success', message: `欢迎，${name}！` };
}

/**
 * 主应用组件
 */
function App() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitForm,
    { status: 'idle' }
  );

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Demo App</h1>
        <p className={styles.subtitle}>React 19 + TypeScript + Vite</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>按钮组件示例</h2>
        <div className={styles.buttonGroup}>
          <Button>主要按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
        </div>
        <div className={styles.buttonGroup}>
          <Button size="sm">小按钮</Button>
          <Button size="md">中按钮</Button>
          <Button size="lg">大按钮</Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>useActionState 表单示例</h2>
        <form action={formAction} className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="name" className={styles.label}>
              用户名
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={styles.input}
              placeholder="请输入用户名"
              minLength={2}
              required
            />
          </div>

          <Button type="submit" loading={isPending} fullWidth>
            {isPending ? '提交中...' : '提交'}
          </Button>

          {state.status === 'success' && (
            <p className={styles.successMessage} role="alert">
              {state.message}
            </p>
          )}

          {state.status === 'error' && (
            <p className={styles.errorMessage} role="alert">
              {state.message}
            </p>
          )}
        </form>
      </section>

      <footer className={styles.footer}>
        <p>基于 .claude/rules/ 规范初始化</p>
      </footer>
    </main>
  );
}

export default App;
