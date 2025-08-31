import { Signal } from "@angular/core"
import { MatBadge } from "@angular/material/badge"

export interface Link {
  title: string
  href: string
  icon?: string
  enabled: boolean
  badge?: Signal<MatBadge["content"]>
}
