'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const SELECTS: [string, string, [string, string][]][] = [
    ['type', 'All types', ['Apartment', 'House', 'Studio', 'Villa'].map((t) => [t, t])],
    ['bedrooms', 'Any bedrooms', ['1', '2', '3', '4'].map((n) => [n, `${n}+ bedrooms`])],
    ['sort', 'Newest first', [['price-asc', 'Price: Low to High'], ['price-desc', 'Price: High to Low']]],
]

export function PropertyFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()
    const [q, setQ] = useState(params.get('searchTerm') ?? '')

    const setParam = (key: string, value: string) => {
        const p = new URLSearchParams(params.toString())
        value && value !== 'all' ? p.set(key, value) : p.delete(key)
        router.replace(`${pathname}?${p}`, { scroll: false })
    }


    useEffect(() => {
        const t = setTimeout(() => {
            if (q.trim() !== (params.get('searchTerm') ?? '')) setParam('searchTerm', q.trim())
        }, 400)
        return () => clearTimeout(t)
    }, [q]) 

    return (
        <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 md:flex-row">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by title or location..."
                    className="pl-9"
                />
            </div>

            {SELECTS.map(([key, label, options]) => (
                <Select key={key} value={params.get(key) ?? 'all'} onValueChange={(v) => setParam(key, v)}>
                    <SelectTrigger className="w-full md:w-44"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">{label}</SelectItem>
                        {options.map(([value, text]) => (
                            <SelectItem key={value} value={value}>{text}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ))}

            {params.size > 0 && (
                <Button variant="ghost" onClick={() => { setQ(''); router.replace(pathname) }}>
                    Clear
                </Button>
            )}
        </div>
    )
}