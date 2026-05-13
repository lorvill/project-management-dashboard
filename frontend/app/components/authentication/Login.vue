<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {redirectToGoogleAuth} from "~/utils/auth/auth.utils";

const email = ref('')
const password = ref('')
const showPassword = ref(false)
</script>

<template>
  <div class="flex h-full min-h-0 items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-105 space-y-6 sm:space-y-7">
      <div class="space-y-4">
        <div class="mb-0 text-4xl leading-none text-indigo-900 sm:text-5xl">*</div>

        <div class="space-y-2">
          <h1
              class="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl"
          >
            Log in
          </h1>

          <p class="max-w-85 text-sm leading-5 text-slate-400">
            Welcome back. Log in to access your tasks, notes, and projects from
            anywhere.
          </p>
        </div>
      </div>

        <FieldGroup class="space-y-5">
          <Field>
            <FieldLabel
                for="email"
                class="text-[13px] font-medium text-slate-800"
            >
              Your email
            </FieldLabel>

            <Input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="natala.brak@kmnsstudio.com"
                class="h-11 w-full rounded-none border-slate-200 px-4 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2"
            />

            <FieldDescription class="text-xs text-slate-400">
              Enter the email linked to your account.
            </FieldDescription>
          </Field>

          <Field>
            <div class="flex items-center justify-between gap-3">
              <FieldLabel
                  for="password"
                  class="text-[13px] font-medium text-slate-800"
              >
                Password
              </FieldLabel>

              <a
                  href="#"
                  class="text-xs font-medium text-[#f08a5b] transition-colors hover:text-[#e37038]"
              >
                Forgot password?
              </a>
            </div>

            <div class="relative">
              <Input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="Enter your password"
                  class="h-11 w-full rounded-none border-slate-200 px-4 pr-11 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2"
              />

              <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  class="absolute right-2 top-1/2 size-7 -translate-y-1/2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  @click="showPassword = !showPassword"
              >
                <EyeOff
                    v-if="showPassword"
                    class="size-4"
                />
                <Eye
                    v-else
                    class="size-4"
                />
              </Button>
            </div>

            <FieldDescription class="text-xs text-slate-400">
              Use the password you created during registration.
            </FieldDescription>
          </Field>
        </FieldGroup>

        <Button
            type="submit"
            class="h-12 w-full rounded-md bg-[#050816] text-sm font-medium text-white shadow-[0_18px_30px_rgba(5,8,22,0.28)] hover:bg-[#0b1022]"
        >
          Log in
        </Button>

      <div class="w-full space-y-5">
        <div class="flex w-full items-center gap-3 sm:gap-4">
          <Separator class="h-px flex-1 bg-slate-200" />
          <span class="shrink-0 text-center text-xs text-slate-400">
            or continue with
          </span>
          <Separator class="h-px flex-1 bg-slate-200" />
        </div>
        <div class="w-full">
          <Button
              @click="redirectToGoogleAuth"
              type="button"
              variant="outline"
              class="mt-1 h-10 w-full rounded-md bg-neutral-100 text-sm font-medium text-white shadow-[0_14px_24px_rgba(5,8,22,0.24)] hover:bg-neutral-200 sm:h-11 cursor-pointer"
          >
            <span class="text-base font-semibold text-black">Google</span>
          </Button>
        </div>

        <p class="text-center text-xs leading-5 text-slate-400">
          Don’t have an account?
          <NuxtLink
              :to="{name: 'registration'}"
              class="font-medium text-[#f08a5b] transition-colors hover:text-[#e37038]"
          >
            Sign up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
