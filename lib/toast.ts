type ToastType = 'success' | 'error' | 'info'

export async function showToast(type: ToastType, message: string) {
  const { toast } = await import('sonner')
  toast[type](message)
}
