<template>
  <div class="app-shell">
    <AppHeader />

    <main>
      <HeroSection
        :signals="heroSignals"
        :api-status="apiStatus"
        :health="health"
      />
      <ServicesSection :services="services" />
      <ProcessSection :steps="buildSteps" />
      <TechSection :pillars="techPillars" />
      <PipelineSection :apps="apps" />
      <ContactSection />
    </main>

    <footer class="section-wrap pb-10 pt-2">
      <div class="flex flex-col gap-3 border-t border-line/70 py-6 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
        <p>Frontend: Vue + Vite. API: Hono + REST. Runtime: provider-agnostic.</p>
        <p>{{ footerNote }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { AppItem, HealthStatus, ServiceItem } from '../../shared/types.js'
import AppHeader from '../components/AppHeader.vue'
import { buildSteps, fallbackApps, fallbackServices, heroSignals, techPillars } from '../data/fallbackContent.js'
import { fetchApps, fetchHealth, fetchServices } from '../lib/api.js'
import ContactSection from '../sections/ContactSection.vue'
import HeroSection from '../sections/HeroSection.vue'
import PipelineSection from '../sections/PipelineSection.vue'
import ProcessSection from '../sections/ProcessSection.vue'
import ServicesSection from '../sections/ServicesSection.vue'
import TechSection from '../sections/TechSection.vue'

document.title = 'Web Apps as a Service'

const services = ref<ServiceItem[]>(fallbackServices)
const apps = ref<AppItem[]>(fallbackApps)
const apiStatus = ref<'checking' | 'online' | 'offline'>('checking')
const health = ref<HealthStatus | null>(null)

const footerNote = `Seeded on ${new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date())}`

onMounted(async () => {
  const [healthResult, servicesResult, appsResult] = await Promise.allSettled([
    fetchHealth(),
    fetchServices(),
    fetchApps()
  ])

  if (healthResult.status === 'fulfilled') {
    health.value = healthResult.value
    apiStatus.value = 'online'
  } else {
    apiStatus.value = 'offline'
  }

  if (servicesResult.status === 'fulfilled') {
    services.value = servicesResult.value
  }

  if (appsResult.status === 'fulfilled') {
    apps.value = appsResult.value
  }
})
</script>
