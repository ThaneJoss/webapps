import { onMounted, ref } from 'vue'

import type { AppItem, HealthStatus, ServiceItem } from '../../shared/types.js'
import { fallbackApps, fallbackServices } from '../data/fallbackContent.js'
import { fetchApps, fetchHealth, fetchServices } from '../lib/api.js'

export const useApiHealthStatus = () => {
  const apiStatus = ref<'checking' | 'online' | 'offline'>('checking')
  const health = ref<HealthStatus | null>(null)

  onMounted(async () => {
    try {
      health.value = await fetchHealth()
      apiStatus.value = 'online'
    } catch {
      apiStatus.value = 'offline'
    }
  })

  return {
    apiStatus,
    health
  }
}

export const useServicesCatalog = () => {
  const services = ref<ServiceItem[]>(fallbackServices)

  onMounted(async () => {
    try {
      services.value = await fetchServices()
    } catch {
      services.value = fallbackServices
    }
  })

  return {
    services
  }
}

export const useAppPipeline = () => {
  const apps = ref<AppItem[]>(fallbackApps)

  onMounted(async () => {
    try {
      apps.value = await fetchApps()
    } catch {
      apps.value = fallbackApps
    }
  })

  return {
    apps
  }
}
