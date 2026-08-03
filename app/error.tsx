'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black px-6">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold text-white">
          Oops! Something went wrong
        </h1>

        {/* Description */}
        <p className="mt-4 text-slate-400">
          We encountered an unexpected error while loading this page. Don&apos;t worry—it may be temporary.
        </p>

        {/* Error Message (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 rounded-xl bg-black/30 p-4 text-left">
            <p className="text-sm font-semibold text-red-400">
              Development Error
            </p>
            <p className="mt-2 break-all text-sm text-slate-300">
              {error.message}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => unstable_retry()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-medium text-slate-200 transition hover:bg-slate-700"
          >
            Go Home
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-slate-500">
          If this problem continues, please contact support.
        </p>
      </div>
    </div>
  )
}