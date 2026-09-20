<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import BlogPreviewSection from '@/components/home/BlogPreviewSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import TechStackSection from '@/components/home/TechStackSection.vue'
</script>

<template>
  <main>
    <HeroSection />
    <TechStackSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <BlogPreviewSection />
    <ContactSection />
  </main>
  <AppFooter />
</template>
