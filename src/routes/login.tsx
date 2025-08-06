import LoginPage from '@/container/LoginPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

